import fs from "node:fs/promises";
import path from "node:path";
import {pathToFileURL,fileURLToPath} from "node:url";
const runtimeModules=process.env.VIRTUS_RUNTIME_MODULES || "C:/Users/nabil/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules";
const {Presentation,PresentationFile}=await import(pathToFileURL(path.join(runtimeModules,"@oai/artifact-tool/dist/artifact_tool.mjs")).href);
const scriptDir=path.dirname(fileURLToPath(import.meta.url));
const root=path.resolve(scriptDir,"../.build");
await fs.mkdir(root,{recursive:true});
for(const name of ["performance-mobile-catalog.png","performance-mobile-detail.png","performance-desktop-catalog.png"]) await fs.copyFile(path.join(scriptDir,"../screenshots",name),path.join(root,name));
const workspaceDir=path.resolve(root,"..");
const out=path.join(workspaceDir,"output");
const S="C:/Users/nabil/.codex/plugins/cache/openai-primary-runtime/presentations/26.1123.11515/skills/presentations";
const PY="C:/Users/nabil/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe";
const p=Presentation.create({slideSize:{width:1280,height:720}});
const C={bg:"#F7F5EF",ink:"#182D2B",green:"#1B6860",gold:"#D68B43",muted:"#536764",light:"#D8DEDA",red:"#B74A3B",white:"#FFFFFF"};
const repo="https://github.com/yassine-yki/VIrtus_mainrepo";
const ref=repo+"/blob/569fbdfab90888e8e0c4bda3d8e8c96f30f1c653/";
const bench=JSON.parse(await fs.readFile(path.join(scriptDir,"../measurements/benchmark.json"),"utf8"));
let count=0;
function text(s,t,x,y,w,h,size=27,color=C.ink,bold=false,align="left"){
const z=s.shapes.add({geometry:"textbox",position:{left:x,top:y,width:w,height:h},fill:"none",line:{fill:"none",width:0}});
z.text=t;z.text.style={typeface:"Arial",fontSize:size,color,bold,alignment:align,verticalAlignment:"top",insets:0,autoFit:"none",wrap:"square"};return z;
}
function line(s,x,y,w,h=0,color=C.light,width=1,dash="solid"){return s.shapes.add({geometry:"connector",kind:"straight",position:{left:x,top:y,width:w,height:h},line:{fill:color,width,style:dash}});}
function arrow(s,x1,y1,x2,y2,color=C.green,dash="solid"){
const x=Math.min(x1,x2),y=Math.min(y1,y2);return s.shapes.add({geometry:"connector",kind:"straight",position:{left:x,top:y,width:Math.abs(x2-x1),height:Math.abs(y2-y1),horizontalFlip:x2<x1,verticalFlip:y2<y1},line:{fill:color,width:2,style:dash},tail:{type:"triangle",width:"med",length:"med"}});
}
function node(s,t,x,y,w=230,h=95,fill=C.bg,size=25){
const z=s.shapes.add({geometry:"rect",position:{left:x,top:y,width:w,height:h},fill,line:{fill:C.green,width:1.4}});
z.text=t;z.text.style={typeface:"Arial",fontSize:size,color:C.ink,alignment:"center",verticalAlignment:"middle",insets:12,autoFit:"none"};return z;
}
function connect(s,a,b,from="right",to="left",dash="solid"){s.shapes.connect(a,b,{kind:"elbow",fromSide:from,toSide:to,line:{fill:C.green,width:2,style:dash},tail:{type:"triangle",width:"med",length:"med"}});}
function slide(title,speaker,sec,notes,sources=[],dark=false){
const s=p.slides.add();s.background.fill=dark?C.ink:C.bg;count++;
if(title)text(s,title,64,48,1152,110,44,dark?C.white:C.ink,true);
text(s,String(count).padStart(2,"0")+(count<=18?" / 18":" · ANNEXE"),1120,676,100,22,15,dark?C.light:C.muted,false,"right");
s.speakerNotes.text="INTERVENANT "+speaker+" · "+sec+" secondes\n\n"+notes+"\n\nSOURCES\n"+sources.join("\n")+"\n\nDOSSIER SOURCE : docs/technical/Dossier_Technique_Virtus_FR.md, révision 25/11/2026.\nPOINT TECHNIQUE : "+title+".\nCLICS : les blocs numérotés apparaissent au clic et restent visibles. Diagrammes et tableaux restent complets.\nTRANSITION : "+(count===9?"Je passe la parole à Intervenant 2 pour les interactions et le parcours candidat.":count===18?"Merci. Nous ouvrons les annexes selon vos questions.":"Nous pouvons maintenant examiner "+({1:"le problème et le périmètre",2:"le parcours utilisateur",3:"les chemins des données",4:"les méthodes de collecte",5:"les contrôles de fiabilité",6:"les relations en base",7:"les interfaces métier",8:"le cycle de vie des annonces",10:"l’import du CV",11:"le classement des offres",12:"les frontières d’accès",13:"le déploiement",14:"les preuves de test",15:"les mesures de performance",16:"le développement assisté",17:"le bilan"}[count]||"le détail suivant")+".");
return s;
}
function foot(s,t){text(s,t,64,640,1120,35,16,C.muted);}
function list(s,items,x=64,y=195,w=1115,gap=94,size=29){
items.forEach((v,i)=>{const a=text(s,String(i+1).padStart(2,"0"),x,y+i*gap,50,45,22,C.green,true);const b=text(s,v,x+66,y+i*gap,w-66,gap-10,size);a.name="reveal-"+(i+1);b.name="reveal-"+(i+1);});
}
function para(s,head,body,x,y,w=510){text(s,head,x,y,w,43,29,C.green,true);text(s,body,x,y+56,w,150,27);}
async function image(s,file,x,y,w,h){const b=await fs.readFile(path.join(root,file));s.images.add({blob:b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),contentType:"image/png",alt:file,fit:"contain",position:{left:x,top:y,width:w,height:h}});}
function table(s,values,widths,x=64,y=183,w=1152,h=395,font=24){
const t=s.tables.add({rows:values.length,columns:values[0].length,left:x,top:y,width:w,height:h,columnWidths:widths,values});
t.borders.assign({fill:C.light,width:1,style:"solid"});
for(let r=0;r<values.length;r++)for(let c=0;c<values[0].length;c++){let q=t.getCell(r,c);q.fill=r===0?C.green:C.bg;q.text.style={typeface:"Arial",fontSize:font,color:r===0?C.white:C.ink,bold:r===0,insets:10,verticalAlignment:"middle"};}
return t;
}

function chart(s,categories,series,x,y,w,h,unit,max){
return s.charts.add("bar",{position:{left:x,top:y,width:w,height:h},categories,series,
barOptions:{direction:"column",grouping:"clustered",gapWidth:100},hasLegend:series.length>1,
legend:{position:"bottom",textStyle:{typeface:"Arial",fontSize:20,color:C.ink}},
xAxis:{textStyle:{typeface:"Arial",fontSize:20,color:C.ink}},
yAxis:{minimumScale:0,maximumScale:max,numberFormatCode:'0" '+unit+'"',textStyle:{typeface:"Arial",fontSize:18,color:C.muted}},
dataLabels:{showValue:true,position:"outEnd",numberFormatCode:unit==="%"?'0.0" %"':'0.0',textStyle:{typeface:"Arial",fontSize:19,color:C.ink}},
chartFill:C.bg,chartLine:{fill:"none",width:0},plotAreaFill:C.bg});}

const timings=[20,55,70,65,60,70,65,45,65,55,70,70,65,65,70,65,65,40];

