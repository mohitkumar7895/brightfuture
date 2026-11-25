import React from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink, 
  ChevronRight,
  ShieldCheck,
  Award,
  Navigation
} from 'lucide-react';

interface FooterProps {
  instituteName?: string;
  headOfficeAddress?: string;
  marketBranchAddress?: string;
  libraryAddress?: string;
  headOfficeCoordinates?: string;
  marketBranchCoordinates?: string;
  libraryCoordinates?: string;
  headOfficeMapUrl?: string;
  marketBranchMapUrl?: string;
  libraryMapUrl?: string;
  primaryPhone?: string;
  alternatePhones?: string;
  email?: string;
  openingHours?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  telegramUrl?: string;
}

export default function Footer({
  instituteName = 'Bright Future Competition Institute',
  headOfficeAddress = 'Bright Future Competition Institute, Behind Coffee House, Station Road, Lalitpur, Uttar Pradesh.',
  marketBranchAddress = 'Richariya Market, Mahaveerpura, Ghantaghar ke pass, Lalitpur, Uttar Pradesh.',
  libraryAddress = 'BFCI Digital Library, Near Shiv Mandir, Near BFCI Coaching, Chandmari, Lalitpur, Uttar Pradesh.',
  headOfficeCoordinates,
  marketBranchCoordinates,
  libraryCoordinates,
  headOfficeMapUrl,
  marketBranchMapUrl,
  libraryMapUrl,
  primaryPhone = '8726343417',
  alternatePhones = '9450067223, 9451935450',
  email = 'aj2819147@gmail.com',
  openingHours = 'Mon - Sat: 7:00 AM - 7:30 PM | Sunday: Special Test Series',
  facebookUrl = 'https://www.facebook.com/share/1EvdQ3hyD2/',
  instagramUrl = 'https://www.instagram.com/invites/contact/?utm_content=qzmoist&bqrl=5ynh9x716074',
  youtubeUrl = 'https://youtube.com/@brightfuturecompetition',
  telegramUrl = 'https://t.me/brightfuturelalitpur',
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const getNavUrl = (customCoords: string | undefined, defaultQuery: string) => {
    const target = (customCoords || defaultQuery).trim();
    if (target.startsWith('https://maps.app.goo.gl') || target.startsWith('https://goo.gl/maps')) {
      return target;
    }
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(target)}`;
  };

  return (
    <footer className="bg-[#07132B] text-slate-300 pt-8 sm:pt-16 pb-20 sm:pb-8 border-t border-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-6 sm:pb-12 border-b border-blue-900/40">
          
          {/* Column 1: Institute Brand & Identity */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-800 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/40 shrink-0">
                <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-amber-300" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-tight">
                  BRIGHT FUTURE
                </h3>
                <p className="text-[11px] sm:text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  Competition Institute • Lalitpur
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 sm:line-clamp-none">
              Lalitpur’s most trusted coaching center for one-day competitive exams. Specializing in UP Police Constable &amp; SI, SSC CGL/CHSL, Railways RRB NTPC, UPSSSC PET, and Banking examinations.
            </p>

            <div className="hidden sm:flex flex-col gap-1.5 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Est. 14 July 2002 • 24 Years Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>10,000+ Students&apos; Choice in Bundelkhand</span>
              </div>
            </div>

            {/* Social Media Links from Admin Settings */}
            {(facebookUrl || instagramUrl || youtubeUrl || telegramUrl) && (
              <div className="pt-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
                  Follow Us Online
                </span>
                <div className="flex items-center gap-2">
                  {facebookUrl && (
                    <a
                      href={facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook Page"
                      className="w-8 h-8 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white flex items-center justify-center transition-colors border border-blue-500/30"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  )}
                  {instagramUrl && (
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram Profile @bfcilalitpur"
                      className="w-8 h-8 rounded-lg bg-pink-600/20 hover:bg-pink-600 text-pink-400 hover:text-white flex items-center justify-center transition-colors border border-pink-500/30"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  )}
                  {youtubeUrl && (
                    <a
                      href={youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube Channel"
                      className="w-8 h-8 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white flex items-center justify-center transition-colors border border-red-500/30"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                  )}
                  {telegramUrl && (
                    <a
                      href={telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Telegram Channel"
                      className="w-8 h-8 rounded-lg bg-sky-500/20 hover:bg-sky-500 text-sky-400 hover:text-white flex items-center justify-center transition-colors border border-sky-400/30"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.197 1.006.128.832.942z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Column 2: Branches & Addresses */}
          <div className="space-y-2.5 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider border-b border-blue-900/40 pb-1.5 sm:pb-2">
              Our Branches in Lalitpur
            </h4>

            {/* Head Office */}
            <div className="bg-[#0B1B3D] p-2.5 sm:p-3.5 rounded-xl border border-blue-900/60 space-y-1">
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>Head Office:</span>
                </div>
                <span className="text-[10px] font-black uppercase text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded">
                  Evening 3:30 PM
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-300 pl-4 sm:pl-5 leading-relaxed">
                {headOfficeAddress}
              </p>
              <div className="pl-4 sm:pl-5 pt-0.5">
                <a
                  href={getNavUrl(headOfficeCoordinates || headOfficeMapUrl, 'Bright Future Competition Institute, Behind Coffee House, Station Road, Lalitpur, Uttar Pradesh 284403')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] text-amber-300 hover:text-amber-200 hover:underline font-semibold"
                >
                  <Navigation className="w-3 h-3 fill-current" />
                  <span>Current Location se Rasta Dekhein</span>
                </a>
              </div>
            </div>

            {/* Market Branch */}
            <div className="bg-[#0B1B3D] p-2.5 sm:p-3.5 rounded-xl border border-blue-900/60 space-y-1">
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>Market Branch:</span>
                </div>
                <span className="text-[10px] font-black uppercase text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded">
                  Morning 7:00 AM
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-300 pl-4 sm:pl-5 leading-relaxed">
                {marketBranchAddress}
              </p>
              <div className="pl-4 sm:pl-5 pt-0.5">
                <a
                  href={getNavUrl(marketBranchCoordinates || marketBranchMapUrl, 'Richariya Market, Mahaveerpura, Ghantaghar ke pass, Lalitpur, Uttar Pradesh 284403')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] text-emerald-300 hover:text-emerald-200 hover:underline font-semibold"
                >
                  <Navigation className="w-3 h-3 fill-current" />
                  <span>Current Location se Rasta Dekhein</span>
                </a>
              </div>
            </div>

            {/* BFCI Library */}
            <div className="bg-[#0B1B3D] p-2.5 sm:p-3.5 rounded-xl border border-blue-900/60 space-y-1">
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>Library &amp; Study Room:</span>
                </div>
                <span className="text-[10px] font-black uppercase text-sky-300 bg-sky-500/20 px-2 py-0.5 rounded">
                  Open Daily
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-300 pl-4 sm:pl-5 leading-relaxed">
                {libraryAddress}
              </p>
              <div className="pl-4 sm:pl-5 pt-0.5">
                <a
                  href={getNavUrl(libraryCoordinates || libraryMapUrl, 'BFCI Digital Library, near Shiv Mandir, near BFCI Coaching, Chandmari, Lalitpur, Uttar Pradesh 284403')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] text-sky-300 hover:text-sky-200 hover:underline font-semibold"
                >
                  <Navigation className="w-3 h-3 fill-current" />
                  <span>Current Location se Rasta Dekhein</span>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-400 pt-0.5">
              <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{openingHours}</span>
            </div>
          </div>

          {/* Column 3: Quick Links & Courses */}
          <div className="space-y-2.5 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-1.5 sm:pb-2">
              Quick Links &amp; Courses
            </h4>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2 text-xs">
              <li>
                <Link href="/courses" prefetch={true} className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors">
                  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                  <span className="truncate">UP Police &amp; SI</span>
                </Link>
              </li>
              <li>
                <Link href="/courses" prefetch={true} className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors">
                  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                  <span className="truncate">SSC CGL &amp; CHSL</span>
                </Link>
              </li>
              <li>
                <Link href="/courses" prefetch={true} className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors">
                  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                  <span className="truncate">Railway NTPC</span>
                </Link>
              </li>
              <li>
                <Link href="/courses" prefetch={true} className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors">
                  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                  <span className="truncate">UPSSSC PET</span>
                </Link>
              </li>
              <li>
                <Link href="/results" prefetch={true} className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors">
                  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                  <span className="truncate">Toppers Results</span>
                </Link>
              </li>
              <li>
                <Link href="/faculty" prefetch={true} className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors">
                  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                  <span className="truncate">Faculty Team</span>
                </Link>
              </li>
              <li className="col-span-2 sm:col-span-1">
                <Link href="/admission" prefetch={true} className="flex items-center gap-1.5 text-amber-400 font-semibold hover:underline">
                  <ChevronRight className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>Book Free Demo Class</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Call Us */}
          <div className="space-y-2.5 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-1.5 sm:pb-2">
              Contact Us Directly
            </h4>
            <div className="space-y-2 sm:space-y-3 text-xs">
              <a 
                href={`tel:${primaryPhone}`}
                className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-blue-900/30 border border-blue-800/40 text-white hover:bg-blue-900/50 transition-colors group"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="text-[10px] text-blue-300 block uppercase font-medium">Head Office Helpline</span>
                  <span className="text-xs sm:text-sm font-bold text-white tracking-wide">+91 {primaryPhone}</span>
                </div>
              </a>

              <a 
                href="tel:8726343417"
                className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 hover:bg-amber-400/20 transition-colors group"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="text-[10px] text-amber-300/80 block uppercase font-medium">Counseling &amp; Admission</span>
                  <span className="text-xs sm:text-sm font-bold text-white tracking-wide">+91 8726343417</span>
                </div>
              </a>

              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-slate-300 hover:text-white pl-1 transition-colors text-xs"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{email}</span>
              </a>

              <div className="hidden sm:block pt-1">
                <Link
                  href="/admission"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-md uppercase tracking-wider"
                >
                  <span>Admission Enquiry Form</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin link */}
        <div className="pt-4 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-slate-500 gap-2.5 sm:gap-4 text-center sm:text-left">
          <p>© {currentYear} {instituteName}. All rights reserved.</p>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/about" className="hover:text-slate-300 transition-colors">About</Link>
            <Link href="/courses" className="hover:text-slate-300 transition-colors">Courses</Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
            <Link href="/admin/login" className="hover:text-slate-300 transition-colors text-slate-600">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

