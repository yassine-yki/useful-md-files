# Notes de soutenance Virtus

18 minutes hors annexes et questions. Répartition indicative sans attribution de contributions.

## Diapositive 1

INTERVENANT 1 · 20 secondes

Bonjour. Nous présentons Virtus, un catalogue d’opportunités au Maroc avec des correspondances expliquées. Nous suivrons les données, de leur collecte à leur consultation, puis le parcours candidat et les preuves de validation. Notre présentation dure dix-huit minutes.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/pull/16

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : .
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner le problème et le périmètre.

## Diapositive 2

INTERVENANT 1 · 55 secondes

Le problème de départ est concret : un candidat consulte plusieurs sites, retrouve parfois les mêmes annonces et doit comparer manuellement les exigences avec son parcours. Nous ciblons la découverte d'opportunités au Maroc et les offres à distance dont l'éligibilité au Maroc est explicite. Virtus centralise les faits utiles et conserve la candidature sur la source d'origine. Le parcours candidat ajoute un profil confirmé et des correspondances expliquées. Nous ne cherchons pas à remplacer un recruteur ni à envoyer automatiquement des candidatures. Les grands portails sont des repères de marché, mais nous ne revendiquons pas une fonctionnalité exclusive. Le positionnement repose sur le périmètre marocain et la traçabilité. Révéler les trois blocs au clic.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/README.md
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/matching.ts

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : Problème, objectifs et périmètre.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner le parcours utilisateur.

## Diapositive 3

INTERVENANT 1 · 70 secondes

Montrer l’accueil puis Tech. Conserver les trente derniers jours, appliquer une technologie, ouvrir le détail et revenir avec les filtres. La capture de production du 25 novembre montre le vrai catalogue. Pour le profil, utiliser exclusivement des informations synthétiques : accord explicite, import si disponible, confirmation, puis explications. L’accès visible au profil ne démontre pas la disponibilité du fournisseur. Le secours hors ligne est déjà inclus en annexe avec les captures mobile et détail. Le pilotage réel de l’extraction, les comptes et les quotas doivent être vérifiés avant la soutenance. Aucun appel payant ou candidature ne fait partie de cette démonstration.

SOURCES
docs/technical/Dossier_Technique_Virtus_FR.md §2 et §15
Capture réelle de production, 25/11/2026
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/app/api/profile/extract/route.ts

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : Parcours de démonstration.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner les chemins des données.

## Diapositive 4

INTERVENANT 1 · 65 secondes

La collecte et la consultation sont deux chemins distincts. GitHub Actions contacte les sources à intervalles planifiés, puis un adaptateur valide et normalise chaque lot avant une écriture atomique dans PostgreSQL. Une visite du catalogue n'entraîne donc pas une nouvelle collecte des sites externes. Vercel sert l'accueil statique, les pages dynamiques et les routes API Next.js. L'application utilise le SDK Supabase sur HTTPS et appelle des fonctions SQL ou des tables sous RLS. Le navigateur reçoit les faits publics et, après authentification, les données de son propriétaire. Cette séparation limite le couplage aux sites sources et nous donne une frontière claire pour les secrets.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/scripts/collect.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/catalog.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/.github/workflows/collect.yml

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : Architecture et flux des données.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner les méthodes de collecte.

## Diapositive 5

INTERVENANT 1 · 60 secondes

Nous ne devons pas appeler toutes les sources du scraping HTML. SmartRecruiters, Greenhouse, Lever, Workable et Ashby fournissent des réponses structurées. Les adaptateurs employeurs combinent une API et parfois les pages de détail : Capgemini, CGI via Njoyn et Cegedim via DigitalRecruiters. inwi et Leyton utilisent des flux et des sitemaps Teamtailor. Wadifa Info apporte les concours et Himalayas la découverte remote. Le registre local contient trente-quatre entrées activées, pas nécessairement trente-quatre entreprises distinctes et pas une garantie de publication courante. La base reste l'autorité pour l'activation et l'approbation. Orange demeure désactivé faute de pagination validée. La liste complète figure en annexe.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/sources.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/tech-employers.json
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/expanded-employers.json
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/collectors/employer-sites.ts

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : Sources : plusieurs modes de collecte.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner les contrôles de fiabilité.

## Diapositive 6

INTERVENANT 1 · 70 secondes

Le workflow demande une collecte toutes les six heures, à la minute dix-sept, mais GitHub peut retarder l'exécution. La matrice lance au maximum deux sources à la fois et isole leurs échecs. Himalayas applique en plus une cadence quotidienne. Les appels imposent HTTPS, une liste d'hôtes autorisés, un délai maximal de vingt-cinq secondes et des reprises bornées qui respectent Retry-After. Les collecteurs vérifient pagination, totaux, identifiants et éligibilité géographique. Nous nettoyons le HTML, normalisons les villes et les contrats, retirons les paramètres de suivi et calculons des clés stables. Une réponse partielle ou une chute suspecte conserve les données antérieures. Cette approche accepte de signaler un échec plutôt que de fermer abusivement des offres.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/.github/workflows/collect.yml
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/collectors/http.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/normalize.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/scripts/collect.ts

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : Collecte : validation avant synchronisation.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner les relations en base.

