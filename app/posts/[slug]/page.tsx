import { notFound } from 'next/navigation';
import Link from 'next/link';
import { marked } from 'marked';
import { getAllPosts, getPostMarkdown } from '@/lib/posts';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import PostClientActions from '@/components/PostClientActions';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TickerRibbon from '@/components/TickerRibbon';
import Sidebar from '@/components/Sidebar';
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

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostMarkdown(slug);
  if (!post) return {};
  return {
    title: `${post.metadata.title || slug} | FinEdge`,
    description: post.metadata.description || 'Financial market analysis.',
    openGraph: {
      title: post.metadata.title || slug,
      description: post.metadata.description || '',
      images: post.metadata.image ? [post.metadata.image] : [],
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = getPostMarkdown(slug);
  if (!postData) notFound();

  const { metadata, body } = postData;
  const htmlContent = await marked.parse(body);

  const posts = getAllPosts();
  const category = metadata.category || 'All';
  const relatedPosts = posts
    .filter(p => p.category.toLowerCase() === category.toLowerCase() && p.slug !== slug)
    .slice(0, 2);

  const colors = getCategoryColor(category);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans">
      <TickerRibbon />

      <header className="sticky top-0 bg-[#030712]/95 backdrop-blur-md border-b border-slate-900 z-40 px-4 md:px-8 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-extrabold tracking-tighter text-white font-sans flex items-center gap-1 select-none" title="FinEdge Home">
            FIN<span className="text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">EDGE</span>
          </Link>
          <Link href="/" className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-all rounded-lg hover:bg-slate-900/50">
            ← Back to Markets
          </Link>
        </div>
      </header>

      <section className="max-w-7xl mx-auto w-full px-4 md:px-8 pt-6 select-none">
        <AdSlot id="ad-header-banner" type="header" />
      </section>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-4 sm:py-8 flex-1 w-full grid grid-cols-12 gap-3 sm:gap-6 md:gap-8">
        <main className="col-span-7 sm:col-span-8 lg:col-span-8 flex flex-col">
          <article className="w-full">
            <Link
              href={`/?category=${encodeURIComponent(category)}`}
              className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-all text-xs font-semibold mb-6 group bg-slate-900/30 px-3.5 py-2 rounded-full border border-slate-800 w-fit"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to {category}
            </Link>

            <div className="space-y-6">
              <span className={`inline-block text-xs font-bold font-mono tracking-wider px-3 py-1 rounded-full border ${colors.bg} ${colors.border} ${colors.text}`}>
                {category}
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                {metadata.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 border-b border-slate-900 pb-5">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="h-3.5 w-3.5" />
                  {metadata.date || '2026-07-16'}
                </span>
                <span className="hidden sm:inline text-slate-700">&bull;</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="h-3.5 w-3.5" />
                  {metadata.read_time || '5 min read'}
                </span>
                <span className="hidden sm:inline text-slate-700">&bull;</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <User className="h-3.5 w-3.5" />
                  FinEdge Intelligence Desk
                </span>
              </div>

              {metadata.image && (
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                  <img
                    src={metadata.image}
                    alt={metadata.title || ''}
                    className="w-full max-h-[460px] object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                </div>
              )}

              <div
                className="markdown-body text-slate-300 font-sans leading-relaxed tracking-normal"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />

              <PostClientActions />

              {relatedPosts.length > 0 && (
                <section className="border-t border-slate-900 pt-10 mt-12">
                  <h3 className="text-xl font-bold text-white mb-6">Related Sector Intelligence</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {relatedPosts.map(p => (
                      <Link
                        key={p.slug}
                        href={`/posts/${p.slug}`}
                        className="bg-slate-950 border border-slate-900 rounded-xl overflow-hidden flex flex-col group hover:border-cyan-500/20 transition-all"
                      >
                        {p.image && (
                          <img src={p.image} alt={p.title} className="h-36 w-full object-cover group-hover:scale-[1.02] transition-transform duration-300" referrerPolicy="no-referrer" />
                        )}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-sm font-bold text-slate-100 line-clamp-1 mb-2 group-hover:text-cyan-400 transition-colors">{p.title}</h4>
                            <p className="text-xs text-slate-400 line-clamp-2 mb-4">{p.description}</p>
                          </div>
                          <span className="text-xs text-cyan-400 font-bold flex items-center gap-1 hover:text-cyan-300">Analyze &rarr;</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </article>
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
