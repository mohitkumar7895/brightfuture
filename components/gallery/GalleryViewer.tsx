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
    const catMatch = categories.find((c) => c.slug === selectedCategory || String(c.id) === selectedCategory);
    if (catMatch && (item.categoryId === catMatch.id || item.category?.id === catMatch.id)) return true;
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

  // Lock background scroll when lightbox is open
  useEffect(() => {
    if (activePhotoIndex !== null) {
      const scrollY = window.scrollY;
      const originalBodyOverflow = document.body.style.overflow;
      const originalDocOverflow = document.documentElement.style.overflow;
      const originalPosition = document.body.style.position;
      const originalTop = document.body.style.top;
      const originalWidth = document.body.style.width;

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      return () => {
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.width = originalWidth;
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalDocOverflow;
        window.scrollTo(0, scrollY);
      };
    }
  }, [activePhotoIndex]);

  // Category counts
  const getCategoryCount = (slugOrId: string) => {
    if (slugOrId === 'all') return initialItems.length;
    const catMatch = categories.find((c) => c.slug === slugOrId || String(c.id) === slugOrId);
    return initialItems.filter(
      (item) =>
        item.category?.slug === slugOrId ||
        String(item.categoryId) === slugOrId ||
        (catMatch && (item.categoryId === catMatch.id || item.category?.id === catMatch.id))
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActivePhotoIndex(index)}
              className="group relative bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
            >
              {/* Image Frame - 100% Pure Full Uncropped HD Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
                {/* Ambient Blurred Background Fill */}
                <Image
                  src={item.url}
                  alt=""
                  fill
                  unoptimized={true}
                  aria-hidden="true"
                  className="object-cover blur-xl scale-125 opacity-25 pointer-events-none"
                />

                {/* 100% Full Photo - Crisp HD and Never Cropped */}
                <Image
                  src={item.url}
                  alt={item.title || 'Campus photo'}
                  fill
                  unoptimized={true}
                  quality={100}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-1.5 sm:p-2 group-hover:scale-105 transition-transform duration-500 ease-out select-none"
                />

                {/* Subtle Hover Zoom Icon */}
                <div className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-md border border-white/20">
                  <ZoomIn className="w-4 h-4 text-amber-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Interactive Lightbox Modal - Compact Modal with 100% Full Uncropped Image */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 select-none touch-none overscroll-contain cursor-pointer"
          onClick={() => setActivePhotoIndex(null)}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Modal Container - Compact & Framed (Chota Sa Modal) */}
          <div
            className="relative w-full max-w-3xl lg:max-w-4xl bg-slate-950/85 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20 p-2 sm:p-3 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button inside the modal frame */}
            <button
              type="button"
              onClick={() => setActivePhotoIndex(null)}
              aria-label="Close Lightbox"
              className="absolute top-3.5 right-3.5 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 hover:bg-rose-600 text-white flex items-center justify-center transition-all duration-200 cursor-pointer border border-white/20 shadow-lg hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Stage - Full uncropped photo */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full max-h-[78vh] flex items-center justify-center rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950">
              {/* Soft ambient background */}
              <Image
                src={activePhoto.url}
                alt=""
                fill
                unoptimized={true}
                aria-hidden="true"
                className="object-cover blur-xl scale-110 opacity-30 pointer-events-none"
              />

              {/* 100% Full Uncropped Image */}
              <Image
                src={activePhoto.url}
                alt={activePhoto.title || 'Campus Photo'}
                fill
                priority
                unoptimized={true}
                quality={100}
                className="object-contain p-1 sm:p-2 select-none drop-shadow-2xl"
                sizes="(max-width: 1024px) 95vw, 1000px"
              />
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
            Visit our Head Office behind Coffee House (Station Road), Market Branch at Richariya Market (Ghantaghar), or BFCI Digital Library (near Shiv Mandir). Meet our mentors, view previous selection rosters, and collect free sample study material.
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

