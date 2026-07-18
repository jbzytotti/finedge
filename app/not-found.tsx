import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex items-center justify-center font-sans">
      <div className="text-center px-4">
        <h1 className="text-6xl font-extrabold text-cyan-400 mb-4">404</h1>
        <h2 className="text-xl font-bold text-white mb-2">Page Not Found</h2>
        <p className="text-sm text-slate-400 mb-8 max-w-md mx-auto">
          The financial report you are looking for does not exist or has been relocated.
        </p>
        <Link
          href="/"
          className="inline-block bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-lg text-sm uppercase tracking-wide transition-all"
        >
          Back to Markets
        </Link>
      </div>
    </div>
  );
}
