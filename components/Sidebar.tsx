'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Calculator } from 'lucide-react';
import Link from 'next/link';
import { Post } from '@/lib/posts';

interface SidebarProps {
  posts: Post[];
}

export default function Sidebar({ posts }: SidebarProps) {
  const [tickers, setTickers] = useState([
    { symbol: 'BTC/USD', name: 'Bitcoin', price: 104250.00, changePercent: 1.8 },
    { symbol: 'ETH/USD', name: 'Ethereum', price: 3422.50, changePercent: -1.39 },
    { symbol: 'SPY', name: 'S&P 500 ETF', price: 588.42, changePercent: 0.7 },
    { symbol: 'QQQ', name: 'NASDAQ ETF', price: 494.15, changePercent: 1.19 },
    { symbol: 'GLD', name: 'Gold ETF', price: 242.80, changePercent: 0.39 },
    { symbol: 'USO', name: 'Crude Oil', price: 71.35, changePercent: -1.59 },
  ]);

  const [calcAmount, setCalcAmount] = useState('1000');
  const [calcFrom, setCalcFrom] = useState('USD');
  const [calcTo, setCalcTo] = useState('BTC');
  const [calcResult, setCalcResult] = useState(0);

  const trendingPosts = [...posts].sort((a, b) => b.title.length - a.title.length).slice(0, 4);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true'
        );
        if (!res.ok) return;
        const data = await res.json();
        setTickers(prev =>
          prev.map(t => {
            if (t.symbol === 'BTC/USD' && data.bitcoin) {
              return { ...t, price: data.bitcoin.usd, changePercent: Number(data.bitcoin.usd_24h_change.toFixed(2)) };
            }
            if (t.symbol === 'ETH/USD' && data.ethereum) {
              return { ...t, price: data.ethereum.usd, changePercent: Number(data.ethereum.usd_24h_change.toFixed(2)) };
            }
            return t;
          })
        );
      } catch {}
    }
    fetchPrices();
  }, []);

  useEffect(() => {
    const amount = parseFloat(calcAmount) || 0;
    let rateInUSD = calcFrom === 'BTC' ? tickers[0].price : calcFrom === 'ETH' ? tickers[1].price : 1;
    let targetRateInUSD = calcTo === 'BTC' ? tickers[0].price : calcTo === 'ETH' ? tickers[1].price : 1;
    setCalcResult(Number(((amount * rateInUSD) / targetRateInUSD).toFixed(6)));
  }, [calcAmount, calcFrom, calcTo, tickers]);

  return (
    <aside className="space-y-4 sm:space-y-8">
      <div className="bg-slate-950 border border-slate-900 rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-xl space-y-3 sm:space-y-4">
        <h3 className="text-[10px] sm:text-xs font-extrabold uppercase text-slate-400 tracking-wider font-mono border-b border-slate-900 pb-2 sm:pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 select-none">
          <span>Watchlist</span>
          <span className="text-[8px] sm:text-[9px] text-emerald-400 bg-emerald-400/5 px-1.5 py-0.5 rounded border border-emerald-400/10 tracking-widest font-bold self-start sm:self-auto">LIVE</span>
        </h3>
        <div className="divide-y divide-slate-900/60 font-mono">
          {tickers.map((ticker) => {
            const isUp = ticker.changePercent >= 0;
            return (
              <div key={ticker.symbol} className="py-2 sm:py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 first:pt-0 last:pb-0">
                <div>
                  <div className="text-[10px] sm:text-xs font-extrabold text-white truncate">{ticker.symbol}</div>
                  <div className="hidden sm:block text-[9px] text-slate-500 truncate">{ticker.name}</div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-[10px] sm:text-xs font-bold text-slate-200">
                    ${ticker.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className={`text-[9px] sm:text-[10px] font-bold flex items-center sm:justify-end gap-0.5 ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isUp ? '+' : ''}{ticker.changePercent}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-slate-950 border border-slate-900 rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-xl space-y-3 sm:space-y-4">
        <h3 className="text-[10px] sm:text-xs font-extrabold uppercase text-slate-400 tracking-wider font-mono border-b border-slate-900 pb-2 sm:pb-3 flex items-center gap-1.5 select-none">
          <Calculator className="h-3.5 w-3.5 text-cyan-400 shrink-0" /> <span className="truncate">Convert</span>
        </h3>
        <div className="space-y-2 sm:space-y-3 font-mono text-[10px] sm:text-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-1.5 sm:p-2 flex items-center justify-between gap-1">
            <input
              type="number"
              value={calcAmount}
              onChange={(e) => setCalcAmount(e.target.value)}
              className="bg-transparent text-white font-bold w-1/2 focus:outline-none min-w-0"
              placeholder="0.00"
            />
            <select value={calcFrom} onChange={(e) => setCalcFrom(e.target.value)} className="bg-slate-900 text-slate-400 font-bold focus:outline-none border-l border-slate-800 pl-1 sm:pl-2 cursor-pointer text-[10px] sm:text-xs shrink-0">
              <option value="USD">USD</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
            </select>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-1.5 sm:p-2 flex items-center justify-between gap-1">
            <div className="text-cyan-400 font-bold select-all overflow-x-auto min-w-0 flex-1">{calcResult}</div>
            <select value={calcTo} onChange={(e) => setCalcTo(e.target.value)} className="bg-slate-900 text-slate-400 font-bold focus:outline-none border-l border-slate-800 pl-1 sm:pl-2 cursor-pointer text-[10px] sm:text-xs shrink-0">
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <div className="text-[8px] sm:text-[10px] text-slate-500 text-center select-none pt-0.5">
            Dynamic relative to active tickers
          </div>
        </div>
      </div>

      <div className="bg-slate-950 border border-slate-900 rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-xl space-y-3 sm:space-y-4">
        <h3 className="text-[10px] sm:text-xs font-extrabold uppercase text-slate-400 tracking-wider font-mono border-b border-slate-900 pb-2 sm:pb-3 flex items-center gap-1.5">
          <TrendingUp className="h-3.5 w-3.5 text-cyan-400 shrink-0" /> <span>Trending</span>
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {trendingPosts.map((p, idx) => (
            <Link
              key={p.slug}
              href={`/posts/${p.slug}`}
              className="flex gap-2 sm:gap-3 items-center group min-w-0"
            >
              <div className="text-sm sm:text-lg font-bold font-mono text-slate-700 group-hover:text-cyan-400 transition-colors w-5 sm:w-6 text-center select-none shrink-0">
                0{idx + 1}
              </div>
              <div className="flex-1 space-y-0.5 sm:space-y-1 min-w-0">
                <span className="text-[8px] sm:text-[9px] font-extrabold font-mono tracking-wider uppercase text-cyan-400/80">
                  {p.category}
                </span>
                <h4 className="text-[10px] sm:text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
                  {p.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
