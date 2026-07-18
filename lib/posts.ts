import fs from 'fs';
import path from 'path';

export interface Post {
  title: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  url: string;
  date: string;
  read_time: string;
  image_alt?: string;
}

const CONTENT_DIRS = ['crypto', 'finance', 'investing', 'stocks', 'trading'];

export function getAllPosts(): Post[] {
  const posts: Post[] = [];

  for (const dir of CONTENT_DIRS) {
    const dirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const slug = file.replace(/\.md$/, '');
      const defaultCategory = dir.charAt(0).toUpperCase() + dir.slice(1);

      const metadata: Post = {
        title: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        slug,
        category: defaultCategory,
        description: '',
        image: '',
        url: `${dir}/${file}`,
        date: '2026-07-16',
        read_time: '5 min read',
      };

      const fmRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
      const match = content.match(fmRegex);

      if (match) {
        const rawYaml = match[1];
        const lines = rawYaml.split('\n');
        for (const line of lines) {
          const colonIndex = line.indexOf(':');
          if (colonIndex !== -1) {
            const key = line.slice(0, colonIndex).trim();
            let value = line.slice(colonIndex + 1).trim();
            if (
              (value.startsWith('"') && value.endsWith('"')) ||
              (value.startsWith("'") && value.endsWith("'"))
            ) {
              value = value.slice(1, -1);
            }
            if (key) {
              (metadata as unknown as Record<string, string>)[key] = value;
            }
          }
        }
      }

      if (!metadata.read_time || metadata.read_time === '5 min read') {
        const bodyText = match ? content.substring(match[0].length) : content;
        const wordCount = bodyText.split(/\s+/).filter(Boolean).length;
        const mins = Math.max(1, Math.ceil(wordCount / 200));
        metadata.read_time = `${mins} min read`;
      }

      posts.push(metadata);
    }
  }

  posts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find(p => p.slug === slug) || null;
}

export function getPostMarkdown(slug: string): { metadata: Record<string, string>; body: string } | null {
  for (const dir of CONTENT_DIRS) {
    const filePath = path.join(process.cwd(), dir, `${slug}.md`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const fmRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
      const match = content.match(fmRegex);

      const metadata: Record<string, string> = {};
      let body = content;

      if (match) {
        const rawYaml = match[1];
        body = content.substring(match[0].length);
        const lines = rawYaml.split('\n');
        for (const line of lines) {
          const colonIndex = line.indexOf(':');
          if (colonIndex !== -1) {
            const key = line.slice(0, colonIndex).trim();
            let value = line.slice(colonIndex + 1).trim();
            if (
              (value.startsWith('"') && value.endsWith('"')) ||
              (value.startsWith("'") && value.endsWith("'"))
            ) {
              value = value.slice(1, -1);
            }
            if (key) metadata[key] = value;
          }
        }
      }

      return { metadata, body };
    }
  }
  return null;
}

export function getPostsByCategory(category: string): Post[] {
  const posts = getAllPosts();
  if (category === 'All') return posts;
  return posts.filter(p => p.category.toLowerCase() === category.toLowerCase());
}