## Diapositive 7

INTERVENANT 1 · 65 secondes

Voici un modèle relationnel simplifié, dérivé des migrations. Une source possède plusieurs annonces et plusieurs journaux de synchronisation. Chaque annonce conserve son identifiant externe, sa clé de regroupement, les dates de présence et ses métadonnées. Supabase Auth gère les utilisateurs, et chaque utilisateur possède au plus un profil candidat stocké en JSONB avec sa révision. Nous n'avons pas de table permanente de correspondances : le serveur calcule le classement à la demande. Les données de budget et de consommation de l'extraction résident dans un schéma privé, montré en annexe. Nous séparons les vues publiques des descriptions importées réservées à l'opérateur. Les index facilitent la recherche et les filtres, mais ils ne démontrent pas à eux seuls la capacité sous charge.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/supabase/migrations/202610250001_catalog.sql
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/supabase/migrations/20261117205938_virtus_tech_profiles.sql
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/supabase/migrations/202610250004_public_metadata.sql

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : Structure de la base de données.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner les interfaces métier.

## Diapositive 8

INTERVENANT 1 · 45 secondes

Le projet utilise surtout des fonctions et des interfaces TypeScript. Nous présentons donc les interfaces métier avec une notation UML de classes, sans prétendre qu'il existe un ORM ou des classes équivalentes à chaque table. CandidateProfile contient des préférences, chacune avec des valeurs et un indicateur obligatoire. Job porte les métadonnées TechMetadata. La fonction de matching produit un résultat Match qui référence l'offre et expose des explications. La distinction entre entités persistées et objets calculés empêche de confondre le modèle de code avec le modèle de base. Le score est interne au classement et n'est pas renvoyé dans la réponse paginée.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/profile.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/types.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/tech.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/matching.ts

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : UML de classes : modèle du domaine.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner le cycle de vie des annonces.

## Diapositive 9

INTERVENANT 1 · 65 secondes

Cette machine d'états résume le cycle standard des sources complètes. Une collecte réussie crée ou rafraîchit une offre active. Si l'offre manque lors d'un premier lot complet, nous augmentons le compteur sans la fermer immédiatement. La fermeture demande deux absences dans des lots réussis et au moins vingt-quatre heures depuis la dernière présence. Un échec de collecte ne déclenche jamais ce rapprochement. Indépendamment de cet état, les lectures masquent les données non revues depuis soixante-douze heures, les sources suspendues et les concours dont la date limite est dépassée. Himalayas suit une règle distincte : une absence dans son flux partiel ne vaut pas fermeture. Cette nuance est essentielle pour éviter qu'une source indisponible ne fasse disparaître artificiellement le catalogue.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/supabase/migrations/202610250001_catalog.sql
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/supabase/migrations/20261121230612_himalayas_partial_collection.sql
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/source-policy.ts

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : UML d'états : présence et visibilité d'une offre.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Je passe la parole à Intervenant 2 pour les interactions et le parcours candidat.

## Diapositive 10

INTERVENANT 2 · 55 secondes

React transforme l'état de l'interface en mises à jour du DOM. Pour le changement de fond au survol ou au focus, useState et useRef contrôlent la catégorie active et ignorent une image arrivée en retard. Ce comportement ne demande pas de rechargement de document. Les liens Next.js permettent les transitions entre routes et les écrans loading donnent un retour visuel. Cela ne signifie pas que tout le catalogue est filtré dans le navigateur : les pages et routes API interrogent le serveur. Les filtres restent dans l'URL pour conserver le contexte, le retour depuis un détail et le partage. L'accueil statique ne dépend plus d'une requête catalogue. Nous devons distinguer interaction sans rechargement complet, requête réseau et absence de JavaScript. Révéler les trois blocs au clic.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/components/category-navigation.tsx
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/app/offres/loading.tsx
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/app/page.tsx
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/search.ts

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : DOM et interactions côté client.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner l’import du CV.

## Diapositive 11

INTERVENANT 2 · 70 secondes

La séquence sépare les responsabilités. Le navigateur transmet le CV avec le jeton de session et le consentement. La route privée valide l'utilisateur auprès de Supabase Auth, puis parse le PDF texte ou le DOCX dans des limites strictes. Elle réserve atomiquement un quota en base avant l'appel au fournisseur. Le modèle retourne un profil structuré, que le serveur contrôle contre le schéma et les éléments présents dans le CV. Le navigateur reçoit un brouillon marqué needsConfirmation. Le candidat peut le corriger puis l'enregistrer par PUT. C'est cette dernière action qui persiste le profil confirmé, pas l'extraction elle-même. Le fichier original et le texte intégral ne sont pas stockés par l'application. Si le fournisseur n'est pas disponible, la saisie manuelle reste possible.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/app/api/profile/extract/route.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/candidate-server.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/cv-extraction.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/app/api/profile/route.ts

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : UML de séquence : import du CV.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner le classement des offres.

