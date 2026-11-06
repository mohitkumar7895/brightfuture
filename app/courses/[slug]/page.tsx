import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import db from '@/lib/db';
import { 
  Clock, 
  Users, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Calendar, 
  PhoneCall, 
  ShieldCheck, 
  Share2 
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import AdmissionEnquiryForm from '@/components/home/AdmissionEnquiryForm';


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await db.course.findUnique({
    where: { slug },
  }).catch(() => null);

  if (!course) {
    return { title: 'Course Not Found | Bright Future Competition Institute' };
  }

  return {
    title: course.metaTitle || `${course.title} | Bright Future Lalitpur`,
    description: course.metaDescription || course.shortDescription || 'Competitive exam batch details at Bright Future Competition Institute Lalitpur.',
    keywords: course.keywords || undefined,
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [course, allCourses, settings] = await Promise.all([
    db.course.findUnique({
      where: { slug },
      include: { category: true },
    }).catch(() => null),
    db.course.findMany({
      where: { isPublished: true },
      select: { id: true, title: true, slug: true },
    }).catch(() => []),
    db.websiteSetting.findFirst().catch(() => null),
  ]);

  if (!course) {
    notFound();
  }

  const hasDiscount = course.discountFee && course.discountFee < course.fee;

  // JSON-LD Course schema
  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.shortDescription || course.title,
    provider: {
      '@type': 'Organization',
      name: settings?.instituteName || 'Bright Future Competition Institute',
      sameAs: 'https://brightfutureinstitute.com',
    },
    offers: {
      '@type': 'Offer',
      price: course.discountFee || course.fee,
      priceCurrency: 'INR',
      category: 'Paid',
    },
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />

      {/* Header Banner */}
      <section className="bg-gradient-to-br from-[#0B2545] via-[#134074] to-[#1E3A8A] text-white py-14 sm:py-16 relative overflow-hidden">
        {/* Glow circles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <div className="flex items-center gap-2 text-xs text-blue-200">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/courses" className="hover:text-white">Courses</Link>
            <span>/</span>
            <span className="text-amber-300 font-semibold truncate">{course.title}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-white/15 border border-white/20 uppercase tracking-wider backdrop-blur-md">
              {course.category?.name || 'Target Course'}
            </span>
            {course.isFeatured && (
              <span className="px-3 py-1 rounded-full text-xs font-bold text-slate-950 bg-amber-400 uppercase tracking-wider shadow-sm">
                Most Popular
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl">
            {course.title}
          </h1>

          <p className="text-blue-100/90 text-sm sm:text-base max-w-3xl leading-relaxed">
            {course.shortDescription}
          </p>
        </div>
      </section>

      {/* Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Featured Image */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md">
              <div className="relative aspect-[16/9] w-full bg-slate-900">
                <Image
                  src={course.image || '/images/hero-classroom.jpg'}
                  alt={course.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>

              {/* Course Highlights Quick Bar */}
              <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-b border-slate-100 bg-slate-50/50">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Duration</span>
                  <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900">
                    <Clock className="w-4 h-4 text-blue-700" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Batch Schedule</span>
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 truncate">
                    <Users className="w-4 h-4 text-amber-600" />
                    <span className="truncate">{course.batchInfo || 'Morning & Evening'}</span>
                  </div>
                </div>

                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Study Material</span>
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span>Printed Modules & OMR</span>
                  </div>
                </div>
              </div>

              {/* Course Long Description */}
              <div className="p-6 sm:p-8 space-y-6">
                <h2 className="text-2xl font-black text-slate-900">Detailed Course Overview</h2>
                <div
                  className="prose prose-slate max-w-none text-sm text-slate-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: course.description }}
                />

                {/* Eligibility Box */}
                {course.eligibility && (
                  <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2">
                    <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider flex items-center gap-2">
                      <Award className="w-4 h-4 text-blue-700" />
                      Eligibility Criteria
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {course.eligibility}
                    </p>
                  </div>
                )}

                {/* Subjects Taught */}
                {course.subjects && (
                  <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-2">
                    <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wider flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-amber-700" />
                      Syllabus & Subjects Covered
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {course.subjects}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Why study this batch at Bright Future */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-slate-900">What You Receive With This Batch</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Daily 2.5 to 3.5 hours classroom coaching</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Previous 10-year question paper discussion</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sunday OMR Mock Test with rank card</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Complete library and self-study room access</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Printed theory booklets & formula sheets</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Personalized 1-on-1 doubt clearing every day</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Sticky Action Box (4 cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Fee & Enrollment Card */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-lg space-y-5">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Course Fee
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-3xl font-black text-slate-900">
                    {formatCurrency(course.discountFee || course.fee)}
                  </span>
                  {hasDiscount && (
                    <span className="text-sm text-slate-400 line-through">
                      {formatCurrency(course.fee)}
                    </span>
                  )}
                </div>
                {hasDiscount && (
                  <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    Special Offer Active
                  </span>
                )}
              </div>

              <div className="space-y-3 pt-2 text-xs border-t border-slate-100">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Batch Duration:</span>
                  <span className="font-bold text-slate-900">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Branch:</span>
                  <span className="font-bold text-slate-900">Station Rd / Ghantaghar</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Demo Classes:</span>
                  <span className="font-bold text-emerald-700">2 Days Free Demo</span>
                </div>
              </div>

              <a
                href={`tel:${settings?.primaryPhone || '9450067223'}`}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors uppercase tracking-wider"
              >
                <PhoneCall className="w-4 h-4 text-blue-800" />
                <span>Call Helpline: {settings?.primaryPhone || '9450067223'}</span>
              </a>
            </div>

            {/* Quick Enquiry Form for this Course */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                Book Free Demo for this Batch
              </h3>
              <p className="text-xs text-slate-500">
                Reserve your seat for upcoming classroom sessions in Lalitpur.
              </p>
              <AdmissionEnquiryForm
                courses={allCourses}
                defaultCourseId={course.id}
                isCompact={true}
              />
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}

