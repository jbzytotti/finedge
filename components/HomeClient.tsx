'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Post } from '@/lib/posts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TickerRibbon from '@/components/TickerRibbon';
import Sidebar from '@/components/Sidebar';
import PostCard from '@/components/PostCard';
import AdSlot from '@/components/AdSlot';

function getCategoryColor(cat: string) {
  const lower = cat.toLowerCase();
  if (lower === 'crypto') return { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' };
  if (lower === 'stocks') return { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' };
  if (lower === 'investing') return { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400' };
  if (lower === 'trading') return { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400' };
  if (lower === 'finance') return { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400' };
  return { bg: 'bg-slate-500/10', border: 'border-slate-500/30', text: 'text-slate-400' };
}

interface HomeProps {
  posts: Post[];
}

export default function HomeClient({ posts }: HomeProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter(post => {
    const matchesCat = activeCategory === 'All' || post.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const heroPost = posts.find(p =>
    p.category.toLowerCase() === (activeCategory === 'All' ? 'crypto' : activeCategory.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans">
      <TickerRibbon />
      <Header
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <section className="max-w-7xl mx-auto w-full px-4 md:px-8 pt-6 select-none">
        <AdSlot id="ad-header-banner" type="header" />
      </section>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-4 sm:py-8 flex-1 w-full grid grid-cols-12 gap-3 sm:gap-6 md:gap-8">
        <main className="col-span-7 sm:col-span-8 lg:col-span-8 flex flex-col">
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-900 pb-5">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  {activeCategory === 'All' ? 'Latest Global Intelligence' : `${activeCategory} Market Analysis`}
                </h1>
                <p className="text-xs text-slate-400 mt-1 font-medium font-sans">
                  Sector coverage updated in real-time as of July 2026.
                </p>
              </div>
              <div className="text-xs font-mono font-bold text-slate-500 bg-slate-950 border border-slate-900 px-3.5 py-2 rounded-lg flex items-center gap-1.5 select-none shadow-inner">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                {filteredPosts.length} REPORTS AVAILABLE
              </div>
            </div>

            {heroPost && searchQuery === '' && (
              <a
                href={`/posts/${heroPost.slug}`}
                className="relative group bg-[#090d16] border border-slate-900 hover:border-cyan-500/20 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 block"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-6">
                  <div className="md:col-span-7 overflow-hidden h-60 md:h-80">
                    {heroPost.image && (
                      <img
                        src={heroPost.image}
                        alt={heroPost.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>
                  <div className="p-6 md:col-span-5 flex flex-col justify-between h-full py-8">
                    <div className="space-y-4">
                      <span className={`inline-block text-[10px] font-extrabold uppercase font-mono tracking-wider px-2.5 py-0.5 rounded border ${getCategoryColor(heroPost.category).bg} ${getCategoryColor(heroPost.category).border} ${getCategoryColor(heroPost.category).text}`}>
                        Spotlight &bull; {heroPost.category}
                      </span>
                      <h2 className="text-lg md:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">
                        {heroPost.title}
                      </h2>
                      <p className="text-slate-400 text-xs md:text-sm line-clamp-3 leading-relaxed">
                        {heroPost.description}
                      </p>
                    </div>
                    <div className="pt-6 border-t border-slate-900 flex items-center justify-between text-xs text-slate-500 mt-6 md:mt-0 select-none">
                      <span className="flex items-center gap-1 font-medium">📅 {heroPost.date}</span>
                      <span className="text-cyan-400 font-bold group-hover:translate-x-1.5 transition-transform flex items-center gap-1">Analyze &rarr;</span>
                    </div>
                  </div>
                </div>
              </a>
            )}

            {filteredPosts.length === 0 && (
              <div className="bg-slate-950 border border-slate-900 rounded-2xl p-16 text-center select-none">
                <div className="h-12 w-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-5 w-5 text-slate-500" />
                </div>
                <h3 className="text-md font-bold text-white mb-1">No market insights found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  No publications matching your query are active. Try checking alternative categories.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                  className="mt-6 text-xs bg-cyan-500 text-slate-950 font-bold px-4 py-2.5 rounded-lg uppercase"
                >
                  Clear Filter
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </main>

        <aside className="col-span-5 sm:col-span-4 lg:col-span-4 space-y-4 sm:space-y-8">
          <AdSlot id="ad-sidebar-top" type="sidebar" />
          <AdSlot id="ad-sidebar-middle" type="sidebar" />
          <AdSlot id="ad-sidebar-bottom" type="sidebar" />
          <Sidebar posts={posts} />
        </aside>
      </div>

      <Footer />
    </div>
  );
}