{
const s=slide("",1,20,"Bonjour. Nous présentons Virtus, un catalogue d’opportunités au Maroc avec des correspondances expliquées. Nous suivrons les données, de leur collecte à leur consultation, puis le parcours candidat et les preuves de validation. Notre présentation dure dix-huit minutes.",[repo+"/pull/16"],true);
text(s,"VIRTUS",64,112,1100,135,105,C.white,true);
text(s,"Trouver des opportunités au Maroc\net comprendre leur adéquation à un profil",70,298,1090,150,40,C.white);
text(s,"Soutenance technique · Équipe de deux personnes",70,542,1090,50,25,C.light);
text(s,"25 novembre 2026",70,603,800,35,21,C.gold);
}
{
const s=slide("Problème, objectifs et périmètre",1,55,"Le problème de départ est concret : un candidat consulte plusieurs sites, retrouve parfois les mêmes annonces et doit comparer manuellement les exigences avec son parcours. Nous ciblons la découverte d'opportunités au Maroc et les offres à distance dont l'éligibilité au Maroc est explicite. Virtus centralise les faits utiles et conserve la candidature sur la source d'origine. Le parcours candidat ajoute un profil confirmé et des correspondances expliquées. Nous ne cherchons pas à remplacer un recruteur ni à envoyer automatiquement des candidatures. Les grands portails sont des repères de marché, mais nous ne revendiquons pas une fonctionnalité exclusive. Le positionnement repose sur le périmètre marocain et la traçabilité. Révéler les trois blocs au clic.",[ref+"README.md",ref+"src/lib/matching.ts"]);
list(s,["Des offres dispersées, des doublons et une comparaison du profil à refaire à chaque visite.","Un catalogue filtrable et un classement expliqué pour les profils candidats confirmés.","Périmètre : Maroc et remote éligible. Candidature sur la source, sans décision de recrutement automatique."],64,190,1135,128,30);
}
{
const s=slide("Parcours de démonstration",1,70,"Montrer l’accueil puis Tech. Conserver les trente derniers jours, appliquer une technologie, ouvrir le détail et revenir avec les filtres. La capture de production du 25 novembre montre le vrai catalogue. Pour le profil, utiliser exclusivement des informations synthétiques : accord explicite, import si disponible, confirmation, puis explications. L’accès visible au profil ne démontre pas la disponibilité du fournisseur. Le secours hors ligne est déjà inclus en annexe avec les captures mobile et détail. Le pilotage réel de l’extraction, les comptes et les quotas doivent être vérifiés avant la soutenance. Aucun appel payant ou candidature ne fait partie de cette démonstration.",["docs/technical/Dossier_Technique_Virtus_FR.md §2 et §15","Capture réelle de production, 25/11/2026",ref+"src/app/api/profile/extract/route.ts"]);
await image(s,"performance-desktop-catalog.png",55,180,800,400);
list(s,["Filtrer et ouvrir une offre","Revenir avec les critères","Confirmer un profil synthétique"],890,210,320,113,26);
foot(s,"Capture réelle du 25/11/2026. Secours hors ligne : annexe mobile. Aucun CV personnel projeté.");
}

{
const s=slide("Architecture et flux des données",1,65,"La collecte et la consultation sont deux chemins distincts. GitHub Actions contacte les sources à intervalles planifiés, puis un adaptateur valide et normalise chaque lot avant une écriture atomique dans PostgreSQL. Une visite du catalogue n'entraîne donc pas une nouvelle collecte des sites externes. Vercel sert l'accueil statique, les pages dynamiques et les routes API Next.js. L'application utilise le SDK Supabase sur HTTPS et appelle des fonctions SQL ou des tables sous RLS. Le navigateur reçoit les faits publics et, après authentification, les données de son propriétaire. Cette séparation limite le couplage aux sites sources et nous donne une frontière claire pour les secrets.",[ref+"scripts/collect.ts",ref+"src/lib/catalog.ts",ref+".github/workflows/collect.yml"]);
const a=node(s,"Sites employeurs\nAPI, HTML, RSS",65,192,255,100);
const b=node(s,"GitHub Actions\nCollecteurs TypeScript",460,192,310,100);
const c=node(s,"Supabase\nPostgreSQL + Auth",925,192,290,100);
connect(s,a,b);connect(s,b,c);
const d=node(s,"Navigateur\nReact + DOM",65,420,255,100);
const e=node(s,"Vercel\nNext.js + routes API",460,420,310,100);
connect(s,d,e);connect(s,e,c,"right","bottom");
text(s,"Collecte périodique",65,155,450,35,23,C.green,true);
text(s,"Consultation à la demande",65,375,600,35,23,C.green,true);
foot(s,"Le catalogue stocké découple l'expérience utilisateur de la disponibilité instantanée des sources.");
}
{
const s=slide("Sources : plusieurs modes de collecte",1,60,"Nous ne devons pas appeler toutes les sources du scraping HTML. SmartRecruiters, Greenhouse, Lever, Workable et Ashby fournissent des réponses structurées. Les adaptateurs employeurs combinent une API et parfois les pages de détail : Capgemini, CGI via Njoyn et Cegedim via DigitalRecruiters. inwi et Leyton utilisent des flux et des sitemaps Teamtailor. Wadifa Info apporte les concours et Himalayas la découverte remote. Le registre local contient trente-quatre entrées activées, pas nécessairement trente-quatre entreprises distinctes et pas une garantie de publication courante. La base reste l'autorité pour l'activation et l'approbation. Orange demeure désactivé faute de pagination validée. La liste complète figure en annexe.",[ref+"src/lib/sources.ts",ref+"src/lib/tech-employers.json",ref+"src/lib/expanded-employers.json",ref+"src/collectors/employer-sites.ts"]);
list(s,["API ATS : Accor, ALTEN, Devoteam, Nuitée et d'autres employeurs via des connecteurs partagés.","Adaptateurs dédiés : Capgemini, CGI et Cegedim. RSS/sitemaps : inwi et Leyton.","Flux spécialisés : Wadifa Info et Himalayas. Orange reste désactivé. LinkedIn et Indeed ne sont pas collectés."],64,185,1135,124,29);
foot(s,"34 entrées activées dans le registre local. Autorisations et publication restent contrôlées en base.");
}
{
const s=slide("Collecte : validation avant synchronisation",1,70,"Le workflow demande une collecte toutes les six heures, à la minute dix-sept, mais GitHub peut retarder l'exécution. La matrice lance au maximum deux sources à la fois et isole leurs échecs. Himalayas applique en plus une cadence quotidienne. Les appels imposent HTTPS, une liste d'hôtes autorisés, un délai maximal de vingt-cinq secondes et des reprises bornées qui respectent Retry-After. Les collecteurs vérifient pagination, totaux, identifiants et éligibilité géographique. Nous nettoyons le HTML, normalisons les villes et les contrats, retirons les paramètres de suivi et calculons des clés stables. Une réponse partielle ou une chute suspecte conserve les données antérieures. Cette approche accepte de signaler un échec plutôt que de fermer abusivement des offres.",[ref+".github/workflows/collect.yml",ref+"src/collectors/http.ts",ref+"src/lib/normalize.ts",ref+"scripts/collect.ts"]);
list(s,["Déclenchement planifié : toutes les 6 h, deux sources en parallèle au maximum.","Contrôles : pagination, doublons, pays éligible, URLs HTTPS et dates d'origine.","Nettoyage et clés stables, puis transaction par source. En cas de lot invalide, conservation des données précédentes."],64,185,1135,124,29);
foot(s,"Déduplication : identifiant source/externe et regroupement par entreprise + URL canonique.");
}
{
const s=slide("Structure de la base de données",1,65,"Voici un modèle relationnel simplifié, dérivé des migrations. Une source possède plusieurs annonces et plusieurs journaux de synchronisation. Chaque annonce conserve son identifiant externe, sa clé de regroupement, les dates de présence et ses métadonnées. Supabase Auth gère les utilisateurs, et chaque utilisateur possède au plus un profil candidat stocké en JSONB avec sa révision. Nous n'avons pas de table permanente de correspondances : le serveur calcule le classement à la demande. Les données de budget et de consommation de l'extraction résident dans un schéma privé, montré en annexe. Nous séparons les vues publiques des descriptions importées réservées à l'opérateur. Les index facilitent la recherche et les filtres, mais ils ne démontrent pas à eux seuls la capacité sous charge.",[ref+"supabase/migrations/202610250001_catalog.sql",ref+"supabase/migrations/20261117205938_virtus_tech_profiles.sql",ref+"supabase/migrations/202610250004_public_metadata.sql"]);
const a=node(s,"sources\nPK id\nprovider, enabled\npublication_status",65,185,300,165,C.bg,25);
const b=node(s,"listings\nPK id · FK source_id\nexternal_id, group_key\ntech, dates, active",515,185,325,165,C.bg,25);
connect(s,a,b);text(s,"1",385,230,25,30,22);text(s,"0..*",458,230,55,30,22);
const c=node(s,"sync_runs\nPK id · FK source_id\nstatus, count, error",65,435,300,135,C.bg,25);connect(s,a,c,"bottom","top");text(s,"1 / 0..*",235,370,140,30,21);
const u=node(s,"auth.users\nPK id",925,185,290,100,C.bg,26);
const cp=node(s,"candidate_profiles\nPK/FK user_id\nprofile JSONB, revision",925,435,290,135,C.bg,25);
connect(s,u,cp,"bottom","top");text(s,"1 / 0..1",1110,355,100,30,22);
text(s,"Correspondances calculées à la demande",515,425,310,105,29,C.green,true);
foot(s,"Modèle simplifié. Tables privées de budget, vues et index détaillés en annexe.");
}
{
const s=slide("UML de classes : modèle du domaine",1,45,"Le projet utilise surtout des fonctions et des interfaces TypeScript. Nous présentons donc les interfaces métier avec une notation UML de classes, sans prétendre qu'il existe un ORM ou des classes équivalentes à chaque table. CandidateProfile contient des préférences, chacune avec des valeurs et un indicateur obligatoire. Job porte les métadonnées TechMetadata. La fonction de matching produit un résultat Match qui référence l'offre et expose des explications. La distinction entre entités persistées et objets calculés empêche de confondre le modèle de code avec le modèle de base. Le score est interne au classement et n'est pas renvoyé dans la réponse paginée.",[ref+"src/lib/profile.ts",ref+"src/lib/types.ts",ref+"src/lib/tech.ts",ref+"src/lib/matching.ts"]);
const a=node(s,"«interface»\nCandidateProfile\nskills, languages, years\npreferences",65,190,340,160,C.bg,25);
const b=node(s,"«interface»\nPreference\nvalues[]\nmandatory: boolean",65,425,340,150,C.bg,25);
s.shapes.connect(a,b,{kind:"straight",fromSide:"bottom",toSide:"top",line:{fill:C.green,width:2},head:{type:"diamond",width:"med",length:"med"}});text(s,"5 préférences",255,365,210,32,21,C.muted);
const c=node(s,"«interface» Job\ntitle, dates, source\ntech: TechMetadata",865,190,350,160,C.bg,25);
const d=node(s,"«résultat calculé» Match\njob, score\nreasons, gaps\nconflicts, unknowns",485,425,390,160,C.bg,25);
connect(s,a,d,"right","left");connect(s,c,d,"bottom","right");
text(s,"matchJob(profile, job)",480,230,320,70,28,C.green,true);
foot(s,"Diagramme UML simplifié des interfaces et des dépendances fonctionnelles.");
}
{
const s=slide("UML d'états : présence et visibilité d'une offre",1,65,"Cette machine d'états résume le cycle standard des sources complètes. Une collecte réussie crée ou rafraîchit une offre active. Si l'offre manque lors d'un premier lot complet, nous augmentons le compteur sans la fermer immédiatement. La fermeture demande deux absences dans des lots réussis et au moins vingt-quatre heures depuis la dernière présence. Un échec de collecte ne déclenche jamais ce rapprochement. Indépendamment de cet état, les lectures masquent les données non revues depuis soixante-douze heures, les sources suspendues et les concours dont la date limite est dépassée. Himalayas suit une règle distincte : une absence dans son flux partiel ne vaut pas fermeture. Cette nuance est essentielle pour éviter qu'une source indisponible ne fasse disparaître artificiellement le catalogue.",[ref+"supabase/migrations/202610250001_catalog.sql",ref+"supabase/migrations/20261121230612_himalayas_partial_collection.sql",ref+"src/lib/source-policy.ts"]);
const a=node(s,"Active\nprésence confirmée",65,220,300,110);
const b=node(s,"Active\nabsence constatée",490,220,300,110);
const c=node(s,"Inactive\nfermeture confirmée",915,220,300,110);
a.geometry="roundRect";b.geometry="roundRect";c.geometry="roundRect";connect(s,a,b);connect(s,b,c);
text(s,"1 lot complet sans l'offre",83,365,350,60,24,C.muted);
text(s,"≥ 2 absences réussies\net ≥ 24 h depuis la présence",490,365,395,85,24,C.muted);
text(s,"Nouvelle présence",560,492,360,40,26,C.green,true);arrow(s,1065,465,40,465);line(s,40,275,0,190,C.green,2);arrow(s,40,275,65,275);line(s,1065,335,0,130,C.green,2);
foot(s,"Masquage indépendant : fraîcheur > 72 h, suspension ou délai concours. Exception Himalayas : absence ≠ fermeture.");
}

