import Link from 'next/link';
import { ArrowLeft, User, Share2, Mail, Facebook, Twitter } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | FinEdge',
  description: 'Learn about the FinEdge financial intelligence platform and team.',
};

export default function AboutPage() {
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
            <User className="h-7 w-7 text-cyan-400" /> About FinEdge
          </h1>
          <div className="text-slate-300 space-y-4 text-sm leading-relaxed">
            <p>
              FinEdge is a premium investment intelligence desk and high-frequency markets analyzer. Our research focuses on global macroeconomics, crypto-asset movements, equities benchmarks, and decentralized finance security reports.
            </p>
            <p>
              Our team brings institutional research and algorithmic trading perspectives directly to your screens.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-slate-300 space-y-2 text-xs">
            <p className="font-bold text-cyan-400 flex items-center gap-1.5">
              <Mail className="h-4 w-4" /> Support & Inquiries
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
        </section>
      </main>

      <footer className="bg-slate-950 border-t border-slate-900 mt-20 py-8 px-4 md:px-8 text-center text-xs text-slate-500 font-mono">
        &copy; 2026 FinEdge Professional. All rights reserved.
      </footer>
    </div>
  );
}
