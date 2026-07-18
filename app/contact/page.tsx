'use client';

import Link from 'next/link';
import { ArrowLeft, Mail, Share2, Facebook, Twitter } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans">
      <header className="sticky top-0 bg-[#030712]/95 backdrop-blur-md border-b border-slate-900 z-40 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-extrabold tracking-tighter text-white font-sans flex items-center gap-1 select-none">
            FIN<span className="text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">EDGE</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-8 py-12 flex-1">
        <section className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 md:p-10 shadow-xl space-y-6">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-all text-xs font-semibold">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
            <Mail className="h-7 w-7 text-cyan-400" /> Connect with FinEdge
          </h1>

          <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-slate-300 space-y-2 text-xs">
            <p className="font-bold text-cyan-400 flex items-center gap-1.5">
              <Mail className="h-4 w-4" /> Direct Communication
            </p>
            <p className="text-slate-400 font-sans">
              If this page does not load properly, please contact us at: <span className="text-cyan-300 font-mono font-semibold">jbzytotti@gmail.com</span>
            </p>
            <p className="text-slate-400 text-[11px]" dir="rtl">
              إذا لم تعمل هذه الصفحة بشكل صحيح، يرجى مراسلتنا مباشرة على البريد الإلكتروني: <span className="text-cyan-300 font-mono font-semibold">jbzytotti@gmail.com</span>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-slate-300 space-y-3 text-xs">
            <p className="font-bold text-cyan-400 flex items-center gap-1.5">
              <Share2 className="h-4 w-4" /> Official Social Media / الحسابات الرسمية
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="https://www.facebook.com/profile.php?id=61592216240360" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/30 text-slate-300 hover:text-white transition-all font-mono">
                <span className="flex items-center gap-2">
                  <Facebook className="h-4 w-4 text-blue-500" /> Facebook Page
                </span>
                <span className="text-[10px] text-cyan-400 font-sans">Visit Profile &rarr;</span>
              </a>
              <a href="https://x.com/KokBejo97881" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/30 text-slate-300 hover:text-white transition-all font-mono">
                <span className="flex items-center gap-2">
                  <Twitter className="h-4 w-4 text-cyan-400" /> Twitter (X)
                </span>
                <span className="text-[10px] text-cyan-400 font-sans">Visit Profile &rarr;</span>
              </a>
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert("Intelligence inquiry successfully submitted! Our financial desk will contact you within 24 hours."); }} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-mono">Full Name</label>
              <input required type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:outline-none focus:border-cyan-500 text-white" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-mono">Institutional Email</label>
              <input required type="email" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:outline-none focus:border-cyan-500 text-white" placeholder="john@institution.com" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-mono">Inquiry Topic</label>
              <select className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:outline-none focus:border-cyan-500 text-white">
                <option>Macroeconomic Market Research</option>
                <option>Advertising & Sponsorship Integration</option>
                <option>Sectors Technical Coverage</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-mono">Message / Objectives</label>
              <textarea required rows={5} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm focus:outline-none focus:border-cyan-500 text-white" placeholder="Enter details about your market coverage requirements..."></textarea>
            </div>
            <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold p-3.5 rounded-lg text-sm tracking-wide transition-all uppercase">
              Transmit Security Report Request
            </button>
          </form>
        </section>
      </main>

      <footer className="bg-slate-950 border-t border-slate-900 mt-20 py-8 px-4 md:px-8 text-center text-xs text-slate-500 font-mono">
        &copy; 2026 FinEdge Professional. All rights reserved.
      </footer>
    </div>
  );
}