{
const s=slide("DOM et interactions côté client",2,55,"React transforme l'état de l'interface en mises à jour du DOM. Pour le changement de fond au survol ou au focus, useState et useRef contrôlent la catégorie active et ignorent une image arrivée en retard. Ce comportement ne demande pas de rechargement de document. Les liens Next.js permettent les transitions entre routes et les écrans loading donnent un retour visuel. Cela ne signifie pas que tout le catalogue est filtré dans le navigateur : les pages et routes API interrogent le serveur. Les filtres restent dans l'URL pour conserver le contexte, le retour depuis un détail et le partage. L'accueil statique ne dépend plus d'une requête catalogue. Nous devons distinguer interaction sans rechargement complet, requête réseau et absence de JavaScript. Révéler les trois blocs au clic.",[ref+"src/components/category-navigation.tsx",ref+"src/app/offres/loading.tsx",ref+"src/app/page.tsx",ref+"src/lib/search.ts"]);
list(s,["État React et DOM : survol, focus clavier et images se mettent à jour localement.","Navigation Next.js : transitions entre routes et retour visuel pendant le chargement.","Filtres dans l'URL et recherche serveur : une transition fluide peut encore effectuer une requête réseau."],64,185,1135,126,30);
foot(s,"Les liens et formulaires natifs conservent un parcours de base sans JavaScript.");
}
{
const s=slide("UML de séquence : import du CV",2,70,"La séquence sépare les responsabilités. Le navigateur transmet le CV avec le jeton de session et le consentement. La route privée valide l'utilisateur auprès de Supabase Auth, puis parse le PDF texte ou le DOCX dans des limites strictes. Elle réserve atomiquement un quota en base avant l'appel au fournisseur. Le modèle retourne un profil structuré, que le serveur contrôle contre le schéma et les éléments présents dans le CV. Le navigateur reçoit un brouillon marqué needsConfirmation. Le candidat peut le corriger puis l'enregistrer par PUT. C'est cette dernière action qui persiste le profil confirmé, pas l'extraction elle-même. Le fichier original et le texte intégral ne sont pas stockés par l'application. Si le fournisseur n'est pas disponible, la saisie manuelle reste possible.",[ref+"src/app/api/profile/extract/route.ts",ref+"src/lib/candidate-server.ts",ref+"src/lib/cv-extraction.ts",ref+"src/app/api/profile/route.ts"]);
const xs=[145,480,820,1120], labs=["Candidat / DOM","API Next.js","Supabase","Modèle Llama"];
labs.forEach((l,i)=>{node(s,l,xs[i]-120,170,240,65,C.bg,24);line(s,xs[i],240,0,345,C.light,1,"dashed");});
function msg(i,j,y,label,ret=false){arrow(s,xs[i],y,xs[j],y,ret?C.muted:C.green,ret?"dashed":"solid");text(s,label,Math.min(xs[i],xs[j])+12,y-35,Math.abs(xs[j]-xs[i])-16,33,22,C.ink);}
msg(0,1,285,"1. CV + JWT + accord");
msg(1,2,340,"2. Session et quota");
msg(1,3,400,"3. Texte borné");
msg(3,1,460,"4. JSON à valider",true);
msg(1,0,520,"5. Brouillon à confirmer",true);
msg(0,1,580,"6. PUT profil confirmé");
text(s,"L'API persiste alors le profil sous RLS.",650,570,560,50,23,C.green,true);
foot(s,"Parsing transitoire. Le consentement à l'extraction ne remplace pas la confirmation du profil.");
}
{
const s=slide("Méthode de matching et explications",2,70,"L'IA intervient dans l'extraction structurée du CV. La classification des offres et le classement utilisent des règles déterministes. Une offre doit être active, tech, fraîche et compatible avec les contraintes obligatoires. L'ancrage métier exige une famille ciblée ou au moins deux technologies communes. Le score additionne quarante points pour une famille commune, jusqu'à trente-cinq pour la couverture des technologies, quinze pour le niveau souhaité et jusqu'à dix pour les langues requises. Ces poids sont des choix de conception et n'ont pas été appris sur des décisions de recrutement. Ils servent au tri et ne sont pas une probabilité d'embauche. Le résultat distingue raisons positives, compétences absentes du profil, conflits de préférence et informations inconnues. Une donnée inconnue n'autorise pas une affirmation sur le candidat.",[ref+"src/lib/matching.ts",ref+"src/lib/tech.ts",ref+"src/lib/cv-extraction.ts"]);
[["40","Famille métier"],["35","Technologies"],["15","Niveau"],["10","Langues"]].forEach(([score,label],i)=>{text(s,score,64+i*291,182,250,100,76,C.green,true);text(s,label,64+i*291,290,255,60,28,C.muted);});
list(s,["Éligibilité avant score : fraîcheur, famille ciblée ou ≥ 2 technologies communes, contraintes obligatoires.","Classement déterministe avec raisons, écarts, conflits et inconnues. Score interne au serveur."],64,398,1135,104,28);
foot(s,"Poids heuristiques, sans apprentissage supervisé. Le score n'est pas une probabilité d'embauche.");
}
{
const s=slide("Sécurité : rôles et frontières d'accès",2,65,"Nous séparons lecture publique, données du candidat et opérations privilégiées. Les vues publiques donnent accès aux métadonnées d'offres publiables, sans exposer les descriptions complètes. La clé publishable est un identifiant d'accès soumis aux permissions et à la RLS, pas un secret d'administration. Pour le profil, l'API vérifie un Bearer avec getUser et propage ce jeton à Supabase. La politique SQL impose auth.uid égal à user_id pour lire comme pour écrire. Le secret de collecte reste dans l'environnement GitHub protégé et les jetons fournisseurs restent côté serveur. La limitation de budget dispose d'une fonction privilégiée étroite qui vérifie l'identité et verrouille la configuration. Les feature flags ou noindex ne sont pas des mécanismes d'autorisation. Les identités email non vérifiées ne doivent jamais accorder un droit organisationnel.",[ref+"src/lib/candidate-server.ts",ref+"supabase/migrations/20261117205938_virtus_tech_profiles.sql",ref+"next.config.ts","https://supabase.com/docs/guides/database/postgres/row-level-security"]);
list(s,["Public : clé publishable, permissions de colonnes, vues security_invoker et RLS de visibilité.","Candidat : Bearer vérifié, propriété auth.uid() = user_id, réponses privées sans cache.","Opérateur : secret de collecte dans GitHub, jetons IA côté serveur et quota atomique."],64,185,1135,126,29);
foot(s,"Noindex, protections de preview et feature flags complètent les contrôles. Ils ne remplacent pas la RLS.");
}
{
const s=slide("CI/CD, runtime et déploiement Vercel",2,65,"Sur chaque push et pull request, GitHub Actions installe les dépendances verrouillées puis exécute typecheck, tests et build. La branche main demande le contrôle verify avant fusion. L'intégration Git Vercel produit des previews pour examiner les branches, puis déploie la production depuis main. L'accueil est statique, tandis que le catalogue et les routes privées exécutent du code serveur. Nous utilisons Node vingt-quatre, Next seize point quatre point cinq et React dix-neuf point trois point un. Le parsing CV nécessite un runtime Node et des fichiers de dépendances matérialisés dans .cv-runtime pour leur inclusion dans le paquet Vercel. La collecte planifiée s'exécute dans GitHub Actions, pas dans les fonctions de consultation Vercel. Les migrations SQL utilisent une connexion opérateur séparée et ne sont pas un effet automatique du déploiement web.",[ref+".github/workflows/checks.yml",ref+"package.json",ref+"next.config.ts",ref+"scripts/prepare-cv-runtime.mjs","https://vercel.com/docs/frameworks/full-stack/nextjs",repo+"/actions/runs/45668170363"]);
list(s,["Push / PR : dépendances verrouillées, typecheck, tests et build. Revue dans une preview Vercel.","Fusion sur main : déploiement de production. Accueil statique et routes serveur dynamiques.","Fonctions Vercel à Dublin (dub1), près de Supabase. Migrations et collecte restent séparées."],64,185,1135,126,29);
foot(s,"Production : 569fbdf, CI verte et déploiement Vercel réussi. Les previews gardent leur protection.");
}
{
const s=slide("Tests et qualité : ce que montrent les résultats",2,70,"La CI de la révision 569fbdf, vérifiée le vingt-cinq novembre, passe quatre-vingt-un tests avec zéro échec. Elle couvre les fonctions de normalisation, les collecteurs avec réponses simulées, les profils, le parsing et le classement. Les tests d'intégration appliquent les migrations dans PostgreSQL embarqué PGlite et vérifient notamment l'isolation RLS et l'atomicité. Le graphique montre une autre mesure : le benchmark title-v1 de classification, sur cent intitulés étiquetés dans le dépôt. Il contient trente-deux titres positifs, dont vingt-cinq reconnus. Les vingt-cinq inclus sont corrects, donc la précision atteint cent pour cent sur cette fixture et le rappel soixante-dix-huit virgule un pour cent. Ce n'est ni une évaluation indépendante ni une mesure de satisfaction des candidats. Le classement CV-offres nécessite encore une évaluation humaine comparée à une baseline.",[ref+"tests/tech-validation.test.ts",ref+"tests/tech-labelled-jobs.json",ref+"tests/tech-database.test.ts",ref+"tests/database.test.ts",repo+"/actions/runs/45668170363","Exécution locale pnpm test, 2026-11-25 : 81 réussites, 0 échec."]);
chart(s,["Précision","Rappel"],[{name:"title-v1 (%)",values:[100,78.125],fill:C.green}],55,200,760,390,"%",100);
text(s,"81 / 81",865,195,330,85,66,C.green,true);
text(s,"tests unitaires et\nd’intégration réussis\n25/11/2026",870,295,330,105,26);
text(s,"Fixture de 100 titres\n32 positifs, 25 reconnus\n0 faux positif, 7 manqués",870,425,340,135,25,C.muted);
foot(s,"Classification d'intitulés seulement. La pertinence du matching candidat reste à évaluer séparément.");
}
{
const s=slide("Performance : mesures HTTP en production",2,65,"Nous avons rapproché les fonctions de la base, puis déplacé la pagination tech en SQL et allégé les assets. Les en-têtes ont montré dub1 après la première release. Chaque route a reçu cinq requêtes séquentielles depuis le même poste. Nous comparons la médiane de réception complète du HTML, pas le chargement visuel. Offres passe de mille trente-cinq à six cent six millisecondes, Tech de mille trois cent soixante-seize à deux cent deux, et Sources de mille cinquante à cent quatre-vingt-dix. Le premier appel est conservé séparément sans prétendre à un cold start. Ces gains couvrent plusieurs releases et ne prouvent pas l’effet isolé de Dublin. Lighthouse donne une mesure visuelle de laboratoire séparée. Aucun de ces résultats ne mesure la capacité simultanée du service. Le benchmark local du classement est conservé en annexe.",["docs/presentation/measurements/performance-report-2026-11-25.json","docs/presentation/measurements/performance-baseline.json","docs/presentation/measurements/performance-final.json",repo+"/pull/13",repo+"/pull/15",repo+"/pull/16"]);
chart(s,["Offres","Tech","Sources"],[{name:"Avant",values:[1035,1376,1050],fill:C.gold},{name:"Après",values:[606,202,190],fill:C.green}],55,185,800,420,"ms",1600);
text(s,"−41 %",900,210,300,90,62,C.green,true);
text(s,"médiane /offres\n5 requêtes par route\n25 novembre 2026",900,315,300,140,27);
text(s,"HTTP séquentiel\nCapacité concurrente\nnon mesurée",900,490,300,110,25,C.red,true);
foot(s,"HTML reçu en entier, mêmes conditions de poste. Plusieurs optimisations, sans attribution causale isolée.");
}

