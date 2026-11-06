import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import db from '@/lib/db';
import { 
  GraduationCap, 
  Target, 
  Compass, 
  Clock, 
  Building2, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  BookMarked
} from 'lucide-react';
import BranchesMapSection from '@/components/home/BranchesMapSection';


export async function generateMetadata() {
  const seo = await db.seoMetadata.findUnique({ where: { pageSlug: '/about' } }).catch(() => null);
  return {
    title: seo?.metaTitle || 'About Us | Bright Future Competition Institute Lalitpur',
    description: seo?.metaDescription || 'Learn about Bright Future Competition Institute, our mission, expert faculty, and history in Lalitpur.',
  };
}

export default async function AboutPage() {
  const [content, settings] = await Promise.all([
    db.pageContent.findUnique({ where: { pageKey: 'about' } }).catch(() => null),
    db.websiteSetting.findFirst().catch(() => null),
  ]);

  return (
    <div className="bg-white">
      {/* Banner */}
      <section className="bg-gradient-to-br from-[#0B2545] via-[#134074] to-[#1E3A8A] text-white py-16 sm:py-20 relative overflow-hidden">
        {/* Glow circles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold text-amber-300 bg-white/10 border border-white/20 uppercase tracking-wider backdrop-blur-md">
            {content?.heroBadge || 'About Our Institution'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight">
            {content?.heroTitle || 'A Decade of Dedication & Unmatched Selections in Lalitpur'}
          </h1>
          <p className="text-blue-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {content?.heroSubtitle ||
              'Empowering Bundelkhand youth with top-tier competitive coaching right at home without needing to relocate.'}
          </p>
        </div>
      </section>

      {/* Institute Overview & Photo */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] border-4 border-white bg-slate-100">
                <Image
                  src="/images/institute-study.jpg"
                  alt="Bright Future Competition Institute study hall and library in Lalitpur"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-blue-900 text-white p-5 rounded-2xl shadow-xl hidden sm:block max-w-xs">
                <span className="text-2xl font-black text-amber-400 block">2012 - 2026</span>
                <span className="text-xs font-semibold text-blue-200">
                  Over a decade of academic integrity and student selections.
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block">
                Institute Overview
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {content?.aboutTitle || 'Transforming Ambition into Government Service Careers'}
              </h2>
              <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  {content?.aboutContent ||
                    'Bright Future Competition Institute was founded with a clear objective: to make high-quality competitive examination education accessible to every hardworking student in Lalitpur district. Through structured courses, concept-driven lectures, and daily test practice, we have produced officers across UP Police, SSC, Railways, and UPSSSC.'}
                </p>
                <p>
                  With two prime locations in Lalitpur — behind Krishna Cinema at Station Road and at Richariya Market near Ghantaghar — we provide state-of-the-art classroom facilities, a disciplined reference library, and individualized doubt-clearing sessions.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold">
                <div className="flex items-center gap-2 bg-slate-100 text-slate-800 px-3.5 py-2 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Govt. Exam Specialist Mentors</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 text-slate-800 px-3.5 py-2 rounded-xl">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>1,200+ Selected Students</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Mission */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold shadow-xs">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Our Mission</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {content?.mission ||
                  'To democratize competitive exam education in Bundelkhand by providing metro-quality mentorship, cutting-edge study resources, and ethical values at an accessible fee structure.'}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shadow-xs">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Our Vision</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {content?.vision ||
                  'To be recognized as Uttar Pradesh\'s premier coaching institution that transforms rural and semi-urban talent into competent government civil servants, police officers, and railway personnel.'}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* History & Pedagogy */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* History */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                Origin & Journey
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                Our History in Lalitpur
              </h3>
              <div className="text-slate-600 text-sm leading-relaxed space-y-3">
                <p>
                  {content?.history ||
                    'Founded in 2012 in Lalitpur by visionary educators, Bright Future Competition Institute started with just 25 ambitious students. Through unwavering focus on conceptual clarity and rigorous practice, the institute grew to become Lalitpur\'s most reputable coaching organization, producing hundreds of selections year after year across state and central examinations.'}
                </p>
                <p>
                  Today, alumni of Bright Future are actively serving as Sub-Inspectors, Police Constables, Revenue Lekhpals, Railway Station Masters, and Central Excise Inspectors across Uttar Pradesh and India.
                </p>
              </div>
            </div>

            {/* Teaching Methodology */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block">
                Pedagogical Framework
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                Our 4-Pillar Teaching Methodology
              </h3>
              <div className="text-slate-600 text-sm leading-relaxed space-y-3">
                <p>
                  {content?.methodology ||
                    'Our 4-Pillar Pedagogical System consists of: 1) Foundation Concept Teaching with visual diagrams; 2) Speed & Shortcut Calculation Drills; 3) Daily Practice Sheets (DPS) and Sunday OMR Mock Tests; 4) Individual Weak-Area Diagnosis and Mentoring.'}
                </p>
                <div className="space-y-2 pt-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Pillar 1: Concept Mastery from basics without rote learning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Pillar 2: Speed calculation tricks for 20-second problem solving</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Pillar 3: Regular OMR exam drills under real clock pressure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Pillar 4: Personal diagnosis of weak areas with custom action plan</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Modern Learning Facilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Institute Infrastructure
            </h2>
            <p className="text-slate-400 text-sm">
              Designed to provide students with a distraction-free, academic environment for high-focus preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-3">
              <Building2 className="w-8 h-8 text-amber-400" />
              <h4 className="text-lg font-bold text-white">Smart Classrooms</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Spacious, well-ventilated, high-resolution visual displays for diagram and map explanations, with comfortable seating.
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-3">
              <BookMarked className="w-8 h-8 text-blue-400" />
              <h4 className="text-lg font-bold text-white">Dedicated Study Hall & Library</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Quiet self-study rooms with thousands of competitive exam titles, journals, and mock papers open from 7:00 AM to 7:30 PM.
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-3">
              <Clock className="w-8 h-8 text-emerald-400" />
              <h4 className="text-lg font-bold text-white">Power Backup & Modern Safety</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Uninterrupted power generator backup, CCTV surveillance, clean drinking water, and separate common rooms for female aspirants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Branches Map */}
      <BranchesMapSection
        headOfficeAddress={settings?.headOfficeAddress}
        marketBranchAddress={settings?.marketBranchAddress}
        primaryPhone={settings?.primaryPhone}
        alternatePhones={settings?.alternatePhones}
        email={settings?.email}
        mapEmbedUrl={settings?.mapEmbedUrl || undefined}
      />
    </div>
  );
}

