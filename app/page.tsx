import Navbar from "@/components/Navbar";
import Lookup from "@/components/Lookup";
import Features from "@/components/Features";
import Docs from "@/components/Docs";
import Footer from "@/components/Footer";

export default function Home(){
 return <main className="min-h-screen overflow-hidden">
  <div className="fixed inset-0 -z-10 grid-bg"/>
  <div className="fixed left-1/2 top-[-260px] -z-10 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[130px]"/>
  <Navbar/>
  <section className="mx-auto max-w-6xl px-5 pt-28 text-center md:pt-36">
   <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-sm text-indigo-200">
    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]"/>Free &amp; developer friendly
   </div>
   <h1 className="mx-auto max-w-4xl text-5xl font-semibold tracking-[-.045em] md:text-7xl">
    Bangladesh numbers.<br/><span className="text-gradient">Decoded instantly.</span>
   </h1>
   <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">Identify the original mobile operator from any Bangladeshi 11-digit number. Fast, private, and built for developers.</p>
   <Lookup/>
  </section>
  <Features/>
  <Docs/>
  <Footer/>
 </main>
}