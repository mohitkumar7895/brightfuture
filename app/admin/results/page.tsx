'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Edit3, Trash2, Trophy, Upload, X } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminResultsPage() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingResult, setEditingResult] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [studentName, setStudentName] = useState('');
  const [examName, setExamName] = useState('');
  const [rank, setRank] = useState('');
  const [year, setYear] = useState('2024');
  const [photo, setPhoto] = useState('/images/student-toppers.jpg');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/results');
      const data = await res.json();
      if (res.ok) setResults(data.results || []);
    } catch {
      toast.error('Failed to load results');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingResult(null);
    setStudentName('');
    setExamName('UP Police Constable Examination');
    setRank('Selected');
    setYear('2025');
    setPhoto('/images/student-toppers.jpg');
    setDescription('');
    setModalOpen(true);
  };

  const openEditModal = (r: any) => {
    setEditingResult(r);
    setStudentName(r.studentName);
    setExamName(r.examName);
    setRank(r.rank || '');
    setYear(String(r.year));
    setPhoto(r.photo || '/images/student-toppers.jpg');
    setDescription(r.description || '');
    setModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      toast.info('Uploading topper photo...');
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok) {
        setPhoto(data.url);
        toast.success('Photo uploaded');
      } else {
        toast.error('Upload failed');
      }
    } catch {
      toast.error('Upload failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      studentName,
      examName,
      rank,
      year: Number(year),
      photo,
      description,
      isFeatured: true,
    };

    try {
      const url = editingResult ? `/api/results/${editingResult.id}` : '/api/results';
      const method = editingResult ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(editingResult ? 'Result updated' : 'Achievement added successfully');
        setModalOpen(false);
        fetchResults();
      } else {
        toast.error('Failed to save achievement');
      }
    } catch {
      toast.error('Error saving result');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this achievement?')) return;

    try {
      const res = await fetch(`/api/results/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Achievement deleted');
        fetchResults();
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
            Results & Achievements Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Display student qualifications, government posts, and merit ranks on the public website.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 transition-colors shadow-sm self-start sm:self-auto uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          <span>Add Topper Result</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
          >
            <div className="space-y-3">
              <div className="flex items-start gap-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                  <Image
                    src={r.photo || '/images/student-toppers.jpg'}
                    alt={r.studentName}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded uppercase">
                    Year {r.year}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 truncate mt-1">
                    {r.studentName}
                  </h3>
                  <p className="text-xs text-blue-800 font-semibold truncate">
                    {r.examName}
                  </p>
                </div>
              </div>

              {r.rank && (
                <div className="bg-slate-50 p-2.5 rounded-xl text-xs font-bold text-slate-800 border border-slate-100 flex items-center justify-between">
                  <span className="text-slate-500 font-normal">Rank / Post:</span>
                  <span>{r.rank}</span>
                </div>
              )}

              {r.description && (
                <p className="text-xs text-slate-600 italic line-clamp-2">
                  &ldquo;{r.description}&rdquo;
                </p>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => openEditModal(r)}
                className="px-3 py-1.5 text-blue-700 bg-blue-50 hover:bg-blue-100 font-bold rounded-lg text-xs"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(r.id)}
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
                {editingResult ? 'Edit Achievement' : 'Add Student Achievement'}
              </h3>
              <button type="button" onClick={() => setModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Student Name *</label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Amit Yadav"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Exam Name *</label>
                  <input
                    type="text"
                    required
                    value={examName}
                    onChange={(e) => setExamName(e.target.value)}
                    placeholder="e.g. UP Police Constable"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Exam Year *</label>
                  <input
                    type="number"
                    required
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="2024"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Rank / Post Achieved</label>
                <input
                  type="text"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  placeholder="e.g. Inspector of Central Excise / Selected"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Student Quote / Testimonial</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Credited regular mock test series and speed mathematics at Bright Future..."
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Student Photo</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl"
                  />
                  <label className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl cursor-pointer flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
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
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 uppercase tracking-wider disabled:opacity-70"
                >
                  {isSubmitting ? 'Saving...' : editingResult ? 'Save Changes' : 'Add Result'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

