import fs from "node:fs/promises";
import path from "node:path";
import {fileURLToPath,pathToFileURL} from "node:url";
const here=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"../.build");
process.env.RUNTIME_NODE_MODULES=process.env.VIRTUS_RUNTIME_MODULES || "C:/Users/nabil/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules";
const skill=process.env.VIRTUS_PRESENTATION_SKILL || "C:/Users/nabil/.codex/plugins/cache/openai-primary-runtime/presentations/26.1123.11515/skills/presentations";
const {finalizePresentation}=await import(pathToFileURL(path.join(skill,"container_tools/artifact_tool_utils.mjs")).href);
const result=await finalizePresentation({
 workspaceDir:path.resolve(here,".."),
 candidatePath:path.join(here,"animated.pptx"),
 finalPath:path.resolve(here,"../output/Virtus_Soutenance_FR_"+Date.now()+".pptx"),
 pythonExecutable:"C:/Users/nabil/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe",
 integrityValidatorPath:path.join(skill,"container_tools/inspect_presentation_package_integrity.py"),
 layoutValidatorPath:path.join(skill,"container_tools/inspect_presentation_layout_geometry.py"),
 layoutArgs:["--expected-slide-size-emu","12192000,6858000","--validate-bullet-geometry","--validate-heading-fit",...[19,20,21,22,23,24,27,29,32].flatMap(n=>["--require-native-table-slide",String(n)])],
 explicitTotalSlideCount:36,
 requiredNativeTableOwnerSlides:[19,20,21,22,23,24,27,29,32],
 requiredNativeChartOwnerSlides:[15,16,26,35],
 materializeLiteralChartWorkbooks:true,
 fontPolicy:{basis:"design",families:["Arial"]},
 verifyArtifactToolImport:true,
 receiptPath:path.join(here,"validation-"+Date.now()+".json")
});
console.log(JSON.stringify({path:result.finalPath,bytes:result.byteCount,integrity:result.packageIntegrity.status,layoutFindings:result.presentationLayout.findingCount,importPassed:result.firstPartyImport.passed}));






await fs.copyFile(result.finalPath,path.resolve(here,"../Virtus_Soutenance_FR.pptx"));
