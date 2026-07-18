import { getAllPosts } from '@/lib/posts';

export const dynamic = 'force-static';

export async function GET() {
  const posts = getAllPosts();
  const SITE_URL = 'https://finedge-28f.pages.dev';

  const entries = posts.slice(0, 20).map(post => `
    <entry>
      <title>${escapeXml(post.title)}</title>
      <link href="${SITE_URL}/posts/${post.slug}" rel="alternate" />
      <id>${SITE_URL}/posts/${post.slug}</id>
      <updated>${post.date || '2026-07-16'}T00:00:00Z</updated>
      <summary>${escapeXml(post.description)}</summary>
      <category term="${escapeXml(post.category)}" />
    </entry>
  `).join('');

  const feed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>FinEdge | Premier Finance &amp; Crypto Intelligence</title>
  <link href="${SITE_URL}" rel="alternate" />
  <link href="${SITE_URL}/atom.xml" rel="self" />
  <id>${SITE_URL}</id>
  <updated>${new Date().toISOString()}</updated>
  <author>
    <name>FinEdge Intelligence Desk</name>
  </author>
  ${entries}
</feed>`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
