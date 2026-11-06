import React from 'react';
import db from '@/lib/db';
import HeroSection from '@/components/home/HeroSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import PopularCourses from '@/components/home/PopularCourses';
import AchievementsSection from '@/components/home/AchievementsSection';
import FacultySection from '@/components/home/FacultySection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import GalleryPreview from '@/components/home/GalleryPreview';
import FaqSection from '@/components/home/FaqSection';
import BranchesMapSection from '@/components/home/BranchesMapSection';
import AdmissionEnquiryForm from '@/components/home/AdmissionEnquiryForm';
import { Sparkles, PhoneCall } from 'lucide-react';


export default async function HomePage() {
  // Fetch dynamic content from MySQL coaching database
  const [
    pageContent,
    settings,
    courses,
    results,
    faculty,
    notices,
    testimonials,
    faqs,
    galleryItems,
  ] = await Promise.all([
    db.pageContent.findUnique({ where: { pageKey: 'home' } }).catch(() => null),
    db.websiteSetting.findFirst().catch(() => null),
    db.course.findMany({
      where: { isPublished: true },
      orderBy: [{ isFeatured: 'desc' }, { id: 'asc' }],
      include: { category: true },
    }).catch(() => []),
    db.result.findMany({
      where: { isFeatured: true },
      orderBy: [{ year: 'desc' }, { id: 'desc' }],
      take: 6,
    }).catch(() => []),
    db.faculty.findMany({
      where: { isPublished: true },
      orderBy: [{ order: 'asc' }, { id: 'asc' }],
      take: 6,
    }).catch(() => []),
    db.notice.findMany({
      where: { isPublished: true },
      orderBy: [{ isPinned: 'desc' }, { publishDate: 'desc' }],
      take: 6,
    }).catch(() => []),
    db.testimonial.findMany({
      where: { isFeatured: true },
      orderBy: { id: 'desc' },
      take: 4,
    }).catch(() => []),
    db.faq.findMany({
      where: { isPublished: true },
      orderBy: [{ order: 'asc' }, { id: 'asc' }],
      take: 6,
    }).catch(() => []),
    db.galleryItem.findMany({
      where: { isPublished: true },
      orderBy: { id: 'desc' },
      take: 6,
      include: { category: true },
    }).catch(() => []),
  ]);

  let whyChoosePoints = [];
  try {
    if (pageContent?.whyChooseUs) {
      whyChoosePoints = JSON.parse(pageContent.whyChooseUs);
    }
  } catch {
    // fallback
  }

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section with Animated Graphics */}
      <HeroSection
        heroBadge={pageContent?.heroBadge || undefined}
        heroTitle={pageContent?.heroTitle || undefined}
        heroSubtitle={pageContent?.heroSubtitle || undefined}
        primaryPhone={settings?.primaryPhone || '9450067223'}
      />

      {/* 2. Institute Introduction & Why Choose Us */}
      <WhyChooseUs
        features={whyChoosePoints.length > 0 ? whyChoosePoints : undefined}
        aboutContent={pageContent?.aboutContent || undefined}
      />

      {/* 4. Popular Courses Grid */}
      <PopularCourses courses={courses} />

      {/* 5. Results & Hall of Fame Achievements */}
      <AchievementsSection results={results} />

      {/* 6. Top Faculty Mentors */}
      <FacultySection faculty={faculty} />

      {/* 7. Quick Admission Enquiry Section */}
      <section className="py-8 sm:py-10 bg-gradient-to-br from-[#0B2545] via-[#134074] to-[#1E3A8A] text-white relative overflow-hidden">
        {/* Glow circles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-amber-300 bg-white/10 border border-white/20 uppercase tracking-wider backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                निःशुल्क परामर्श एवं डेमो क्लास
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                सरकारी नौकरी की पक्की तैयारी, आज ही शुरू करें
              </h2>
              <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
                2 दिन का फ्री क्लास अटेंड करके पढ़ाई का स्तर खुद देखें। हमारे विशेषज्ञ शिक्षकों से मिलकर अपनी तैयारी की सही रणनीति समझें।
              </p>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-blue-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center font-bold">✓</div>
                  <span>फीस जमा करने से पहले 2 दिन का फ्री डेमो क्लास</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center font-bold">✓</div>
                  <span>पूरा प्रिंटेड स्टडी मटेरियल और 10 वर्षों के हल प्रश्न पत्र</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center font-bold">✓</div>
                  <span>स्टेशन रोड एवं घंटाघर स्थित दोनों ब्रांच में क्लास की सुविधा</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <a
                  href={`tel:${settings?.primaryPhone || '9450067223'}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/25 backdrop-blur-md transition-colors shadow-md"
                >
                  <PhoneCall className="w-4 h-4 text-amber-300" />
                  <span>हेल्पलाइन: +91 {settings?.primaryPhone || '9450067223'}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl shadow-2xl text-slate-900 border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                Book Your Seat / Submit Online Enquiry
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Fill the details below. Our academic counselors will get back to you promptly.
              </p>
              <AdmissionEnquiryForm courses={courses} isCompact={false} />
            </div>

          </div>
        </div>
      </section>

      {/* 9. Testimonials & Reviews */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 10. Photo Gallery Preview */}
      <GalleryPreview items={galleryItems} />

      {/* 11. Frequently Asked Questions */}
      <FaqSection faqs={faqs} />

      {/* 12. Dual Branches & Interactive Google Maps */}
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
