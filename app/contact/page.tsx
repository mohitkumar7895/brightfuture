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

  const primaryPhone = settings?.primaryPhone || '8726343417';
  const alternatePhones = settings?.alternatePhones || '9450067223, 9451935450';
  const email = settings?.email || 'aj2819147@gmail.com';
  const headOffice = settings?.headOfficeAddress || 'Bright Future Competition Institute, Behind Coffee House, Station Road, Lalitpur, Uttar Pradesh.';
  const marketBranch = settings?.marketBranchAddress || 'Richariya Market, Mahaveerpura, Ghantaghar ke pass, Lalitpur, Uttar Pradesh.';
  const libraryAddress = (settings as any)?.libraryAddress || 'BFCI Digital Library, Near Shiv Mandir, Near BFCI Coaching, Chandmari, Lalitpur, Uttar Pradesh.';
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
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-xs font-black text-amber-700 uppercase tracking-wider">
                    Head Office (Main Campus)
                  </span>
                </div>
                <span className="text-[10px] font-black uppercase text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded">
                  Evening 3:30 PM Batch
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
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('Bright Future Competition Institute, Behind Coffee House, Station Road, Lalitpur, Uttar Pradesh 284403')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-1.5 w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-700 text-white font-bold text-xs uppercase tracking-wider shadow-xs hover:shadow-md transition-all active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5 fill-current animate-bounce" />
                <span>Current Location se Directions Lein</span>
              </a>
            </div>

            {/* Branch 2: Market Branch */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-md space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span className="text-xs font-black text-emerald-800 uppercase tracking-wider">
                    Market Branch
                  </span>
                </div>
                <span className="text-[10px] font-black uppercase text-emerald-900 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
                  Morning 7:00 AM Batch
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Market Branch (Richariya Market)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {marketBranch}
              </p>
              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Timings: 7:00 AM – 7:00 PM (Mon-Sat)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-700 shrink-0" />
                  <a href="tel:8726343417" className="font-semibold text-slate-900 hover:underline">
                    Counselor Helpline: +91 8726343417
                  </a>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('Richariya Market, Mahaveerpura, Ghantaghar ke pass, Lalitpur, Uttar Pradesh 284403')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-1.5 w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-xs uppercase tracking-wider shadow-xs hover:shadow-md transition-all active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5 fill-current animate-bounce" />
                <span>Current Location se Directions Lein</span>
              </a>
            </div>

            {/* Branch 3: BFCI Digital Library */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-md space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                  <span className="text-xs font-black text-blue-700 uppercase tracking-wider">
                    Digital Library &amp; Study Hall
                  </span>
                </div>
                <span className="text-[10px] font-black uppercase text-blue-900 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                  Self-Study Zone
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">BFCI Library &amp; Reading Room</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {libraryAddress}
              </p>
              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Open Daily: 7:00 AM – 8:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-700 shrink-0" />
                  <a href="tel:8726343417" className="font-semibold text-slate-900 hover:underline">
                    Counselor Helpline: +91 8726343417
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Other: {alternatePhones}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <a href={`mailto:${email}`} className="text-blue-800 hover:underline">
                    {email}
                  </a>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('BFCI Digital Library, near Shiv Mandir, near BFCI Coaching, Chandmari, Lalitpur, Uttar Pradesh 284403')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-1.5 w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-xs uppercase tracking-wider shadow-xs hover:shadow-md transition-all active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5 fill-current animate-bounce" />
                <span>Current Location se Directions Lein</span>
              </a>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-5 sm:p-6 rounded-3xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
                className="w-full sm:w-auto text-center shrink-0 px-4 py-2.5 bg-white text-emerald-800 font-bold text-xs rounded-xl shadow-sm uppercase tracking-wider hover:bg-emerald-50 transition-colors"
              >
                Open WhatsApp
              </a>
            </div>

            {/* Social Media Connect Box */}
            {(settings?.facebookUrl || settings?.instagramUrl || settings?.youtubeUrl || settings?.telegramUrl) && (
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Official Social Channels
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  {settings?.facebookUrl && (
                    <a
                      href={settings.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50 text-blue-800 hover:bg-blue-100 transition-colors border border-blue-200"
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span>Facebook</span>
                    </a>
                  )}
                  {settings?.instagramUrl && (
                    <a
                      href={settings.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-pink-50 text-pink-700 hover:bg-pink-100 transition-colors border border-pink-200"
                    >
                      <span className="w-2 h-2 rounded-full bg-pink-600" />
                      <span>Instagram (@bfcilalitpur)</span>
                    </a>
                  )}
                  {settings?.youtubeUrl && (
                    <a
                      href={settings.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 transition-colors border border-red-200"
                    >
                      <span className="w-2 h-2 rounded-full bg-red-600" />
                      <span>YouTube</span>
                    </a>
                  )}
                  {settings?.telegramUrl && (
                    <a
                      href={settings.telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors border border-sky-200"
                    >
                      <span className="w-2 h-2 rounded-full bg-sky-600" />
                      <span>Telegram</span>
                    </a>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Contact / Admission Enquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-4 sm:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6">
            <div>
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block mb-1">
                Drop Us a Message
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
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
          <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-blue-700">
                <Navigation className="w-3.5 h-3.5 fill-current" />
                Live GPS Routing
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Google Maps Live Location &amp; Directions</h3>
              <p className="text-xs text-slate-500">Apni device ki current GPS location se seedha institute branch ka rasta dekhein</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('Richariya Market, Mahaveerpura, Ghantaghar ke pass, Lalitpur, Uttar Pradesh 284403')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5 fill-current" />
                <span>Market Branch Rasta</span>
              </a>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('Bright Future Competition Institute, Behind Coffee House, Station Road, Lalitpur, Uttar Pradesh 284403')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5 fill-current" />
                <span>Head Office Rasta</span>
              </a>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('BFCI Digital Library, near Shiv Mandir, near BFCI Coaching, Chandmari, Lalitpur, Uttar Pradesh 284403')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5 fill-current" />
                <span>Library Rasta</span>
              </a>
            </div>
          </div>
          <div className="w-full aspect-[21/9] min-h-[380px]">
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