## Diapositive 12

INTERVENANT 2 · 70 secondes

L'IA intervient dans l'extraction structurée du CV. La classification des offres et le classement utilisent des règles déterministes. Une offre doit être active, tech, fraîche et compatible avec les contraintes obligatoires. L'ancrage métier exige une famille ciblée ou au moins deux technologies communes. Le score additionne quarante points pour une famille commune, jusqu'à trente-cinq pour la couverture des technologies, quinze pour le niveau souhaité et jusqu'à dix pour les langues requises. Ces poids sont des choix de conception et n'ont pas été appris sur des décisions de recrutement. Ils servent au tri et ne sont pas une probabilité d'embauche. Le résultat distingue raisons positives, compétences absentes du profil, conflits de préférence et informations inconnues. Une donnée inconnue n'autorise pas une affirmation sur le candidat.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/matching.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/tech.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/cv-extraction.ts

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : Méthode de matching et explications.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner les frontières d’accès.

## Diapositive 13

INTERVENANT 2 · 65 secondes

Nous séparons lecture publique, données du candidat et opérations privilégiées. Les vues publiques donnent accès aux métadonnées d'offres publiables, sans exposer les descriptions complètes. La clé publishable est un identifiant d'accès soumis aux permissions et à la RLS, pas un secret d'administration. Pour le profil, l'API vérifie un Bearer avec getUser et propage ce jeton à Supabase. La politique SQL impose auth.uid égal à user_id pour lire comme pour écrire. Le secret de collecte reste dans l'environnement GitHub protégé et les jetons fournisseurs restent côté serveur. La limitation de budget dispose d'une fonction privilégiée étroite qui vérifie l'identité et verrouille la configuration. Les feature flags ou noindex ne sont pas des mécanismes d'autorisation. Les identités email non vérifiées ne doivent jamais accorder un droit organisationnel.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/candidate-server.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/supabase/migrations/20261117205938_virtus_tech_profiles.sql
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/next.config.ts
https://supabase.com/docs/guides/database/postgres/row-level-security

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : Sécurité : rôles et frontières d'accès.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner le déploiement.

## Diapositive 14

INTERVENANT 2 · 65 secondes

Sur chaque push et pull request, GitHub Actions installe les dépendances verrouillées puis exécute typecheck, tests et build. La branche main demande le contrôle verify avant fusion. L'intégration Git Vercel produit des previews pour examiner les branches, puis déploie la production depuis main. L'accueil est statique, tandis que le catalogue et les routes privées exécutent du code serveur. Nous utilisons Node vingt-quatre, Next seize point quatre point cinq et React dix-neuf point trois point un. Le parsing CV nécessite un runtime Node et des fichiers de dépendances matérialisés dans .cv-runtime pour leur inclusion dans le paquet Vercel. La collecte planifiée s'exécute dans GitHub Actions, pas dans les fonctions de consultation Vercel. Les migrations SQL utilisent une connexion opérateur séparée et ne sont pas un effet automatique du déploiement web.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/.github/workflows/checks.yml
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/package.json
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/next.config.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/scripts/prepare-cv-runtime.mjs
https://vercel.com/docs/frameworks/full-stack/nextjs
https://github.com/yassine-yki/VIrtus_mainrepo/actions/runs/45668170363

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : CI/CD, runtime et déploiement Vercel.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner les preuves de test.

## Diapositive 15

INTERVENANT 2 · 70 secondes

La CI de la révision 569fbdf, vérifiée le vingt-cinq novembre, passe quatre-vingt-un tests avec zéro échec. Elle couvre les fonctions de normalisation, les collecteurs avec réponses simulées, les profils, le parsing et le classement. Les tests d'intégration appliquent les migrations dans PostgreSQL embarqué PGlite et vérifient notamment l'isolation RLS et l'atomicité. Le graphique montre une autre mesure : le benchmark title-v1 de classification, sur cent intitulés étiquetés dans le dépôt. Il contient trente-deux titres positifs, dont vingt-cinq reconnus. Les vingt-cinq inclus sont corrects, donc la précision atteint cent pour cent sur cette fixture et le rappel soixante-dix-huit virgule un pour cent. Ce n'est ni une évaluation indépendante ni une mesure de satisfaction des candidats. Le classement CV-offres nécessite encore une évaluation humaine comparée à une baseline.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/tests/tech-validation.test.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/tests/tech-labelled-jobs.json
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/tests/tech-database.test.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/tests/database.test.ts
https://github.com/yassine-yki/VIrtus_mainrepo/actions/runs/45668170363
Exécution locale pnpm test, 2026-11-25 : 81 réussites, 0 échec.

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : Tests et qualité : ce que montrent les résultats.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner les mesures de performance.

