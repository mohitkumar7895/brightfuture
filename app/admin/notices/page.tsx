'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Edit3, Trash2, Pin, Calendar, Bell, X, Loader2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('GENERAL');
  const [isPinned, setIsPinned] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/notices');
      const data = await res.json();
      if (res.ok) setNotices(data.notices || []);
    } catch {
      toast.error('Failed to load notices');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingNotice(null);
    setTitle('');
    setContent('');
    setCategory('ADMISSION');
    setIsPinned(false);
    setIsPublished(true);
    setModalOpen(true);
  };

  const openEditModal = (n: any) => {
    setEditingNotice(n);
    setTitle(n.title);
    setContent(n.content);
    setCategory(n.category);
    setIsPinned(Boolean(n.isPinned));
    setIsPublished(Boolean(n.isPublished));
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      title,
      content,
      category,
      isPinned,
      isPublished,
    };

    try {
      const url = editingNotice ? `/api/notices/${editingNotice.id}` : '/api/notices';
      const method = editingNotice ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(editingNotice ? 'Notice updated' : 'Notice published successfully');
        setModalOpen(false);
        fetchNotices();
      } else {
        toast.error('Failed to save notice');
      }
    } catch {
      toast.error('Error saving notice');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this notice?')) return;

    try {
      const res = await fetch(`/api/notices/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Notice deleted');
        fetchNotices();
      } else {
        toast.error('Delete failed');
      }
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Notice & Announcement Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Publish circulars, test schedules, and pin critical updates to the homepage ticker.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 transition-colors shadow-sm self-start sm:self-auto uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Notice</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notices.map((n) => (
          <div
            key={n.id}
            className={`p-6 rounded-3xl border shadow-xs flex flex-col justify-between ${
              n.isPinned ? 'bg-amber-50/50 border-amber-300' : 'bg-white border-slate-200'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-blue-100 text-blue-900">
                    {n.category}
                  </span>
                  {n.isPinned && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-amber-400 text-slate-950">
                      <Pin className="w-3 h-3 fill-slate-950" />
                      Pinned to Ticker
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 font-semibold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(n.publishDate)}</span>
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900">
                {n.title}
              </h3>

              <div
                className="text-xs text-slate-600 line-clamp-3 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: n.content }}
              />
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => openEditModal(n)}
                className="px-3 py-1.5 text-blue-700 bg-blue-50 hover:bg-blue-100 font-bold rounded-lg text-xs"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(n.id)}
                className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {editingNotice ? 'Edit Notice' : 'Publish Notice'}
              </h3>
              <button type="button" onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Notice Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. New Batch Starting from Next Monday"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
                >
                  <option value="ADMISSION">ADMISSION (Batches & Registration)</option>
                  <option value="EXAM">EXAM (Mock Tests & Results)</option>
                  <option value="GENERAL">GENERAL (Holidays & Updates)</option>
                  <option value="EVENT">EVENT (Seminars & Guidance)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Notice Content *</label>
                <textarea
                  rows={5}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter notice announcement details..."
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPinned}
                    onChange={(e) => setIsPinned(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-800"
                  />
                  <span className="font-bold text-slate-700">Pin to Notice Ticker on Homepage</span>
                </label>
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
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 uppercase tracking-wider disabled:opacity-70"
                >
                  {isSubmitting ? 'Saving...' : editingNotice ? 'Save Changes' : 'Publish Notice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