{
const s=slide("Développement assisté par agents IA",2,65,"Nous assumons une réalisation largement assistée par IA. Notre valeur doit pouvoir se montrer dans le cadrage, les arbitrages, l'analyse des erreurs et les critères de validation. Le cycle défendable commence par un objectif et un plan revu, puis de petits changements, des tests et une revue avant fusion. AGENTS.md impose notamment de lire la documentation de la version Next installée. Les skills apportent des procédures spécialisées, mais leur présence ne prouve pas qu'ils ont tous été utilisés historiquement. Les références versionnées, les PR et les journaux CI fournissent une trace plus solide que le souvenir d'un prompt. Pour le choix des modèles de développement, nous expliquerons les critères de difficulté, qualité et coût sans inventer un historique précis. Une compréhension crédible se démontre en retraçant une requête et en expliquant un échec, même sans lecture exhaustive du dépôt.",[ref+"AGENTS.md",repo+"/pull/16",ref+"docs/design/fullscreen-entry.md","https://learn.chatgpt.com/docs/customization/overview"]);
list(s,["Cadrage humain : besoins, plan revu, périmètre, critères d'acceptation et décisions de produit.","Agents : modifications bornées, documentation versionnée, skills et boucle de correction par les tests.","Maîtrise démontrable : expliquer une requête, une règle RLS et un incident. La génération de code ne suffit pas."],64,185,1135,126,29);
foot(s,"Choix des modèles : complexité, qualité, coût et latence. Historique exact des modèles à documenter par l'équipe.");
}
{
const s=slide("Bilan et prochaines validations",2,40,"Virtus relie un catalogue multisource à un profil confirmé et à des recommandations expliquées. Nous avons des preuves de tests et de déploiement, mais également des limites opérationnelles visibles. Le dernier workflow consulté, antérieur à la release de performance, présente des échecs Wadifa et Veolia, qu'il faut diagnostiquer sans désactiver les garde-fous. Les prochaines validations portent sur la pertinence avec des candidats consentants, la charge HTTP en préproduction et une suite navigateur automatisée. Enfin, nous devons pouvoir défendre nos décisions indépendamment des agents. Merci. Nous pouvons maintenant ouvrir les annexes sur les sources, les API, la base de données ou la méthode de test.",[repo+"/actions/runs/45578132719",ref+"docs/TECH-IMPLEMENTATION-STATUS.md"],true);
text(s,"Un catalogue traçable.\nDes correspondances expliquées.",64,190,1130,150,49,C.white,true);
text(s,"À valider ensuite",64,390,1110,50,29,C.gold,true);
text(s,"Pertinence humaine, charge HTTP et automatisation navigateur.\nÉchecs de collecte Wadifa / Veolia à diagnostiquer.",64,455,1110,110,30,C.white);
text(s,"Questions du jury",64,605,1050,40,26,C.light);
}

