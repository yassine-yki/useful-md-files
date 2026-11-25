"""Check notes, manual animations, appendices and timing in the final OOXML."""
from pathlib import Path
import zipfile,xml.etree.ElementTree as E,re,json,hashlib
base=Path(__file__).resolve().parent.parent
pptx=base/'Virtus_Soutenance_FR.pptx'
ns={'p':'http://schemas.openxmlformats.org/presentationml/2006/main','a':'http://schemas.openxmlformats.org/drawingml/2006/main'}
result={'slides':0,'notes':0,'hiddenAppendices':0,'fadeTransitions':0,'entranceEffects':0,'invalidTargets':[],'autoAdvance':[],'animatedTitles':[],'charts':0,'embeddedWorkbooks':0,'mainSeconds':0,'presenterSeconds':{'1':0,'2':0},'nativePlaybackVerified':False}
with zipfile.ZipFile(pptx) as z:
 slides=sorted([n for n in z.namelist() if re.fullmatch(r'ppt/slides/slide\d+\.xml',n)],key=lambda n:int(re.search(r'slide(\d+)',n).group(1)))
 for n in slides:
  i=int(re.search(r'slide(\d+)',n).group(1));r=E.fromstring(z.read(n));result['slides']+=1
  if r.get('show')=='0':result['hiddenAppendices']+=1
  assert (r.get('show')=='0')==(i>18)
  tr=r.find('p:transition',ns);assert tr is not None and tr.find('p:fade',ns) is not None
  result['fadeTransitions']+=1
  if tr.get('advTm') is not None:result['autoAdvance'].append(i)
  ids={v.get('id') for v in r.findall('.//p:cNvPr',ns)}
  targets=[x.get('spid') for x in r.findall('.//p:spTgt',ns)]
  result['invalidTargets'] += [{'slide':i,'id':t} for t in targets if t not in ids]
  shapes=r.findall('.//p:sp',ns)
  if shapes:
   title=shapes[0].find('p:nvSpPr/p:cNvPr',ns)
   if title is not None and title.get('id') in targets:result['animatedTitles'].append(i)
  result['entranceEffects']+=len([v for v in r.findall('.//p:cTn',ns) if v.get('presetClass')=='entr'])
  notes=E.fromstring(z.read(f'ppt/notesSlides/notesSlide{i}.xml'))
  text='\n'.join(x.text or '' for x in notes.findall('.//a:t',ns));result['notes']+=1
  assert 'SOURCES' in text
  if i<=18:
   m=re.search(r'INTERVENANT (\d).*?(\d+) secondes',text,re.S);assert m
   sec=int(m.group(2));result['mainSeconds']+=sec;result['presenterSeconds'][m.group(1)]+=sec
   for label in ['POINT TECHNIQUE','CLICS','TRANSITION']:assert label in text
 result['charts']=len([n for n in z.namelist() if re.fullmatch(r'ppt/(?:slides/)?charts/[^/]+\.xml',n)])
 result['embeddedWorkbooks']=len([n for n in z.namelist() if n.startswith('ppt/embeddings/') and n.endswith('.xlsx')])
assert result['slides']==36 and result['notes']==36 and result['hiddenAppendices']==18
assert result['mainSeconds']==1080 and result['charts']==4 and result['embeddedWorkbooks']==4
assert not result['invalidTargets'] and not result['autoAdvance'] and not result['animatedTitles']
result['sha256']=hashlib.sha256(pptx.read_bytes()).hexdigest()
(base/'.build/deck-audit.json').write_text(json.dumps(result,indent=2),encoding='utf8')
print(json.dumps(result,indent=2))
