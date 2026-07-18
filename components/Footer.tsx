import Link from 'next/link';
import { Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 mt-20 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
        <div className="md:col-span-5 space-y-4">
          <Link href="/" className="text-2xl font-extrabold tracking-tighter text-white font-sans">
            FIN<span className="text-cyan-400">EDGE</span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            The premium destination for institutional market intelligence covering digital decentralization, standard equities trading, and sustainable macro investment vectors.
          </p>
          <div className="flex gap-2.5 pt-1 select-none">
            <a href="https://www.facebook.com/profile.php?id=61592216240360" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all flex items-center gap-1.5 text-xs font-semibold font-sans" title="Follow our Facebook Page">
              <Facebook className="h-4 w-4 text-blue-500" />
              <span>Facebook</span>
            </a>
            <a href="https://x.com/KokBejo97881" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all flex items-center gap-1.5 text-xs font-semibold font-sans" title="Follow our Twitter (X)">
              <Twitter className="h-4 w-4 text-cyan-400" />
              <span>Twitter</span>
            </a>
          </div>
        </div>
        <div className="md:col-span-7 grid grid-cols-2 gap-6 md:justify-items-end">
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider font-mono">System Desk</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/" className="hover:text-cyan-400 transition-colors font-sans">Market Watch</Link></li>
              <li><Link href="/about" className="hover:text-cyan-400 transition-colors font-sans">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-cyan-400 transition-colors font-sans font-semibold">Contact Us</Link></li>
            </ul>
          </div>
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider font-mono">Security</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/privacy" className="hover:text-cyan-400 transition-colors font-sans">Privacy & Cookies</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-slate-900 pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 font-mono select-none">
        <p>&copy; 2026 FinEdge Professional. All rights reserved.</p>
        <div className="flex gap-4">
          <span>Powered by Next.js + Cloudflare</span>
        </div>
      </div>
    </footer>
  );
}
