'use client';

import React, { useEffect, useState } from 'react';
import { 
  Save, 
  Settings, 
  Phone, 
  MapPin, 
  Mail, 
  MessageCircle, 
  Share2, 
  Bell, 
  Loader2,
  Globe,
  Map,
  Sparkles,
  ExternalLink,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Settings State
  const [instituteName, setInstituteName] = useState('');
  const [tagline, setTagline] = useState('');
  const [headOfficeAddress, setHeadOfficeAddress] = useState('');
  const [marketBranchAddress, setMarketBranchAddress] = useState('');
  const [pinCode, setPinCode] = useState('284403');
  const [primaryPhone, setPrimaryPhone] = useState('9450067223');
  const [alternatePhones, setAlternatePhones] = useState('9451935450, 8726343417');
  const [email, setEmail] = useState('aj2819147@gmail.com');
  const [whatsappNumber, setWhatsappNumber] = useState('9450067223');
  const [openingHours, setOpeningHours] = useState('');
  const [announcementBarText, setAnnouncementBarText] = useState('');
  const [isAnnouncementBarActive, setIsAnnouncementBarActive] = useState(true);
  const [mapEmbedUrl, setMapEmbedUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [telegramUrl, setTelegramUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (res.ok && data.settings) {
        const s = data.settings;
        setInstituteName(s.instituteName || 'Bright Future Competition Institute');
        setTagline(s.tagline || '');
        setHeadOfficeAddress(s.headOfficeAddress || '');
        setMarketBranchAddress(s.marketBranchAddress || '');
        setPinCode(s.pinCode || '284403');
        setPrimaryPhone(s.primaryPhone || '9450067223');
        setAlternatePhones(s.alternatePhones || '9451935450, 8726343417');
        setEmail(s.email || 'aj2819147@gmail.com');
        setWhatsappNumber(s.whatsappNumber || '9450067223');
        setOpeningHours(s.openingHours || '');
        setAnnouncementBarText(s.announcementBarText || '');
        setIsAnnouncementBarActive(Boolean(s.isAnnouncementBarActive));
        setMapEmbedUrl(s.mapEmbedUrl || '');
        setFacebookUrl(s.facebookUrl || '');
        setYoutubeUrl(s.youtubeUrl || '');
        setTelegramUrl(s.telegramUrl || '');
        setInstagramUrl(s.instagramUrl || '');
      }
    } catch {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleMapUrlInput = (input: string) => {
    // If user pastes full iframe like <iframe src="..." ...></iframe>
    const iframeMatch = input.match(/src=["'](.*?)["']/);
    if (iframeMatch && iframeMatch[1]) {
      setMapEmbedUrl(iframeMatch[1]);
      toast.success('Google Maps iframe source extracted');
      return;
    }
    // If user pasted normal URL
    if (input.startsWith('http://') || input.startsWith('https://')) {
      setMapEmbedUrl(input);
      return;
    }
    // If user typed a text address
    if (input.trim()) {
      const generated = `https://maps.google.com/maps?q=${encodeURIComponent(input.trim())}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
      setMapEmbedUrl(generated);
      toast.success('Generated Google Maps embed from address');
      return;
    }
    setMapEmbedUrl(input);
  };

  const setBatchPreset = (text: string) => {
    setAnnouncementBarText(text);
    setIsAnnouncementBarActive(true);
    toast.success('Batch announcement updated');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      instituteName,
      tagline,
      headOfficeAddress,
      marketBranchAddress,
      pinCode,
      primaryPhone,
      alternatePhones,
      email,
      whatsappNumber,
      openingHours,
      announcementBarText,
      isAnnouncementBarActive,
      mapEmbedUrl,
      facebookUrl,
      youtubeUrl,
      telegramUrl,
      instagramUrl,
    };

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success('Institute settings updated successfully');
      } else {
        toast.error('Failed to update settings');
      }
    } catch {
      toast.error('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-800" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Institutional Settings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Update branch addresses, official telephone numbers, email, WhatsApp, and social media handles.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Core Identity */}
        <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs space-y-4 text-xs font-medium">
          <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
            Institute Identity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Institute Name *</label>
              <input
                type="text"
                required
                value={instituteName}
                onChange={(e) => setInstituteName(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Addresses & Branches */}
        <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs space-y-4 text-xs font-medium">
          <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
            Lalitpur Branch Addresses
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Head Office Address (Behind Krishna Cinema, Station Road) *
              </label>
              <textarea
                rows={2}
                required
                value={headOfficeAddress}
                onChange={(e) => setHeadOfficeAddress(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Market Branch Address (Richariya Market, Mahaveerpura) *
              </label>
              <textarea
                rows={2}
                required
                value={marketBranchAddress}
                onChange={(e) => setMarketBranchAddress(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">PIN Code *</label>
              <input
                type="text"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Daily Opening Hours</label>
              <input
                type="text"
                value={openingHours}
                onChange={(e) => setOpeningHours(e.target.value)}
                placeholder="Monday - Saturday: 7:00 AM - 7:30 PM"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Contact Numbers */}
        <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs space-y-4 text-xs font-medium">
          <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
            Contact Numbers & WhatsApp
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Primary Phone Number *</label>
              <input
                type="text"
                required
                value={primaryPhone}
                onChange={(e) => setPrimaryPhone(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">WhatsApp Helpline Number *</label>
              <input
                type="text"
                required
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block font-bold text-slate-700">Alternate Contact Numbers / Helplines</label>
              <span className="text-[11px] text-blue-800 font-bold bg-blue-50 px-2 py-0.5 rounded-md">
                Featured Helpline: 8726343417
              </span>
            </div>
            <input
              type="text"
              value={alternatePhones}
              onChange={(e) => setAlternatePhones(e.target.value)}
              placeholder="9451935450, 8726343417"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Separate numbers with commas. Number <strong>8726343417</strong> is featured as a quick-dial counselor helpline on admission forms and footer.
            </p>
          </div>
        </div>

        {/* New Batch Date, Time & Announcement Alert */}
        <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs space-y-4 text-xs font-medium">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-500" />
              <h2 className="text-base font-bold text-slate-900">
                New Batch Date, Time &amp; Announcement Alert
              </h2>
            </div>
            <label className="flex items-center gap-2 cursor-pointer bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <input
                type="checkbox"
                checked={isAnnouncementBarActive}
                onChange={(e) => setIsAnnouncementBarActive(e.target.checked)}
                className="w-4 h-4 rounded text-blue-800"
              />
              <span className="font-bold text-slate-800">Show Announcement Bar</span>
            </label>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Top Header Announcement Text (Shows on top of the website)
            </label>
            <input
              type="text"
              value={announcementBarText}
              onChange={(e) => setAnnouncementBarText(e.target.value)}
              placeholder="Admissions Open for New Batches: UP Police Constable / SI, SSC CGL/CHSL & Railway NTPC! Visit Head Office or Call 8726343417 / 9450067223."
              className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none"
            />
          </div>

          <div>
            <span className="block font-bold text-slate-700 mb-2">
              Quick Batch Date &amp; Time Presets (Click to apply):
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  setBatchPreset(
                    '⚡ Admissions Open for New Batches: UP Police Constable & SI Special Target Batch Starts Monday! Morning: 7:30 AM | Call 8726343417.'
                  )
                }
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 font-semibold rounded-lg text-xs transition-colors border border-blue-200 text-left"
              >
                🚔 UP Police Constable &amp; SI Batch
              </button>
              <button
                type="button"
                onClick={() =>
                  setBatchPreset(
                    '🎯 SSC CGL & CHSL 2025 Foundation Batch Starting This Week! Timings: 8:00 AM - 11:30 AM | Limited 40 Seats | Call 8726343417 / 9450067223.'
                  )
                }
                className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-semibold rounded-lg text-xs transition-colors border border-indigo-200 text-left"
              >
                💼 SSC CGL / CHSL Batch
              </button>
              <button
                type="button"
                onClick={() =>
                  setBatchPreset(
                    '🚂 Railway RRB NTPC & Group D Success Batch Commences from 20th! Free 2-Day Demo Class. Helpline: 8726343417.'
                  )
                }
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-semibold rounded-lg text-xs transition-colors border border-emerald-200 text-left"
              >
                🚂 Railway NTPC Batch
              </button>
              <button
                type="button"
                onClick={() =>
                  setBatchPreset(
                    '🌟 Admissions Open: UP Police, SSC, Railway & UPSSSC! Visit Station Road Head Office or Call 8726343417 / 9450067223.'
                  )
                }
                className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold rounded-lg text-xs transition-colors border border-amber-200 text-left"
              >
                🌟 All Courses Open Alert
              </button>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs space-y-4 text-xs font-medium">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Share2 className="w-4 h-4 text-blue-700" />
            <h2 className="text-base font-bold text-slate-900">
              Social Media Links &amp; Profiles
            </h2>
          </div>
          <p className="text-slate-500 text-xs">
            Admin can add or update Facebook, Instagram, YouTube and Telegram handles here. Active links are displayed across the Website Header, TopBar, Footer, and Contact page.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Facebook */}
            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>Facebook Page URL</span>
              </label>
              <input
                type="text"
                value={facebookUrl}
                onChange={(e) => setFacebookUrl(e.target.value)}
                placeholder="https://facebook.com/brightfuturelalitpur"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Instagram */}
            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-pink-600"></span>
                <span>Instagram Profile URL</span>
              </label>
              <input
                type="text"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                placeholder="https://instagram.com/brightfuturelalitpur"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-600"
              />
            </div>

            {/* YouTube */}
            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-600"></span>
                <span>YouTube Channel URL</span>
              </label>
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://youtube.com/@brightfuturecompetition"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            {/* Telegram */}
            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                <span>Telegram Channel URL</span>
              </label>
              <input
                type="text"
                value={telegramUrl}
                onChange={(e) => setTelegramUrl(e.target.value)}
                placeholder="https://t.me/brightfuturelalitpur"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
        </div>

        {/* Current Location & Google Map Embed */}
        <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs space-y-4 text-xs font-medium">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Map className="w-4 h-4 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900">
                Google Map Location &amp; Embed Settings
              </h2>
            </div>
            {mapEmbedUrl && (
              <a
                href={mapEmbedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-blue-700 font-bold hover:underline"
              >
                <span>Test Link</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <p className="text-slate-500 text-xs">
            Admin can update the exact location map shown on the website home page and contact page. Paste any Google Maps share/embed link, an full <code className="bg-slate-100 px-1 py-0.5 rounded">&lt;iframe src=&quot;...&quot;&gt;</code> tag, or type a location address to auto-generate.
          </p>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Current Location Map URL / Iframe / Address *
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={mapEmbedUrl}
                onChange={(e) => handleMapUrlInput(e.target.value)}
                placeholder="Paste Google Maps iframe src or embed URL (e.g. https://www.google.com/maps/embed?...)"
                className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 font-mono text-xs"
              />
            </div>
          </div>

          {/* Quick Location Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={() =>
                handleMapUrlInput(
                  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14549.467891234!2d78.406981!3d24.688172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3979ea375d000001%3A0x6b8f1b6238b725b8!2sLalitpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000'
                )
              }
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-xs transition-colors"
            >
              📍 Use Station Road Lalitpur Default Map
            </button>
            <button
              type="button"
              onClick={() => handleMapUrlInput(headOfficeAddress || 'Behind Krishna Cinema, Station Road, Lalitpur, Uttar Pradesh')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-xs transition-colors"
            >
              🏢 Auto-Generate from Head Office Address
            </button>
            <button
              type="button"
              onClick={() => handleMapUrlInput(marketBranchAddress || 'Richariya Market, Mahaveerpura, Lalitpur')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-xs transition-colors"
            >
              🏪 Auto-Generate from Market Branch Address
            </button>
          </div>

          {/* Live Google Map Interactive Preview Box */}
          <div className="pt-2">
            <span className="block font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <span>Live Interactive Map Preview:</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                Updates in Real-Time
              </span>
            </span>
            <div className="w-full h-64 sm:h-72 bg-slate-100 rounded-2xl overflow-hidden border border-slate-300 shadow-inner relative">
              {mapEmbedUrl ? (
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Live Google Map Preview"
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                  <MapPin className="w-8 h-8 text-slate-300 mb-2" />
                  <p className="font-semibold text-xs">No Map Embed URL Configured</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Enter an address or paste a Google Maps iframe src above to preview.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 transition-colors uppercase tracking-wider shadow-lg shadow-blue-800/25 disabled:opacity-70 w-full sm:w-auto"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save All Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

