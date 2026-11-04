// Derived data for the redesign. Content (ranks, verdicts, pros, cons, prices, dates, sources) stays in data.js.
import {tools,useCases,comparisons,NEWS,toolBy,UPDATED} from './data.js';
import sponsors from '../data/sponsors.json';
export const EDITOR='Ben Harrelson';
export const EDITOR_BIO='Independent AI builder focused on shipping practical products that generate consistent revenue without outside funding. Medically retired U.S. Marine. Currently exploring agentic systems, AI tooling, and ways to turn real output into sustainable income streams.';
export const CONTACT='[CONTACT EMAIL @buildjury.com]';
// Working inbox used by mailto form actions until the @buildjury.com mailbox exists (owner decision).
export const FORM_INBOX='buildstack@mail.grokbot.com';
export const NEWSLETTER='https://buildstacks-newsletter.beehiiv.com';
export const SAMPLE_ISSUE='https://buildstacks-newsletter.beehiiv.com/p/buildjury-3-cursor-s-new-pricing-7-new-tools-and-check-the-folder-before-you-start-an-agent';
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONL=['January','February','March','April','May','June','July','August','September','October','November','December'];
export const fmt=d=>{const [y,m,dd]=d.split('-').map(Number);return `${MON[m-1]} ${dd}, ${y}`};
export const fmtLong=d=>{const [y,m,dd]=d.split('-').map(Number);return `${MONL[m-1]} ${dd}, ${y}`};
export const AS_OF=`As of ${fmtLong(UPDATED)}`;
// Record tags (classification only, text unchanged)
export const tagOf=n=>/^security/i.test(n.text)?'security':/(pric|\$\d|plan|allowance|billing|subscription)/i.test(n.text)?'pricing':'release';
export const TAGS={security:'Security',pricing:'Pricing',release:'Release'};
export const record=NEWS.map(n=>({...n,tag:tagOf(n),id:`${n.date}-${n.tool}`})).sort((a,b)=>b.date.localeCompare(a.date));
// Rank history: one snapshot per ruling until ranks change. Add {date,ranks} entries to HISTORY when a ruling moves.
export const HISTORY={};
export const historyFor=u=>HISTORY[u.slug]||[{date:UPDATED,ranks:u.rank}];
const daysBetween=(a,b)=>(new Date(b)-new Date(a))/864e5;
export const movement=u=>{const h=historyFor(u);if(h.length<2)return {};const prev=h[h.length-2];const out={};u.rank.forEach((s,i)=>{const p=prev.ranks.indexOf(s);if(p===-1)out[s]={label:'New',since:prev.date};else if(p!==i)out[s]={label:p>i?`▲${p-i}`:`▼${i-p}`,since:prev.date};});return out;};
export const movedThisWeek=u=>{const h=historyFor(u);return h.length>1&&daysBetween(h[h.length-1].date,UPDATED)<=7&&Object.keys(movement(u)).length>0;};
export const pageLastmod=p=>{
  const m=p.match(/^\/tools\/([^/]+)\/$/); if(m){const d=record.filter(n=>n.tool===m[1]).map(n=>n.date).sort().pop();return d||UPDATED;}
  return UPDATED;};
// Sponsors: only render active entries for build date.
const today=new Date().toISOString().slice(0,10);
const utm=(url,slot)=>{try{const u=new URL(url);u.searchParams.set('utm_source','buildjury');u.searchParams.set('utm_medium','sponsor');u.searchParams.set('utm_campaign',slot);return u.href;}catch{return url;}};
export const sponsorFor=(slot,useCase)=>{const s=sponsors.find(x=>x.slot===slot&&x.start<=today&&today<=x.end&&(!useCase||!x.useCases?.length||x.useCases.includes(useCase)));return s?{...s,href:utm(s.url,slot)}:null;};
export const compareSlug=(a,b)=>comparisons.find(c=>(c.a===a&&c.b===b)||(c.a===b&&c.b===a));
export {tools,useCases,comparisons,toolBy,UPDATED};
export const lc=s=>/^[A-Z][a-z]/.test(s)?s[0].toLowerCase()+s.slice(1):s;
