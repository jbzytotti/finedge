'use client';

import { useEffect, useRef } from 'react';

// =====================================================
// 🔴 ضع أكواد الإعلانات الخاصة بك هنا (HTML / CSS / JS)
// 🔴 PASTE YOUR ACTUAL AD BANNER CODES HERE
// =====================================================
export const CUSTOM_AD_CODES: Record<string, string> = {
  "ad-header-banner": `
    <!-- 🔴 كود البانر العلوي (Header Leaderboard) -->
    <!-- مثال: كود Google AdSense -->


    <!--
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
    <ins class="adsbygoogle" style="display:block" data-ad-format="horizontal" data-ad-slot="XXXXXXXXXX"></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    -->
    <div style="text-align: center; padding: 20px; color: #94a3b8; border: 1px dashed rgba(148,163,184,0.3); border-radius: 12px; min-height: 90px;">
      <p style="margin: 0; font-size: 12px;">    <div style="width:728px; margin:0 auto; text-align:center;">
<iframe src="//ads.coinserom.com/pub?adsunit=363931&size=728x90" style="width:728px;height:90px;border:0px;padding:0;background-color: transparent;overflow: auto;">
</iframe>
<a style="display: block;text-align:right;font-size:12px;width:728px;" href="https://coinserom.com/?affiliate=3531313138" target="_blank">Ads by coinserom</a>
</div></p>
    </div>
  `,

  "ad-sidebar-top": `
    <!-- 🔴 كود الإعلان الجانبي الأول -->
    <!--
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
    <ins class="adsbygoogle" style="display:block" data-ad-format="auto" data-ad-slot="XXXXXXXXXX"></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    -->
    <div style="text-align: center; padding: 20px; color: #94a3b8; border: 1px dashed rgba(148,163,184,0.3); border-radius: 12px;">
      <p style="margin: 0; font-size: 12px;">Sidebar Top Ad Slot</p>
    </div>
  `,

  "ad-sidebar-middle": `
    <!-- 🔴 كود الإعلان الجانبي الثاني -->
    <div style="text-align: center; padding: 20px; color: #94a3b8; border: 1px dashed rgba(148,163,184,0.3); border-radius: 12px;">
      <p style="margin: 0; font-size: 12px;">Sidebar Middle Ad Slot</p>
    </div>
  `,

  "ad-sidebar-bottom": `
    <!-- 🔴 كود الإعلان الجانبي الثالث -->
    <div style="text-align: center; padding: 20px; color: #94a3b8; border: 1px dashed rgba(148,163,184,0.3); border-radius: 12px;">
      <p style="margin: 0; font-size: 12px;">Sidebar Bottom Ad Slot</p>
    </div>
  `,

  "ad-article-mid": `
    <!-- 🔴 إعلان داخل المقال (In-Article Ad) -->
    <!--
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
    <ins class="adsbygoogle" style="display:block" data-ad-format="auto" data-ad-slot="XXXXXXXXXX"></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    -->
    <div style="text-align: center; padding: 24px; color: #94a3b8; border: 1px dashed rgba(148,163,184,0.3); border-radius: 12px; margin: 2rem 0;">
      <p style="margin: 0; font-size: 12px;">In-Article Ad Slot</p>
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
    "ad-sidebar-bottom": "Sidebar Bottom",
    "ad-article-mid": "In-Article Ad"
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
