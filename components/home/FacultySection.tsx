'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GraduationCap, Award, ArrowRight } from 'lucide-react';
import AnimatedSectionHeader from '@/components/ui/AnimatedSectionHeader';
import { getImageUrl } from '@/lib/utils';

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
    <section className="py-8 sm:py-12 lg:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
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
            prefetch={true}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all uppercase tracking-wider shrink-0"
          >
            <span>View All Faculty</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculty.slice(0, 3).map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden">
                  <Image
                    src={getImageUrl(mentor.photo, '/images/faculty-teaching.jpg', (mentor as any).updatedAt)}
                    alt={mentor.name}
                    fill
                    quality={100}
                    unoptimized={true}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3.5 right-3.5">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold text-blue-950 bg-white/95 backdrop-blur-md shadow-sm border border-slate-200/60 uppercase tracking-wider">
                      {mentor.experience}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 leading-tight">
                      {mentor.name || 'Faculty Mentor'}
                    </h3>
                    <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mt-1">
                      {mentor.designation && mentor.designation !== 'Educator' ? mentor.designation : 'Specialist Educator'}
                    </p>
                  </div>

                  {mentor.qualification && mentor.qualification !== 'Expert Mentor' && (
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="font-semibold">{mentor.qualification}</span>
                    </div>
                  )}

                  {mentor.subjects && mentor.subjects !== 'General' && (
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">Subjects Handled:</span>
                      <p className="text-xs font-bold text-slate-800">{mentor.subjects}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