{
const subset=bench.sources.filter(s=>["smartrecruiters","greenhouse"].includes(s.provider));
const s=slide("Sources détaillées : ATS (1/2)",1,0,"Annexe à ouvrir sur demande. Les entrées sont celles du registre activé au moment du benchmark. Accor et Accor Hotels sont deux comptes de collecte, pas deux groupes distincts. La publication réelle dépend de l'état de chaque source en base. Les URLs officielles ci-dessous documentent le point de départ employeur, tandis que les endpoints techniques sont dans les adaptateurs et les audits.",subset.map(x=>x.name+" : "+x.website).concat([ref+"src/lib/sources.ts",ref+"src/lib/audited-employers.json",ref+"src/lib/tech-employers.json"]));
table(s,[["Connecteur","Entrées du registre"],["SmartRecruiters","Accor, Accor Hotels, ALTEN, Devoteam, SQLI,\nInetum, Egis, SOCOTEC, Bosch, Veolia, SGS,\nWavestone, Scalian, Alter Solutions"],["Greenhouse","Nuitée, Wikimedia Foundation, Cloudbeds, Artefact"]],[280,872],64,185,1152,310,25);
text(s,"Exemples de domaines",64,538,600,40,28,C.green,true);
text(s,"careers.smartrecruiters.com · job-boards.greenhouse.io",64,590,1140,40,26);
}
{
const subset=bench.sources.filter(s=>!["smartrecruiters","greenhouse"].includes(s.provider));
const s=slide("Sources détaillées : flux et employeurs (2/2)",1,0,"Annexe. La famille html du registre inclut des adaptateurs mixtes, pas uniquement de l'analyse HTML. Capgemini s'appuie sur son API Jobstream et les détails employeurs, CGI sur Njoyn, Cegedim sur DigitalRecruiters. Teamtailor utilise des ensembles d'URLs RSS/sitemap contrôlés. Les sources à distance doivent justifier explicitement l'éligibilité au Maroc. Orange figure dans les audits mais reste désactivé. ReKrute, Emploi.ma, LinkedIn et Indeed ne font pas partie des sources collectées.",subset.map(x=>x.name+" : "+x.website).concat([ref+"src/collectors/employer-sites.ts",ref+"src/collectors/teamtailor.ts"]));
table(s,[["Technique","Entrées du registre"],["Lever","Energy Recovery, Yassir, Theodo"],["Workable","Mindera, Infomineo, Arcsen, SupportYourApp"],["Ashby","Harmattan AI, The Flex"],["Adaptateurs employeurs","Capgemini, CGI, Cegedim"],["Teamtailor RSS / sitemap","inwi, Leyton Maroc"],["API spécialisées","Wadifa Info, Himalayas"]],[345,807],64,172,1152,432,23);
foot(s,"Liste de collecte, distincte d'une autorisation générale de republier les annonces.");
}
{
const s=slide("Documentation des API applicatives",2,0,"Contrats tirés des routes du dépôt. GET /api/jobs expose des métadonnées publiques, sous la politique d'export de chaque source. Les filtres répétés, par exemple technology=python&technology=sql, restent acceptés. Le paramètre days=0 signifie toutes dates. Les routes privées exigent le flag candidat et un Bearer validé. La confirmation du profil se fait par PUT, le DELETE efface le profil. GET /api/matches exige un profil enregistré et rend les raisons et les écarts, mais retire le score interne. POST extraction exige un consentement explicite dans x-cv-consent. Cette table documente le code, pas une spécification OpenAPI déjà générée.",[ref+"src/app/api/jobs/route.ts",ref+"src/app/api/profile/route.ts",ref+"src/app/api/profile/extract/route.ts",ref+"src/app/api/matches/route.ts"]);
table(s,[["Méthode et route","Entrée / fonction","Accès"],["GET /api/jobs","q, city, days, page, tech, family…","Public"],["GET /api/profile","Lire profil et révision","Bearer"],["PUT /api/profile","JSON CandidateProfile validé","Bearer"],["DELETE /api/profile","Supprimer son profil","Bearer"],["POST /api/profile/extract","PDF/DOCX ou texte + consentement","Bearer"],["GET /api/matches","days=0|30, page ; 12 résultats/page","Bearer"]],[365,570,217],64,170,1152,430,22);
foot(s,"Réponses privées : no-store et noindex. Une future spécification OpenAPI pourrait formaliser ces contrats.");
}
{
const s=slide("API : erreurs et exemple de requête",2,0,"Les codes doivent aider le client sans exposer le fournisseur ni des secrets. La désactivation du pilote renvoie 404, l'absence de jeton 401, un profil manquant pour le matching 409, une charge trop grande 413 et une indisponibilité 503. Les validations de parsing et d'extraction n'utilisent pas toutes le même code : une erreur de lecture du CV est 400, un contexte trop long ou une sortie invalide est 422. La réservation refusée retourne 429. La réponse publique renvoie un tableau jobs, total, page et pageSize, ainsi que le mode et les sources autorisées à l'export. Certaines sources affichables dans l'interface sont exclues de l'API export. Ne jamais montrer une requête contenant un vrai Bearer.",[ref+"src/lib/candidate-server.ts",ref+"src/lib/source-policy.ts",ref+"src/app/api/profile/extract/route.ts"]);
text(s,"GET /api/jobs?tech=1&technology=python\n&technology=sql&days=0&page=2",64,180,1140,100,31,C.green,true);
table(s,[["Code","Signification dans l'application"],["401 / 404","Session invalide / fonctionnalité désactivée"],["409 / 413","Profil requis / requête trop volumineuse"],["422 / 429","Extraction invalide / réservation de quota refusée"],["503","Base, catalogue ou fournisseur indisponible"]],[240,912],64,320,1152,280,24);
foot(s,"Les messages d'erreur évitent les corps de réponse bruts du fournisseur.");
}
{
const s=slide("Accès à la base : HTTPS et droits SQL",2,0,"En fonctionnement courant, le SDK supabase-js passe par les services HTTPS de Supabase et l'API PostgREST pour les opérations de données et les RPC. Il ne maintient pas une connexion PostgreSQL directe par visiteur. Les migrations utilisent pg.Client avec une URL opérateur de connexion directe ou de session pooler, et un verrou transactionnel. Les clés de service ont des privilèges élevés et doivent rester limitées à la collecte. La clé publishable n'est pas un secret, mais la RLS et les GRANT restent indispensables. L'API privée vérifie la session puis utilise le jeton utilisateur pour conserver la RLS. L'identité email non vérifiée ne constitue pas une preuve d'appartenance à une organisation.",[ref+"src/lib/catalog.ts",ref+"src/lib/candidate-server.ts",ref+"scripts/migrate.ts",ref+"supabase/migrations/20261117205938_virtus_tech_profiles.sql","https://supabase.com/docs/guides/database/postgres/row-level-security"]);
table(s,[["Chemin","Identité / privilèges","Protection"],["Catalogue Next.js","Clé publishable via HTTPS","GRANT + RLS + vues"],["Profil / matching","Publishable + JWT utilisateur","getUser + propriété RLS"],["Collecte GitHub","Secret serveur","Environnement protégé, main"],["Migrations opérateur","DATABASE_URL avec pg.Client","Transaction + verrou SQL"]],[335,475,342],64,185,1152,350,24);
foot(s,"La RLS s'ajoute aux permissions de table et de colonne. Aucun secret opérateur dans le navigateur.");
}
{
const s=slide("Détails du schéma et des index",1,0,"Le schéma listings comporte une unicité source_id et external_id, un group_key, des dates de publication et de présence, active, missing_count, les champs de concours et des métadonnées tech JSONB. Un ajout permet expires_at pour les données Himalayas et documente la couverture partielle dans sync_runs. Les profils ont une révision incrémentée par trigger. Les tables de budget et usage dans virtus_private n'autorisent pas les accès clients directs. Des index existent pour le regroupement, les sources, les villes et la fraîcheur. Un index GIN de texte historique existe également, tandis que la recherche publique doit respecter son périmètre de métadonnées. EXPLAIN ANALYZE reste nécessaire pour vérifier quels index servent réellement chaque requête.",[ref+"supabase/migrations/202610250001_catalog.sql",ref+"supabase/migrations/20261117205938_virtus_tech_profiles.sql",ref+"supabase/migrations/20261121230612_himalayas_partial_collection.sql"]);
table(s,[["Objet","Structure ou contrainte importante"],["listings","UNIQUE(source_id, external_id), group_key, tech JSONB,\nactive, missing_count, published_at, last_seen_at, expires_at"],["candidate_profiles","user_id PK/FK, profile JSONB, revision, updated_at"],["sync_runs","status, count, error, reported_total, observed_total, partial"],["virtus_private","cv_budget_config et cv_usage, accès clients révoqué"],["Index","group_key, source_id, GIN city_keys, fraîcheur active,\ntexte et consommation journalière/mensuelle"]],[330,822],64,175,1152,430,23);
foot(s,"Un index déclaré ne prouve pas son efficacité. Examiner les plans réels et la cardinalité.");
}
{
const s=slide("Extraction : limites et contrôle des coûts",2,0,"La limite du parser est quatre millions d'octets, trente mille caractères et trente pages PDF. Les scans sans texte ne font pas l'objet d'un OCR. La route utilise Node et déclare soixante secondes au maximum. L'adaptateur Cloudflare fixe le modèle Llama 3.3 70B instruct FP8 fast et borne son contexte à vingt-quatre mille tokens. Les caractères et tokens ne sont pas interchangeables. Le serveur refuse un contexte trop long sans troncature silencieuse. Le quota applicatif autorise au maximum cinq réservations par utilisateur et jour UTC avec un plafond mensuel de dix dollars de valeur de calcul réservée, qui ne constitue pas une facture réelle. Les drapeaux et la configuration privée doivent concorder. Le fallback reste manuel, sans bascule automatique vers un fournisseur payant. Les prix et termes doivent être revérifiés avant tout changement de fournisseur.",[ref+"src/lib/cv-parser.ts",ref+"src/lib/cv-extraction.ts",ref+"src/app/api/profile/extract/route.ts",ref+"supabase/migrations/20261117205938_virtus_tech_profiles.sql",ref+"docs/CLOUDFLARE-CV-SETUP.md"]);
list(s,["Entrée : PDF texte / DOCX, 4 Mo, 30 pages PDF et 30 000 caractères au maximum.","Modèle Cloudflare configuré : Llama 3.3 70B Instruct. Validation du JSON et des preuves textuelles.","Réservations atomiques : ≤ 5/jour/utilisateur, plafond mensuel configuré. Saisie manuelle en cas de refus."],64,185,1135,126,28);
foot(s,"Modèle exact : @cf/meta/llama-3.3-70b-instruct-fp8-fast. Flags réels de production à revérifier avant démo.");
}
{
const s=slide("État de la collecte et incidents observés",1,0,"L'exécution GitHub Actions du vingt-cinq novembre contient trente-quatre jobs de collecte. Trente-deux finissent avec succès, et Wadifa et Veolia échouent. Un job réussi ne signifie pas forcément une importation : par exemple un contrôle de cadence peut ignorer une source. Le résultat global est donc en échec même si la majorité du catalogue se rafraîchit. Les logs et la base doivent servir au diagnostic. Nous ne déduisons pas une panne réseau de ce seul résumé et ne désactivons pas les contrôles de chute suspecte. Le refus de rapprocher un lot échoué protège les anciennes données, mais leur fraîcheur et les dates limites continuent de limiter ce que voient les utilisateurs.",[repo+"/actions/runs/45578132719",ref+"scripts/collect.ts"]);
chart(s,["Réussis","Échecs"],[{name:"Jobs GitHub Actions",values:[32,2],fill:C.green}],55,200,760,390,"jobs",36);
text(s,"Wadifa Info\nVeolia",885,220,325,105,33,C.red,true);
text(s,"Échecs à diagnostiquer\nsans forcer la\nréconciliation",885,390,325,155,28);
foot(s,"Run du 25/11/2026, run 45578132719. Résultat des jobs, distinct du nombre d'offres importées.");
}
{
const s=slide("Tests navigateur et protocole de charge",2,0,"Ce protocole est proposé, pas un résultat déjà exécuté. Nous n'avons pas trouvé de suite Playwright dédiée dans package.json ou dans les tests du dépôt. Les vérifications documentées passent par un navigateur piloté et des smoke HTTP. Une suite Playwright devrait automatiser navigation clavier, filtres répétés, pagination, retour de détail, viewport mobile et isolement de deux comptes de test. Pour la charge, travailler sur une préproduction isolée avec données synthétiques. Tester séparément catalogue général, catalogue tech, matching et extraction simulée. Augmenter progressivement les utilisateurs simultanés sur une durée fixe, mesurer p50/p95, débit, erreurs, mémoire et requêtes SQL. Un objectif initial comme p95 inférieur à une seconde et moins d'un pour cent d'erreurs doit être annoncé comme cible à valider.",[ref+"package.json",ref+"scripts/smoke-public.ts",ref+"docs/design/fullscreen-entry.md"]);
table(s,[["Volet","Protocole à ajouter","Mesures / critères proposés"],["Playwright","Filtres, clavier, mobile, retour détail,\nprofils de deux comptes synthétiques","Assertions DOM et accès\ncaptures des échecs"],["Charge HTTP","Rampe de concurrence en préproduction,\ndonnées synthétiques, extraction mockée","p50/p95, débit, erreurs,\nCPU/mémoire et coût"],["Données / SQL","Volumes croissants et scénarios tech,\nEXPLAIN ANALYZE, fraîcheur","Plans, temps SQL, payload,\nconsommation de ressources"]],[240,470,442],64,190,1152,350,23);
foot(s,"À exécuter avant toute annonce de capacité. Aucune charge de production lancée pour cette présentation.");
}
{
const s=slide("Montée en charge : limites et évolutions",2,0,"La recherche publique tech utilise désormais search_tech_catalog : PostgreSQL filtre, regroupe, compte et renvoie douze offres. La vue évite l’agrégation des sources répétée pour chaque ligne. Les facettes omettent leur propre filtre. get_catalog_source_summary évite une recherche complète pour Sources. Le matching conserve get_tech_catalog : il transfère et classe toutes les offres éligibles en mémoire pour ne pas limiter silencieusement les résultats. Son coût et la concurrence restent à profiler. Les pages publiques restent sans cache de résultats pour préserver immédiatement suspension et expiration. Un cache versionné nécessiterait une stratégie d’invalidation explicite. Les pistes futures comprennent SQL sous volume réaliste, tests de concurrence en préproduction et file bornée pour l’extraction. Elles restent proposées.",[ref+"src/lib/catalog.ts",ref+"supabase/migrations/20261125172615_paginated_catalog_search.sql",ref+"src/lib/matching.ts","docs/technical/Dossier_Technique_Virtus_FR.md §12"]);
list(s,["Réalisé : recherche tech paginée et résumé des sources en SQL. Réponses publiques sans cache.","Coût restant : matching de tout le catalogue, tri en mémoire et appels au fournisseur d’extraction.","À mesurer : concurrence HTTP, coûts et mémoire. Cache invalidable et file de tâches à étudier ensuite."],64,185,1135,126,29);
foot(s,"L’optimisation d’une lecture ne démontre ni capacité globale ni disponibilité annuelle.");
}

