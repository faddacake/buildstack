import {tools,useCases,toolBy,UPDATED} from '../data.js';
export function GET({site}){const u=p=>new URL(p,site).href;
let s=`# BuildJury\n\n> Independent verdicts on AI build tools (vibe-coding tools, AI app builders, agent frameworks, MCP servers) by use case. Rankings are never for sale; sponsored placements are always labeled. Updated ${UPDATED}.\n\n## Use cases\n`;
for(const c of useCases) s+=`- [${c.title}](${u(`/use-cases/${c.slug}/`)}): ${c.rank.map((r,i)=>`${i+1}. ${toolBy[r].name}`).join(', ')}\n`;
s+=`\n## Tools\n`; for(const t of tools) s+=`- [${t.name}](${u(`/tools/${t.slug}/`)}): ${t.cat}. ${t.desc} Official: ${t.url}\n`;
return new Response(s,{headers:{'Content-Type':'text/plain; charset=utf-8'}});}
