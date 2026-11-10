import { randomBytes } from 'node:crypto';
export const fields = {
 investor:['name','email','mobile','ticket','interest','city'],
 institution:['org','licence','name','title','email','mobile','note'],
 broker:['name','fal','firm','mobile','email','city'],
};
const required={investor:['name','email','ticket','interest'],institution:['org','licence','name','title','email','mobile'],broker:['name','fal','mobile','email','city']};
const cities=['riyadh','jeddah','makkah','madinah','dammam','khobar','dhahran','abha','tabuk','other'];
export function validate(input) {
 if (!input || typeof input!=='object' || typeof input.type!=='string' || !Object.hasOwn(fields,input.type) || !input.data || typeof input.data!=='object' || Array.isArray(input.data) || input.consent!==true) return null;
 const data={};
 for (const key of fields[input.type]) {
  const value=input.data[key] ?? '';
  const list=input.type==='investor' && ['interest','city'].includes(key);
  if (list && value!=='') {
   if (!Array.isArray(value) || value.length>20 || value.some(v=>typeof v!=='string'||v.length>200)) return null;
   data[key]=[...new Set(value)];
  } else {
   if (typeof value!=='string' || value.length>2000 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/u.test(value)) return null;
   data[key]=value.trim();
  }
  if (required[input.type].includes(key) && !data[key].length) return null;
 }
 if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length>254) return null;
 if (input.type==='investor' && (!['500-10k','10k-100k','100k-1m','1m+'].includes(data.ticket) || !Array.isArray(data.interest) || data.interest.some(v=>!['fractional','unit','fund'].includes(v)) || (Array.isArray(data.city) && data.city.some(v=>!cities.includes(v))))) return null;
 return {type:input.type,lang:input.lang==='en'?'en':'ar',data};
}
export const json=(status,body,extra={})=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...extra}});
export async function handleLead(request,{save,allow=async()=>true}={}) {
 if (request.method!=='POST') return json(405,{error:'method'},{Allow:'POST'});
 if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase()!=='application/json') return json(415,{error:'content_type'});
 const origin=request.headers.get('origin');
 if (origin) { try {if (new URL(origin).origin!==new URL(request.url).origin) return json(403,{error:'origin'});} catch {return json(403,{error:'origin'});} }
 if (Number(request.headers.get('content-length'))>16384) return json(413,{error:'size'});
 let input;
 try {const raw=await request.text(); if (Buffer.byteLength(raw,'utf8')>16384) return json(413,{error:'size'}); input=JSON.parse(raw);} catch {return json(400,{error:'json'});}
 const parsed=validate(input);
 if (!parsed) return json(422,{error:'validation'});
 // Honeypot submissions must never enter the company's request queue.
 if (input.website) return json(422,{error:'validation'});
 try {
  if (!await allow()) return json(429,{error:'rate_limit'},{'Retry-After':'600'});
  const id='BN-'+randomBytes(6).toString('hex').toUpperCase();
  const now=new Date().toISOString();
  await save({...parsed,id,consent:{pdpl:true,version:'privacy-2026-10',at:now},createdAt:now});
  return json(201,{id});
 } catch {return json(503,{error:'storage_unavailable'});}
}