{
const s=slide("Difficultés rencontrées et réponses techniques",1,0,"Les incidents ne sont pas des détails embarrassants, ils montrent les compromis de conception. La pagination Orange produisait des doublons et un ensemble incomplet : nous avons laissé la source désactivée. Les intitulés ambigus exigent des règles conservatrices pour ne pas classer un comptable comme développeur à cause d'un mot isolé dans la description. Les crashes natifs PDF ont conduit à isoler le parser dans un processus enfant borné. Les chemins symboliques pnpm ne convenaient pas au packaging Vercel, donc le build matérialise le runtime dans un dossier privé. La sortie du modèle utilise parfois des alias de langues : nous normalisons les alias attestés sans accepter de nouvelles compétences non prouvées. Enfin, les changements visuels doivent préserver les filtres et les liens d'origine.",[ref+"src/lib/tech-employers.json",ref+"src/lib/cv-parser.ts",ref+"scripts/prepare-cv-runtime.mjs",ref+"src/lib/cv-extraction.ts",ref+"docs/TECH-IMPLEMENTATION-STATUS.md"]);
table(s,[["Difficulté","Réponse et compromis"],["Pagination instable","Validation stricte, doublons rejetés, Orange désactivé"],["Données ambiguës","Dates d'origine, contrats inconnus conservés, règles métier"],["PDF et packaging","Parser isolé, runtime matérialisé pour Vercel"],["Sortie LLM variable","Schéma strict, alias contrôlés et confirmation humaine"],["Évolution du frontend","URLs et tests de retour maintiennent le contexte"]],[360,792],64,180,1152,405,24);
}
{
const s=slide("Données, responsabilités et biais",2,0,"L'accès à une page ou une API ne constitue pas à lui seul une autorisation de republier son contenu. La décision de publication enregistrée dans Virtus reste distincte des droits du fournisseur. Les descriptions complètes ne sortent pas dans les réponses publiques, les liens d'origine et les attributions requises sont conservés, et certaines sources interdisent l'export en aval. La vérification des conditions et de robots.txt doit rester une procédure par source, sans prétendre que le code implémente un moteur robots universel. Pour les CV, nous limitons le stockage au profil structuré confirmé, permettons l'édition et la suppression, et demandons le consentement avant le transfert au fournisseur. Les règles de matching n'utilisent pas les noms, mais elles peuvent encore créer des biais via les technologies, l'expérience ou la disponibilité des métadonnées. Aucun audit de conformité ou d'équité complet n'est revendiqué.",[ref+"src/lib/source-policy.ts",ref+"src/lib/profile.ts",ref+"src/lib/matching.ts",ref+"docs/SOURCES.md",ref+"docs/CLOUDFLARE-CV-SETUP.md"]);
list(s,["Sources : conditions de réutilisation, attribution et liens d'origine. Accès public ≠ licence de republication.","CV : consentement fournisseur, parsing transitoire et profil confirmé modifiable ou supprimable.","Équité : informations inconnues explicites et audit à poursuivre. Ni conformité juridique ni absence de biais présumées."],64,185,1135,126,29);
}
{
const s=slide("Évaluer la pertinence avec des candidats",2,0,"Cette étude reste à conduire. Recruter un petit panel de personnes consentantes, par exemple dix candidats dans le cadre du pilote, et couvrir plusieurs métiers, expériences et styles de CV. Préparer un ensemble d'offres et demander aux deux membres de l'équipe une annotation indépendante des paires profil-offre, puis examiner les désaccords. Comparer les cinq premières recommandations Virtus à un classement simple par mots-clés, avec les mêmes offres éligibles et le même instantané. Rapporter Precision@5, le nombre de profils sans résultat, les faux négatifs, les erreurs d'extraction et les préférences mal respectées. Séparer un ensemble d'ajustement d'un ensemble de contrôle et ne pas évaluer uniquement sur les exemples utilisés pour écrire les règles. Une petite étude ne permet pas une promesse générale.",[ref+"docs/TECH-IMPLEMENTATION-STATUS.md",ref+"tests/tech-validation.test.ts"]);
list(s,["Panel consentant et diversité de profils. Deux annotations indépendantes des paires CV-offre.","Comparaison avec une baseline mots-clés sur un même instantané et un jeu de contrôle séparé.","Precision@5, profils sans résultat et analyse des désaccords. Résultats à publier après l'étude."],64,185,1135,126,29);
foot(s,"Protocole proposé. Le benchmark de classification actuel ne remplace pas cette évaluation.");
}
{
const s=slide("Agents, skills et maîtrise technique",2,0,"Décrire seulement le processus que l'équipe peut documenter. Nous proposons de conserver une fiche de décision avec besoin, contraintes, plan accepté, modèle utilisé, skill pertinent, changements, tests et décision humaine. Le plan sert de point de comparaison et doit être révisé si le périmètre change. Les règles de repli comprennent l'arrêt d'un collecteur incomplet, la saisie manuelle si l'extraction échoue et le rollback du déploiement en cas de régression. Les docs de la version installée priment sur les souvenirs d'API. Pour les modèles de développement, expliquer les critères et fournir l'historique réel si disponible, sans attribuer rétroactivement un modèle à toutes les tâches. Les deux membres doivent pouvoir retracer une requête, expliquer une politique SQL et justifier une limite du benchmark. La formule zéro lecture de code est insuffisante pour établir cette compétence.",[ref+"AGENTS.md",ref+"docs/design/fullscreen-entry.md",repo+"/pull/16","https://learn.chatgpt.com/docs/customization/overview"]);
table(s,[["Étape","Preuve attendue"],["Cadrage et plan","Besoin, limites, critères d'acceptation et plan revu"],["Modèle et skill","Choix motivé par la tâche, documentation utilisée"],["Exécution contrôlée","Diff borné, tests utiles et erreurs analysées"],["Validation humaine","Démonstration, revue et décision de fusion"],["Repli","Saisie manuelle, source suspendue ou rollback"]],[365,787],64,180,1152,405,24);
}
{
const s=slide("Répartition orale et questions du jury",1,0,"Répartition indicative à adapter à vos contributions réelles. Le premier intervenant présente les diapositives un à neuf, soit environ huit minutes trente-cinq. Le second présente dix à dix-huit, soit environ neuf minutes vingt-cinq. Les dix-huit minutes excluent les questions. Répéter avec un chronomètre et couper une explication secondaire plutôt qu'accélérer la diction. Les annexes restent accessibles sans être déroulées. Préparer les réponses aux questions : où est l'IA, que contient le score, pourquoi une source est désactivée, comment la RLS protège un profil, pourquoi les résultats de charge ne prouvent pas la capacité utilisateur et comment l'équipe maîtrise un code généré. Adapter les rôles aux contributions réelles et au règlement de l'université concernant la déclaration d'usage de l'IA.",[repo+"/pull/16",ref+"README.md"]);
para(s,"Intervenant 1 · diapositives 1–9","Produit, collecte, données et modèles UML\n≈ 8 min 35",64,190,535);
para(s,"Intervenant 2 · diapositives 10–18","Frontend, matching, sécurité et preuves\n≈ 9 min 25",670,190,535);
text(s,"Questions à préparer",64,425,1140,45,31,C.green,true);
text(s,"Où intervient l'IA ? Pourquoi ces poids ? Comment protège-t-on un profil ?\nQue prouve le benchmark ? Comment diagnostiquer un collecteur en échec ?",64,495,1140,110,28);
}
{
const s=slide("Références et périmètre des preuves",2,0,"Le dossier technique est la source de vérité de cette révision. Le code applicatif correspond à main 569fbdf, vérifié par le run CI 45668170363 et un déploiement Vercel réussi. Le run de collecte 45578132719, à une révision antérieure, contient trente-deux succès et deux échecs. Il ne vérifie pas le rafraîchissement de la nouvelle release. Les quatre-vingt-un tests et la parité de vingt-quatre scénarios sont documentés dans les preuves jointes. Les timings HTTP et Lighthouse sont datés du 25 novembre. Le benchmark de fonction de ce matin reste distinct. Aucun test de charge ni relecture humaine de pertinence n’est présenté comme acquis. Le modèle de développement historique et les contributions individuelles ne sont pas inventés. Les captures ne contiennent que des annonces publiques.",["docs/technical/Dossier_Technique_Virtus_FR.md",repo+"/actions/runs/45668170363",repo+"/actions/runs/45578132719","docs/presentation/measurements/performance-report-2026-11-25.json"]);
list(s,["Référence applicative : main 569fbdf. CI et déploiement de production vérifiés.","Preuves datées : 81 tests, parité SQL, HTTP, Lighthouse et captures réelles.","Limites : aucune capacité concurrente mesurée, évaluation humaine et lecture native PowerPoint à vérifier."],64,185,1135,126,29);
foot(s,"Dossier, données et scripts livrés ensemble. Les résultats datés ne garantissent pas une performance future.");
}

