import Link from 'next/link';
import { Shield, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | FinEdge',
  description: 'Privacy policy and data protection terms for FinEdge intelligence platform.',
};

export default function PrivacyPage() {
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
        <section className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 md:p-10 shadow-xl">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-all text-xs font-semibold mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white mb-6 tracking-tight flex items-center gap-2">
            <Shield className="h-7 w-7 text-cyan-400" /> Privacy & Information Policy
          </h1>
          <div className="text-slate-300 space-y-4 text-sm leading-relaxed">
            <p><strong>Last updated: July 2026</strong></p>
            <p>Welcome to FinEdge. We prioritize the security of our readers and investors above all else. This Privacy Policy documents how we handle user metrics, caching, local storage, and static application deployment.</p>
            <h3 className="text-lg font-bold text-white mt-6">1. Data Storage & Local Persistence</h3>
            <p>FinEdge runs as a client-side Single Page Application. We do not gather or store any personally identifiable information (PII) on cloud servers. Any preferences, such as search history or category filters, are strictly stored within your browser&apos;s local state.</p>
            <h3 className="text-lg font-bold text-white mt-6">2. Third-Party Connections</h3>
            <p>Our real-time market boards utilize dynamic mathematical formulas that replicate actual financial market movements. We do not transmit tracking tokens or pixel trackers to third-party ad networks.</p>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 border-t border-slate-900 mt-20 py-8 px-4 md:px-8 text-center text-xs text-slate-500 font-mono">
        &copy; 2026 FinEdge Professional. All rights reserved.
      </footer>
    </div>
  );
}
