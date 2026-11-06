import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import db from '@/lib/db';
import { Trophy, ShieldCheck, ArrowRight, Award } from 'lucide-react';


export async function generateMetadata() {
  const seo = await db.seoMetadata.findUnique({ where: { pageSlug: '/results' } }).catch(() => null);
  return {
    title: seo?.metaTitle || 'Results & Achievements | Bright Future Competition Institute',
    description: seo?.metaDescription || 'View student selections in UP Police, SSC, Railways, and UPSSSC at Bright Future Lalitpur.',
  };
}

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  const { year } = await searchParams;

  const results = await db.result.findMany({
    where: {
      ...(year && !isNaN(Number(year)) ? { year: Number(year) } : {}),
    },
    orderBy: [{ year: 'desc' }, { id: 'desc' }],
  }).catch(() => []);

  const years = [2025, 2024, 2023, 2022];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Banner */}
      <section className="bg-gradient-to-br from-[#0B2545] via-[#134074] to-[#1E3A8A] text-white py-16 text-center relative overflow-hidden">
        {/* Glow circles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold text-amber-300 bg-white/10 border border-white/20 uppercase tracking-wider backdrop-blur-md">
            <Trophy className="w-3.5 h-3.5" />
            Our Wall of Fame
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Student Results & Achievements
          </h1>
          <p className="text-blue-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Every selection reflects relentless dedication, rigorous mock test benchmarking, and targeted classroom mentoring at Bright Future Lalitpur.
          </p>
        </div>
      </section>

      {/* Year Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-md flex items-center gap-2 overflow-x-auto">
          <Link
            href="/results"
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
              !year
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Years ({results.length})
          </Link>
          {years.map((y) => (
            <Link
              key={y}
              href={`/results?year=${y}`}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                year === String(y)
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Year {y}
            </Link>
          ))}
        </div>
      </section>

      {/* Results Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="relative w-18 h-18 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-400/40 bg-slate-100 shadow-md">
                    <Image
                      src={item.photo || '/images/student-toppers.jpg'}
                      alt={item.studentName}
                      fill
                      sizes="72px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="min-w-0">
                    <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-100 text-amber-900 mb-1">
                      {item.year} Selection
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-900 transition-colors truncate">
                      {item.studentName}
                    </h3>
                    <p className="text-xs font-semibold text-blue-800 truncate">
                      {item.examName}
                    </p>
                  </div>
                </div>

                {item.rank && (
                  <div className="bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Post / Merit:</span>
                    <span className="font-bold text-slate-900">{item.rank}</span>
                  </div>
                )}

                {item.description && (
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    &ldquo;{item.description}&rdquo;
                  </p>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Alumnus
                </span>
                <span>Lalitpur (U.P.)</span>
              </div>
            </div>
          ))}
        </div>

        {/* Motivational Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-black">Want to See Your Photo in Our Hall of Fame?</h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Join the upcoming batch at Bright Future Competition Institute Lalitpur. Get direct guidance from our top faculty panel.
          </p>
          <div className="pt-2">
            <Link
              href="/admission"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all uppercase tracking-wider shadow-md"
            >
              <span>Enquire for Next Batch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

