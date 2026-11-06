'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Clock, 
  Users, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';
import AnimatedSectionHeader from '@/components/ui/AnimatedSectionHeader';

export interface CourseItem {
  id: number;
  title: string;
  slug: string;
  shortDescription?: string | null;
  duration: string;
  subjects?: string | null;
  fee: number;
  discountFee?: number | null;
  batchInfo?: string | null;
  image?: string | null;
  isFeatured?: boolean;
  category?: { name: string; slug: string } | null;
}

interface PopularCoursesProps {
  courses?: CourseItem[];
}

export default function PopularCourses({ courses = [] }: PopularCoursesProps) {
  if (courses.length === 0) return null;

  return (
    <section className="py-8 sm:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-9">
          <AnimatedSectionHeader
            align="left"
            className="max-w-2xl"
            badge={
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold text-blue-900 bg-blue-100 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                नए टारगेट बैच • Admissions Open 2026
              </span>
            }
            title={
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                प्रमुख प्रतियोगी परीक्षा कोर्स • <span className="text-blue-700">Target Batches</span>
              </h2>
            }
            subtitle={
              <p className="text-slate-600 text-xs sm:text-sm font-medium">
                UP Police, SSC, रेलवे और UPSSSC की नवीनतम परीक्षा पैटर्न पर आधारित नियमित कक्षाएं।
              </p>
            }
          />

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all uppercase tracking-wider shrink-0"
          >
            <span>सभी कोर्स देखें</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.slice(0, 6).map((course) => {
            return (
              <div
                key={course.id}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail with Badge */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={course.image || '/images/hero-classroom.jpg'}
                      alt={course.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    
                    {/* Category Pill */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold text-white bg-blue-900/90 backdrop-blur-xs uppercase tracking-wider shadow-xs">
                        {course.category?.name || 'Target Batch'}
                      </span>
                    </div>

                    {/* Featured Tag */}
                    {course.isFeatured && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold text-slate-950 bg-amber-400 uppercase tracking-wider shadow-xs">
                          Popular
                        </span>
                      </div>
                    )}

                    {/* Duration badge */}
                    <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-xs font-semibold text-white">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Course Details Content */}
                  <div className="p-4 space-y-2.5">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1 leading-snug">
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {course.shortDescription || 'Complete target preparation with daily practice sheets and OMR mock tests.'}
                    </p>

                    {/* Features Pill Row */}
                    <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[11px] text-slate-600">
                      <span className="inline-flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md font-medium text-slate-700">
                        <Clock className="w-3 h-3 text-blue-700" />
                        {course.duration}
                      </span>
                      {course.batchInfo && (
                        <span className="inline-flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-md font-medium text-blue-800">
                          <Users className="w-3 h-3 text-blue-700" />
                          Regular Batches
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Buttons - NO FEE DISPLAY */}
                <div className="p-4 pt-2 border-t border-slate-100">
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="w-full text-center py-2 px-3 rounded-xl text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200/60 transition-colors"
                    >
                      पाठ्यक्रम देखें
                    </Link>
                    <Link
                      href={`/admission?course=${course.id}`}
                      className="w-full text-center py-2 px-3 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-xs transition-all uppercase tracking-wider"
                    >
                      डेमो / एडमिशन
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
