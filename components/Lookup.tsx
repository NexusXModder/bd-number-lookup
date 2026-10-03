"use client";
import { useState } from "react";
import { Search, ShieldCheck, Zap, Copy, Check, AlertCircle, UserRound, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type LookupResult = {
  success: boolean;
  number: string;
  name?: string | null;
  carrier: string;
  carrier_code: string;
  location: string;
  type: string;
  international_format: string;
};

const DEVELOPER = "NexusXModder - Araf";
const TELEGRAM_URL = "https://t.me/NexusXModder";

export default function Lookup() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<LookupResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function lookup() {
    setError("");
    setResult(null);
    const n = number.replace(/\D/g, "");
    if (!/^01\d{9}$/.test(n)) {
      setError("Enter a valid 11-digit Bangladesh mobile number.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/lookup?number=${encodeURIComponent(n)}`, {
        method: "GET",
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      const data = await response.json();
      if (!response.ok || data.success === false) {
        throw new Error(data.error || "Lookup failed. Please try again.");
      }
      setResult(data as LookupResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copyResult() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setError("Could not copy the result on this device.");
    }
  }

  function downloadResult() {
    if (!result) return;

    const details = [
      "BD Number Lookup - Details",
      "--------------------------",
      `Name: ${result.name || "Name not available from API"}`,
      `Number: ${result.number}`,
      `Carrier: ${result.carrier}`,
      `Prefix: ${result.carrier_code}`,
      `Location: ${result.location}`,
      `Type: ${result.type}`,
      `International: ${result.international_format}`,
      "",
      `Developed by ${DEVELOPER}`,
      `Telegram: ${TELEGRAM_URL}`,
    ].join("\n");

    const blob = new Blob([details], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `Details-${result.number}.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div id="lookup" className="mx-auto mt-12 max-w-3xl scroll-mt-24">
      <div className="glass glow rounded-3xl p-2 shadow-2xl">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && lookup()}
              placeholder="01XXXXXXXXX"
              inputMode="numeric"
              className="h-14 w-full rounded-2xl bg-white/[.04] pl-14 pr-4 outline-none ring-0 placeholder:text-slate-600 focus:bg-white/[.06]"
            />
          </div>
          <button onClick={lookup} disabled={loading} className="h-14 rounded-2xl bg-white px-7 font-semibold text-slate-950 transition hover:bg-indigo-100 disabled:opacity-60">
            {loading ? "Looking up…" : "Lookup"}
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5 px-4 py-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><ShieldCheck size={14} />No server-side number storage</span>
          <span className="flex items-center gap-1.5"><Zap size={14} />Live API lookup</span>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-center gap-2 rounded-2xl border border-red-400/15 bg-red-400/10 p-4 text-sm text-red-200">
            <AlertCircle size={17} />{error}
          </motion.div>
        )}
        {result && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-3xl border border-emerald-400/15 bg-emerald-400/[.06] p-6 text-left">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[.18em] text-emerald-300">Lookup result</p>
                <h2 className="mt-1 text-2xl font-semibold">{result.carrier}</h2>
                <p className="mt-1 text-sm text-slate-400">{result.number} · {result.type}</p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button onClick={copyResult} aria-label="Copy lookup result" title="Copy details" className="rounded-xl border border-white/10 p-2 text-slate-400 transition hover:bg-white/5 hover:text-white">
                  {copied ? <Check size={17} /> : <Copy size={17} />}
                </button>
                <button onClick={downloadResult} aria-label="Download lookup details" title="Download details" className="rounded-xl border border-white/10 p-2 text-slate-400 transition hover:bg-white/5 hover:text-white">
                  <Download size={17} />
                </button>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[.15em] text-slate-400"><UserRound size={15} />Subscriber name</div>
              <div className="mt-2 text-xl font-semibold text-white">{result.name || "Name not available from API"}</div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[["Prefix", result.carrier_code], ["Type", result.type], ["Region", result.location], ["International", result.international_format]].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-black/20 p-3">
                  <div className="text-xs text-slate-500">{label}</div>
                  <div className="mt-1 break-all text-sm text-slate-200">{value}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 text-center text-sm text-slate-400">
              Developed by {" "}
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-indigo-300 transition hover:text-indigo-200 hover:underline"
              >
                {DEVELOPER}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
