'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GraduationCap, Award, ArrowRight } from 'lucide-react';
import AnimatedSectionHeader from '@/components/ui/AnimatedSectionHeader';

export interface FacultyMember {
  id: number;
  name: string;
  designation: string;
  qualification: string;
  experience: string;
  subjects: string;
  bio?: string | null;
  photo?: string | null;
}

interface FacultySectionProps {
  faculty?: FacultyMember[];
}

export default function FacultySection({ faculty = [] }: FacultySectionProps) {
  if (faculty.length === 0) return null;

  return (
    <section className="py-8 sm:py-10 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-9">
          <AnimatedSectionHeader
            align="left"
            className="max-w-2xl"
            badge={
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold text-blue-900 bg-blue-100 uppercase tracking-wider">
                <GraduationCap className="w-3.5 h-3.5 text-blue-700" />
                Expert Faculty • Specialist Mentors
              </span>
            }
            title={
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Learn from Experienced <span className="text-blue-700">Subject Mentors</span>
              </h2>
            }
            subtitle={
              <p className="text-slate-600 text-xs sm:text-sm font-medium">
                Mentors with 10 to 14+ years of coaching experience, teaching time management and exam shortcut techniques.
              </p>
            }
          />

          <Link
            href="/faculty"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all uppercase tracking-wider shrink-0"
          >
            <span>View All Faculty</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculty.slice(0, 3).map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
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
                  
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] font-bold text-amber-300 block uppercase tracking-wider">
                      {mentor.experience}
                    </span>
                    <h3 className="text-base font-bold text-white leading-tight">
                      {mentor.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <p className="text-xs font-semibold text-blue-800 uppercase tracking-wide">
                    {mentor.designation}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{mentor.qualification}</span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-700 block mb-0.5">Subjects Handled:</span>
                    <p className="text-xs font-medium text-slate-800">{mentor.subjects}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
