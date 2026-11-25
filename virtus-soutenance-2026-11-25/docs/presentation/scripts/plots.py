"""Generate Matplotlib charts from archived JSON, without calling production."""
from pathlib import Path
import sys,json,csv,os
base=Path(__file__).resolve().parent.parent
extra=os.environ.get('VIRTUS_PLOT_DEPS')
if extra: sys.path.insert(0,extra)
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
p=base/'measurements';out=p/'charts';out.mkdir(exist_ok=True)
plt.rcParams.update({'font.family':'DejaVu Sans','font.size':14,'axes.spines.top':False,'axes.spines.right':False,'figure.facecolor':'#F7F5EF','axes.facecolor':'#F7F5EF','text.color':'#182D2B','axes.labelcolor':'#182D2B'})
d=json.loads((p/'performance-report-2026-11-25.json').read_text(encoding='utf-8-sig'))
rows=[r for r in d['comparisons'] if r['route'] in ['/offres','/tech','/sources']]
fig,ax=plt.subplots(figsize=(10,5),layout='constrained');x=np.arange(len(rows))
for delta,key,label,color in [(-.18,'beforeMedianMs','Avant','#D68B43'),(.18,'afterMedianMs','Après','#1B6860')]:
 bars=ax.bar(x+delta,[r[key] for r in rows],.36,label=label,color=color);ax.bar_label(bars,padding=4,fontsize=12)
ax.set_xticks(x,[r['route'] for r in rows]);ax.set_ylabel('Réception complète du HTML (ms)');ax.set_ylim(0,1650);ax.legend(frameon=False)
fig.suptitle('Production, 25/11/2026, cinq requêtes séquentielles par route',fontsize=14)
fig.savefig(out/'http-before-after.png',dpi=170);fig.savefig(out/'http-before-after.svg');plt.close(fig)
b=json.loads((p/'benchmark.json').read_text(encoding='utf-8-sig'));fig,ax=plt.subplots(figsize=(10,5),layout='constrained');x=np.arange(len(b['samples']))
for delta,key,label,color in [(-.18,'p50_ms','Médiane','#1B6860'),(.18,'p95_ms','p95','#D68B43')]:
 bars=ax.bar(x+delta,[s[key] for s in b['samples']],.36,label=label,color=color);ax.bar_label(bars,fmt='%.1f',padding=4,fontsize=12)
ax.set_xticks(x,[f"{s['jobs']:,}".replace(',',' ') for s in b['samples']]);ax.set_xlabel('Offres synthétiques préclassifiées');ax.set_ylabel('Calcul local (ms)');ax.set_ylim(0,52);ax.legend(frameon=False)
fig.suptitle('25/11/2026, dix échauffements puis 50 mesures par taille, sans HTTP',fontsize=13)
fig.savefig(out/'matching-local.png',dpi=170);fig.savefig(out/'matching-local.svg');plt.close(fig)
fig,ax=plt.subplots(figsize=(8,4.5),layout='constrained');bars=ax.bar(['Précision 25/25','Rappel 25/32'],[100,78.125],color=['#1B6860','#D68B43']);ax.bar_label(bars,fmt='%.1f %%',padding=4);ax.set_ylabel('Pourcentage (%)');ax.set_ylim(0,115);fig.suptitle('title-v1, fixture interne de 100 titres, 32 positifs');fig.savefig(out/'classification.png',dpi=170);plt.close(fig)
c=json.loads((p/'collection-run-45578132719.json').read_text(encoding='utf-8-sig'));fig,ax=plt.subplots(figsize=(8,4.5),layout='constrained');bars=ax.bar(['Réussis','Échecs'],[c['successful'],c['total']-c['successful']],color=['#1B6860','#B74A3B']);ax.bar_label(bars,padding=4);ax.set_ylabel('Jobs GitHub Actions (pas annonces)');ax.set_ylim(0,38);fig.suptitle('Run 45578132719, 25/11/2026');fig.savefig(out/'collection.png',dpi=170);plt.close(fig)
with (p/'http-summary.csv').open('w',newline='',encoding='utf8') as f:
 w=csv.DictWriter(f,fieldnames=list(d['comparisons'][0]));w.writeheader();w.writerows(d['comparisons'])
print('4 Matplotlib charts, 2 SVG exports and HTTP CSV generated.')
