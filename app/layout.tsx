import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FinEdge | Premier Finance & Crypto Intelligence',
  description: 'Professional market analysis for Crypto, Stocks, and Global Finance.',
  metadataBase: new URL('https://finedge-28f.pages.dev'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="google-site-verification" content="AeNogy_FSUyoQGAj41YXBFpLvSJryB3yOxQCu_BkRkY" />
      </head>
      <body className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