{
const s=slide("Benchmark local du classement",2,0,"Mesure historique du 25 novembre à 08:17 UTC, Node v24.22.3. Un processus, offres synthétiques préclassifiées et identiques. Dix échauffements et cinquante mesures séquentielles par volume. p95 calculé avec le rang documenté dans benchmark.ts, pas un intervalle de confiance. À dix mille offres : p50 39,57 ms et p95 41,91 ms. Aucun réseau, SQL, LLM ou utilisateur concurrent. Ce résultat ne représente donc pas la capacité du service. Le script et les données brutes sont joints. Les graphiques Matplotlib reproduisent les mêmes valeurs.",["docs/presentation/measurements/benchmark.json","docs/presentation/measurements/benchmark.ts","docs/presentation/scripts/plots.py"]);
chart(s,["100","1 000","5 000","10 000"],[{name:"Médiane",values:[0.4576,4.002,19.6445,39.5711],fill:C.green},{name:"p95",values:[0.6162,4.728,21.9823,41.9143],fill:C.gold}],55,190,800,400,"ms",50);
text(s,"41,9 ms",905,225,300,80,54,C.green,true);
text(s,"p95, 10 000 offres\n50 mesures par taille",905,325,300,100,26);
text(s,"Fonction seule\nDonnées synthétiques\nSans charge HTTP",905,480,300,110,26,C.red,true);
foot(s,"25/11/2026. Offres préclassifiées identiques. Ce microbenchmark ne mesure pas le service complet.");
}
{
const s=slide("Secours hors ligne : parcours mobile",1,0,"Captures réelles de la production du 25 novembre, sans candidat identifiable. À gauche le catalogue compact à 390 px. Le premier emploi commence à 883 px du haut du document, hors de la capture de 844 px. À droite le détail après recherche Java et le lien d’origine visible à environ 540 px. Les captures démontrent l’état de l’interface à cette date. En panne réseau, expliquer le filtrage, le retour et le lien d’origine sans simuler une action. Le volet candidat est expliqué par la séquence et le profil synthétique, pas par une fausse capture de résultat. Les captures servent de secours déjà disponible. Une vidéo reste optionnelle et n’a pas été enregistrée.",["docs/presentation/.build/performance-mobile-catalog.png","docs/presentation/.build/performance-mobile-detail.png","docs/presentation/measurements/performance-report-2026-11-25.json"]);
await image(s,"performance-mobile-catalog.png",80,167,208,450);
await image(s,"performance-mobile-detail.png",385,167,208,450);
text(s,"Catalogue puis détail",680,205,520,55,32,C.green,true);
text(s,"Premier emploi : 883 px\nLien d’origine : 540 px\nÉcran : 390 × 844 px",680,290,520,145,29);
text(s,"Hors ligne : expliquer les captures.\nAucune candidature simulée.\nProfil candidat synthétique uniquement.",680,465,520,120,25,C.muted);
foot(s,"Captures publiques réelles du 25/11/2026. Le premier emploi dépasse la hauteur de la capture catalogue.");
}