## Diapositive 16

INTERVENANT 2 · 65 secondes

Nous avons rapproché les fonctions de la base, puis déplacé la pagination tech en SQL et allégé les assets. Les en-têtes ont montré dub1 après la première release. Chaque route a reçu cinq requêtes séquentielles depuis le même poste. Nous comparons la médiane de réception complète du HTML, pas le chargement visuel. Offres passe de mille trente-cinq à six cent six millisecondes, Tech de mille trois cent soixante-seize à deux cent deux, et Sources de mille cinquante à cent quatre-vingt-dix. Le premier appel est conservé séparément sans prétendre à un cold start. Ces gains couvrent plusieurs releases et ne prouvent pas l’effet isolé de Dublin. Lighthouse donne une mesure visuelle de laboratoire séparée. Aucun de ces résultats ne mesure la capacité simultanée du service. Le benchmark local du classement est conservé en annexe.

SOURCES
docs/presentation/measurements/performance-report-2026-11-25.json
docs/presentation/measurements/performance-baseline.json
docs/presentation/measurements/performance-final.json
https://github.com/yassine-yki/VIrtus_mainrepo/pull/13
https://github.com/yassine-yki/VIrtus_mainrepo/pull/15
https://github.com/yassine-yki/VIrtus_mainrepo/pull/16

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : Performance : mesures HTTP en production.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner le développement assisté.

## Diapositive 17

INTERVENANT 2 · 65 secondes

Nous assumons une réalisation largement assistée par IA. Notre valeur doit pouvoir se montrer dans le cadrage, les arbitrages, l'analyse des erreurs et les critères de validation. Le cycle défendable commence par un objectif et un plan revu, puis de petits changements, des tests et une revue avant fusion. AGENTS.md impose notamment de lire la documentation de la version Next installée. Les skills apportent des procédures spécialisées, mais leur présence ne prouve pas qu'ils ont tous été utilisés historiquement. Les références versionnées, les PR et les journaux CI fournissent une trace plus solide que le souvenir d'un prompt. Pour le choix des modèles de développement, nous expliquerons les critères de difficulté, qualité et coût sans inventer un historique précis. Une compréhension crédible se démontre en retraçant une requête et en expliquant un échec, même sans lecture exhaustive du dépôt.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/AGENTS.md
https://github.com/yassine-yki/VIrtus_mainrepo/pull/16
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/docs/design/fullscreen-entry.md
https://learn.chatgpt.com/docs/customization/overview

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : Développement assisté par agents IA.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner le bilan.

## Diapositive 18

INTERVENANT 2 · 40 secondes

Virtus relie un catalogue multisource à un profil confirmé et à des recommandations expliquées. Nous avons des preuves de tests et de déploiement, mais également des limites opérationnelles visibles. Le dernier workflow consulté, antérieur à la release de performance, présente des échecs Wadifa et Veolia, qu'il faut diagnostiquer sans désactiver les garde-fous. Les prochaines validations portent sur la pertinence avec des candidats consentants, la charge HTTP en préproduction et une suite navigateur automatisée. Enfin, nous devons pouvoir défendre nos décisions indépendamment des agents. Merci. Nous pouvons maintenant ouvrir les annexes sur les sources, les API, la base de données ou la méthode de test.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/actions/runs/45578132719
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/docs/TECH-IMPLEMENTATION-STATUS.md

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : Bilan et prochaines validations.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Merci. Nous ouvrons les annexes selon vos questions.

## Diapositive 19 (annexe)

INTERVENANT 1 · 0 secondes

Annexe à ouvrir sur demande. Les entrées sont celles du registre activé au moment du benchmark. Accor et Accor Hotels sont deux comptes de collecte, pas deux groupes distincts. La publication réelle dépend de l'état de chaque source en base. Les URLs officielles ci-dessous documentent le point de départ employeur, tandis que les endpoints techniques sont dans les adaptateurs et les audits.

