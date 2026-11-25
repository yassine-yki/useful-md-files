import zipfile,re,json,pathlib,xml.etree.ElementTree as E
p=pathlib.Path(__file__).resolve().parent.parent/".build"
ns={"p":"http://schemas.openxmlformats.org/presentationml/2006/main"}
def tag(name,**attrs):return E.Element("{"+ns["p"]+"}"+name,{k:str(v) for k,v in attrs.items()})
def sub(parent,name,**attrs):el=tag(name,**attrs);parent.append(el);return el
E.register_namespace("p",ns["p"])
uid=0
def ct(parent,**attrs):
 global uid
 uid+=1
 return sub(parent,"cTn",id=uid,**attrs)
def cond(parent,delay="0"):
 cl=sub(parent,"stCondLst");sub(cl,"cond",delay=delay)
def behavior(parent,spid,dur):
 b=sub(parent,"cBhvr");ct(b,dur=dur,fill="hold")
 tg=sub(b,"tgtEl");sub(tg,"spTgt",spid=spid)
 return b
def timing(groups):
 global uid
 uid=0
 tm=tag("timing");tn=sub(tm,"tnLst");par=sub(tn,"par");root=ct(par,dur="indefinite",restart="never",nodeType="tmRoot")
 children=sub(root,"childTnLst");seq=sub(children,"seq",concurrent="1",nextAc="seek")
 main=ct(seq,dur="indefinite",nodeType="mainSeq")
 lst=sub(main,"childTnLst")
 for ids in groups:
  wrap=sub(lst,"par");w=ct(wrap,fill="hold");cond(w,"indefinite")
  wl=sub(w,"childTnLst");inside=sub(wl,"par");ins=ct(inside,fill="hold");cond(ins)
  il=sub(ins,"childTnLst")
  for k,spid in enumerate(ids):
   effect=sub(il,"par");ef=ct(effect,presetID="10",presetClass="entr",presetSubtype="0",fill="hold",nodeType="clickEffect" if k==0 else "withEffect")
   cond(ef);el=sub(ef,"childTnLst")
   st=sub(el,"set");b=behavior(st,spid,"1");al=sub(b,"attrNameLst");sub(al,"attrName").text="style.visibility"
   to=sub(st,"to");sub(to,"strVal",val="visible")
   fade=sub(el,"animEffect",transition="in",filter="fade");behavior(fade,spid,"350")
 for name,evt in [("prevCondLst","onPrev"),("nextCondLst","onNext")]:
  cl=sub(seq,name);c=sub(cl,"cond",evt=evt,delay="0");tg=sub(c,"tgtEl");sub(tg,"sldTgt")
 return E.tostring(tm,encoding="unicode").replace(' xmlns:p="'+ns["p"]+'"',"")
report=[]
with zipfile.ZipFile(p/"candidate.pptx") as src,zipfile.ZipFile(p/"animated.pptx","w",zipfile.ZIP_DEFLATED) as dst:
 for item in src.infolist():
  data=src.read(item.filename)
  if re.fullmatch(r"ppt/slides/slide\d+\.xml",item.filename):
   num=int(re.search(r"slide(\d+)",item.filename).group(1));xml=data.decode();r=E.fromstring(xml);groups={}
   for shp in r.findall(".//p:sp",ns):
    nv=shp.find("./p:nvSpPr/p:cNvPr",ns)
    if nv is not None and nv.get("name","").startswith("reveal-"):
     key=int(nv.get("name").split("-")[-1]);groups.setdefault(key,[]).append(nv.get("id"))
   transition='<p:transition spd="fast" advClick="1"><p:fade/></p:transition>'
   if num==18:
    for shp in r.findall(".//p:sp",ns):
     tx="".join(shp.itertext());nv=shp.find("./p:nvSpPr/p:cNvPr",ns)
     if nv is not None:
      if "À valider ensuite" in tx or "Pertinence humaine" in tx:groups.setdefault(1,[]).append(nv.get("id"))
      elif "Questions du jury" in tx:groups.setdefault(2,[]).append(nv.get("id"))
   extra=transition+(timing([groups[k] for k in sorted(groups)]) if groups else "")
   # Insert after cSld/clrMapOvr and before timing/extLst.
   close="</p:clrMapOvr>" if "</p:clrMapOvr>" in xml else "</p:cSld>"
   if close in xml:xml=xml.replace(close,close+extra,1)
   else:raise RuntimeError("Missing insertion anchor")
   if num>18:xml=xml.replace("<p:sld ","<p:sld show=\"0\" ",1)
   E.fromstring(xml)
   report.append({"slide":num,"transition":"fade","click_groups":len(groups),"animated_shapes":sum(map(len,groups.values())),"hidden":num>18})
   data=xml.encode()
  dst.writestr(item,data)
(p/"animation-report.json").write_text(json.dumps(report,indent=2))
print(json.dumps({"slides":len(report),"transitions":len(report),"click_groups":sum(x["click_groups"] for x in report),"animated_slides":sum(x["click_groups"]>0 for x in report),"hidden_annexes":sum(x["hidden"] for x in report)},indent=2))