await fs.mkdir(out,{recursive:true});
const slideMeta=[];
for(let i=0;i<p.slides.items.length;i++){
 const s=p.slides.items[i];
 const stem="slide-"+String(i+1).padStart(2,"0");
 const b=await p.export({slide:s,format:"png",scale:1});
 await fs.writeFile(path.join(root,stem+".png"),new Uint8Array(await b.arrayBuffer()));
 const l=await s.export({format:"layout"});await fs.writeFile(path.join(root,stem+".layout.json"),await l.text());
 slideMeta.push({slide:i+1,notes:s.speakerNotes.text});
 if((i+1)%5===0)console.log("Rendered "+(i+1)+" slides");
}
await fs.writeFile(path.join(root,"notes.json"),JSON.stringify(slideMeta,null,2));
await fs.writeFile(path.join(root,"timing.json"),JSON.stringify({seconds:timings.reduce((a,b)=>a+b,0),presenter1:timings.slice(0,9).reduce((a,b)=>a+b,0),presenter2:timings.slice(9).reduce((a,b)=>a+b,0)}));
const pptx=await PresentationFile.exportPptx(p);
await pptx.save(path.join(root,"candidate.pptx"));
console.log("Exported "+p.slides.items.length+" slides to "+path.join(root,"candidate.pptx"));
