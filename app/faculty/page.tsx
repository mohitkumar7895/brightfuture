import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import db from '@/lib/db';
import { GraduationCap, Award, BookOpen, Clock, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata() {
  const seo = await db.seoMetadata.findUnique({ where: { pageSlug: '/faculty' } }).catch(() => null);
  return {
    title: seo?.metaTitle || 'Expert Faculty Members | Bright Future Competition Institute',
    description: seo?.metaDescription || 'Meet our experienced educators and mentors in Lalitpur.',
  };
}

export default async function FacultyPage() {
  const faculty = await db.faculty.findMany({
    where: { isPublished: true },
    orderBy: [{ order: 'asc' }, { id: 'asc' }],
  }).catch(() => []);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Banner */}
      <section className="bg-gradient-to-br from-[#0B2545] via-[#134074] to-[#1E3A8A] text-white py-12 sm:py-16 text-center relative overflow-hidden">
        {/* Glow circles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 sm:space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold text-amber-300 bg-white/10 border border-white/20 uppercase tracking-wider backdrop-blur-md">
            <GraduationCap className="w-3.5 h-3.5" />
            Our Mentors &amp; Educators
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Meet the Faculty Behind Top Selections
          </h1>
          <p className="text-blue-100/90 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Our subject specialist mentors bring decades of combined competitive coaching experience, concept clarity, and proven shortcut methodologies.
          </p>
        </div>
      </section>

      {/* Real Faculty Team Showcase Feature */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 border border-slate-800 shadow-xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-white">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-amber-300 bg-amber-400/10 border border-amber-400/20 uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                Dedicated Mentorship Team
              </span>
              <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white">
                Faculty Mentors &amp; Educators at Lalitpur Campus
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Direct classroom guidance by subject specialists in Mathematics, Reasoning, General Studies, Hindi, and Science. Every batch is mentored under strict examination conditions with weekly performance tracking and personal doubt resolution.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-bold text-slate-200">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Concept-First Shortcut Methods
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Sunday OMR Mock Test Series
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  Weekly Doubt Counters
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                <Image
                  src="/images/faculty/faculty-team-mentors.jpg"
                  alt="Bright Future Competition Institute faculty mentors team with topper student"
                  fill
                  quality={100}
                  unoptimized={true}
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Profiles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {faculty.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden">
                  <Image
                    src={mentor.photo || '/images/faculty-teaching.jpg'}
                    alt={mentor.name}
                    fill
                    quality={100}
                    unoptimized={true}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3.5 right-3.5">
                    <span className="px-3 py-1 rounded-full text-[11px] font-extrabold text-blue-950 bg-white/95 backdrop-blur-md shadow-sm border border-slate-200/60 uppercase tracking-wider">
                      {mentor.experience}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3 sm:space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 leading-tight">
                      {mentor.name}
                    </h3>
                    <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mt-1">
                      {mentor.designation}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Award className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="font-semibold">{mentor.qualification}</span>
                  </div>

                  <div className="bg-slate-50 p-3 sm:p-3.5 rounded-2xl border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Subjects Handled:</span>
                    <p className="text-xs font-bold text-slate-900">{mentor.subjects}</p>
                  </div>

                  {mentor.bio && (
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {mentor.bio}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0">
                <Link
                  href="/admission"
                  className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-900 hover:text-white transition-colors"
                >
                  Book Demo Class with {mentor.name.split(' ')[0]}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

