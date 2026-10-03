 "use client";
import { useState } from "react";
import { Menu, X, Code2 } from "lucide-react";
export default function Navbar(){
 const [open,setOpen]=useState(false);
 return <nav className="fixed top-0 z-50 w-full border-b border-white/[.06] bg-[#05070d]/75 backdrop-blur-xl">
  <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
   <a href="#" className="flex items-center gap-2 font-semibold tracking-tight"><span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-indigo-400 to-cyan-400 text-[#05070d]"><Code2 size={17}/></span>BD Number Lookup</a>
   <div className="hidden items-center gap-7 text-sm text-slate-400 md:flex"><a href="#lookup" className="hover:text-white">Lookup</a><a href="#features" className="hover:text-white">Features</a><a href="#docs" className="hover:text-white">API Docs</a><a href="#operators" className="hover:text-white">Operators</a></div>
   <button onClick={()=>setOpen(!open)} className="md:hidden">{open?<X/>:<Menu/>}</button>
  </div>
  {open&&<div className="border-t border-white/5 px-5 py-4 md:hidden"><a className="block py-2 text-slate-300" href="#lookup">Lookup</a><a className="block py-2 text-slate-300" href="#docs">API Docs</a></div>}
 </nav>
}