'use client';

import React, { useEffect, useState } from 'react';
import { Globe, Save, Loader2, Edit3, X } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSeoPage() {
  const [seoList, setSeoList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [pageSlug, setPageSlug] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [robots, setRobots] = useState('index, follow');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSeo();
  }, []);

  const fetchSeo = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/seo');
      const data = await res.json();
      if (res.ok) setSeoList(data.allSeo || []);
    } catch {
      toast.error('Failed to load SEO metadata');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setPageSlug(item.pageSlug);
    setMetaTitle(item.metaTitle);
    setMetaDescription(item.metaDescription);
    setKeywords(item.keywords || '');
    setCanonicalUrl(item.canonicalUrl || '');
    setRobots(item.robots || 'index, follow');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      pageSlug,
      metaTitle,
      metaDescription,
      keywords,
      canonicalUrl,
      robots,
    };

    try {
      const res = await fetch('/api/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(`SEO metadata updated for ${pageSlug}`);
        setModalOpen(false);
        fetchSeo();
      } else {
        toast.error('Failed to update SEO');
      }
    } catch {
      toast.error('Error saving SEO');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          SEO Metadata Management
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Customize search engine meta titles, descriptions, and keywords for top ranking in Lalitpur and Uttar Pradesh.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-slate-400">Loading SEO records...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Page Route</th>
                  <th className="py-3.5 px-6">Meta Title (SERP)</th>
                  <th className="py-3.5 px-6">Meta Description</th>
                  <th className="py-3.5 px-6">Robots</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {seoList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 font-mono text-xs">
                      {item.pageSlug}
                    </td>
                    <td className="py-4 px-6 font-semibold text-blue-900 max-w-xs truncate">
                      {item.metaTitle}
                    </td>
                    <td className="py-4 px-6 text-slate-600 max-w-sm truncate">
                      {item.metaDescription}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase">
                        {item.robots}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="px-3 py-1.5 bg-blue-50 text-blue-800 hover:bg-blue-800 hover:text-white rounded-lg text-xs font-bold transition-colors"
                      >
                        Edit SEO
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                Edit SEO for {pageSlug}
              </h3>
              <button type="button" onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Meta Title (Google Result Title) *
                </label>
                <input
                  type="text"
                  required
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
                />
                <span className="text-[10px] text-slate-400 block mt-1">
                  Recommended: 50-60 characters ({metaTitle.length} chars)
                </span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Meta Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
                />
                <span className="text-[10px] text-slate-400 block mt-1">
                  Recommended: 140-160 characters ({metaDescription.length} chars)
                </span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Target Search Keywords
                </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="coaching in Lalitpur, UP Police batch, best coaching..."
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Canonical URL</label>
                  <input
                    type="text"
                    value={canonicalUrl}
                    onChange={(e) => setCanonicalUrl(e.target.value)}
                    placeholder="https://brightfutureinstitute.com/about"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Robots Directives</label>
                  <input
                    type="text"
                    value={robots}
                    onChange={(e) => setRobots(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 uppercase tracking-wider disabled:opacity-70"
                >
                  {isSaving ? 'Saving...' : 'Update SEO'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

