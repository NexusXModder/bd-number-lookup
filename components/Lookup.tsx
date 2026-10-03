 "use client";
import { useState } from "react";
import { Search, ShieldCheck, Zap, Copy, Check, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
const prefixes:Record<string,{carrier:string,code:string}>={ "013":{carrier:"Grameenphone",code:"013"},"017":{carrier:"Grameenphone",code:"017"},"014":{carrier:"Banglalink",code:"014"},"019":{carrier:"Banglalink",code:"019"},"016":{carrier:"Airtel",code:"016"},"018":{carrier:"Robi",code:"018"},"015":{carrier:"Teletalk",code:"015"} };
export default function Lookup(){
 const [number,setNumber]=useState(""); const [result,setResult]=useState<any>(null); const [error,setError]=useState(""); const [loading,setLoading]=useState(false); const [copied,setCopied]=useState(false);
 function lookup(){
  setError("");setResult(null); const n=number.replace(/\\D/g,"");
  if (!/^01\d{9}$/.test(n)){setError("Enter a valid 11-digit Bangladesh mobile number.");return}
  setLoading(true); setTimeout(()=>{const p=prefixes[n.slice(0,3)]; if(!p){setError("This prefix is not in the supported reference.");setLoading(false);return}
   setResult({success:true,number:n,carrier:p.carrier,carrier_code:p.code,location:"Bangladesh",type:"Mobile",international_format:"+88"+n});setLoading(false)
  },350);
 }
 return <div id="lookup" className="mx-auto mt-12 max-w-3xl scroll-mt-24">
  <div className="glass glow rounded-3xl p-2 shadow-2xl">
   <div className="flex flex-col gap-2 sm:flex-row">
    <div className="relative flex-1"><Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={20}/><input value={number} onChange={e=>setNumber(e.target.value)} onKeyDown={e=>e.key==="Enter"&&lookup()} placeholder="01XXXXXXXXX" inputMode="numeric" className="h-14 w-full rounded-2xl bg-white/[.04] pl-14 pr-4 outline-none ring-0 placeholder:text-slate-600 focus:bg-white/[.06]"/></div>
    <button onClick={lookup} disabled={loading} className="h-14 rounded-2xl bg-white px-7 font-semibold text-slate-950 transition hover:bg-indigo-100 disabled:opacity-60">{loading?"Looking up…":"Lookup"}</button>
   </div>
   <div className="flex flex-wrap items-center justify-center gap-5 px-4 py-4 text-xs text-slate-500"><span className="flex items-center gap-1.5"><ShieldCheck size={14}/>No server-side number storage</span><span className="flex items-center gap-1.5"><Zap size={14}/>Instant prefix detection</span></div>
  </div>
  <AnimatePresence>
   {error&&<motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="mt-4 flex items-center gap-2 rounded-2xl border border-red-400/15 bg-red-400/10 p-4 text-sm text-red-200"><AlertCircle size={17}/>{error}</motion.div>}
   {result&&<motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} className="mt-4 rounded-3xl border border-emerald-400/15 bg-emerald-400/[.06] p-6 text-left">
    <div className="flex items-start justify-between gap-4"><div><p className="text-xs uppercase tracking-[.18em] text-emerald-300">Operator detected</p><h2 className="mt-1 text-2xl font-semibold">{result.carrier}</h2><p className="mt-1 text-sm text-slate-400">{result.number} · {result.type}</p></div><button onClick={()=>{navigator.clipboard?.writeText(JSON.stringify(result,null,2));setCopied(true);setTimeout(()=>setCopied(false),1200)}} className="rounded-xl border border-white/10 p-2 text-slate-400 hover:text-white">{copied?<Check size={17}/>:<Copy size={17}/>}</button></div>
    <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">{[["Prefix",result.carrier_code],["Type",result.type],["Region",result.location],["International",result.international_format]].map(x=><div key={x[0]} className="rounded-2xl bg-black/20 p-3"><div className="text-xs text-slate-500">{x[0]}</div><div className="mt-1 break-all text-sm text-slate-200">{x[1]}</div></div>)}</div>
   </motion.div>}
  </AnimatePresence>
 </div>
}