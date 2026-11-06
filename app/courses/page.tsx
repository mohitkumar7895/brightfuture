import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import db from '@/lib/db';
import { Clock, Users, ArrowRight, Sparkles, BookOpen, Tag } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';


export async function generateMetadata() {
  const seo = await db.seoMetadata.findUnique({ where: { pageSlug: '/courses' } }).catch(() => null);
  return {
    title: seo?.metaTitle || 'Competitive Exam Courses | Bright Future Institute Lalitpur',
    description: seo?.metaDescription || 'Explore target batches for UP Police, SSC, Railways, and UPSSSC at Bright Future Lalitpur.',
  };
}

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const [categories, courses] = await Promise.all([
    db.courseCategory.findMany({
      orderBy: { id: 'asc' },
    }).catch(() => []),
    db.course.findMany({
      where: {
        isPublished: true,
        ...(category ? { category: { slug: category } } : {}),
      },
      orderBy: [{ isFeatured: 'desc' }, { id: 'asc' }],
      include: { category: true },
    }).catch(() => []),
  ]);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Banner */}
      <section className="bg-gradient-to-br from-[#0B2545] via-[#134074] to-[#1E3A8A] text-white py-16 text-center relative overflow-hidden">
        {/* Glow circles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold text-amber-300 bg-white/10 border border-white/20 uppercase tracking-wider backdrop-blur-md">
            <BookOpen className="w-3.5 h-3.5" />
            Curriculum & Batches
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Our Competitive Exam Courses
          </h1>
          <p className="text-blue-100/90 text-sm sm:text-base max-w-2xl mx-auto">
            Choose your target government examination and prepare with structured syllabus planning, expert mentorship, and daily test practice.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-md flex items-center gap-2 overflow-x-auto">
          <Link
            href="/courses"
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
              !category
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            All Courses ({courses.length})
          </Link>
          {categories.map((cat) => {
            const isActive = category === cat.slug;
            return (
              <Link
                key={cat.id}
                href={`/courses?category=${cat.slug}`}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Course List Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {courses.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
            <p className="text-slate-600 text-sm">No courses found in this category.</p>
            <Link href="/courses" className="mt-4 inline-block text-xs font-bold text-blue-800 underline">
              View All Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => {
              const hasDiscount = course.discountFee && course.discountFee < course.fee;
              return (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <Image
                        src={course.image || '/images/hero-classroom.jpg'}
                        alt={course.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                      
                      <div className="absolute top-3.5 left-3.5">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold text-white bg-blue-900/90 backdrop-blur-xs uppercase tracking-wider">
                          {course.category?.name || 'Target Batch'}
                        </span>
                      </div>

                      {course.isFeatured && (
                        <div className="absolute top-3.5 right-3.5">
                          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold text-slate-950 bg-amber-400 uppercase tracking-wider">
                            Popular
                          </span>
                        </div>
                      )}

                      <div className="absolute bottom-3 left-3.5 flex items-center gap-1.5 text-xs font-semibold text-white">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-800 transition-colors line-clamp-2 leading-snug">
                        {course.title}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {course.shortDescription || 'Comprehensive target preparation with tests and study booklets.'}
                      </p>

                      {/* Compact Features Pill Row */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-600">
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

                  <div className="p-5 pt-0 border-t border-slate-100 mt-2 space-y-3">
                    <div className="flex items-baseline justify-between pt-3">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase block font-semibold">Fee</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-black text-slate-900">
                            {formatCurrency(course.discountFee || course.fee)}
                          </span>
                          {hasDiscount && (
                            <span className="text-xs text-slate-400 line-through">
                              {formatCurrency(course.fee)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/courses/${course.slug}`}
                        className="w-full text-center py-2 px-3 rounded-xl text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200/60 transition-colors"
                      >
                        Details
                      </Link>
                      <Link
                        href={`/admission?course=${course.id}`}
                        className="w-full text-center py-2 px-3 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-sm transition-all uppercase tracking-wider"
                      >
                        Enquire
                      </Link>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

