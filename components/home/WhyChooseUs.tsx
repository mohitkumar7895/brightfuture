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
    <section className="py-10 sm:py-14 bg-slate-50/90 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Section Header */}
        <AnimatedSectionHeader
          className="max-w-3xl mb-10 sm:mb-12"
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

        {/* 6 Core Edge Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {edgeFeatures.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
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
