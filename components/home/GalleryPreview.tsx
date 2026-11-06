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
    <section className="py-12 sm:py-16 bg-slate-50/90 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold text-blue-900 hover:text-white bg-blue-50 hover:bg-blue-900 border border-blue-200 shadow-xs hover:shadow-md transition-all uppercase tracking-wider shrink-0"
          >
            <span>View All Photos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Gallery Grid: 2 cols on mobile, 3 cols on tablet/desktop for generous photo size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {items.slice(0, 6).map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-200/80 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden">
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-600 opacity-90 group-hover:opacity-100"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

                {/* Category Pill */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider bg-black/50 backdrop-blur-md border border-white/20">
                    {item.category?.name || 'Campus Moment'}
                  </span>
                </div>

                {/* Zoom icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/25 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ZoomIn className="w-4 h-4" />
                </div>

                {/* Caption text */}
                <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
                  <h3 className="text-sm font-extrabold line-clamp-1 leading-snug drop-shadow-xs">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-[11px] text-slate-300 line-clamp-1">
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
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors shadow-lg cursor-pointer"
              aria-label="Close image modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] w-full bg-black">
              <Image
                src={selectedImage.url}
                alt={selectedImage.title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <div className="p-6 bg-slate-900 text-white space-y-1.5">
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
