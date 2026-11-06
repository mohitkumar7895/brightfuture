'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trophy, ArrowRight } from 'lucide-react';
import AnimatedSectionHeader from '@/components/ui/AnimatedSectionHeader';

export interface ResultItem {
  id: number;
  studentName: string;
  examName: string;
  rank?: string | null;
  year: number;
  photo?: string | null;
  description?: string | null;
}

interface AchievementsSectionProps {
  results?: ResultItem[];
}

export default function AchievementsSection({ results = [] }: AchievementsSectionProps) {
  if (results.length === 0) return null;

  return (
    <section className="py-8 sm:py-10 bg-slate-50/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-9">
          <AnimatedSectionHeader
            align="left"
            className="max-w-2xl"
            badge={
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 uppercase tracking-wider shadow-xs">
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                चयनित छात्र • Recent Selections
              </span>
            }
            title={
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                हमारे गौरव • <span className="text-blue-700">Hall of Fame</span>
              </h2>
            }
            subtitle={
              <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                ब्राइट फ्यूचर से पढ़कर उत्तर प्रदेश पुलिस, SSC एवं रेलवे में चयनित ललितपुर के सफल अभ्यर्थी।
              </p>
            }
          />

          <Link
            href="/results"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all uppercase tracking-wider shrink-0 shadow-md shadow-blue-600/20"
          >
            <span>सभी चयन सूची देखें</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Toppers Cards Grid - Text directly ON TOP of Image */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {results.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 bg-slate-900 border border-slate-200"
            >
              {/* Student Photo */}
              <Image
                src={item.photo || '/images/student-toppers.jpg'}
                alt={item.studentName}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover group-hover:scale-108 transition-transform duration-500"
              />

              {/* Top Tag - Year of Selection */}
              <div className="absolute top-2.5 left-2.5 z-10">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-400 text-slate-950 shadow-sm">
                  {item.year}
                </span>
              </div>

              {/* Bottom Gradient Overlay with Main Info Written Directly On The Image */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex flex-col justify-end p-3 sm:p-3.5 z-10 text-left">
                <h3 className="text-sm sm:text-base font-black text-white leading-tight group-hover:text-amber-300 transition-colors truncate drop-shadow-sm">
                  {item.studentName}
                </h3>

                <p className="text-[11px] sm:text-xs font-bold text-amber-300 leading-tight truncate mt-0.5">
                  {item.examName}
                </p>

                {item.rank && (
                  <p className="text-[10px] sm:text-[11px] text-blue-200 font-medium leading-tight truncate mt-1">
                    {item.rank}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
