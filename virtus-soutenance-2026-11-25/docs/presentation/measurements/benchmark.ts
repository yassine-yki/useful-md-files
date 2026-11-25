import {performance} from "node:perf_hooks";
import {writeFileSync} from "node:fs";
import {resolve} from "node:path";
import {fileURLToPath,pathToFileURL} from "node:url";
const app=process.env.VIRTUS_APP_REPO || fileURLToPath(new URL("../../../",import.meta.url));
const {rankMatches}=await import(pathToFileURL(resolve(app,"src/lib/matching.ts")).href);
const {emptyProfile}=await import(pathToFileURL(resolve(app,"src/lib/profile.ts")).href);
const {classifyTech}=await import(pathToFileURL(resolve(app,"src/lib/tech.ts")).href);
const {sources}=await import(pathToFileURL(resolve(app,"src/lib/sources.ts")).href);
const profile=emptyProfile();
profile.skills=["Python","SQL"]; profile.languages=["en","fr"];
profile.preferences.families.values=["software"]; profile.preferences.seniority.values=["senior"]; profile.years=6;
const now=Date.now(), iso=new Date(now).toISOString();
const tech=classifyTech("Développeur Python senior","Python and SQL required. English required. Minimum 5 years required.");
const samples=[];
for(const n of [100,1000,5000,10000]){
 const jobs=Array.from({length:n},(_,i)=>({id:String(i),group_key:String(i).padStart(32,"0"),source_id:"synthetic",external_id:String(i),company:"Synthetic",title:"Développeur Python senior",description:"",tech,locations:["Rabat"],city_keys:["rabat"],country:"MA",workplace:"onsite",contract:"CDI",employment:null,salary:null,url:"https://example.com/"+i,published_at:iso,last_seen_at:iso,active:true,kind:"job",deadline:null,positions:null,official_notice_url:null,attribution_url:null,sources:[]}));
 for(let k=0;k<10;k++)rankMatches(profile,jobs,30,1,now);
 const values=[];
 for(let k=0;k<50;k++){const t=performance.now();const r=rankMatches(profile,jobs,30,1,now);values.push(performance.now()-t);if(r.total!==n)throw Error("Unexpected benchmark result");}
 values.sort((a,b)=>a-b);
 samples.push({jobs:n,runs:50,p50_ms:values[24],p95_ms:values[47],max_ms:values[49]});
}
const result={date:new Date().toISOString(),node:process.version,method:"Single process, preclassified synthetic identical eligible jobs, 10 warmups, 50 sequential samples, no HTTP, DB or LLM",samples,sources:sources.filter(s=>s.enabled).map(s=>({id:s.id,name:s.name,provider:s.provider,website:s.website}))};
writeFileSync(new URL("./benchmark-rerun.json",import.meta.url),JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));
