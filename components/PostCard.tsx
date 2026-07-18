import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { Post } from '@/lib/posts';

function getCategoryColor(cat: string) {
  const lower = cat.toLowerCase();
  if (lower === 'crypto') return { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' };
  if (lower === 'stocks') return { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' };
  if (lower === 'investing') return { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400' };
  if (lower === 'trading') return { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400' };
  if (lower === 'finance') return { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400' };
  return { bg: 'bg-slate-500/10', border: 'border-slate-500/30', text: 'text-slate-400' };
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const colors = getCategoryColor(post.category);

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="bg-[#080c14] border border-slate-900/60 hover:border-cyan-500/20 rounded-xl overflow-hidden group shadow-lg hover:shadow-cyan-500/[0.02] flex flex-col h-full transition-all duration-200"
    >
      <div className="relative h-44 overflow-hidden bg-slate-950">
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        )}
        <span className={`absolute top-3 left-3 text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded border ${colors.bg} ${colors.border} ${colors.text} shadow-lg backdrop-blur-md`}>
          {post.category}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {post.description}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-900 mt-5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
          <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">Analyze &rarr;</span>
        </div>
      </div>
    </Link>
  );
}