SOURCES
Accor : https://careers.accor.com/fr/fr/morocco
Accor Hotels : https://careers.accor.com/fr/fr/morocco
ALTEN : https://careers.smartrecruiters.com/ALTEN
Devoteam : https://www.devoteam.com/fr-ma/jobs/
SQLI : https://careers.smartrecruiters.com/SQLI1
Nuitée : https://job-boards.eu.greenhouse.io/nuitee
Wikimedia Foundation : https://wikimediafoundation.org/jobs/
Inetum : https://www.inetum.com/global/en/careers/jobs.html
Egis Group : https://jobs.egis-group.com/
SOCOTEC : https://careers.smartrecruiters.com/Socotec
Bosch Group : https://careers.smartrecruiters.com/BoschGroup
Veolia : https://careers.smartrecruiters.com/VeoliaEnvironnementSA
SGS : https://careers.smartrecruiters.com/SGS
Wavestone : https://careers.smartrecruiters.com/Wavestone1
Cloudbeds : https://job-boards.greenhouse.io/cloudbeds
Scalian : https://careers.smartrecruiters.com/Scalian
Alter Solutions : https://careers.smartrecruiters.com/AlterSolutions
Artefact : https://job-boards.greenhouse.io/artefactlinkedin
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/sources.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/audited-employers.json
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/tech-employers.json

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : Sources détaillées : ATS (1/2).
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner le détail suivant.

## Diapositive 20 (annexe)

INTERVENANT 1 · 0 secondes

Annexe. La famille html du registre inclut des adaptateurs mixtes, pas uniquement de l'analyse HTML. Capgemini s'appuie sur son API Jobstream et les détails employeurs, CGI sur Njoyn, Cegedim sur DigitalRecruiters. Teamtailor utilise des ensembles d'URLs RSS/sitemap contrôlés. Les sources à distance doivent justifier explicitement l'éligibilité au Maroc. Orange figure dans les audits mais reste désactivé. ReKrute, Emploi.ma, LinkedIn et Indeed ne font pas partie des sources collectées.

SOURCES
Energy Recovery : https://jobs.lever.co/energyrecovery
Wadifa Info : https://www.wadifa-info.com/developpeurs
Himalayas : https://himalayas.app
Yassir : https://jobs.lever.co/Yassir
Theodo : https://jobs.lever.co/theodo
Mindera : https://apply.workable.com/minderacraft/
Infomineo : https://apply.workable.com/infomineo/
Arcsen : https://apply.workable.com/arcsen/
Harmattan AI : https://jobs.ashbyhq.com/harmattan-ai
The Flex : https://jobs.ashbyhq.com/the-flex
SupportYourApp : https://apply.workable.com/supportyourapp/
Capgemini : https://www.capgemini.com/ma-en/job-search/
CGI : https://www.cgi.com/maroc/fr/carrieres
Cegedim : https://careers.cegedim.com/fr
inwi : https://jobs.inwi.ma/jobs
Leyton Maroc : https://leytonglobal-morocco.teamtailor.com/jobs
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/collectors/employer-sites.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/collectors/teamtailor.ts

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : Sources détaillées : flux et employeurs (2/2).
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner le détail suivant.

## Diapositive 21 (annexe)

INTERVENANT 2 · 0 secondes

Contrats tirés des routes du dépôt. GET /api/jobs expose des métadonnées publiques, sous la politique d'export de chaque source. Les filtres répétés, par exemple technology=python&technology=sql, restent acceptés. Le paramètre days=0 signifie toutes dates. Les routes privées exigent le flag candidat et un Bearer validé. La confirmation du profil se fait par PUT, le DELETE efface le profil. GET /api/matches exige un profil enregistré et rend les raisons et les écarts, mais retire le score interne. POST extraction exige un consentement explicite dans x-cv-consent. Cette table documente le code, pas une spécification OpenAPI déjà générée.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/app/api/jobs/route.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/app/api/profile/route.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/app/api/profile/extract/route.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/app/api/matches/route.ts

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : Documentation des API applicatives.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner le détail suivant.

## Diapositive 22 (annexe)

INTERVENANT 2 · 0 secondes

Les codes doivent aider le client sans exposer le fournisseur ni des secrets. La désactivation du pilote renvoie 404, l'absence de jeton 401, un profil manquant pour le matching 409, une charge trop grande 413 et une indisponibilité 503. Les validations de parsing et d'extraction n'utilisent pas toutes le même code : une erreur de lecture du CV est 400, un contexte trop long ou une sortie invalide est 422. La réservation refusée retourne 429. La réponse publique renvoie un tableau jobs, total, page et pageSize, ainsi que le mode et les sources autorisées à l'export. Certaines sources affichables dans l'interface sont exclues de l'API export. Ne jamais montrer une requête contenant un vrai Bearer.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/candidate-server.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/source-policy.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/app/api/profile/extract/route.ts

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : API : erreurs et exemple de requête.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner le détail suivant.

## Diapositive 23 (annexe)

INTERVENANT 2 · 0 secondes

