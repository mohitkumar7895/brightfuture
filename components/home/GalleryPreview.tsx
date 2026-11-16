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

                {/* Category Pill */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/20">
                    {item.category?.name || 'Campus Moment'}
                  </span>
                </div>

                {/* Zoom icon */}
                <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/20">
                  <ZoomIn className="w-4 h-4 text-amber-300" />
                </div>

                {/* Caption text */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/10 text-white space-y-0.5">
                  <h3 className="text-xs sm:text-sm font-extrabold line-clamp-1 leading-snug drop-shadow-xs">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-[10px] sm:text-[11px] text-slate-300 line-clamp-1">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90dvh] bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 sm:p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors shadow-lg cursor-pointer"
              aria-label="Close image modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="relative aspect-[16/10] w-full bg-slate-950 shrink-0 min-h-[260px] max-h-[66dvh] flex items-center justify-center">
              <Image
                src={selectedImage.url}
                alt={selectedImage.title}
                fill
                priority
                unoptimized={true}
                quality={100}
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <div className="p-4 sm:p-6 bg-slate-900 text-white space-y-1.5 overflow-y-auto">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {selectedImage.category?.name || 'Campus Infrastructure'}
                </span>
                <span className="text-xs text-slate-400">Bright Future Institute • Lalitpur</span>
              </div>
              <h3 className="text-lg font-bold">{selectedImage.title}</h3>
              {selectedImage.caption && (
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedImage.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
