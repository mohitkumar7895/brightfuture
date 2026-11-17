'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  FileCheck2, 
  BookMarked, 
  Award,
  Library,
  MapPin,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import AnimatedSectionHeader from '@/components/ui/AnimatedSectionHeader';

interface FeatureItem {
  title: string;
  description: string;
}

interface WhyChooseUsProps {
  features?: FeatureItem[];
  aboutContent?: string;
}

export default function WhyChooseUs({
  aboutContent,
}: WhyChooseUsProps) {
  const edgeFeatures = [
    {
      icon: Users,
      badge: 'Experienced',
      title: 'Expert Subject Specialist Faculty',
      description: 'Mentors with over 10 to 14 years of proven competitive coaching experience in Maths, Reasoning, General Studies, and Hindi.',
      link: '/faculty',
      linkLabel: 'Meet faculty mentors',
    },
    {
      icon: FileCheck2,
      badge: 'Real Simulation',
      title: 'Weekly OMR Sunday Mock Tests',
      description: 'Full-length simulated test papers based on the latest UP Police and SSC TCS patterns with negative marking & district rankings.',
      link: '/admission',
      linkLabel: 'Register for mock test',
    },
    {
      icon: BookMarked,
      badge: 'Comprehensive',
      title: 'High-Yield Printed Study Modules',
      description: 'Concise, updated printed booklets, topic-wise formula sheets, and 10-year previous question banks given to every enrolled student.',
      link: '/courses',
      linkLabel: 'Explore course materials',
    },
    {
      icon: Library,
      badge: 'Facility',
      title: 'Disciplined Library & Study Hall',
      description: 'Quiet, air-cooled study environment equipped with competitive journals, reference books, and focused study spaces.',
      link: '/gallery',
      linkLabel: 'View campus facilities',
    },
    {
      icon: MapPin,
      badge: 'Convenient',
      title: 'Dual Central Branches in Lalitpur',
      description: 'Choose your preferred branch: Station Road Head Office (Behind Krishna Cinema) or Market Branch (Richariya Market, Ghantaghar).',
      link: '/contact',
      linkLabel: 'View branch directions',
    },
    {
      icon: HelpCircle,
      badge: '1-on-1 Mentorship',
      title: 'Personalized Daily Doubt Clearing',
      description: 'One-on-one sessions every afternoon to resolve difficult problems and ensure zero learning gaps in any concept.',
      link: '/admission',
      linkLabel: 'Book free demo class',
    },
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-slate-50/90 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Section Header */}
        <AnimatedSectionHeader
          className="max-w-3xl mb-8 sm:mb-12"
          badge={
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold text-blue-900 bg-blue-100 uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-blue-700" />
              The Bright Future Edge
            </span>
          }
          title={
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Why Hundreds of Lalitpur’s <span className="text-blue-700">Top Aspirants</span> Choose Us
            </h2>
          }
          subtitle={
            <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed max-w-3xl mx-auto">
              Bright Future Competition Institute was founded with a singular mission: to provide the highest standard of competitive examination coaching right here in Lalitpur, so students do not need to migrate to distant metro cities. With an unbeatable record of selections in UP Police, SSC, and Railways, our experienced educators combine concept mastery, speed hacks, and disciplined mock test series.
            </p>
          }
        />

        {/* Institute Milestones & New Batch Alerts Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
          {/* Milestone 1: Start 14 July 2002 */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-blue-200/80 shadow-xs flex flex-col justify-center items-center text-center relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="w-2 h-2 rounded-full bg-blue-600 absolute top-3 right-3 animate-ping" />
            <span className="text-xl sm:text-2xl font-black text-blue-950 tracking-tight leading-none">
              14 July 2002
            </span>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider mt-1.5">
              Foundation Date
            </span>
            <span className="mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
              24 Years Completed
            </span>
          </div>

          {/* Milestone 2: 10,000 Students Choice */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-200/80 shadow-xs flex flex-col justify-center items-center text-center relative overflow-hidden group hover:shadow-md transition-shadow">
            <span className="text-xl sm:text-2xl font-black text-emerald-700 tracking-tight leading-none">
              10,000+
            </span>
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-1.5">
              Students&apos; Choice
            </span>
            <span className="mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">
              Across Bundelkhand
            </span>
          </div>

          {/* Milestone 3: Market Branch New Batch */}
          <div className="bg-gradient-to-br from-blue-900 via-blue-950 to-slate-900 text-white p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col justify-center items-center text-center border border-blue-800/80 relative overflow-hidden">
            <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 text-[9px] font-black uppercase tracking-wider">
              New Batch
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200">
              Market Branch (Ghantaghar)
            </span>
            <span className="text-lg sm:text-xl font-black text-amber-300 leading-tight mt-1">
              Morning 7:00 AM
            </span>
            <span className="text-[10px] text-slate-300 mt-1 font-medium">
              Daily Target &amp; Concept Batch
            </span>
          </div>

          {/* Milestone 4: Head Office Branch New Batch */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col justify-center items-center text-center border border-slate-700 relative overflow-hidden">
            <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-emerald-400 text-slate-950 text-[9px] font-black uppercase tracking-wider">
              New Batch
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200">
              Head Office (Station Road)
            </span>
            <span className="text-lg sm:text-xl font-black text-emerald-300 leading-tight mt-1">
              Evening 3:30 PM
            </span>
            <span className="text-[10px] text-slate-300 mt-1 font-medium">
              Speed Tests &amp; Doubt Clearing
            </span>
          </div>
        </div>

        {/* 6 Core Edge Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {edgeFeatures.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shadow-xs">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold text-blue-900 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 mb-1.5 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <Link
                    href={item.link}
                    prefetch={true}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-amber-600 transition-colors group"
                  >
                    <span>{item.linkLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