En fonctionnement courant, le SDK supabase-js passe par les services HTTPS de Supabase et l'API PostgREST pour les opérations de données et les RPC. Il ne maintient pas une connexion PostgreSQL directe par visiteur. Les migrations utilisent pg.Client avec une URL opérateur de connexion directe ou de session pooler, et un verrou transactionnel. Les clés de service ont des privilèges élevés et doivent rester limitées à la collecte. La clé publishable n'est pas un secret, mais la RLS et les GRANT restent indispensables. L'API privée vérifie la session puis utilise le jeton utilisateur pour conserver la RLS. L'identité email non vérifiée ne constitue pas une preuve d'appartenance à une organisation.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/catalog.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/candidate-server.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/scripts/migrate.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/supabase/migrations/20261117205938_virtus_tech_profiles.sql
https://supabase.com/docs/guides/database/postgres/row-level-security

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : Accès à la base : HTTPS et droits SQL.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner le détail suivant.

## Diapositive 24 (annexe)

INTERVENANT 1 · 0 secondes

Le schéma listings comporte une unicité source_id et external_id, un group_key, des dates de publication et de présence, active, missing_count, les champs de concours et des métadonnées tech JSONB. Un ajout permet expires_at pour les données Himalayas et documente la couverture partielle dans sync_runs. Les profils ont une révision incrémentée par trigger. Les tables de budget et usage dans virtus_private n'autorisent pas les accès clients directs. Des index existent pour le regroupement, les sources, les villes et la fraîcheur. Un index GIN de texte historique existe également, tandis que la recherche publique doit respecter son périmètre de métadonnées. EXPLAIN ANALYZE reste nécessaire pour vérifier quels index servent réellement chaque requête.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/supabase/migrations/202610250001_catalog.sql
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/supabase/migrations/20261117205938_virtus_tech_profiles.sql
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/supabase/migrations/20261121230612_himalayas_partial_collection.sql

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : Détails du schéma et des index.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner le détail suivant.

## Diapositive 25 (annexe)

INTERVENANT 2 · 0 secondes

La limite du parser est quatre millions d'octets, trente mille caractères et trente pages PDF. Les scans sans texte ne font pas l'objet d'un OCR. La route utilise Node et déclare soixante secondes au maximum. L'adaptateur Cloudflare fixe le modèle Llama 3.3 70B instruct FP8 fast et borne son contexte à vingt-quatre mille tokens. Les caractères et tokens ne sont pas interchangeables. Le serveur refuse un contexte trop long sans troncature silencieuse. Le quota applicatif autorise au maximum cinq réservations par utilisateur et jour UTC avec un plafond mensuel de dix dollars de valeur de calcul réservée, qui ne constitue pas une facture réelle. Les drapeaux et la configuration privée doivent concorder. Le fallback reste manuel, sans bascule automatique vers un fournisseur payant. Les prix et termes doivent être revérifiés avant tout changement de fournisseur.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/cv-parser.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/cv-extraction.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/app/api/profile/extract/route.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/supabase/migrations/20261117205938_virtus_tech_profiles.sql
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/docs/CLOUDFLARE-CV-SETUP.md

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : Extraction : limites et contrôle des coûts.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner le détail suivant.

## Diapositive 26 (annexe)

INTERVENANT 1 · 0 secondes

L'exécution GitHub Actions du vingt-cinq novembre contient trente-quatre jobs de collecte. Trente-deux finissent avec succès, et Wadifa et Veolia échouent. Un job réussi ne signifie pas forcément une importation : par exemple un contrôle de cadence peut ignorer une source. Le résultat global est donc en échec même si la majorité du catalogue se rafraîchit. Les logs et la base doivent servir au diagnostic. Nous ne déduisons pas une panne réseau de ce seul résumé et ne désactivons pas les contrôles de chute suspecte. Le refus de rapprocher un lot échoué protège les anciennes données, mais leur fraîcheur et les dates limites continuent de limiter ce que voient les utilisateurs.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/actions/runs/45578132719
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/scripts/collect.ts

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : État de la collecte et incidents observés.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner le détail suivant.

## Diapositive 27 (annexe)

INTERVENANT 2 · 0 secondes

Ce protocole est proposé, pas un résultat déjà exécuté. Nous n'avons pas trouvé de suite Playwright dédiée dans package.json ou dans les tests du dépôt. Les vérifications documentées passent par un navigateur piloté et des smoke HTTP. Une suite Playwright devrait automatiser navigation clavier, filtres répétés, pagination, retour de détail, viewport mobile et isolement de deux comptes de test. Pour la charge, travailler sur une préproduction isolée avec données synthétiques. Tester séparément catalogue général, catalogue tech, matching et extraction simulée. Augmenter progressivement les utilisateurs simultanés sur une durée fixe, mesurer p50/p95, débit, erreurs, mémoire et requêtes SQL. Un objectif initial comme p95 inférieur à une seconde et moins d'un pour cent d'erreurs doit être annoncé comme cible à valider.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/package.json
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/scripts/smoke-public.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/docs/design/fullscreen-entry.md

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : Tests navigateur et protocole de charge.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner le détail suivant.

## Diapositive 28 (annexe)

INTERVENANT 2 · 0 secondes

