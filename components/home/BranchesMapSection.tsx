'use client';

import React from 'react';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import AnimatedSectionHeader from '@/components/ui/AnimatedSectionHeader';

interface BranchesMapSectionProps {
  headOfficeAddress?: string;
  marketBranchAddress?: string;
  primaryPhone?: string;
  alternatePhones?: string;
  email?: string;
  mapEmbedUrl?: string;
}

export default function BranchesMapSection({
  headOfficeAddress = 'Behind Krishna Cinema, Station Road, Lalitpur, Uttar Pradesh, India.',
  marketBranchAddress = 'Richariya Market, Mahaveerpura, Near Ghantaghar, Lalitpur. PIN: 284403',
  primaryPhone = '9450067223',
  alternatePhones = '9451935450, 8726343417',
  mapEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14549.467891234!2d78.406981!3d24.688172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3979ea375d000001%3A0x6b8f1b6238b725b8!2sLalitpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000',
}: BranchesMapSectionProps) {
  const whatsappUrl = `https://wa.me/91${primaryPhone}?text=${encodeURIComponent(
    'Hello Bright Future Competition Institute! I would like directions or details regarding batch timings at Lalitpur branch.'
  )}`;

  return (
    <section className="py-8 sm:py-10 bg-slate-50/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Header */}
        <AnimatedSectionHeader
          className="max-w-3xl mb-8 sm:mb-9"
          badge={
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold text-blue-900 bg-blue-100 uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-blue-700" />
              Visit Our Institute
            </span>
          }
          title={
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Centrally Located Branches in Lalitpur
            </h2>
          }
          subtitle={
            <p className="text-slate-600 text-xs sm:text-sm">
              Conveniently accessible from all corners of Lalitpur and nearby tehsils with daily public transport connectivity.
            </p>
          }
        />

        {/* Dual Branch Cards + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Branch Details Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Branch 1: Head Office */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider">
                  Head Office &amp; Main Campus
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                Station Road Branch
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {headOfficeAddress}
              </p>
              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Timings: 7:00 AM – 7:30 PM (Mon-Sat)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <a href={`tel:${primaryPhone}`} className="hover:underline">
                    Primary: +91 {primaryPhone}
                  </a>
                </div>
              </div>
            </div>

            {/* Branch 2: Market Branch */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span className="text-[10px] font-black uppercase text-blue-700 tracking-wider">
                  Market Branch &amp; Study Center
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                Mahaveerpura / Ghantaghar Branch
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {marketBranchAddress}
              </p>
              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Timings: 7:30 AM – 7:00 PM (Mon-Sat)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Contact: {alternatePhones}</span>
                </div>
              </div>
            </div>

            {/* WhatsApp Quick Link */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 rounded-2xl flex items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider block text-emerald-100">Instant Support</span>
                  <p className="text-xs font-bold">Ask for Location on WhatsApp</p>
                </div>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-3.5 py-1.5 bg-white text-emerald-800 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-emerald-50 transition-colors shadow-xs"
              >
                Send Location
              </a>
            </div>

          </div>

          {/* Google Maps Column (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs aspect-[4/3] sm:aspect-[16/11] relative">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bright Future Competition Institute Lalitpur Map Location"
              className="w-full h-full min-h-[320px]"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
