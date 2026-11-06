import React from 'react';
import db from '@/lib/db';
import { ImageIcon, Sparkles, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';
import GalleryViewer from '@/components/gallery/GalleryViewer';

export async function generateMetadata() {
  const seo = await db.seoMetadata.findUnique({ where: { pageSlug: '/gallery' } }).catch(() => null);
  return {
    title: seo?.metaTitle || 'Campus Photo & Video Gallery | Bright Future Institute Lalitpur',
    description: seo?.metaDescription || 'Smart classrooms, library reading halls, Sunday OMR mock test series, and topper felicitation ceremony photos of Bright Future Competition Institute, Lalitpur.',
  };
}

export default async function GalleryPage() {
  const [items, categories] = await Promise.all([
    db.galleryItem.findMany({
      where: { isPublished: true },
      orderBy: { id: 'asc' },
      include: { category: true },
    }).catch(() => []),
    db.galleryCategory.findMany({
      orderBy: { id: 'asc' },
    }).catch(() => []),
  ]);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-[#0B2545] via-[#134074] to-[#1E3A8A] text-white pt-14 pb-20 sm:pt-16 sm:pb-24 text-center relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold text-amber-300 bg-white/10 border border-white/20 uppercase tracking-widest backdrop-blur-md shadow-inner">
            <ImageIcon className="w-4 h-4 text-amber-400" />
            Official Campus Album • Lalitpur
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Photo &amp; Campus Gallery
          </h1>

          <p className="text-blue-100/90 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-medium">
            Take a visual tour through our smart digital classrooms, quiet library reading hall, Sunday OMR mock test sessions, and proud topper celebrations in Lalitpur.
          </p>

          {/* Quick campus credentials */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-white/90">
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-xs flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              100% Real Campus Photographs
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-xs flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-300" />
              Station Road &amp; Ghantaghar Branches
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-xs flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-300" />
              Air-Cooled Smart Study Spaces
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 relative z-20">
        <GalleryViewer
          initialItems={items as any}
          categories={categories as any}
        />
      </section>
    </div>
  );
}
