'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  BookOpen, 
  Navigation, 
  LocateFixed, 
  ExternalLink,
  Compass
} from 'lucide-react';
import AnimatedSectionHeader from '@/components/ui/AnimatedSectionHeader';

interface BranchesMapSectionProps {
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
  mapEmbedUrl?: string;
}

type BranchId = 'market' | 'headOffice' | 'library';

interface BranchData {
  id: BranchId;
  name: string;
  shortName: string;
  badge: string;
  batchNotice: string;
  batchTiming: string;
  address: string;
  queryAddress: string;
  customLocation?: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  timings: string;
  phone: string;
  colorScheme: {
    accent: string;
    border: string;
    bgBadge: string;
    textBadge: string;
    ring: string;
    btnGrad: string;
  };
}

export default function BranchesMapSection({
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
  mapEmbedUrl,
}: BranchesMapSectionProps) {
  const [selectedBranchId, setSelectedBranchId] = useState<BranchId>('market');

  const branches: BranchData[] = [
    {
      id: 'market',
      name: 'Market Branch (Mahaveerpura)',
      shortName: 'Market Branch',
      badge: 'Morning 7:00 AM Batch',
      batchNotice: 'New Batch Start: Morning 7:00 AM',
      batchTiming: 'Morning 7:00 AM',
      address: marketBranchAddress,
      queryAddress: 'Richariya Market, Mahaveerpura, Ghantaghar ke pass, Lalitpur, Uttar Pradesh 284403',
      customLocation: marketBranchCoordinates || marketBranchMapUrl || undefined,
      image: '/images/gallery/bfci-market-branch-mahaveerpura.jpg',
      imageAlt: 'BFCI Market Branch Richariya Market Mahaveerpura Lalitpur entrance gate',
      imageCaption: 'Market Branch Gate • Richariya Market • Full View',
      timings: '7:00 AM – 7:00 PM (Mon-Sat)',
      phone: '8726343417',
      colorScheme: {
        accent: 'text-emerald-700',
        border: 'border-emerald-300',
        bgBadge: 'bg-emerald-100 text-emerald-950 border-emerald-300',
        textBadge: 'text-emerald-800',
        ring: 'ring-2 ring-emerald-600',
        btnGrad: 'from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800',
      },
    },
    {
      id: 'headOffice',
      name: 'Head Office (Station Road Branch)',
      shortName: 'Head Office',
      badge: 'Evening 3:30 PM Batch',
      batchNotice: 'New Batch Start: Evening 3:30 PM',
      batchTiming: 'Evening 3:30 PM',
      address: headOfficeAddress,
      queryAddress: 'Bright Future Competition Institute, Behind Coffee House, Station Road, Lalitpur, Uttar Pradesh 284403',
      customLocation: headOfficeCoordinates || headOfficeMapUrl || undefined,
      image: '/images/gallery/bfci-head-office-station-road.jpg',
      imageAlt: 'BFCI Head Office Behind Coffee House Station Road Lalitpur entrance gate',
      imageCaption: 'Head Office Gate • Behind Coffee House • Station Road • Full View',
      timings: '7:00 AM – 7:30 PM (Mon-Sat)',
      phone: primaryPhone,
      colorScheme: {
        accent: 'text-amber-700',
        border: 'border-amber-300',
        bgBadge: 'bg-amber-100 text-amber-950 border-amber-300',
        textBadge: 'text-amber-800',
        ring: 'ring-2 ring-amber-500',
        btnGrad: 'from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800',
      },
    },
    {
      id: 'library',
      name: 'BFCI Digital Library & Study Hall',
      shortName: 'BFCI Digital Library',
      badge: 'Disciplined Self-Study Hall',
      batchNotice: 'Near Shiv Mandir, Near BFCI Coaching',
      batchTiming: 'Daily 7:00 AM – 8:00 PM',
      address: libraryAddress,
      queryAddress: 'BFCI Digital Library, near Shiv Mandir, near BFCI Coaching, Chandmari, Lalitpur, Uttar Pradesh 284403',
      customLocation: libraryCoordinates || libraryMapUrl || undefined,
      image: '/images/gallery/bfci-digital-library-chandmari.jpg',
      imageAlt: 'BFCI Digital Library Chandmari near Shiv Mandir Lalitpur building',
      imageCaption: 'Digital Library Campus • Near Shiv Mandir • Full View',
      timings: '7:00 AM – 8:00 PM (Daily)',
      phone: '8726343417',
      colorScheme: {
        accent: 'text-blue-700',
        border: 'border-blue-300',
        bgBadge: 'bg-blue-100 text-blue-950 border-blue-300',
        textBadge: 'text-blue-800',
        ring: 'ring-2 ring-blue-600',
        btnGrad: 'from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800',
      },
    },
  ];

  const currentBranch = branches.find((b) => b.id === selectedBranchId) || branches[0];

  // Universal Directions URL: Omitting 'origin' makes Google Maps automatically use the user's Current Location!
  const getDirectionsUrl = (targetLocation: string) => {
    const loc = (targetLocation || '').trim();
    if (loc.startsWith('https://maps.app.goo.gl') || loc.startsWith('https://goo.gl/maps')) {
      return loc;
    }
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(loc)}`;
  };

  // Dynamic Google Maps embed URL for the currently selected branch
  const activeLocation = currentBranch.customLocation || currentBranch.queryAddress;
  const activeEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    activeLocation
  )}&t=&z=17&ie=UTF8&iwloc=&output=embed`;

  const whatsappUrl = `https://wa.me/91${primaryPhone}?text=${encodeURIComponent(
    `Hello Bright Future Competition Institute! I would like directions to ${currentBranch.name} at Lalitpur.`
  )}`;

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-slate-50/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Animated Header */}
        <AnimatedSectionHeader
          className="max-w-3xl mb-8 sm:mb-12"
          badge={
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold text-blue-900 bg-blue-100 uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-blue-700" />
              Visit Our Institute Campuses
            </span>
          }
          title={
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Centrally Located Branches in Lalitpur
            </h2>
          }
          subtitle={
            <p className="text-slate-600 text-xs sm:text-sm">
              Est. 14 July 2002 • 24 Years Completed • 10,000+ Students&apos; Choice. Click on any branch or navigate directly from your current location!
            </p>
          }
        />

        {/* Dual Column Layout: Branch Cards (5 cols) + Google Maps (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Branch Details Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {branches.map((branch) => {
              const isSelected = branch.id === selectedBranchId;
              const directionsLink = getDirectionsUrl(branch.customLocation || branch.queryAddress);

              return (
                <div
                  key={branch.id}
                  onClick={() => setSelectedBranchId(branch.id)}
                  className={`bg-white p-4 sm:p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden cursor-pointer ${
                    isSelected
                      ? `${branch.colorScheme.ring} border-transparent shadow-lg bg-slate-50/60`
                      : 'border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300'
                  }`}
                >
                  {/* Selected Indicator Pill */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-900 text-white text-[10px] font-black uppercase tracking-wider shadow-sm animate-pulse">
                      <LocateFixed className="w-3 h-3 text-amber-300" />
                      <span>Map par Selected</span>
                    </div>
                  )}

                  {/* Branch Photo */}
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-xl overflow-hidden mb-3.5 bg-slate-950 border border-slate-200 shadow-inner flex items-center justify-center">
                    <Image
                      src={branch.image}
                      alt=""
                      fill
                      unoptimized={true}
                      aria-hidden="true"
                      className="object-cover blur-xl scale-125 opacity-30 pointer-events-none"
                    />
                    <Image
                      src={branch.image}
                      alt={branch.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      quality={100}
                      unoptimized={true}
                      className="object-contain p-1 hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-2 left-2 z-10 px-2.5 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-xs text-amber-300 text-[10px] font-black tracking-wide border border-white/10">
                      {branch.imageCaption}
                    </span>
                  </div>

                  {/* Header Row */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full bg-blue-600 ${isSelected ? 'animate-ping' : ''}`} />
                      <span className={`text-[10px] font-black uppercase tracking-wider ${branch.colorScheme.accent}`}>
                        {branch.shortName}
                      </span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-md border text-[10px] font-black uppercase tracking-wider ${branch.colorScheme.bgBadge}`}>
                      {branch.badge}
                    </span>
                  </div>

                  {/* Branch Title */}
                  <h3 className="text-lg font-bold text-slate-900 mb-1.5 flex items-center justify-between">
                    <span>{branch.name}</span>
                  </h3>

                  {/* Batch Notification */}
                  <div className="mb-2.5 p-2 bg-slate-100 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-700" />
                      <span>{branch.batchNotice}</span>
                    </span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-blue-900 text-white rounded">
                      Open
                    </span>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-2 mb-3 text-xs text-slate-700 leading-relaxed">
                    <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <p className="font-medium text-slate-800">{branch.address}</p>
                  </div>

                  {/* Timing & Phone Info */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs mb-3.5">
                    <div className="flex items-center gap-2 text-slate-700 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Timings: {branch.timings}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 font-medium">
                      <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <a href={`tel:${branch.phone}`} className="hover:underline font-bold text-blue-900">
                        Helpdesk: +91 {branch.phone}
                      </a>
                    </div>
                  </div>

                  {/* ACTION BUTTONS: Current Location Navigation + View on Map */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {/* Button 1: Live Current Location GPS Navigation */}
                    <a
                      href={directionsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-white font-bold text-xs uppercase tracking-wider bg-gradient-to-r ${branch.colorScheme.btnGrad} shadow-sm hover:shadow-md transition-all active:scale-95`}
                      title="Apni live Current Location se Google Maps par rasta dekhein"
                    >
                      <Navigation className="w-3.5 h-3.5 fill-current animate-bounce" />
                      <span>Current Location se Rasta</span>
                    </a>

                    {/* Button 2: Select on Map */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBranchId(branch.id);
                      }}
                      className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider border transition-colors ${
                        isSelected
                          ? 'bg-blue-900 text-white border-blue-900'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5 text-red-500" />
                      <span>{isSelected ? '✓ Map par Dikha Rha Hai' : 'Map par Dekhein'}</span>
                    </button>
                  </div>
                </div>
              );
            })}

            {/* WhatsApp Quick Link */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider block text-emerald-100">Instant Support</span>
                  <p className="text-xs font-bold">Ask for Location / Help on WhatsApp</p>
                </div>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center px-3.5 py-2.5 bg-white text-emerald-800 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-emerald-50 transition-colors shadow-xs shrink-0"
              >
                Send Location on WhatsApp
              </a>
            </div>

          </div>

          {/* Google Maps Column (7 cols) - Interactive & Location Powered */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md sticky top-20 flex flex-col">
            
            {/* Map Header Toolbar with Branch Switcher */}
            <div className="p-3 sm:p-4 bg-slate-900 text-white border-b border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    <Compass className="w-3.5 h-3.5 animate-spin" />
                    Live Google Maps Navigation
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-white">
                    {currentBranch.name}
                  </h3>
                </div>

                {/* Primary Action: Navigate from Current Location */}
                <a
                  href={getDirectionsUrl(currentBranch.customLocation || currentBranch.queryAddress)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md transition-all active:scale-95"
                >
                  <Navigation className="w-4 h-4 fill-slate-950" />
                  <span>Start Live GPS Directions</span>
                </a>
              </div>

              {/* Branch Quick Switcher Tabs */}
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {branches.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedBranchId(b.id)}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all text-center truncate ${
                      b.id === selectedBranchId
                        ? 'bg-blue-600 text-white shadow-xs font-black'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                    title={b.name}
                  >
                    {b.shortName}
                  </button>
                ))}
              </div>

              {/* Pinpoint Address Bar */}
              <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{currentBranch.address}</span>
              </div>
            </div>

            {/* Embedded Google Map iframe */}
            <div className="w-full h-[360px] sm:h-[440px] lg:h-[520px] relative bg-slate-100">
              <iframe
                key={currentBranch.id}
                src={activeEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${currentBranch.name} Google Map Location`}
                className="w-full h-full"
              />

              {/* Floating Live GPS Direction Bar at bottom */}
              <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-col sm:flex-row items-center justify-between gap-2 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg">
                <div className="flex items-center gap-2 text-xs">
                  <LocateFixed className="w-4 h-4 text-emerald-600 shrink-0 animate-pulse" />
                  <div>
                    <p className="font-bold text-slate-900 leading-tight">
                      Navigate with Your Device&apos;s Current GPS
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Destination: {currentBranch.shortName}, Lalitpur
                    </p>
                  </div>
                </div>
                <a
                  href={getDirectionsUrl(currentBranch.customLocation || currentBranch.queryAddress)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open in Google Maps App</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
