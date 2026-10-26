import {tools,useCases,comparisons,NEWS,toolBy,UPDATED} from '../data.js';
export function GET({site}){const u=p=>new URL(p,site).href;
let s=`# BuildJury\n\n> Independent verdicts on AI build tools (AI coding agents, vibe-coding app builders, agent frameworks, MCP servers) ranked by use case. ${tools.length} tools, ${useCases.length} use-case rankings, ${comparisons.length} head-to-head comparisons. Rankings are never for sale; sponsored placements are always labeled. Prices are only stated when confirmed on the vendor's official pricing page. Last updated ${UPDATED}.\n\nBuildJury was formerly called BuildStack. Full detail (pros, cons, pricing, sources): ${u('/llms-full.txt')}\n\n## Use-case rankings\n`;
for(const c of useCases) s+=`- [${c.title}](${u(`/use-cases/${c.slug}/`)}): ${c.rank.map((r,i)=>`${i+1}. ${toolBy[r].name}`).join(', ')}\n`;
s+=`\n## Comparisons\n`; for(const c of comparisons) s+=`- [${c.title}](${u(`/compare/${c.slug}/`)}): ${c.verdict}\n`;
s+=`\n## Recent changes (sourced)\n`; for(const n of NEWS) s+=`- ${n.date} ${toolBy[n.tool].name}: ${n.text} Source: ${n.src}\n`;
s+=`\n## Tools\n`; for(const t of tools) s+=`- [${t.name}](${u(`/tools/${t.slug}/`)}): ${t.cat}. ${t.desc} Official: ${t.url}\n`;
s+=`\n## Optional\n- [How we rank](${u('/methodology/')})\n- [What's new](${u('/news/')})\n- [All tools](${u('/tools/')})\n- [Sitemap](${u('/sitemap.xml')})\n`;
return new Response(s,{headers:{'Content-Type':'text/plain; charset=utf-8'}});}
