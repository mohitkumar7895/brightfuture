'use client';

import React from 'react';
import { Phone, Mail, MapPin, Sparkles, LogIn } from 'lucide-react';
import Link from 'next/link';

interface TopBarProps {
  announcement?: string;
  phone?: string;
  email?: string;
}

export default function TopBar({
  announcement = 'Admissions Open for New Batches: UP Police Constable / SI, SSC CGL/CHSL & Railway NTPC! Visit Head Office or Call 9450067223.',
  phone = '9450067223',
  email = 'aj2819147@gmail.com',
}: TopBarProps) {
  // Strip any accidental corrupted characters/emojis from database strings
  const cleanAnnouncement = announcement
    .replace(/[^\x20-\x7E\u0900-\u097F\u2018\u2019\u201C\u201D\u2022\u2013\u2014]/g, '')
    .trim();

  return (
    <aside 
      aria-label="Institute announcement and contact bar" 
      className="bg-[#07132B] text-slate-200 text-xs py-2 px-4 border-b border-blue-950/80 tracking-wide"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        
        {/* Left: Announcement with Amber Badge */}
        <div className="flex items-center gap-2.5 overflow-hidden w-full md:w-auto justify-center md:justify-start">
          <span className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-black px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] uppercase tracking-wider shrink-0 shadow-xs">
            <Sparkles className="w-3 h-3 fill-slate-950" />
            <span>Admission Alert</span>
          </span>
          <p className="truncate text-blue-100 text-xs font-medium">
            {cleanAnnouncement}
          </p>
        </div>

        {/* Right: Branch Location, Phone, Email & Admin */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-5 text-slate-300 text-xs shrink-0">
          <div className="flex items-center gap-1.5 text-blue-200">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Station Rd &amp; Ghantaghar, Lalitpur (UP)</span>
          </div>

          <span className="text-slate-600">|</span>

          <a
            href={`tel:${phone}`}
            className="flex items-center gap-1.5 text-white hover:text-amber-300 transition-colors font-bold"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>+91 {phone}</span>
          </a>

          <span className="text-slate-600">|</span>

          <a
            href={`mailto:${email}`}
            className="flex items-center gap-1.5 text-blue-200 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{email}</span>
          </a>

          <span className="text-slate-600">|</span>

          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 hover:text-amber-200 bg-white/10 hover:bg-white/15 px-2.5 py-0.5 rounded-md border border-white/15 transition-all"
          >
            <LogIn className="w-3 h-3" />
            <span>Admin</span>
          </Link>
        </div>

      </div>
    </aside>
  );
}
