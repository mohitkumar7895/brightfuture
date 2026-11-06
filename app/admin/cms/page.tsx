'use client';

import React, { useEffect, useState } from 'react';
import { Save, Loader2, FileText, CheckCircle2, Sparkles, Layout } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminCmsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'about'>('home');

  // Home Page State
  const [heroBadge, setHeroBadge] = useState('');
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [aboutTitle, setAboutTitle] = useState('');
  const [aboutContent, setAboutContent] = useState('');
  const [whyChooseUs, setWhyChooseUs] = useState('');

  // About Page State
  const [aboutHeroTitle, setAboutHeroTitle] = useState('');
  const [aboutHeroSubtitle, setAboutHeroSubtitle] = useState('');
  const [mission, setMission] = useState('');
  const [vision, setVision] = useState('');
  const [history, setHistory] = useState('');
  const [methodology, setMethodology] = useState('');
  const [infrastructure, setInfrastructure] = useState('');

  useEffect(() => {
    fetchCmsData();
  }, []);

  const fetchCmsData = async () => {
    setLoading(true);
    try {
      const [resHome, resAbout] = await Promise.all([
        fetch('/api/cms?pageKey=home'),
        fetch('/api/cms?pageKey=about'),
      ]);

      const homeData = await resHome.json();
      const aboutData = await resAbout.json();

      if (homeData.content) {
        setHeroBadge(homeData.content.heroBadge || '');
        setHeroTitle(homeData.content.heroTitle || '');
        setHeroSubtitle(homeData.content.heroSubtitle || '');
        setAboutTitle(homeData.content.aboutTitle || '');
        setAboutContent(homeData.content.aboutContent || '');
        setWhyChooseUs(homeData.content.whyChooseUs || '');
      }

      if (aboutData.content) {
        setAboutHeroTitle(aboutData.content.heroTitle || '');
        setAboutHeroSubtitle(aboutData.content.heroSubtitle || '');
        setMission(aboutData.content.mission || '');
        setVision(aboutData.content.vision || '');
        setHistory(aboutData.content.history || '');
        setMethodology(aboutData.content.methodology || '');
        setInfrastructure(aboutData.content.infrastructure || '');
      }
    } catch {
      toast.error('Failed to load CMS content');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveHome = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/cms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageKey: 'home',
          heroBadge,
          heroTitle,
          heroSubtitle,
          aboutTitle,
          aboutContent,
          whyChooseUs,
        }),
      });

      if (res.ok) {
        toast.success('Homepage CMS content saved to MySQL');
      } else {
        toast.error('Save failed');
      }
    } catch {
      toast.error('Error saving CMS content');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/cms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageKey: 'about',
          heroTitle: aboutHeroTitle,
          heroSubtitle: aboutHeroSubtitle,
          mission,
          vision,
          history,
          methodology,
          infrastructure,
        }),
      });

      if (res.ok) {
        toast.success('About page CMS content saved to MySQL');
      } else {
        toast.error('Save failed');
      }
    } catch {
      toast.error('Error saving About CMS');
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
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Website Content Management (CMS)
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Dynamically modify titles, descriptions, mission, vision, and institute history without changing code.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('home')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors uppercase tracking-wider ${
            activeTab === 'home'
              ? 'border-blue-800 text-blue-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Homepage Content
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('about')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-colors uppercase tracking-wider ${
            activeTab === 'about'
              ? 'border-blue-800 text-blue-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          About Us Page Content
        </button>
      </div>

      {/* Home Tab */}
      {activeTab === 'home' && (
        <form onSubmit={handleSaveHome} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5 text-xs font-medium">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">
              Homepage Hero & Core Sections
            </h2>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 transition-colors uppercase tracking-wider disabled:opacity-70"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : 'Save Homepage Content'}</span>
            </button>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Hero Tagline Badge</label>
            <input
              type="text"
              value={heroBadge}
              onChange={(e) => setHeroBadge(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Homepage Main Title (H1)</label>
            <input
              type="text"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Hero Subtitle / Description</label>
            <textarea
              rows={3}
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Introduction Section Heading</label>
            <input
              type="text"
              value={aboutTitle}
              onChange={(e) => setAboutTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Institute Introduction Narrative</label>
            <textarea
              rows={4}
              value={aboutContent}
              onChange={(e) => setAboutContent(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 transition-colors uppercase tracking-wider disabled:opacity-70"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : 'Save Homepage Content'}</span>
            </button>
          </div>
        </form>
      )}

      {/* About Tab */}
      {activeTab === 'about' && (
        <form onSubmit={handleSaveAbout} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5 text-xs font-medium">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">
              About Us Page Content
            </h2>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 transition-colors uppercase tracking-wider disabled:opacity-70"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : 'Save About Page'}</span>
            </button>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">About Page Headline</label>
            <input
              type="text"
              value={aboutHeroTitle}
              onChange={(e) => setAboutHeroTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">About Page Subtitle</label>
            <input
              type="text"
              value={aboutHeroSubtitle}
              onChange={(e) => setAboutHeroSubtitle(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Our Mission Statement</label>
            <textarea
              rows={3}
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Our Vision Statement</label>
            <textarea
              rows={3}
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Our History in Lalitpur (Founded 2012)</label>
            <textarea
              rows={4}
              value={history}
              onChange={(e) => setHistory(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Teaching Methodology (4 Pillars)</label>
            <textarea
              rows={4}
              value={methodology}
              onChange={(e) => setMethodology(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Campus Infrastructure Description</label>
            <textarea
              rows={3}
              value={infrastructure}
              onChange={(e) => setInfrastructure(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 transition-colors uppercase tracking-wider disabled:opacity-70"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : 'Save About Page'}</span>
            </button>
          </div>
        </form>
      )}

    </div>
  );
}

