'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  GraduationCap, 
  Menu, 
  X, 
  Phone, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  instituteName?: string;
  primaryPhone?: string;
}

export default function Header({
  instituteName = 'Bright Future Competition Institute',
  primaryPhone = '9450067223',
}: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Courses', href: '/courses' },
    { name: 'Faculty', href: '/faculty' },
    { name: 'Results', href: '/results' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Notices', href: '/notices' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 w-full ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5 sm:py-3'
            : 'bg-white border-b border-slate-100 py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            
            {/* Logo & Institute Identity */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0 min-w-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-blue-900 via-blue-800 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform duration-200 shrink-0">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />
              </div>
              <div className="truncate">
                <span className="block font-black text-slate-900 tracking-tight text-sm sm:text-base md:text-lg leading-tight group-hover:text-blue-900 transition-colors truncate">
                  BRIGHT FUTURE
                </span>
                <span className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-800 leading-tight truncate">
                  Competition Institute • Lalitpur
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-blue-900 bg-blue-50 font-bold'
                        : 'text-slate-700 hover:text-blue-900 hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons (Desktop & Tablet) */}
            <div className="hidden sm:flex items-center gap-2 md:gap-3 shrink-0">
              <a
                href={`tel:${primaryPhone}`}
                className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-blue-900 bg-blue-50/80 hover:bg-blue-100 border border-blue-200/80 rounded-xl transition-all shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-blue-700" />
                <span>{primaryPhone}</span>
              </a>

              <Link
                href="/admission"
                className="inline-flex items-center justify-center px-4 py-2 sm:py-2.5 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-md shadow-amber-400/25 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 uppercase tracking-wider whitespace-nowrap"
              >
                Enquire Now
              </Link>
            </div>

            {/* Mobile Header Actions (Call icon + Enquire button + Hamburger) */}
            <div className="flex sm:hidden items-center gap-1.5 shrink-0">
              <a
                href={`tel:${primaryPhone}`}
                aria-label={`Call ${primaryPhone}`}
                className="w-9 h-9 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center border border-blue-200"
              >
                <Phone className="w-4 h-4 text-blue-700" />
              </a>

              <Link
                href="/admission"
                className="px-2.5 py-1.5 rounded-lg text-[11px] font-black text-slate-950 bg-amber-400 uppercase tracking-wider shadow-xs"
              >
                Enquire
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Tablet/Desktop Hamburger for <= lg */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hidden sm:flex lg:hidden p-2 rounded-lg text-slate-700 hover:text-blue-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Mobile Drawer Menu Panel */}
          <div 
            className="absolute top-0 right-0 w-[85%] max-w-sm h-full bg-white shadow-2xl flex flex-col justify-between p-5 overflow-y-auto animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold">
                    <GraduationCap className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <span className="block font-black text-slate-900 text-sm leading-tight">BRIGHT FUTURE</span>
                    <span className="block text-[10px] font-semibold text-blue-800 uppercase">Lalitpur Campus</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors min-h-[44px] ${
                        isActive
                          ? 'bg-blue-50 text-blue-900 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <Link
                href="/admission"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 shadow-md uppercase tracking-wider min-h-[44px]"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Book 2-Day Free Demo</span>
              </Link>
              
              <a
                href={`tel:${primaryPhone}`}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-slate-800 border border-slate-200 hover:bg-slate-50 min-h-[44px]"
              >
                <Phone className="w-4 h-4 text-blue-800" />
                <span>Call Admission Desk: +91 {primaryPhone}</span>
              </a>

              <div className="text-center pt-2">
                <span className="text-[11px] text-slate-400">
                  Station Road &amp; Ghantaghar, Lalitpur (UP)
                </span>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
