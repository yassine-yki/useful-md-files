# Soutenance Virtus, 25 novembre 2026

- [PowerPoint éditable](Virtus_Soutenance_FR.pptx) : 18 slides principales et 18 annexes cachées, notes françaises, deux intervenants, durée cible 18 minutes.
- [Dossier technique source](../technical/Dossier_Technique_Virtus_FR.md).
- [Mesures HTTP et limites](measurements/performance-report-2026-11-25.json), échantillons JSON, synthèse CSV et inventaire des sources.
- [Graphiques Matplotlib](measurements/charts/) et [script de reproduction](scripts/plots.py).
- [Captures réelles](screenshots/) pour le secours hors ligne.
- [Points encore à vérifier](LIMITES.md).

## Lecture

Ouvrir le PPTX dans PowerPoint, puis lancer le diaporama. Les titres sont visibles dès l'entrée. Chaque bloc numéroté apparaît au clic et reste visible. Les diagrammes et tableaux restent complets. Les transitions sont des fades sans avance automatique. Les annexes 19–36 sont cachées et accessibles au besoin depuis le sélecteur de slides. Elles n'ajoutent pas de durée au scénario principal.

Intervenant 1 : slides 1–9, 8 min 35. Intervenant 2 : slides 10–18, 9 min 25. Les scripts et indications sont dans les notes. Adapter les noms et déclarer les contributions réelles. Répéter avec chronomètre. Les durées sont une proposition, pas une répétition humaine mesurée.

## Reproduction des graphiques

Python avec Matplotlib et NumPy :

```powershell
python scripts/plots.py
```

Le script lit les JSON historiques et ne contacte aucun service. Il régénère PNG, SVG et `http-summary.csv`. Versions utilisées : Python du runtime Codex, Matplotlib 3.11.2. Les comparaisons HTTP utilisent cinq requêtes par route, pas une charge concurrente. `benchmark.json` est un historique et ne doit pas être écrasé.

Le microbenchmark nécessite un checkout de Virtus à la révision `569fbdf`, ses dépendances pnpm et `tsx`. Définir `VIRTUS_APP_REPO` vers ce checkout, puis y exécuter `pnpm exec tsx <chemin-absolu>/measurements/benchmark.ts`. Le résultat ira dans `benchmark-rerun.json`, distinct de la mesure historique. Ne pas annoncer ce benchmark comme capacité HTTP.

## Reproduction du PowerPoint

Les scripts `build.mjs`, `animate.py` et `finalize.mjs` utilisent le runtime de présentation Codex et `@oai/artifact-tool`. Pour une autre installation, définir `VIRTUS_RUNTIME_MODULES` et `VIRTUS_PRESENTATION_SKILL` vers le runtime et le skill disponibles, puis ajuster le chemin Python de `finalize.mjs` si nécessaire.

```powershell
node scripts/build.mjs
python scripts/animate.py
node scripts/finalize.mjs
```

Le build rend chaque slide dans `.build`. L'étape d'animation écrit du OOXML natif. Le finalizer contrôle structure, géométrie, objets éditables et classeurs de données avant de copier le résultat validé vers `Virtus_Soutenance_FR.pptx`. Les sorties intermédiaires restent dans `.build` et `output`, hors du dossier publié. Aucune modification d'application ou d'infrastructure n'est nécessaire.

La validation structurelle et les rendus ne remplacent pas un essai de lecture native PowerPoint.
