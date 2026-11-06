'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ImageIcon, 
  ZoomIn, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Calendar,
  BookOpen,
  ArrowRight,
  PhoneCall,
  GraduationCap
} from 'lucide-react';

export interface GalleryPhoto {
  id: number;
  title: string;
  type: string;
  url: string;
  caption?: string | null;
  categoryId?: number | null;
  category?: { id: number; name: string; slug: string } | null;
}

interface GalleryViewerProps {
  initialItems: GalleryPhoto[];
  categories?: Array<{ id: number; name: string; slug: string }>;
}

export default function GalleryViewer({
  initialItems = [],
  categories = [],
}: GalleryViewerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Filter items
  const filteredItems = initialItems.filter((item) => {
    if (selectedCategory === 'all') return true;
    if (item.category?.slug === selectedCategory) return true;
    if (String(item.categoryId) === selectedCategory) return true;
    return false;
  });

  const activePhoto = activePhotoIndex !== null ? filteredItems[activePhotoIndex] : null;

  const handlePrev = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! > 0 ? prev! - 1 : filteredItems.length - 1));
  }, [activePhotoIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! < filteredItems.length - 1 ? prev! + 1 : 0));
  }, [activePhotoIndex, filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') setActivePhotoIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, handlePrev, handleNext]);

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (activePhotoIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activePhotoIndex]);

  // Category counts
  const getCategoryCount = (slugOrId: string) => {
    if (slugOrId === 'all') return initialItems.length;
    return initialItems.filter(
      (item) => item.category?.slug === slugOrId || String(item.categoryId) === slugOrId
    ).length;
  };

  return (
    <div className="space-y-12">
      
      {/* Category Tabs: Smooth swipe on mobile, centered on desktop */}
      <div className="flex items-center sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 px-1 max-w-full scrollbar-none">
        <button
          type="button"
          onClick={() => {
            setSelectedCategory('all');
            setActivePhotoIndex(null);
          }}
          className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 shrink-0 whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/25 scale-105'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-xs'
          }`}
        >
          <span>All Campus Photos</span>
          <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
            selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
          }`}>
            {getCategoryCount('all')}
          </span>
        </button>

        {categories.map((cat) => {
          const count = getCategoryCount(cat.slug);
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.slug);
                setActivePhotoIndex(null);
              }}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 shrink-0 whitespace-nowrap ${
                selectedCategory === cat.slug
                  ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/25 scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-xs'
              }`}
            >
              <span>{cat.name}</span>
              {count > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  selectedCategory === cat.slug ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-3">
          <ImageIcon className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No photos in this category yet</h3>
          <p className="text-xs text-slate-500">Please choose &quot;All Campus Photos&quot; to view our institute gallery.</p>
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
          >
            Show All Photos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActivePhotoIndex(index)}
              className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-900">
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Dark gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-black/20 opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Top Badge (Category) */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-black/50 text-white backdrop-blur-md border border-white/20 shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>{item.category?.name || 'Campus Moment'}</span>
                  </span>
                </div>

                {/* Top Right Zoom Icon */}
                <div className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-white/30 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-md">
                  <ZoomIn className="w-4 h-4" />
                </div>

                {/* Location / Campus Stamp */}
                <div className="absolute bottom-3 right-3.5 z-10 flex items-center gap-1 text-[11px] font-semibold text-white/90 bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-xs">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>Lalitpur Campus</span>
                </div>
              </div>

              {/* Text Card Details */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3 bg-white">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-900 transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                      {item.caption}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-blue-800 font-extrabold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Click to view in HD</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-slate-400 font-medium">Bright Future Institute</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 animate-in fade-in duration-200 select-none"
          onClick={() => setActivePhotoIndex(null)}
        >
          {/* Lightbox Topbar */}
          <div 
            className="flex items-center justify-between gap-4 text-white z-20 pb-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-white backdrop-blur-md border border-white/20">
                {activePhoto.category?.name || 'Photo Gallery'}
              </span>
              <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                Photo {activePhotoIndex! + 1} of {filteredItems.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/admission"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Book Free Demo</span>
              </Link>

              <button
                type="button"
                onClick={() => setActivePhotoIndex(null)}
                aria-label="Close Lightbox"
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Center Image Stage */}
          <div 
            className="relative flex-1 flex items-center justify-center w-full max-h-[72vh] my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous photo"
              className="absolute left-1 sm:left-4 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-all hover:scale-110 border border-white/20 shadow-2xl cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next photo"
              className="absolute right-1 sm:right-4 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-all hover:scale-110 border border-white/20 shadow-2xl cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>

            {/* Active Image */}
            <div className="relative w-full h-full max-w-5xl flex items-center justify-center p-2">
              <div className="relative w-full h-full max-h-[68vh] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <Image
                  src={activePhoto.url}
                  alt={activePhoto.title}
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </div>
            </div>
          </div>

          {/* Lightbox Bottom Details Bar */}
          <div 
            className="bg-slate-900/90 border border-white/10 rounded-2xl p-4 sm:p-5 max-w-4xl mx-auto w-full text-white z-20 space-y-2 backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-base sm:text-xl font-black text-white leading-tight">
                {activePhoto.title}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold shrink-0">
                <MapPin className="w-4 h-4" />
                <span>Station Road &amp; Ghantaghar, Lalitpur</span>
              </div>
            </div>

            {activePhoto.caption && (
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activePhoto.caption}
              </p>
            )}

            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-400">
                Bright Future Competition Institute • Lalitpur (UP)
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="tel:9450067223"
                  className="text-amber-300 hover:underline font-bold flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call: 9450067223</span>
                </a>
                <Link
                  href="/admission"
                  className="text-blue-400 hover:text-white font-bold flex items-center gap-1 hover:underline"
                >
                  <span>Book 2-Day Free Demo →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campus Tour Visit Invitation Banner */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-5 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold text-amber-300 bg-white/10 border border-white/20 uppercase tracking-wider backdrop-blur-md">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            Personal Campus Visit
          </span>

          <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Want to Inspect Our Smart Classrooms &amp; Library in Person?
          </h3>

          <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
            Visit our Head Office behind Krishna Cinema, Station Road or Market Branch at Richariya Market, Ghantaghar. Meet our mentors, view previous selection rosters, and collect free sample study material.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/admission"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl font-extrabold text-xs uppercase tracking-wider shadow-lg transition-transform hover:scale-105"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Register for 2-Day Free Demo</span>
            </Link>

            <a
              href="tel:9450067223"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/15 hover:bg-white/25 text-white rounded-xl font-bold text-xs uppercase tracking-wider border border-white/20 backdrop-blur-md transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-amber-300" />
              <span>Call Helpline: +91 9450067223</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

