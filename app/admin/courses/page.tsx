'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Clock, 
  Users, 
  X, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Eye, 
  EyeOff,
  BookOpen,
  Calendar,
  Sparkles,
  Loader2,
  Image as ImageIcon,
  Check
} from 'lucide-react';
import { formatCurrency, slugify } from '@/lib/utils';
import { toast } from 'sonner';

const PRESET_COACHING_IMAGES = [
  { name: 'Police Award', path: '/images/gallery/felicitation-police-award.jpg' },
  { name: 'Sunday Mock Test 1', path: '/images/gallery/classroom-mock-test-1.jpg' },
  { name: 'Sunday Mock Test 2', path: '/images/gallery/classroom-mock-test-2.jpg' },
  { name: 'Batch Classroom', path: '/images/gallery/classroom-batch-session.jpg' },
  { name: 'Champions Class', path: '/images/gallery/classroom-champions.jpg' },
  { name: 'Students Batch', path: '/images/gallery/classroom-students-batch.jpg' },
  { name: 'Lecture Hall', path: '/images/gallery/classroom-lecture-hall.jpg' },
  { name: 'Head Office', path: '/images/gallery/bfci-head-office-station-road.jpg' },
  { name: 'Digital Library', path: '/images/gallery/bfci-digital-library-chandmari.jpg' },
  { name: 'Police Felicitation', path: '/images/gallery/toppers-police-felicitation.jpg' },
  { name: 'Topper Trophy 1', path: '/images/gallery/toppers-trophy-celebration-1.jpg' },
  { name: 'Topper Trophy 2', path: '/images/gallery/toppers-trophy-celebration-2.jpg' },
  { name: 'Female Toppers', path: '/images/gallery/female-toppers-awards.jpg' },
  { name: 'Mock Trophy Shield', path: '/images/gallery/mock-test-topper-trophy.jpg' },
  { name: 'Female Toppers Shield', path: '/images/gallery/female-toppers-felicitation.jpg' },
];

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [eligibility, setEligibility] = useState('');
  const [duration, setDuration] = useState('');
  const [subjects, setSubjects] = useState('');
  const [fee, setFee] = useState('');
  const [discountFee, setDiscountFee] = useState('');
  const [batchInfo, setBatchInfo] = useState('');
  const [image, setImage] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/courses?all=true', { cache: 'no-store' });
      const data = await res.json();
      if (res.ok) {
        setCourses(data.courses || []);
        if (data.categories && data.categories.length > 0) {
          setCategories(data.categories);
        }
      }
    } catch {
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingCourse(null);
    setTitle('');
    setSlug('');
    setCategoryId(categories.length > 0 ? String(categories[0].id) : '1');
    setShortDescription('');
    setDescription('Comprehensive exam-oriented batch with daily lectures, weekly mock tests, and printed study material.');
    setEligibility('12th Pass (Intermediate) / Graduate depending on examination requirements');
    setDuration('6 Months');
    setSubjects('General Knowledge, Maths, Reasoning, General Hindi');
    setFee('7500');
    setDiscountFee('5999');
    setBatchInfo('Morning: 8:00 AM - 11:30 AM | Evening: 3:30 PM - 6:30 PM');
    setImage('/images/hero-classroom.jpg');
    setIsFeatured(false);
    setIsPublished(true);
    setMetaTitle('');
    setMetaDescription('');
    setModalOpen(true);
  };

  const openEditModal = (c: any) => {
    setEditingCourse(c);
    setTitle(c.title);
    setSlug(c.slug);
    setCategoryId(c.categoryId ? String(c.categoryId) : '');
    setShortDescription(c.shortDescription || '');
    setDescription(c.description || '');
    setEligibility(c.eligibility || '');
    setDuration(c.duration || '');
    setSubjects(c.subjects || '');
    setFee(String(c.fee));
    setDiscountFee(c.discountFee ? String(c.discountFee) : '');
    setBatchInfo(c.batchInfo || '');
    setImage(c.image || '/images/hero-classroom.jpg');
    setIsFeatured(Boolean(c.isFeatured));
    setIsPublished(Boolean(c.isPublished));
    setMetaTitle(c.metaTitle || '');
    setMetaDescription(c.metaDescription || '');
    setModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingCourse) {
      setSlug(slugify(val));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input value so re-selecting same file works
    e.target.value = '';

    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(true);
    try {
      toast.info('Uploading course image...');
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setImage(data.url);
        toast.success('Image uploaded successfully');
      } else {
        toast.error(data.error || 'Upload failed');
      }
    } catch {
      toast.error('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const cleanTitle = (title || '').trim();
    if (cleanTitle.length < 3) {
      toast.error('Course title must be at least 3 characters');
      setIsSubmitting(false);
      return;
    }

    const cleanDescription = (description || '').trim();
    if (cleanDescription.length < 10) {
      toast.error('Course description must be at least 10 characters');
      setIsSubmitting(false);
      return;
    }

    const cleanSlug = (slug || slugify(cleanTitle)).trim();

    const payload = {
      title: cleanTitle,
      slug: cleanSlug,
      categoryId: categoryId && Number(categoryId) > 0 ? Number(categoryId) : null,
      shortDescription: shortDescription?.trim() || null,
      description: cleanDescription,
      eligibility: eligibility?.trim() || null,
      duration: duration.trim() || '6 Months',
      subjects: subjects?.trim() || null,
      fee: Number(fee) || 0,
      discountFee: discountFee && Number(discountFee) > 0 ? Number(discountFee) : null,
      batchInfo: batchInfo?.trim() || null,
      image: image || '/images/hero-classroom.jpg',
      isFeatured: Boolean(isFeatured),
      isPublished: Boolean(isPublished),
      metaTitle: metaTitle?.trim() || null,
      metaDescription: metaDescription?.trim() || null,
      keywords: null,
    };

    try {
      const url = editingCourse ? `/api/courses/${editingCourse.id}` : '/api/courses';
      const method = editingCourse ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(editingCourse ? 'Course updated successfully' : 'Course created successfully');
        setModalOpen(false);
        const savedCourse = data.course;
        if (savedCourse) {
          const selectedCat = categories.find((cat) => Number(cat.id) === Number(savedCourse.categoryId));
          const courseWithCat = {
            ...savedCourse,
            category: selectedCat ? { id: selectedCat.id, name: selectedCat.name, slug: selectedCat.slug, icon: selectedCat.icon } : null,
          };
          if (editingCourse) {
            setCourses((prev) => prev.map((c) => (Number(c.id) === Number(courseWithCat.id) ? { ...c, ...courseWithCat } : c)));
          } else {
            setCourses((prev) => [courseWithCat, ...prev]);
          }
        }
        fetchCourses();
      } else {
        toast.error(data.error || 'Failed to save course');
      }
    } catch (err: any) {
      toast.error(err.message || 'Error saving course');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to permanently delete this course?')) return;

    // Optimistically remove from state immediately
    setCourses((prev) => prev.filter((c) => c.id !== id));
    toast.success('Course deleted');

    try {
      const res = await fetch(`/api/courses/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        toast.error('Failed to delete course');
        fetchCourses();
      }
    } catch {
      toast.error('Delete failed');
      fetchCourses();
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Course Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage competitive batches, fee structures, syllabus breakdowns, and online publish status.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 transition-colors shadow-sm self-start sm:self-auto uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Course</span>
        </button>
      </div>

      {/* Course Cards / Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-slate-400">Loading courses...</div>
        ) : courses.length === 0 ? (
          <div className="p-16 text-center text-slate-400 space-y-3">
            <BookOpen className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-sm font-bold text-slate-600">No courses currently configured.</p>
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-blue-800 text-white rounded-xl text-xs font-bold"
            >
              Add First Course
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-4 w-20">Banner</th>
                  <th className="py-3.5 px-6">Course Name</th>
                  <th className="py-3.5 px-6">Category</th>
                  <th className="py-3.5 px-6">Duration</th>
                  <th className="py-3.5 px-6">Fee Structure</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {courses.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="relative w-16 h-11 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xs shrink-0">
                        <Image
                          src={c.image || '/images/hero-classroom.jpg'}
                          alt={c.title}
                          fill
                          quality={100}
                          unoptimized={true}
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">
                      <div>
                        <span className="text-sm block">{c.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                          slug: {c.slug}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-700">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-800">
                        {c.category?.name || 'General'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-700 font-semibold">
                      {c.duration}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-bold text-slate-900">
                          {formatCurrency(c.discountFee || c.fee)}
                        </span>
                        {c.discountFee && c.discountFee < c.fee && (
                          <span className="text-[10px] text-slate-400 line-through">
                            {formatCurrency(c.fee)}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          c.isPublished
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {c.isPublished ? 'Published' : 'Draft'}
                      </span>
                      {c.isFeatured && (
                        <span className="ml-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                          ★ Featured
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(c)}
                        className="p-1.5 text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Course"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(c.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Course"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                {editingCourse ? 'Edit Course Details' : 'Create New Target Batch'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. UP Police Constable Target Batch"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Course Category *
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="">-- General Category --</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="up-police-constable-target-batch"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Duration *
                  </label>
                  <input
                    type="text"
                    required
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 6 Months"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Standard Fee (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                    placeholder="7500"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Offer / Discount Fee (₹)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={discountFee}
                    onChange={(e) => setDiscountFee(e.target.value)}
                    placeholder="5999"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="space-y-2 bg-blue-50/50 p-3.5 rounded-2xl border border-blue-100">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-slate-800 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-700" />
                    <span>New Batch Date &amp; Timings System</span>
                  </label>
                  <span className="text-[10px] font-bold text-blue-700 bg-white px-2 py-0.5 rounded-md border border-blue-200">
                    Live On Website
                  </span>
                </div>
                <input
                  type="text"
                  value={batchInfo}
                  onChange={(e) => setBatchInfo(e.target.value)}
                  placeholder="e.g. New Batch Starts: Monday | Morning: 7:30 AM - 10:30 AM | Evening: 3:30 PM - 6:30 PM"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      setBatchInfo('New Batch Starts: Monday | Morning: 7:30 AM - 10:30 AM | Evening: 3:30 PM - 6:30 PM')
                    }
                    className="px-2 py-1 bg-white hover:bg-blue-100 text-slate-700 text-[10px] font-semibold rounded-lg border border-slate-200 transition-colors"
                  >
                    + Morning &amp; Evening
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setBatchInfo('Target Batch Starts 20th | Morning Shift: 8:00 AM - 11:30 AM (Limited 40 Seats)')
                    }
                    className="px-2 py-1 bg-white hover:bg-blue-100 text-slate-700 text-[10px] font-semibold rounded-lg border border-slate-200 transition-colors"
                  >
                    + Morning 8:00 AM
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setBatchInfo('Evening Special Batch | 3:30 PM - 6:30 PM | 2 Days Free Demo Available')
                    }
                    className="px-2 py-1 bg-white hover:bg-blue-100 text-slate-700 text-[10px] font-semibold rounded-lg border border-slate-200 transition-colors"
                  >
                    + Evening 3:30 PM
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Short Summary
                </label>
                <input
                  type="text"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="One sentence description shown on course cards..."
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Subjects Covered
                </label>
                <input
                  type="text"
                  value={subjects}
                  onChange={(e) => setSubjects(e.target.value)}
                  placeholder="General Hindi, Maths, Reasoning, General Studies (UP Special)"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Eligibility Criteria
                </label>
                <input
                  type="text"
                  value={eligibility}
                  onChange={(e) => setEligibility(e.target.value)}
                  placeholder="12th Pass (Intermediate) or Graduation depending on post"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Full Course Syllabus & Description (HTML or Plain Text) *
                </label>
                <textarea
                  rows={6}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="<p>Full details about lectures, weekly tests, and printed modules...</p>"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Course Image / Upload
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="/images/courses/up-police-target-batch.jpg"
                    className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <label className={`px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white font-bold rounded-xl cursor-pointer flex items-center gap-1.5 shadow-sm transition-colors ${isUploading ? 'opacity-60 cursor-not-allowed' : ''}`}>
                    {isUploading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      disabled={isUploading}
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Instant Preset Coaching Photos */}
                <div className="mt-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <ImageIcon className="w-3 h-3 text-blue-600" />
                      Quick Select Coaching Photo:
                    </span>
                    <span className="text-[10px] text-slate-400">Click any photo to apply</span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 max-h-40 overflow-y-auto p-1.5 bg-slate-50 border border-slate-200 rounded-2xl">
                    {PRESET_COACHING_IMAGES.map((preset) => {
                      const isSelected = image === preset.path;
                      return (
                        <button
                          key={preset.path}
                          type="button"
                          onClick={() => setImage(preset.path)}
                          className={`relative group rounded-xl overflow-hidden border-2 text-left transition-all ${
                            isSelected
                              ? 'border-blue-700 ring-2 ring-blue-500/30 scale-[1.02]'
                              : 'border-slate-200 hover:border-blue-400 opacity-80 hover:opacity-100'
                          }`}
                        >
                          <div className="relative aspect-[16/10] bg-slate-200">
                            <Image
                              src={preset.path}
                              alt={preset.name}
                              fill
                              unoptimized={true}
                              className="object-cover"
                            />
                            {isSelected && (
                              <div className="absolute inset-0 bg-blue-900/40 flex items-center justify-center">
                                <Check className="w-4 h-4 text-white stroke-[3]" />
                              </div>
                            )}
                          </div>
                          <div className="p-1 bg-white text-[9px] font-bold text-slate-700 truncate">
                            {preset.name}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Course Image Preview */}
              {image && (
                <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 p-2.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                      Selected Banner Preview
                    </span>
                    <button
                      type="button"
                      onClick={() => setImage('/images/hero-classroom.jpg')}
                      className="text-[11px] font-bold text-slate-500 hover:text-slate-700"
                    >
                      Reset Default
                    </button>
                  </div>
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner">
                    <Image
                      src={image}
                      alt={title || 'Course Image'}
                      fill
                      quality={100}
                      unoptimized={true}
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-800"
                  />
                  <span className="font-bold text-slate-700">Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-800"
                  />
                  <span className="font-bold text-slate-700">Published (Visible to public)</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
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
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 uppercase tracking-wider disabled:opacity-70"
                >
                  {isSubmitting ? 'Saving...' : editingCourse ? 'Save Changes' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

