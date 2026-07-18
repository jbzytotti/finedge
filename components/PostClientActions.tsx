'use client';

import { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';

export default function PostClientActions() {
  const [copied, setCopied] = useState(false);

  const shareArticle = (platform: string) => {
    const shareUrl = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${title}&url=${shareUrl}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-b border-slate-900 py-6 my-10 select-none">
      <span className="text-sm font-semibold text-slate-400 flex items-center gap-1.5">
        <Share2 className="h-4 w-4" /> Share Report:
      </span>
      <div className="flex gap-2">
        <button onClick={() => shareArticle('twitter')} className="px-3.5 py-2 bg-slate-900 border border-slate-800 text-xs font-semibold rounded-lg hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-500 transition-all duration-200 cursor-pointer flex items-center gap-1.5">
          X (Twitter)
        </button>
        <button onClick={() => shareArticle('facebook')} className="px-3.5 py-2 bg-slate-900 border border-slate-800 text-xs font-semibold rounded-lg hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-500 transition-all duration-200 cursor-pointer flex items-center gap-1.5">
          Facebook
        </button>
        <button onClick={copyLink} className="px-3.5 py-2 bg-slate-900 border border-slate-800 text-xs font-semibold rounded-lg hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-500 transition-all duration-200 cursor-pointer flex items-center gap-1.5">
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
}
