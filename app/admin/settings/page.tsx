'use client';

import React, { useEffect, useState } from 'react';
import { Save, Settings, Phone, MapPin, Mail, MessageCircle, Share2, Bell, Loader2 } from 'lucide-react';
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
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 text-xs font-medium">
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
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Addresses & Branches */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 text-xs font-medium">
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
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
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
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
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
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Daily Opening Hours</label>
              <input
                type="text"
                value={openingHours}
                onChange={(e) => setOpeningHours(e.target.value)}
                placeholder="Monday - Saturday: 7:00 AM - 7:30 PM"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Contact Numbers */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 text-xs font-medium">
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
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">WhatsApp Helpline Number *</label>
              <input
                type="text"
                required
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Alternate Contact Numbers</label>
            <input
              type="text"
              value={alternatePhones}
              onChange={(e) => setAlternatePhones(e.target.value)}
              placeholder="9451935450, 8726343417"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
            />
          </div>
        </div>

        {/* Announcement Bar & Social */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 text-xs font-medium">
          <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
            Top Announcement Bar & Social Links
          </h2>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-700">Top Announcement Text</label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnnouncementBarActive}
                  onChange={(e) => setIsAnnouncementBarActive(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-800"
                />
                <span className="font-bold text-slate-700">Active</span>
              </label>
            </div>
            <input
              type="text"
              value={announcementBarText}
              onChange={(e) => setAnnouncementBarText(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block font-bold text-slate-700 mb-1">YouTube Channel URL</label>
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://youtube.com/@brightfuture"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Telegram Channel URL</label>
              <input
                type="text"
                value={telegramUrl}
                onChange={(e) => setTelegramUrl(e.target.value)}
                placeholder="https://t.me/brightfuture"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 transition-colors uppercase tracking-wider shadow-lg shadow-blue-800/25 disabled:opacity-70"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save All Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

