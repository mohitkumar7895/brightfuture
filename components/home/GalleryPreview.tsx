'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ImageIcon, ArrowRight, X, ZoomIn, MapPin, Sparkles } from 'lucide-react';
import AnimatedSectionHeader from '@/components/ui/AnimatedSectionHeader';

export interface GalleryItemPreview {
  id: number;
  title: string;
  type: string;
  url: string;
  caption?: string | null;
  category?: { name: string } | null;
}

interface GalleryPreviewProps {
  items?: GalleryItemPreview[];
}

export default function GalleryPreview({ items = [] }: GalleryPreviewProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryItemPreview | null>(null);

  // Lock background scroll when image modal is open
  React.useEffect(() => {
    if (selectedImage !== null) {
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
  }, [selectedImage]);

  if (items.length === 0) return null;

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-slate-50/90 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <AnimatedSectionHeader
            align="left"
            className="max-w-2xl"
            badge={
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-blue-900 bg-blue-100 uppercase tracking-wider">
                <ImageIcon className="w-3.5 h-3.5 text-blue-700" />
                Campus Infrastructure &amp; Life
              </span>
            }
            title={
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Classrooms, Library &amp; Toppers
              </h2>
            }
            subtitle={
              <p className="text-slate-600 text-xs sm:text-sm">
                A glimpse into our focused academic environment, smart classrooms, Sunday mock test series, and celebratory moments in Lalitpur.
              </p>
            }
          />

          <Link
            href="/gallery"
            prefetch={true}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold text-blue-900 hover:text-white bg-blue-50 hover:bg-blue-900 border border-blue-200 shadow-xs hover:shadow-md transition-all uppercase tracking-wider shrink-0"
          >
            <span>View All Photos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Gallery Grid: 2 cols on mobile, 3 cols on tablet/desktop for generous photo size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items.slice(0, 6).map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-200/80 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
                {/* Ambient Blurred Background */}
                <Image
                  src={item.url}
                  alt=""
                  fill
                  unoptimized={true}
                  aria-hidden="true"
                  className="object-cover blur-xl scale-125 opacity-25 pointer-events-none"
                />

                {/* 100% Full Uncropped HD Image */}
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  unoptimized={true}
                  quality={100}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-out select-none"
                />

                {/* Zoom icon */}
                <div className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/20">
                  <ZoomIn className="w-4 h-4 text-amber-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal - Compact Modal with 100% Full Uncropped Image */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 select-none touch-none overscroll-contain cursor-pointer"
          onClick={() => setSelectedImage(null)}
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
              onClick={() => setSelectedImage(null)}
              className="absolute top-3.5 right-3.5 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 hover:bg-rose-600 text-white flex items-center justify-center transition-all duration-200 cursor-pointer border border-white/20 shadow-lg hover:scale-110"
              aria-label="Close image modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Stage - Full uncropped photo */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full max-h-[78vh] flex items-center justify-center rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950">
              {/* Soft ambient background */}
              <Image
                src={selectedImage.url}
                alt=""
                fill
                unoptimized={true}
                aria-hidden="true"
                className="object-cover blur-xl scale-110 opacity-30 pointer-events-none"
              />

              {/* 100% Full Uncropped Image */}
              <Image
                src={selectedImage.url}
                alt={selectedImage.title || 'Campus Image'}
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
    </section>
  );
}
