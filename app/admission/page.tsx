import React from 'react';
import db from '@/lib/db';
import { 
  GraduationCap, 
  Sparkles, 
  PhoneCall, 
  BookOpen, 
  FileText,
  Users,
  MapPin, 
  Clock,
  ShieldCheck,
  Check,
  MessageCircle,
  Award
} from 'lucide-react';
import AdmissionEnquiryForm from '@/components/home/AdmissionEnquiryForm';

export async function generateMetadata() {
  const seo = await db.seoMetadata.findUnique({ where: { pageSlug: '/admission' } }).catch(() => null);
  return {
    title: seo?.metaTitle || 'Online Admission & Demo Registration 2026 | Bright Future Lalitpur',
    description: seo?.metaDescription || 'Reserve your seat for UP Police, SSC, Railway, UPSSSC, or Banking batches at Bright Future Competition Institute, Lalitpur. 2 Days Free Demo Class.',
  };
}

export default async function AdmissionPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>;
}) {
  const { course } = await searchParams;
  const defaultCourseId = course && !isNaN(Number(course)) ? Number(course) : undefined;

  const [courses, settings] = await Promise.all([
    db.course.findMany({
      where: { isPublished: true },
      select: { id: true, title: true },
    }).catch(() => []),
    db.websiteSetting.findFirst().catch(() => null),
  ]);

  const primaryPhone = settings?.primaryPhone || '9450067223';
  const whatsappNumber = settings?.whatsappNumber || '9450067223';

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-[#0B2545] via-[#134074] to-[#1E3A8A] text-white pt-14 pb-20 sm:pt-16 sm:pb-24 text-center relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold text-amber-300 bg-white/10 border border-white/20 uppercase tracking-widest backdrop-blur-md shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            Admissions Open 2026
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Online Admission &amp; Demo Registration
          </h1>

          <p className="text-blue-100/90 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-medium">
            Reserve your seat for UP Police, SSC, Railway, UPSSSC, or Banking batches at Bright Future Competition Institute, Lalitpur.
          </p>

          {/* Quick Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-white/90">
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-xs flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              2 Days Free Demo Classes
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-xs flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              Complete Printed Booklets
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-xs flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              Sunday OMR Mock Tests
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-xs flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-300" />
              1,250+ Selections
            </span>
          </div>
        </div>
      </section>

      {/* Main Grid Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Benefits & Walk-in Office Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* What You Receive Card */}
            <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[11px] font-extrabold text-blue-800 uppercase tracking-widest block mb-1">
                  Enrolment Benefits • Student Privileges
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  What You Receive Upon Enrollment
                </h2>
              </div>

              {/* 4 Feature Items */}
              <div className="space-y-4">
                {/* Benefit 1 */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100/80 hover:bg-emerald-50 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                      2 Days Free Demo Classes
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Experience our teaching clarity before submitting fees.
                    </p>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-blue-50/50 border border-blue-100/80 hover:bg-blue-50 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-blue-700 text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                      Complete Printed Study Booklets
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Detailed theory and solved question banks for all topics.
                    </p>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-amber-50/50 border border-amber-100/80 hover:bg-amber-50 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                      Weekly Sunday OMR Mock Tests
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      District rank evaluation mirroring actual state exam conditions.
                    </p>
                  </div>
                </div>

                {/* Benefit 4 */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100/80 hover:bg-indigo-50 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-indigo-700 text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                      1-on-1 Faculty Doubt Clearing
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Daily personalized sessions with Er. Sharma sir and senior faculty.
                    </p>
                  </div>
                </div>
              </div>

              {/* Have an urgent question? */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">
                  Have an urgent question?
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={`tel:${primaryPhone}`}
                    className="flex items-center justify-center gap-2 p-3.5 bg-blue-900 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-blue-950 shadow-md transition-all"
                  >
                    <PhoneCall className="w-4 h-4 text-amber-300" />
                    <span>Call Admission Desk: +91 {primaryPhone}</span>
                  </a>

                  <a
                    href={`https://wa.me/91${whatsappNumber}?text=Hello%20Bright%20Future%20Institute,%20I%20want%20to%20enquire%20about%202026%20admissions.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-3.5 bg-emerald-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-emerald-700 shadow-md transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-white" />
                    <span>WhatsApp Desk</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Walk-In Admissions Welcome Card */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl border border-slate-700/60 space-y-3.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-900">
                  Walk-In Admissions Welcome
                </span>
              </div>
              
              <h3 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Visit Head Office (Station Road)</span>
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Behind Krishna Cinema, Station Road, Lalitpur (UP). Timing: <strong className="text-white">7:00 AM – 7:30 PM</strong>.
              </p>

              <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-400" />
                  <span>Open Mon - Sat: 7 AM - 7:30 PM</span>
                </span>
                <span className="text-amber-300 font-semibold">Ghantaghar Branch Open</span>
              </div>
            </div>

            {/* Trust badge */}
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center gap-3 text-xs text-blue-900 font-medium">
              <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0" />
              <span>Zero-obligation demo classes. No advance fees required for attending 2 days of trial classes.</span>
            </div>

          </div>

          {/* Right Column: Candidate Admission Enquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-4 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-black text-blue-900 bg-blue-100 uppercase tracking-widest mb-1.5">
                Online Registration • Direct Submission
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Candidate Admission Enquiry Form
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                Please complete the form below. All details are securely saved in our institutional records.
              </p>
            </div>

            <AdmissionEnquiryForm
              courses={courses}
              defaultCourseId={defaultCourseId}
              isCompact={false}
            />
          </div>

        </div>
      </section>
    </div>
  );
}
