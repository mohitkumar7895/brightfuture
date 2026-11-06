import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import db from '@/lib/db';
import { GraduationCap, Award, BookOpen, Clock, ArrowRight } from 'lucide-react';


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
      <section className="bg-gradient-to-br from-[#0B2545] via-[#134074] to-[#1E3A8A] text-white py-16 text-center relative overflow-hidden">
        {/* Glow circles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold text-amber-300 bg-white/10 border border-white/20 uppercase tracking-wider backdrop-blur-md">
            <GraduationCap className="w-3.5 h-3.5" />
            Our Mentors & Educators
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Meet the Faculty Behind Top Selections
          </h1>
          <p className="text-blue-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Our subject specialist mentors bring decades of combined competitive coaching experience, concept clarity, and proven shortcut methodologies.
          </p>
        </div>
      </section>

      {/* Faculty Profiles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faculty.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <Image
                    src={mentor.photo || '/images/faculty-teaching.jpg'}
                    alt={mentor.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[11px] font-bold text-amber-300 block uppercase tracking-wider">
                      {mentor.experience}
                    </span>
                    <h3 className="text-xl font-bold text-white leading-tight">
                      {mentor.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                    {mentor.designation}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Award className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{mentor.qualification}</span>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-700 block mb-1">Subjects Handled:</span>
                    <p className="text-xs font-semibold text-slate-900">{mentor.subjects}</p>
                  </div>

                  {mentor.bio && (
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {mentor.bio}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0">
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

