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
  Award
} from 'lucide-react';

interface FooterProps {
  instituteName?: string;
  headOfficeAddress?: string;
  marketBranchAddress?: string;
  primaryPhone?: string;
  alternatePhones?: string;
  email?: string;
  openingHours?: string;
}

export default function Footer({
  instituteName = 'Bright Future Competition Institute',
  headOfficeAddress = 'Behind Krishna Cinema, Station Road, Lalitpur, Uttar Pradesh, India.',
  marketBranchAddress = 'Richariya Market, Mahaveerpura, Near Ghantaghar, Lalitpur (PIN: 284403)',
  primaryPhone = '9450067223',
  alternatePhones = '9451935450, 8726343417',
  email = 'aj2819147@gmail.com',
  openingHours = 'Mon - Sat: 7:00 AM - 7:30 PM | Sunday: Special Test Series',
}: FooterProps) {
  const currentYear = new Date().getFullYear();

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
                <span>Dedicated Faculty with 12+ Years Track Record</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Hundreds of Selections in UP State &amp; Central Services</span>
              </div>
            </div>
          </div>

          {/* Column 2: Branches & Addresses */}
          <div className="space-y-2.5 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider border-b border-blue-900/40 pb-1.5 sm:pb-2">
              Our Branches in Lalitpur
            </h4>

            {/* Head Office */}
            <div className="bg-[#0B1B3D] p-2.5 sm:p-3.5 rounded-xl border border-blue-900/60 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>Head Office:</span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-300 pl-4 sm:pl-5 leading-relaxed">
                {headOfficeAddress}
              </p>
            </div>

            {/* Market Branch */}
            <div className="bg-[#0B1B3D] p-2.5 sm:p-3.5 rounded-xl border border-blue-900/60 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-300">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>Market Branch:</span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-300 pl-4 sm:pl-5 leading-relaxed">
                {marketBranchAddress}
              </p>
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
                <Link href="/courses" className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors">
                  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                  <span className="truncate">UP Police &amp; SI</span>
                </Link>
              </li>
              <li>
                <Link href="/courses" className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors">
                  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                  <span className="truncate">SSC CGL &amp; CHSL</span>
                </Link>
              </li>
              <li>
                <Link href="/courses" className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors">
                  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                  <span className="truncate">Railway NTPC</span>
                </Link>
              </li>
              <li>
                <Link href="/courses" className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors">
                  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                  <span className="truncate">UPSSSC PET</span>
                </Link>
              </li>
              <li>
                <Link href="/results" className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors">
                  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                  <span className="truncate">Toppers Results</span>
                </Link>
              </li>
              <li>
                <Link href="/faculty" className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors">
                  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                  <span className="truncate">Faculty Team</span>
                </Link>
              </li>
              <li className="col-span-2 sm:col-span-1">
                <Link href="/admission" className="flex items-center gap-1.5 text-amber-400 font-semibold hover:underline">
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
                  <span className="text-[10px] text-blue-300 block uppercase font-medium">Primary Helpline</span>
                  <span className="text-xs sm:text-sm font-bold text-white tracking-wide">+91 {primaryPhone}</span>
                </div>
              </a>

              <div className="flex items-start gap-2 text-slate-300 pl-1">
                <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Alternate Contact:</span>
                  <span className="text-xs font-semibold text-slate-200">{alternatePhones}</span>
                </div>
              </div>

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

