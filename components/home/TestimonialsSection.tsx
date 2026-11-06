'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Quote, ShieldCheck } from 'lucide-react';
import AnimatedSectionHeader from '@/components/ui/AnimatedSectionHeader';

export interface TestimonialItem {
  id: number;
  studentName: string;
  examOrCourse: string;
  review: string;
  rating: number;
  photo?: string | null;
}

interface TestimonialsSectionProps {
  testimonials?: TestimonialItem[];
}

export default function TestimonialsSection({
  testimonials = [],
}: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-8 sm:py-10 bg-[#07132B] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Animated Header */}
        <AnimatedSectionHeader
          className="max-w-3xl mb-8 sm:mb-9"
          badge={
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              सफल छात्रों की जुबानी • Student Reviews
            </span>
          }
          title={
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              चयनित छात्रों के अनुभव • <span className="text-amber-400">Testimonials</span>
            </h2>
          }
          subtitle={
            <p className="text-slate-300 text-xs sm:text-sm font-medium">
              ब्राइट फ्यूचर कॉम्पिटिशन इंस्टीट्यूट ललितपुर से तैयारी कर सरकारी पदों पर चयनित छात्र-छात्राओं के अनुभव।
            </p>
          }
        />

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-400/50 transition-all duration-300 shadow-md group hover:-translate-y-1"
            >
              <div className="space-y-3">
                {/* Quote Icon & Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < (item.rating || 5)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-slate-600 group-hover:text-amber-400/40 transition-colors" />
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic line-clamp-4">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>

              {/* Student Details */}
              <div className="mt-4 pt-3 border-t border-slate-700/70 flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-amber-400/40 shrink-0 bg-slate-700">
                  <Image
                    src={item.photo || '/images/student-toppers.jpg'}
                    alt={item.studentName}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">
                    {item.studentName}
                  </h4>
                  <p className="text-[11px] text-blue-300 truncate">
                    {item.examOrCourse}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
