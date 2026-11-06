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

  return (
    <div className="bg-amber-500 text-slate-950 py-2.5 px-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <span className="p-1 rounded-md bg-slate-950 text-amber-400 font-bold text-xs flex items-center gap-1">
            <Bell className="w-3.5 h-3.5 animate-bounce" />
            <span>LATEST UPDATES</span>
          </span>
        </div>

        <div className="overflow-hidden whitespace-nowrap w-full">
          <div className="inline-block animate-marquee hover:pause">
            {notices.map((n, i) => (
              <Link
                key={n.id}
                href="/notices"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-950 hover:underline mr-8"
              >
                <span className="px-1.5 py-0.5 rounded-sm bg-slate-900/15 text-[10px] uppercase font-black">
                  {n.category}
                </span>
                <span>{n.title}</span>
                {i < notices.length - 1 && <span className="text-amber-800 font-bold">•</span>}
              </Link>
            ))}
          </div>
        </div>

        <Link
          href="/notices"
          className="shrink-0 text-xs font-bold text-slate-950 hover:text-white flex items-center gap-0.5"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

