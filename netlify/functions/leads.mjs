import {getStore} from '@netlify/blobs';
import {createHash} from 'node:crypto';
import {handleLead} from '../../server/leads.mjs';
export default async (request,context) => {
 let store;
 try {store=getStore({name:'bunyan-leads',consistency:'strong'});} catch {return new Response(JSON.stringify({error:'storage_unavailable'}),{status:503,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});}
 return handleLead(request,{
  save:async record=>{await store.setJSON('requests/'+record.id,record);},
  allow:async()=>{
   const bucket=Math.floor(Date.now()/600000);
   const ipHash=createHash('sha256').update((context.ip||'unknown')+':'+(context.site?.id||'local')).digest('hex');
   const key=`limits/${ipHash}`;
   // Conditional writes avoid concurrent requests bypassing the submission limit.
   for(let attempt=0;attempt<8;attempt++) {
    const previous=await store.getWithMetadata(key,{type:'json'});
    const state=previous?.data;
    const count=state?.bucket===bucket ? state.count : 0;
    if(count>=5) return false;
    const result=await store.setJSON(key,{bucket,count:count+1},previous ? {onlyIfMatch:previous.etag} : {onlyIfNew:true});
    if(result.modified) return true;
   }
   return false;
  }
 });
};
