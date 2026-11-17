'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ZoomIn, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  GraduationCap, 
  Award, 
  PhoneCall, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { getImageUrl } from '@/lib/utils';

export interface FacultyMember {
  id: number;
  name: string;
  designation?: string | null;
  qualification?: string | null;
  experience?: string | null;
  subjects?: string | null;
  bio?: string | null;
  photo?: string | null;
  updatedAt?: string;
}

interface FacultyViewerProps {
  faculty: FacultyMember[];
}

export default function FacultyViewer({ faculty = [] }: FacultyViewerProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const activePhoto = activePhotoIndex !== null ? faculty[activePhotoIndex] : null;

  const handlePrev = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! > 0 ? prev! - 1 : faculty.length - 1));
  }, [activePhotoIndex, faculty.length]);

  const handleNext = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! < faculty.length - 1 ? prev! + 1 : 0));
  }, [activePhotoIndex, faculty.length]);

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

  return (
    <div className="space-y-12">
      {/* Faculty Photos Grid - Pure Gallery Style */}
      {faculty.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-3">
          <GraduationCap className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No faculty photos uploaded yet</h3>
          <p className="text-xs text-slate-500">Faculty photos will appear here once added from the admin panel.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {faculty.map((mentor, index) => {
            const photoUrl = getImageUrl(mentor.photo, '/images/faculty-teaching.jpg', mentor.updatedAt);
            const hasCustomName = mentor.name && mentor.name !== 'Faculty Member' && mentor.name !== 'Faculty Mentor';

            return (
              <div
                key={mentor.id}
                onClick={() => setActivePhotoIndex(index)}
                className="group relative bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Photo Frame - Pure HD Portrait with Ambient Fill */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
                  {/* Ambient Blurred Background Fill */}
                  <Image
                    src={photoUrl}
                    alt=""
                    fill
                    unoptimized={true}
                    aria-hidden="true"
                    className="object-cover blur-xl scale-125 opacity-30 pointer-events-none"
                  />

                  {/* 100% Full Photo - Crisp HD & Never Cropped */}
                  <Image
                    src={photoUrl}
                    alt={mentor.name || 'Faculty Member'}
                    fill
                    unoptimized={true}
                    quality={100}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-out select-none"
                  />

                  {/* Top Experience / Category Pill if available */}
                  {mentor.experience && mentor.experience !== 'Experienced' && (
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className="px-3 py-1 rounded-full text-[10px] font-extrabold text-blue-950 bg-white/95 backdrop-blur-md shadow-sm border border-slate-200/60 uppercase tracking-wider">
                        {mentor.experience}
                      </span>
                    </div>
                  )}

                  {/* Hover Zoom-In Pill */}
                  <div className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 shadow-md border border-white/20">
                    <ZoomIn className="w-4 h-4 text-amber-300" />
                  </div>

                  {/* Bottom Minimal Caption Overlay */}
                  <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-4 sm:p-5 text-white">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-base sm:text-lg font-black text-white truncate drop-shadow-sm">
                          {mentor.name || 'Faculty Mentor'}
                        </h3>
                        {mentor.designation && mentor.designation !== 'Educator' && (
                          <p className="text-xs font-bold text-amber-300 truncate mt-0.5">
                            {mentor.designation}
                          </p>
                        )}
                      </div>
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-white/80 bg-white/10 backdrop-blur-xs shrink-0 border border-white/10 uppercase tracking-wider">
                        Click to Zoom
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Interactive Lightbox Modal - Compact Framed Modal with Transparent Background */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 select-none touch-none overscroll-contain cursor-pointer"
          onClick={() => setActivePhotoIndex(null)}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Modal Container - Compact & Framed (Chota Sa Modal with 100% Full Image) */}
          <div
            className="relative w-full max-w-2xl lg:max-w-3xl bg-slate-950/90 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20 p-2 sm:p-3 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={() => setActivePhotoIndex(null)}
              aria-label="Close Lightbox"
              className="absolute top-3.5 right-3.5 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 hover:bg-rose-600 text-white flex items-center justify-center transition-all duration-200 cursor-pointer border border-white/20 shadow-lg hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Arrows */}
            {faculty.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous Photo"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/70 hover:bg-blue-600 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-lg hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next Photo"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/70 hover:bg-blue-600 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-lg hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image Stage - Full Portrait Photo */}
            <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full max-h-[78vh] flex items-center justify-center rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950">
              {/* Soft ambient background */}
              <Image
                src={getImageUrl(activePhoto.photo, '/images/faculty-teaching.jpg', activePhoto.updatedAt)}
                alt=""
                fill
                unoptimized={true}
                aria-hidden="true"
                className="object-cover blur-xl scale-110 opacity-30 pointer-events-none"
              />

              {/* 100% Full Uncropped Image */}
              <Image
                src={getImageUrl(activePhoto.photo, '/images/faculty-teaching.jpg', activePhoto.updatedAt)}
                alt={activePhoto.name || 'Faculty Member'}
                fill
                priority
                unoptimized={true}
                quality={100}
                className="object-contain p-2 select-none drop-shadow-2xl"
                sizes="(max-width: 1024px) 95vw, 800px"
              />
            </div>

            {/* Bottom Caption Bar */}
            <div className="p-3 sm:p-4 text-center">
              <h4 className="text-base sm:text-lg font-black text-white">
                {activePhoto.name || 'Faculty Member'}
              </h4>
              {activePhoto.designation && (
                <p className="text-xs font-semibold text-blue-300 mt-0.5">
                  {activePhoto.designation}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