La recherche publique tech utilise désormais search_tech_catalog : PostgreSQL filtre, regroupe, compte et renvoie douze offres. La vue évite l’agrégation des sources répétée pour chaque ligne. Les facettes omettent leur propre filtre. get_catalog_source_summary évite une recherche complète pour Sources. Le matching conserve get_tech_catalog : il transfère et classe toutes les offres éligibles en mémoire pour ne pas limiter silencieusement les résultats. Son coût et la concurrence restent à profiler. Les pages publiques restent sans cache de résultats pour préserver immédiatement suspension et expiration. Un cache versionné nécessiterait une stratégie d’invalidation explicite. Les pistes futures comprennent SQL sous volume réaliste, tests de concurrence en préproduction et file bornée pour l’extraction. Elles restent proposées.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/catalog.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/supabase/migrations/20261125172615_paginated_catalog_search.sql
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/matching.ts
docs/technical/Dossier_Technique_Virtus_FR.md §12

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : Montée en charge : limites et évolutions.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner le détail suivant.

## Diapositive 29 (annexe)

INTERVENANT 1 · 0 secondes

Les incidents ne sont pas des détails embarrassants, ils montrent les compromis de conception. La pagination Orange produisait des doublons et un ensemble incomplet : nous avons laissé la source désactivée. Les intitulés ambigus exigent des règles conservatrices pour ne pas classer un comptable comme développeur à cause d'un mot isolé dans la description. Les crashes natifs PDF ont conduit à isoler le parser dans un processus enfant borné. Les chemins symboliques pnpm ne convenaient pas au packaging Vercel, donc le build matérialise le runtime dans un dossier privé. La sortie du modèle utilise parfois des alias de langues : nous normalisons les alias attestés sans accepter de nouvelles compétences non prouvées. Enfin, les changements visuels doivent préserver les filtres et les liens d'origine.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/tech-employers.json
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/cv-parser.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/scripts/prepare-cv-runtime.mjs
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/cv-extraction.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/docs/TECH-IMPLEMENTATION-STATUS.md

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : Difficultés rencontrées et réponses techniques.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner le détail suivant.

## Diapositive 30 (annexe)

INTERVENANT 2 · 0 secondes

L'accès à une page ou une API ne constitue pas à lui seul une autorisation de republier son contenu. La décision de publication enregistrée dans Virtus reste distincte des droits du fournisseur. Les descriptions complètes ne sortent pas dans les réponses publiques, les liens d'origine et les attributions requises sont conservés, et certaines sources interdisent l'export en aval. La vérification des conditions et de robots.txt doit rester une procédure par source, sans prétendre que le code implémente un moteur robots universel. Pour les CV, nous limitons le stockage au profil structuré confirmé, permettons l'édition et la suppression, et demandons le consentement avant le transfert au fournisseur. Les règles de matching n'utilisent pas les noms, mais elles peuvent encore créer des biais via les technologies, l'expérience ou la disponibilité des métadonnées. Aucun audit de conformité ou d'équité complet n'est revendiqué.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/source-policy.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/profile.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/src/lib/matching.ts
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/docs/SOURCES.md
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/docs/CLOUDFLARE-CV-SETUP.md

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : Données, responsabilités et biais.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner le détail suivant.

## Diapositive 31 (annexe)

INTERVENANT 2 · 0 secondes

Cette étude reste à conduire. Recruter un petit panel de personnes consentantes, par exemple dix candidats dans le cadre du pilote, et couvrir plusieurs métiers, expériences et styles de CV. Préparer un ensemble d'offres et demander aux deux membres de l'équipe une annotation indépendante des paires profil-offre, puis examiner les désaccords. Comparer les cinq premières recommandations Virtus à un classement simple par mots-clés, avec les mêmes offres éligibles et le même instantané. Rapporter Precision@5, le nombre de profils sans résultat, les faux négatifs, les erreurs d'extraction et les préférences mal respectées. Séparer un ensemble d'ajustement d'un ensemble de contrôle et ne pas évaluer uniquement sur les exemples utilisés pour écrire les règles. Une petite étude ne permet pas une promesse générale.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/docs/TECH-IMPLEMENTATION-STATUS.md
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/tests/tech-validation.test.ts

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : Évaluer la pertinence avec des candidats.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner le détail suivant.

## Diapositive 32 (annexe)

INTERVENANT 2 · 0 secondes

