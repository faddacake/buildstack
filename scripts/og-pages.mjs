// Dumps OG card data for every HTML page. Run: node scripts/og-pages.mjs | python3 scripts/og.py
import {tools,useCases,comparisons,toolBy,UPDATED} from '../src/data.js';
const n=s=>toolBy[s].name;
const pages=[
 ['home','Independent verdicts on AI build tools',useCases.find(u=>u.slug==='coding-in-existing-codebase').rank.slice(0,3).map(n)],
 ['use-cases','AI tool rankings by use case',[]],['tools',`All ${tools.length} AI building tools`,[]],['compare','Head-to-head comparisons',[]],
 ['news','The Record: what changed',[]],['methodology','How we rank',[]],['advertise',"Reach builders while they're choosing a tool",[]],['about','About BuildJury',[]],
 ...useCases.map(u=>[`use-cases__${u.slug}`,`${u.title} (2026)`,u.rank.slice(0,3).map(n)]),
 ...comparisons.map(c=>[`compare__${c.slug}`,c.title,[n(c.a),n(c.b)]]),
 ...tools.map(t=>[`tools__${t.slug}`,t.name,[t.cat]]),
];
console.log(JSON.stringify({date:UPDATED,pages}));
