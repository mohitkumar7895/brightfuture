'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Edit3, Trash2, Award, BookOpen, Clock, X, Upload } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminFacultyPage() {
  const [faculty, setFaculty] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [subjects, setSubjects] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState('/images/faculty-teaching.jpg');
  const [order, setOrder] = useState('1');

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/faculty');
      const data = await res.json();
      if (res.ok) {
        setFaculty(data.faculty || []);
      }
    } catch {
      toast.error('Failed to load faculty');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingFaculty(null);
    setName('');
    setDesignation('Faculty Member');
    setQualification('');
    setExperience('8+ Years');
    setSubjects('');
    setBio('');
    setPhoto('/images/faculty-teaching.jpg');
    setOrder(String(faculty.length + 1));
    setModalOpen(true);
  };

  const openEditModal = (f: any) => {
    setEditingFaculty(f);
    setName(f.name);
    setDesignation(f.designation);
    setQualification(f.qualification);
    setExperience(f.experience);
    setSubjects(f.subjects);
    setBio(f.bio || '');
    setPhoto(f.photo || '/images/faculty-teaching.jpg');
    setOrder(String(f.order || 1));
    setModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      toast.info('Uploading photo...');
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setPhoto(data.url);
        toast.success('Photo uploaded');
      } else {
        toast.error(data.error || 'Upload failed');
      }
    } catch {
      toast.error('Upload failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name,
      designation,
      qualification,
      experience,
      subjects,
      bio,
      photo,
      order: Number(order) || 0,
      isPublished: true,
    };

    try {
      const url = editingFaculty ? `/api/faculty/${editingFaculty.id}` : '/api/faculty';
      const method = editingFaculty ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(editingFaculty ? 'Faculty updated' : 'Faculty added successfully');
        setModalOpen(false);
        fetchFaculty();
      } else {
        toast.error('Failed to save faculty details');
      }
    } catch {
      toast.error('Error saving faculty member');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to remove this faculty member?')) return;

    try {
      const res = await fetch(`/api/faculty/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Faculty member deleted');
        fetchFaculty();
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
            Faculty Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Maintain educator profiles, experience records, subject specialties, and biographies.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 transition-colors shadow-sm self-start sm:self-auto uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          <span>Add Faculty Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {faculty.map((f) => (
          <div
            key={f.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow p-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                  <Image
                    src={f.photo || '/images/faculty-teaching.jpg'}
                    alt={f.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-amber-600 block uppercase">
                    {f.experience}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 truncate">
                    {f.name}
                  </h3>
                  <p className="text-xs text-blue-800 font-semibold truncate">
                    {f.designation}
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1">
                <div className="text-slate-500 text-[11px]">Qualification:</div>
                <div className="font-semibold text-slate-800">{f.qualification}</div>
                <div className="text-slate-500 text-[11px] pt-1">Subjects:</div>
                <div className="font-semibold text-slate-800">{f.subjects}</div>
              </div>

              {f.bio && (
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {f.bio}
                </p>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => openEditModal(f)}
                className="px-3 py-1.5 text-blue-700 bg-blue-50 hover:bg-blue-100 font-bold rounded-lg text-xs"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(f.id)}
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
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {editingFaculty ? 'Edit Faculty Member' : 'Add New Faculty Member'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Er. A. K. Sharma"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Designation *</label>
                  <input
                    type="text"
                    required
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g. Senior Faculty (Mathematics)"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Qualification *</label>
                  <input
                    type="text"
                    required
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    placeholder="e.g. M.Sc. Mathematics, B.Ed"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Experience *</label>
                  <input
                    type="text"
                    required
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="e.g. 12+ Years Experience"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Subjects Taught *</label>
                <input
                  type="text"
                  required
                  value={subjects}
                  onChange={(e) => setSubjects(e.target.value)}
                  placeholder="Quantitative Aptitude, Advanced Maths, Reasoning"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Biography</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Notable teaching accomplishments, background, etc."
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Profile Photo</label>
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
                  {isSubmitting ? 'Saving...' : editingFaculty ? 'Save Changes' : 'Add Faculty'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

