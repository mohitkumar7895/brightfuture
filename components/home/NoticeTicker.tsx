'use client';

import React from 'react';
import { Bell, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface NoticeItem {
  id: number;
  title: string;
  category: string;
  isPinned: boolean;
}

interface NoticeTickerProps {
  notices?: NoticeItem[];
}

export default function NoticeTicker({ notices = [] }: NoticeTickerProps) {
  if (notices.length === 0) return null;

  // Duplicate items to make seamless infinite marquee loop
  const tickerItems = [...notices, ...notices];

  return (
    <div className="bg-amber-400 text-slate-950 py-2 sm:py-2.5 px-3 sm:px-4 shadow-sm border-b border-amber-500/30 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
        
        {/* Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-2 py-0.5 rounded-md bg-slate-950 text-amber-300 font-black text-[10px] sm:text-xs flex items-center gap-1.5 uppercase tracking-wider shadow-xs">
            <Bell className="w-3 h-3 text-amber-400 animate-bounce" />
            <span>Latest Updates</span>
          </span>
        </div>

        {/* Marquee Scroller */}
        <div className="overflow-hidden whitespace-nowrap w-full">
          <div className="inline-flex animate-marquee hover:pause items-center">
            {tickerItems.map((n, i) => (
              <Link
                key={`${n.id}-${i}`}
                href="/notices"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-950 hover:text-blue-900 transition-colors mr-8 shrink-0"
              >
                <span className="px-1.5 py-0.5 rounded bg-slate-900/15 text-[10px] uppercase font-black tracking-wide">
                  {n.category}
                </span>
                <span>{n.title}</span>
                <span className="text-amber-700/60 font-bold ml-4">•</span>
              </Link>
            ))}
          </div>
        </div>

        {/* View All link */}
        <Link
          href="/notices"
          className="shrink-0 text-xs font-black text-slate-950 hover:text-blue-900 flex items-center gap-0.5 uppercase tracking-wider"
        >
          <span>All Notices</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

