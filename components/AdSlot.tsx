'use client';

import { useEffect, useRef } from 'react';

export const CUSTOM_AD_CODES: Record<string, string> = {
  "ad-header-banner": `
    <div style="text-align: center; font-family: 'Inter', sans-serif; padding: 16px; color: #22d3ee; border: 1px dashed rgba(34,211,238,0.3); background: rgba(6,182,212,0.05); border-radius: 12px; min-height: 90px; flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; cursor: pointer;">
      <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold;">Ad Space - Leaderboard Banner</h3>
      <p style="margin: 0; font-size: 11px; color: #94a3b8;">Place your ad code here.</p>
    </div>
  `,
  "ad-sidebar-top": `
    <div style="text-align: center; font-family: 'Inter', sans-serif; padding: 20px; color: #a78bfa; border: 1px dashed rgba(167,139,250,0.3); background: rgba(139,92,246,0.05); border-radius: 12px; cursor: pointer;">
      <h3 style="margin: 0 0 6px 0; font-size: 13px; font-weight: bold;">Sidebar Top Ad</h3>
      <p style="margin: 0; font-size: 10px; color: #94a3b8;">Paste your ad code here.</p>
    </div>
  `,
  "ad-sidebar-middle": `
    <div style="text-align: center; font-family: 'Inter', sans-serif; padding: 20px; color: #fb7185; border: 1px dashed rgba(251,113,133,0.3); background: rgba(244,63,94,0.05); border-radius: 12px; cursor: pointer;">
      <h3 style="margin: 0 0 6px 0; font-size: 13px; font-weight: bold;">Sidebar Middle Ad</h3>
      <p style="margin: 0; font-size: 10px; color: #94a3b8;">Paste your ad code here.</p>
    </div>
  `,
  "ad-sidebar-bottom": `
    <div style="text-align: center; font-family: 'Inter', sans-serif; padding: 20px; color: #fb923c; border: 1px dashed rgba(251,146,60,0.3); background: rgba(249,115,22,0.05); border-radius: 12px; cursor: pointer;">
      <h3 style="margin: 0 0 6px 0; font-size: 13px; font-weight: bold;">Sidebar Bottom Ad</h3>
      <p style="margin: 0; font-size: 10px; color: #94a3b8;">Paste your ad code here.</p>
    </div>
  `
};

interface AdSlotProps {
  id: string;
  type: 'header' | 'sidebar' | 'article' | 'footer';
}

export default function AdSlot({ id, type }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';
    const adCode = CUSTOM_AD_CODES[id] || '';
    if (adCode.trim() === '') return;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = adCode;

    const fragment = document.createDocumentFragment();
    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild);
    }
    container.appendChild(fragment);

    const scripts = Array.from(container.querySelectorAll('script'));
    scripts.forEach((node) => {
      const oldScript = node as HTMLScriptElement;
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
  }, [id]);

  const labels: Record<string, string> = {
    "ad-header-banner": "Header Leaderboard Ad",
    "ad-sidebar-top": "Sidebar Top",
    "ad-sidebar-middle": "Sidebar Middle",
    "ad-sidebar-bottom": "Sidebar Bottom"
  };

  return (
    <div className="w-full select-none font-sans my-4">
      <div className="flex items-center justify-between px-1 mb-1.5 select-none opacity-60">
        <span className="text-[9px] font-extrabold font-mono tracking-widest text-slate-500 uppercase">
          SPONSOR ADS
        </span>
        <span className="text-[8px] font-mono text-slate-600 bg-slate-950 border border-slate-900 px-1.5 py-0.5 rounded">
          {labels[id] || "Ad Placement"}
        </span>
      </div>
      <div ref={containerRef} className="w-full transition-all duration-300" />
    </div>
  );
}
