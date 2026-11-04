import {record,toolBy} from '../../lib.js';
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
export function GET({site}){const u=p=>new URL(p,site).href;
const items=record.map(n=>`<item><title>${esc(`${toolBy[n.tool].name}: ${n.text.slice(0,90)}${n.text.length>90?'…':''}`)}</title><link>${u(`/news/#${n.id}`)}</link><guid isPermaLink="true">${u(`/news/#${n.id}`)}</guid><pubDate>${new Date(n.date+'T12:00:00Z').toUTCString()}</pubDate><category>${n.tag}</category><description>${esc(n.text+' Source: '+n.src)}</description></item>`).join('\n');
const x=`<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>The Record (BuildJury)</title><link>${u('/news/')}</link><atom:link href="${u('/news/feed.xml')}" rel="self" type="application/rss+xml"/><description>Dated, sourced changes to the AI build tools BuildJury ranks.</description><language>en</language><lastBuildDate>${new Date(record[0].date+'T12:00:00Z').toUTCString()}</lastBuildDate>\n${items}\n</channel></rss>\n`;
return new Response(x,{headers:{'Content-Type':'application/rss+xml; charset=utf-8'}});}