Décrire seulement le processus que l'équipe peut documenter. Nous proposons de conserver une fiche de décision avec besoin, contraintes, plan accepté, modèle utilisé, skill pertinent, changements, tests et décision humaine. Le plan sert de point de comparaison et doit être révisé si le périmètre change. Les règles de repli comprennent l'arrêt d'un collecteur incomplet, la saisie manuelle si l'extraction échoue et le rollback du déploiement en cas de régression. Les docs de la version installée priment sur les souvenirs d'API. Pour les modèles de développement, expliquer les critères et fournir l'historique réel si disponible, sans attribuer rétroactivement un modèle à toutes les tâches. Les deux membres doivent pouvoir retracer une requête, expliquer une politique SQL et justifier une limite du benchmark. La formule zéro lecture de code est insuffisante pour établir cette compétence.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/AGENTS.md
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/docs/design/fullscreen-entry.md
https://github.com/yassine-yki/VIrtus_mainrepo/pull/16
https://learn.chatgpt.com/docs/customization/overview

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : Agents, skills et maîtrise technique.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner le détail suivant.

## Diapositive 33 (annexe)

INTERVENANT 1 · 0 secondes

Répartition indicative à adapter à vos contributions réelles. Le premier intervenant présente les diapositives un à neuf, soit environ huit minutes trente-cinq. Le second présente dix à dix-huit, soit environ neuf minutes vingt-cinq. Les dix-huit minutes excluent les questions. Répéter avec un chronomètre et couper une explication secondaire plutôt qu'accélérer la diction. Les annexes restent accessibles sans être déroulées. Préparer les réponses aux questions : où est l'IA, que contient le score, pourquoi une source est désactivée, comment la RLS protège un profil, pourquoi les résultats de charge ne prouvent pas la capacité utilisateur et comment l'équipe maîtrise un code généré. Adapter les rôles aux contributions réelles et au règlement de l'université concernant la déclaration d'usage de l'IA.

SOURCES
https://github.com/yassine-yki/VIrtus_mainrepo/pull/16
https://github.com/yassine-yki/VIrtus_mainrepo/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/README.md

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : Répartition orale et questions du jury.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner le détail suivant.

## Diapositive 34 (annexe)

INTERVENANT 2 · 0 secondes

Le dossier technique est la source de vérité de cette révision. Le code applicatif correspond à main 569fbdf, vérifié par le run CI 45668170363 et un déploiement Vercel réussi. Le run de collecte 45578132719, à une révision antérieure, contient trente-deux succès et deux échecs. Il ne vérifie pas le rafraîchissement de la nouvelle release. Les quatre-vingt-un tests et la parité de vingt-quatre scénarios sont documentés dans les preuves jointes. Les timings HTTP et Lighthouse sont datés du 25 novembre. Le benchmark de fonction de ce matin reste distinct. Aucun test de charge ni relecture humaine de pertinence n’est présenté comme acquis. Le modèle de développement historique et les contributions individuelles ne sont pas inventés. Les captures ne contiennent que des annonces publiques.

SOURCES
docs/technical/Dossier_Technique_Virtus_FR.md
https://github.com/yassine-yki/VIrtus_mainrepo/actions/runs/45668170363
https://github.com/yassine-yki/VIrtus_mainrepo/actions/runs/45578132719
docs/presentation/measurements/performance-report-2026-11-25.json

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : Références et périmètre des preuves.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner le détail suivant.

## Diapositive 35 (annexe)

INTERVENANT 2 · 0 secondes

Mesure historique du 25 novembre à 08:17 UTC, Node v24.22.3. Un processus, offres synthétiques préclassifiées et identiques. Dix échauffements et cinquante mesures séquentielles par volume. p95 calculé avec le rang documenté dans benchmark.ts, pas un intervalle de confiance. À dix mille offres : p50 39,57 ms et p95 41,91 ms. Aucun réseau, SQL, LLM ou utilisateur concurrent. Ce résultat ne représente donc pas la capacité du service. Le script et les données brutes sont joints. Les graphiques Matplotlib reproduisent les mêmes valeurs.

SOURCES
docs/presentation/measurements/benchmark.json
docs/presentation/measurements/benchmark.ts
docs/presentation/scripts/plots.py

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : Benchmark local du classement.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner le détail suivant.

## Diapositive 36 (annexe)

INTERVENANT 1 · 0 secondes

Captures réelles de la production du 25 novembre, sans candidat identifiable. À gauche le catalogue compact à 390 px. Le premier emploi commence à 883 px du haut du document, hors de la capture de 844 px. À droite le détail après recherche Java et le lien d’origine visible à environ 540 px. Les captures démontrent l’état de l’interface à cette date. En panne réseau, expliquer le filtrage, le retour et le lien d’origine sans simuler une action. Le volet candidat est expliqué par la séquence et le profil synthétique, pas par une fausse capture de résultat. Les captures servent de secours déjà disponible. Une vidéo reste optionnelle et n’a pas été enregistrée.

SOURCES
docs/presentation/screenshots/performance-mobile-catalog.png
docs/presentation/screenshots/performance-mobile-detail.png
docs/presentation/measurements/performance-report-2026-11-25.json

DOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.
POINT TECHNIQUE : Secours hors ligne : parcours mobile.
CLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.
TRANSITION : Nous pouvons maintenant examiner le détail suivant.
