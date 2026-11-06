import React from 'react';
import Link from 'next/link';
import db from '@/lib/db';
import { Bell, Pin, Calendar, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';


export async function generateMetadata() {
  const seo = await db.seoMetadata.findUnique({ where: { pageSlug: '/notices' } }).catch(() => null);
  return {
    title: seo?.metaTitle || 'Notices & Announcements | Bright Future Competition Institute',
    description: seo?.metaDescription || 'Latest exam notices, batch schedules, and announcements at Bright Future Lalitpur.',
  };
}

export default async function NoticesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const notices = await db.notice.findMany({
    where: {
      isPublished: true,
      ...(category ? { category } : {}),
    },
    orderBy: [{ isPinned: 'desc' }, { publishDate: 'desc' }],
  }).catch(() => []);

  const categories = [
    { label: 'All Notices', value: '' },
    { label: 'Admissions', value: 'ADMISSION' },
    { label: 'Exams & Tests', value: 'EXAM' },
    { label: 'General', value: 'GENERAL' },
    { label: 'Events & Seminars', value: 'EVENT' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Banner */}
      <section className="bg-gradient-to-br from-[#0B2545] via-[#134074] to-[#1E3A8A] text-white py-16 text-center relative overflow-hidden">
        {/* Glow circles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold text-amber-300 bg-white/10 border border-white/20 uppercase tracking-wider backdrop-blur-md">
            <Bell className="w-3.5 h-3.5" />
            Official Bulletin
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Notices & Exam Updates
          </h1>
          <p className="text-blue-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Stay informed with verified timetable changes, new batch schedules, mock test dates, and government exam circulars.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-md flex items-center gap-2 overflow-x-auto">
          {categories.map((cat) => {
            const isActive = (!category && cat.value === '') || category === cat.value;
            return (
              <Link
                key={cat.label}
                href={cat.value ? `/notices?category=${cat.value}` : '/notices'}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Notices List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 hover:shadow-lg flex flex-col justify-between ${
                notice.isPinned
                  ? 'bg-amber-50/50 border-amber-300 shadow-xs'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase bg-blue-100 text-blue-900">
                      {notice.category}
                    </span>
                    {notice.isPinned && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase bg-amber-400 text-slate-950">
                        <Pin className="w-3 h-3 fill-slate-950" />
                        Important
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(notice.publishDate)}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {notice.title}
                </h3>

                <div
                  className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2"
                  dangerouslySetInnerHTML={{ __html: notice.content }}
                />
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href="/admission"
                  className="text-xs font-bold text-blue-800 hover:text-amber-600 transition-colors flex items-center gap-1"
                >
                  <span>Enquire / Register for this notification</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

