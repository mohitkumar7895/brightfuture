import React from 'react';
import Link from 'next/link';
import { Bell, Pin, Calendar, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import AnimatedSectionHeader from '@/components/ui/AnimatedSectionHeader';

export interface NoticeItem {
  id: number;
  title: string;
  content: string;
  category: string;
  isPinned: boolean;
  publishDate: string | Date;
}

interface NoticesSectionProps {
  notices?: NoticeItem[];
}

export default function NoticesSection({ notices = [] }: NoticesSectionProps) {
  if (notices.length === 0) return null;

  return (
    <section className="py-10 sm:py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <AnimatedSectionHeader
            align="left"
            className="max-w-2xl"
            badge={
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold text-amber-900 bg-amber-100 uppercase tracking-wider">
                <Bell className="w-3.5 h-3.5 text-amber-700" />
                Notice Board • Announcements
              </span>
            }
            title={
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Latest Notifications &amp; <span className="text-blue-700">Exam Updates</span>
              </h2>
            }
            subtitle={
              <p className="text-slate-600 text-xs sm:text-sm font-medium">
                Stay informed with upcoming batch schedules, Sunday open mock test dates, and scholarship announcements in Lalitpur.
              </p>
            }
          />

          <Link
            href="/notices"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 hover:shadow-lg transition-all uppercase tracking-wider shrink-0"
          >
            <span>All Notifications</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Notices Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {notices.slice(0, 4).map((notice) => (
            <div
              key={notice.id}
              className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg flex flex-col justify-between ${
                notice.isPinned
                  ? 'bg-amber-50/40 border-amber-300/80 shadow-xs'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase bg-blue-100 text-blue-800">
                      {notice.category}
                    </span>
                    {notice.isPinned && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase bg-amber-400 text-slate-950 shadow-xs">
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

                <h3 className="text-base font-bold text-slate-900 hover:text-blue-800 transition-colors">
                  {notice.title}
                </h3>

                <div
                  className="text-xs text-slate-600 line-clamp-3 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: notice.content }}
                />
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href="/admission"
                  className="text-xs font-bold text-blue-800 hover:text-amber-600 transition-colors flex items-center gap-1"
                >
                  <span>Enquire about this batch</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

