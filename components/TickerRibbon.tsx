'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export default function TickerRibbon() {
  const [tickers, setTickers] = useState<TickerData[]>([
    { symbol: 'BTC/USD', name: 'Bitcoin', price: 0, change: 0, changePercent: 0 },
    { symbol: 'ETH/USD', name: 'Ethereum', price: 0, change: 0, changePercent: 0 },
    { symbol: 'SPY', name: 'S&P 500 ETF', price: 588.42, change: 4.12, changePercent: 0.7 },
    { symbol: 'QQQ', name: 'NASDAQ ETF', price: 494.15, change: 5.80, changePercent: 1.19 },
    { symbol: 'GLD', name: 'Gold ETF', price: 242.80, change: 0.95, changePercent: 0.39 },
    { symbol: 'USO', name: 'Crude Oil', price: 71.35, change: -1.15, changePercent: -1.59 },
  ]);

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
              return { ...t, price: data.bitcoin.usd, change: data.bitcoin.usd * (data.bitcoin.usd_24h_change / 100), changePercent: Number(data.bitcoin.usd_24h_change.toFixed(2)) };
            }
            if (t.symbol === 'ETH/USD' && data.ethereum) {
              return { ...t, price: data.ethereum.usd, change: data.ethereum.usd * (data.ethereum.usd_24h_change / 100), changePercent: Number(data.ethereum.usd_24h_change.toFixed(2)) };
            }
            return t;
          })
        );
      } catch {
        // Fallback to simulated prices
        setTickers(prev =>
          prev.map(t => {
            if (t.symbol === 'BTC/USD') return { ...t, price: 104250, change: 1845.20, changePercent: 1.8 };
            if (t.symbol === 'ETH/USD') return { ...t, price: 3422.50, change: -48.10, changePercent: -1.39 };
            return t;
          })
        );
      }
    }

    fetchPrices();
    const interval = setInterval(() => {
      setTickers(prev =>
        prev.map(t => {
          if (t.symbol === 'BTC/USD' || t.symbol === 'ETH/USD') return t;
          const pct = (Math.random() - 0.5) * 0.2;
          const delta = t.price * pct;
          return {
            ...t,
            price: Number((t.price + delta).toFixed(2)),
            change: Number((t.change + delta).toFixed(2)),
            changePercent: Number(((t.change + delta) / (t.price) * 100).toFixed(2)),
          };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-950 border-b border-slate-900 overflow-hidden h-10 flex items-center select-none text-xs">
      <div className="bg-cyan-500 text-slate-950 px-3 py-1.5 font-bold tracking-wider uppercase flex items-center gap-1.5 h-full z-10 font-mono shadow-[4px_0_12px_rgba(56,189,248,0.2)]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
        </span>
        Live Market Watch
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 py-2">
          {[...tickers, ...tickers].map((ticker, idx) => {
            const isUp = ticker.change >= 0;
            return (
              <div key={idx} className="inline-flex items-center gap-2 font-mono border-r border-slate-900 pr-8">
                <span className="text-slate-400 font-semibold">{ticker.symbol}</span>
                <span className="text-slate-200 font-medium">
                  ${ticker.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className={`flex items-center gap-0.5 font-bold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {isUp ? '+' : ''}{ticker.changePercent}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
