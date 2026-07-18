'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X, Facebook, Twitter } from 'lucide-react';

const CATEGORIES = ['All', 'Crypto', 'Stocks', 'Investing', 'Trading', 'Finance'];

interface HeaderProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function Header({ activeCategory, onCategoryChange, searchQuery, onSearchChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-[#030712]/95 backdrop-blur-md border-b border-slate-900 z-40 px-4 md:px-8 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-2xl font-extrabold tracking-tighter text-white font-sans flex items-center gap-1 select-none" title="FinEdge Home">
              FIN<span className="text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">EDGE</span>
            </Link>

            <div className="flex items-center gap-1.5 select-none border-l border-slate-900 pl-3">
              <a href="https://www.facebook.com/profile.php?id=61592216240360" target="_blank" rel="noopener noreferrer" className="p-1 sm:p-1.5 rounded-lg bg-slate-950/60 border border-slate-900 text-slate-400 hover:text-blue-500 hover:border-blue-500/20 hover:bg-blue-500/5 transition-all flex items-center gap-1" title="Facebook Page">
                <Facebook className="h-3.5 w-3.5 text-blue-500" />
                <span className="text-[10px] font-semibold hidden sm:inline font-mono">Facebook</span>
              </a>
              <a href="https://x.com/KokBejo97881" target="_blank" rel="noopener noreferrer" className="p-1 sm:p-1.5 rounded-lg bg-slate-950/60 border border-slate-900 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/20 hover:bg-cyan-500/5 transition-all flex items-center gap-1" title="Twitter Profile">
                <Twitter className="h-3.5 w-3.5 text-cyan-400" />
                <span className="text-[10px] font-semibold hidden sm:inline font-mono">Twitter</span>
              </a>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all relative ${
                    isSelected
                      ? 'text-cyan-400 bg-cyan-500/5 border border-cyan-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search financial reports..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-950/60 border border-slate-800 text-slate-100 text-xs rounded-full pl-9 pr-4 py-2.5 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all font-sans"
            />
            <Search className="absolute left-3.5 top-3 h-3.5 w-3.5 text-slate-500" />
          </div>

          <Link href="/about" className="px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-all font-sans">
            About Us
          </Link>
          <Link href="/contact" className="px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-all font-sans">
            Contact Us
          </Link>
        </div>

        <div className="flex items-center lg:hidden gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white focus:outline-none bg-slate-900/50 rounded-lg border border-slate-800"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#030712] border-b border-slate-800 px-4 py-6 shadow-2xl flex flex-col gap-4 z-50">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search markets..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-full pl-9 pr-4 py-3 focus:outline-none focus:border-cyan-500 transition-all"
            />
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1 font-mono">Market Sectors</div>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { onCategoryChange(cat); setMobileMenuOpen(false); }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    : 'text-slate-400 hover:bg-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="border-t border-slate-900 pt-4 flex flex-col gap-2">
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="w-full text-left px-4 py-2 text-sm font-medium text-slate-400 hover:text-white">About Us</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="w-full text-left px-4 py-2 text-sm font-medium text-slate-400 hover:text-white">Contact Us</Link>
            <Link href="/privacy" onClick={() => setMobileMenuOpen(false)} className="w-full text-left px-4 py-2 text-sm font-medium text-slate-400 hover:text-white">Privacy Policy</Link>
          </div>
        </div>
      )}
    </header>
  );
}
