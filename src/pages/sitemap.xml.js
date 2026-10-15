import {tools,useCases,UPDATED} from '../data.js';
export function GET({site}){const paths=['/','/tools/','/advertise/',...useCases.map(u=>`/use-cases/${u.slug}/`),...tools.map(t=>`/tools/${t.slug}/`)];
const x=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(p=>`<url><loc>${new URL(p,site).href}</loc><lastmod>${UPDATED}</lastmod></url>`).join('\n')}\n</urlset>\n`;
return new Response(x,{headers:{'Content-Type':'application/xml'}});}
