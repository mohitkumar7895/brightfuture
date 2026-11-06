import React from 'react';
import db from '@/lib/db';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  Navigation,
  ShieldCheck 
} from 'lucide-react';
import AdmissionEnquiryForm from '@/components/home/AdmissionEnquiryForm';


export async function generateMetadata() {
  const seo = await db.seoMetadata.findUnique({ where: { pageSlug: '/contact' } }).catch(() => null);
  return {
    title: seo?.metaTitle || 'Contact Us | Bright Future Competition Institute Lalitpur',
    description: seo?.metaDescription || 'Visit our branches at Station Road and Ghantaghar in Lalitpur. Call 9450067223.',
  };
}

export default async function ContactPage() {
  const [settings, courses] = await Promise.all([
    db.websiteSetting.findFirst().catch(() => null),
    db.course.findMany({
      where: { isPublished: true },
      select: { id: true, title: true },
    }).catch(() => []),
  ]);

  const primaryPhone = settings?.primaryPhone || '9450067223';
  const alternatePhones = settings?.alternatePhones || '9451935450, 8726343417';
  const email = settings?.email || 'aj2819147@gmail.com';
  const headOffice = settings?.headOfficeAddress || 'Behind Krishna Cinema, Station Road, Lalitpur, Uttar Pradesh, India.';
  const marketBranch = settings?.marketBranchAddress || 'Richariya Market, Mahaveerpura, Near Ghantaghar, Lalitpur. PIN: 284403';
  const mapEmbedUrl = settings?.mapEmbedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14549.467891234!2d78.406981!3d24.688172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3979ea375d000001%3A0x6b8f1b6238b725b8!2sLalitpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000';

  const whatsappUrl = `https://wa.me/91${primaryPhone}?text=${encodeURIComponent(
    'Hello Bright Future Competition Institute! I would like to get directions or counseling regarding batches at Lalitpur.'
  )}`;

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Banner */}
      <section className="bg-gradient-to-br from-[#0B2545] via-[#134074] to-[#1E3A8A] text-white py-16 text-center relative overflow-hidden">
        {/* Glow circles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold text-amber-300 bg-white/10 border border-white/20 uppercase tracking-wider backdrop-blur-md">
            <Phone className="w-3.5 h-3.5" />
            Connect With Our Counselors
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Contact & Branch Locations
          </h1>
          <p className="text-blue-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Visit our Head Office or Market Branch in Lalitpur, or reach out to our admission help desk anytime.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Branch Details Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Branch 1 */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-xs font-black text-amber-700 uppercase tracking-wider">
                  Head Office (Main Campus)
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Station Road Branch</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {headOffice}
              </p>
              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-700 shrink-0" />
                  <a href={`tel:${primaryPhone}`} className="font-semibold text-slate-900 hover:underline">
                    Primary: +91 {primaryPhone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Timings: 7:00 AM - 7:30 PM (Mon-Sat)</span>
                </div>
              </div>
            </div>

            {/* Branch 2 */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span className="text-xs font-black text-blue-700 uppercase tracking-wider">
                  Market Branch & Study Hall
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Mahaveerpura Branch</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {marketBranch}
              </p>
              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-700 shrink-0" />
                  <span className="font-semibold text-slate-900">Contact: {alternatePhones}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <a href={`mailto:${email}`} className="text-blue-800 hover:underline">
                    {email}
                  </a>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 rounded-3xl shadow-md flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">
                  Instant Response
                </span>
                <h4 className="text-base font-bold">Chat with Counselors</h4>
                <p className="text-xs text-emerald-100">Prefilled WhatsApp Enquiry</p>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-4 py-2.5 bg-white text-emerald-800 font-bold text-xs rounded-xl shadow-sm uppercase tracking-wider hover:bg-emerald-50 transition-colors"
              >
                Open WhatsApp
              </a>
            </div>

          </div>

          {/* Contact / Admission Enquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6">
            <div>
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block mb-1">
                Drop Us a Message
              </span>
              <h3 className="text-2xl font-black text-slate-900">
                Send an Enquiry / Request a Call Back
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Submit your inquiry and our academic counselor will contact you within 24 hours.
              </p>
            </div>

            <AdmissionEnquiryForm courses={courses} isCompact={false} />
          </div>

        </div>

        {/* Full-width Map Card */}
        <div className="mt-12 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Google Maps Location</h3>
              <p className="text-xs text-slate-500">Easily find us behind Krishna Cinema, Station Road, Lalitpur</p>
            </div>
            <a
              href="https://maps.google.com/?q=Station+Road+Lalitpur+Uttar+Pradesh"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-50 text-blue-900 text-xs font-bold rounded-xl border border-blue-200 hover:bg-blue-900 hover:text-white transition-colors"
            >
              Open in Google Maps App
            </a>
          </div>
          <div className="w-full aspect-[21/9] min-h-[350px]">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bright Future Competition Institute Google Map"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

