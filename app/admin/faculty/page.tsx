'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { 
  Upload, 
  Trash2, 
  Edit3, 
  Plus, 
  X, 
  Loader2, 
  Image as ImageIcon, 
  Eye, 
  CheckCircle2, 
  Search, 
  Sparkles, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn,
  GraduationCap,
  Award
} from 'lucide-react';
import { toast } from 'sonner';
import { getImageUrl } from '@/lib/utils';

const PRESET_FACULTY_PHOTOS = [
  { name: 'Er. A. K. Sharma', designation: 'Director & Founder', path: '/images/faculty/er-ak-sharma.jpg', experience: '14+ Years' },
  { name: 'Dr. R. P. Singh', designation: 'GS & Polity Specialist', path: '/images/faculty/dr-rp-singh.jpg', experience: '12+ Years' },
  { name: 'Prof. Neeraj Tiwari', designation: 'Mathematics & Quants', path: '/images/faculty/prof-neeraj-tiwari.jpg', experience: '10+ Years' },
  { name: 'Ms. Priya Sahu', designation: 'Reasoning Specialist', path: '/images/faculty/ms-priya-sahu.jpg', experience: '8+ Years' },
  { name: 'Vivek Richariya', designation: 'Hindi & Pedagogy', path: '/images/faculty/vivek-richariya.jpg', experience: '9+ Years' },
  { name: 'Faculty Team Mentors', designation: 'Lalitpur Mentors Team', path: '/images/faculty/faculty-team-mentors.jpg', experience: 'Core Team' },
  { name: 'Classroom Test Guidance', designation: 'OMR Batch Guidance', path: '/images/classroom/media_1794898765300_5e81d6d0.jpg', experience: 'Classroom' },
  { name: 'Toppers Felicitation', designation: 'Police Exam Toppers', path: '/images/classroom/media_1794898765335_2e2a5fa1.jpg', experience: 'Award Ceremony' },
];

interface SelectedFilePreview {
  file: File;
  previewUrl: string;
  id: string;
}

export default function AdminFacultyPage() {
  const [faculty, setFaculty] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Direct Multi-Photo Upload State (Zero Typing Required)
  const [fileQueue, setFileQueue] = useState<SelectedFilePreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number; percent: number }>({
    current: 0,
    total: 0,
    percent: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Lightbox Preview State (Background scroll lock, transparent backdrop, uncropped photo)
  const [previewMember, setPreviewMember] = useState<any | null>(null);

  // Optional Edit / Custom Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalUploading, setIsModalUploading] = useState(false);
  const modalFileInputRef = useRef<HTMLInputElement>(null);

  // Form Fields for optional edit
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [subjects, setSubjects] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState('/images/faculty-teaching.jpg');
  const [order, setOrder] = useState('1');

  // Lock background scroll when preview modal is open
  useEffect(() => {
    if (previewMember !== null) {
      const scrollY = window.scrollY;
      const originalBodyOverflow = document.body.style.overflow;
      const originalDocOverflow = document.documentElement.style.overflow;
      const originalPosition = document.body.style.position;
      const originalTop = document.body.style.top;
      const originalWidth = document.body.style.width;

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      return () => {
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.width = originalWidth;
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalDocOverflow;
        window.scrollTo(0, scrollY);
      };
    }
  }, [previewMember]);

  // Keyboard navigation for preview modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!previewMember) return;
      if (e.key === 'Escape') setPreviewMember(null);
      if (e.key === 'ArrowLeft') {
        const currentIndex = faculty.findIndex((f) => f.id === previewMember.id);
        if (currentIndex > 0) {
          setPreviewMember(faculty[currentIndex - 1]);
        } else if (faculty.length > 0) {
          setPreviewMember(faculty[faculty.length - 1]);
        }
      }
      if (e.key === 'ArrowRight') {
        const currentIndex = faculty.findIndex((f) => f.id === previewMember.id);
        if (currentIndex < faculty.length - 1) {
          setPreviewMember(faculty[currentIndex + 1]);
        } else if (faculty.length > 0) {
          setPreviewMember(faculty[0]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewMember, faculty]);

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/faculty', { cache: 'no-store' });
      const data = await res.json();
      if (res.ok) {
        setFaculty(data.faculty || []);
      }
    } catch {
      toast.error('Failed to load faculty photos');
    } finally {
      setLoading(false);
    }
  };

  // Add files to upload queue
  const handleFilesSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newQueue: SelectedFilePreview[] = [];
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!validTypes.includes(file.type)) {
        toast.error(`"${file.name}" is not a supported image format.`);
        continue;
      }
      newQueue.push({
        file,
        previewUrl: URL.createObjectURL(file),
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      });
    }

    if (newQueue.length > 0) {
      setFileQueue((prev) => [...prev, ...newQueue]);
      toast.info(`${newQueue.length} photo(s) added to upload queue.`);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeQueueItem = (id: string) => {
    setFileQueue((prev) => {
      const item = prev.find((p) => p.id === id);
      if (item) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
  };

  const clearQueue = () => {
    fileQueue.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    setFileQueue([]);
  };

  // Drag & drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFilesSelected(e.dataTransfer.files);
    }
  };

  // Direct Multi-Image Upload (Zero Typing Required)
  const handleDirectUpload = async () => {
    if (fileQueue.length === 0) return;

    setIsUploading(true);
    setUploadProgress({ current: 0, total: fileQueue.length, percent: 0 });

    const batchSize = 4;
    const totalFiles = fileQueue.length;
    let uploadedCount = 0;
    const newlyCreated: any[] = [];

    try {
      for (let i = 0; i < totalFiles; i += batchSize) {
        const batch = fileQueue.slice(i, i + batchSize);
        const formData = new FormData();
        batch.forEach((item) => {
          formData.append('files', item.file);
        });

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok || !uploadData.items) {
          throw new Error(uploadData.error || 'Upload batch failed');
        }

        // Post uploaded images to faculty without asking user to type anything!
        const facultyPayload = uploadData.items.map((upItem: any, idx: number) => ({
          photo: upItem.url,
          name: upItem.originalName
            .replace(/\.[^/.]+$/, '')
            .replace(/[-_]+/g, ' ')
            .trim(),
          designation: 'Faculty Mentor',
          qualification: 'Expert Mentor',
          experience: 'Experienced',
          subjects: 'Specialist Educator',
          isPublished: true,
          order: faculty.length + uploadedCount + idx + 1,
        }));

        const facRes = await fetch('/api/faculty', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(facultyPayload),
        });

        const facData = await facRes.json();
        if (facRes.ok && facData.faculty) {
          const items = Array.isArray(facData.faculty) ? facData.faculty : [facData.faculty];
          newlyCreated.push(...items);
        }

        uploadedCount += batch.length;
        setUploadProgress({
          current: uploadedCount,
          total: totalFiles,
          percent: Math.round((uploadedCount / totalFiles) * 100),
        });
      }

      toast.success(`✓ Successfully uploaded ${newlyCreated.length} photo(s) to Faculty!`);
      clearQueue();
      fetchFaculty();
    } catch (err: any) {
      console.error('Batch upload error:', err);
      toast.error(err.message || 'Error occurred while uploading photos');
    } finally {
      setIsUploading(false);
      setUploadProgress({ current: 0, total: 0, percent: 0 });
    }
  };

  // 1-Click Quick Add Preset Photo
  const handleQuickAddPreset = async (preset: typeof PRESET_FACULTY_PHOTOS[0]) => {
    try {
      toast.loading(`Adding ${preset.name}...`, { id: 'preset-add' });
      const res = await fetch('/api/faculty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          photo: preset.path,
          name: preset.name,
          designation: preset.designation,
          qualification: 'Expert Mentor',
          experience: preset.experience,
          subjects: 'Competitive Exam Mentorship',
          isPublished: true,
          order: faculty.length + 1,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(`✓ Added ${preset.name} to Faculty!`, { id: 'preset-add' });
        fetchFaculty();
      } else {
        toast.error(data.error || 'Failed to add photo', { id: 'preset-add' });
      }
    } catch {
      toast.error('Network error adding preset', { id: 'preset-add' });
    }
  };

  // Delete Faculty Photo
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to remove this faculty photo?')) return;

    try {
      const res = await fetch(`/api/faculty/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Faculty photo removed');
        if (previewMember?.id === id) setPreviewMember(null);
        fetchFaculty();
      } else {
        toast.error('Delete failed');
      }
    } catch {
      toast.error('Delete failed');
    }
  };

  // Optional Edit / Add Modal Handlers
  const openAddModal = () => {
    setEditingFaculty(null);
    setName('');
    setDesignation('Faculty Member');
    setQualification('Expert Mentor');
    setExperience('8+ Years');
    setSubjects('Specialist Educator');
    setBio('');
    setPhoto('/images/faculty-teaching.jpg');
    setOrder(String(faculty.length + 1));
    setModalOpen(true);
  };

  const openEditModal = (f: any) => {
    setEditingFaculty(f);
    setName(f.name || '');
    setDesignation(f.designation || 'Faculty Member');
    setQualification(f.qualification || 'Expert Mentor');
    setExperience(f.experience || '8+ Years');
    setSubjects(f.subjects || 'General');
    setBio(f.bio || '');
    setPhoto(f.photo || '/images/faculty-teaching.jpg');
    setOrder(String(f.order || 1));
    setModalOpen(true);
  };

  const handleModalFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';

    const formData = new FormData();
    formData.append('file', file);

    setIsModalUploading(true);
    try {
      toast.info('Uploading photo...');
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setPhoto(data.url);
        toast.success('Photo uploaded successfully');
      } else {
        toast.error(data.error || 'Upload failed');
      }
    } catch {
      toast.error('Upload failed');
    } finally {
      setIsModalUploading(false);
    }
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: name.trim() || 'Faculty Mentor',
      designation: designation.trim() || 'Specialist Educator',
      qualification: qualification.trim() || 'Expert Mentor',
      experience: experience.trim() || 'Experienced',
      subjects: subjects.trim() || 'General',
      bio: bio?.trim() || null,
      photo: photo || '/images/faculty-teaching.jpg',
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

      const data = await res.json();
      if (res.ok) {
        toast.success(editingFaculty ? 'Faculty updated' : 'Faculty photo saved');
        setModalOpen(false);
        fetchFaculty();
      } else {
        toast.error(data.error || 'Failed to save faculty details');
      }
    } catch {
      toast.error('Error saving faculty member');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredFaculty = faculty.filter((f) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      (f.name && f.name.toLowerCase().includes(q)) ||
      (f.designation && f.designation.toLowerCase().includes(q)) ||
      (f.subjects && f.subjects.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200/60 uppercase tracking-wider mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            Visual Faculty System (Gallery Mode)
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Faculty &amp; Mentor Photos
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Pure visual gallery system: Drag &amp; drop photos or choose presets. No typing required! Live preview with transparent lightbox modal.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors uppercase tracking-wider"
          >
            <Plus className="w-4 h-4" />
            <span>Custom Member</span>
          </button>
        </div>
      </div>

      {/* Direct Multi-Photo Upload Dropzone (Gallery Style - Zero Typing Required!) */}
      <div className="bg-white rounded-3xl border-2 border-dashed border-blue-300/80 p-6 sm:p-8 shadow-xs hover:border-blue-500 transition-colors">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`p-6 sm:p-8 rounded-2xl transition-all cursor-pointer ${
              isDragging ? 'bg-blue-100/60 border-2 border-blue-500 scale-[1.01]' : 'bg-blue-50/50 hover:bg-blue-50'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFilesSelected(e.target.files)}
            />

            <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-600/30 mb-4 animate-bounce">
              <Upload className="w-8 h-8" />
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              Drag &amp; Drop Faculty Photos Here
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select single or multiple photos at once. Click to browse files from your computer or phone.
            </p>
            <div className="inline-flex items-center gap-2 mt-4 px-3.5 py-1.5 rounded-full text-xs font-bold text-blue-800 bg-white border border-blue-200 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Zero typing required • Seedha photo upload hogi!</span>
            </div>
          </div>

          {/* Upload Queue Previews */}
          {fileQueue.length > 0 && (
            <div className="space-y-4 pt-4 text-left border-t border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {fileQueue.length} Photo{fileQueue.length > 1 ? 's' : ''} Ready to Upload
                </span>
                <button
                  type="button"
                  onClick={clearQueue}
                  disabled={isUploading}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 disabled:opacity-50"
                >
                  Clear Queue
                </button>
              </div>

              {/* Thumbnails Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {fileQueue.map((item) => (
                  <div
                    key={item.id}
                    className="relative aspect-[3/4] rounded-xl overflow-hidden bg-slate-900 border border-slate-200 group shadow-xs"
                  >
                    <Image
                      src={item.previewUrl}
                      alt={item.file.name}
                      fill
                      unoptimized={true}
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeQueueItem(item.id)}
                      disabled={isUploading}
                      aria-label="Remove photo"
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center opacity-80 hover:opacity-100 hover:bg-rose-600 transition-colors shadow-sm"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-1.5">
                      <p className="text-[10px] text-white truncate text-center font-medium">
                        {item.file.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Upload Progress Bar */}
              {isUploading && (
                <div className="space-y-2 bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <div className="flex justify-between text-xs font-bold text-blue-900">
                    <span className="flex items-center gap-1.5">
                      <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                      Uploading {uploadProgress.current} of {uploadProgress.total} photos...
                    </span>
                    <span>{uploadProgress.percent}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-blue-200/70 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-300 rounded-full"
                      style={{ width: `${uploadProgress.percent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Action Upload Button */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={clearQueue}
                  disabled={isUploading}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDirectUpload}
                  disabled={isUploading}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all shadow-md shadow-blue-600/30 uppercase tracking-wider"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Uploading to Faculty...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Upload {fileQueue.length} Photo{fileQueue.length > 1 ? 's' : ''} to Faculty Now</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 1-Click Preset Faculty & Classroom Photos */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              1-Click Quick Add Photos
            </h2>
            <p className="text-xs text-slate-500">
              Click any photo to add directly to the faculty roster instantly.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {PRESET_FACULTY_PHOTOS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleQuickAddPreset(preset)}
              className="group text-left p-2 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md bg-slate-50 hover:bg-blue-50/50 transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-900 mb-2">
                <Image
                  src={preset.path}
                  alt={preset.name}
                  fill
                  unoptimized={true}
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Plus className="w-6 h-6 text-white drop-shadow-md" />
                </div>
              </div>
              <p className="text-xs font-bold text-slate-900 truncate leading-tight">{preset.name}</p>
              <p className="text-[10px] text-blue-700 font-semibold truncate mt-0.5">{preset.designation}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Live Faculty Photos Grid (Visual Gallery Display) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Faculty Photos Roster ({filteredFaculty.length})
            </span>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search faculty photos..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
            <p className="text-xs font-semibold text-slate-500">Loading faculty photos...</p>
          </div>
        ) : filteredFaculty.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-3">
            <ImageIcon className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No faculty photos found</h3>
            <p className="text-xs text-slate-500">
              Drag &amp; drop photos above or click any preset to add.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredFaculty.map((f) => {
              const photoUrl = getImageUrl(f.photo, '/images/faculty-teaching.jpg', f.updatedAt);
              return (
                <div
                  key={f.id}
                  className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Photo Container with Ambient Fill */}
                  <div className="relative aspect-[3/4] w-full bg-slate-950 overflow-hidden flex items-center justify-center">
                    <Image
                      src={photoUrl}
                      alt=""
                      fill
                      unoptimized={true}
                      aria-hidden="true"
                      className="object-cover blur-xl scale-125 opacity-30 pointer-events-none"
                    />
                    <Image
                      src={photoUrl}
                      alt={f.name || 'Faculty Member'}
                      fill
                      unoptimized={true}
                      quality={100}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 select-none cursor-pointer"
                      onClick={() => setPreviewMember(f)}
                    />

                    {/* Top Action Pills */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                      <button
                        type="button"
                        onClick={() => setPreviewMember(f)}
                        aria-label="Zoom preview"
                        className="w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-all shadow-md border border-white/20"
                      >
                        <ZoomIn className="w-4 h-4 text-amber-300" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(f.id)}
                        aria-label="Delete photo"
                        className="w-8 h-8 rounded-full bg-black/70 hover:bg-rose-600 text-white flex items-center justify-center transition-all shadow-md border border-white/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Bottom Floating Title */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-3 text-white pointer-events-none">
                      <p className="text-sm font-black truncate">{f.name || 'Faculty Mentor'}</p>
                      <p className="text-[11px] text-amber-300 font-semibold truncate">
                        {f.designation && f.designation !== 'Educator' ? f.designation : f.experience || 'Faculty'}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Bar */}
                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewMember(f)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-700 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Zoom View</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => openEditModal(f)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Info</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Interactive Lightbox Modal (Full HD Uncropped Photo with Transparent Dark Background & Scroll Lock) */}
      {previewMember && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 select-none touch-none overscroll-contain cursor-pointer"
          onClick={() => setPreviewMember(null)}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Modal Container */}
          <div
            className="relative w-full max-w-2xl lg:max-w-3xl bg-slate-950/90 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20 p-2 sm:p-3 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={() => setPreviewMember(null)}
              aria-label="Close Preview"
              className="absolute top-3.5 right-3.5 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 hover:bg-rose-600 text-white flex items-center justify-center transition-all duration-200 cursor-pointer border border-white/20 shadow-lg hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Arrows */}
            {faculty.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = faculty.findIndex((f) => f.id === previewMember.id);
                    if (currentIndex > 0) setPreviewMember(faculty[currentIndex - 1]);
                    else setPreviewMember(faculty[faculty.length - 1]);
                  }}
                  aria-label="Previous Photo"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-blue-600 text-white flex items-center justify-center transition-all border border-white/20 shadow-lg hover:scale-110"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = faculty.findIndex((f) => f.id === previewMember.id);
                    if (currentIndex < faculty.length - 1) setPreviewMember(faculty[currentIndex + 1]);
                    else setPreviewMember(faculty[0]);
                  }}
                  aria-label="Next Photo"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-blue-600 text-white flex items-center justify-center transition-all border border-white/20 shadow-lg hover:scale-110"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Image Stage */}
            <div className="relative w-full h-[65vh] sm:h-[75vh] max-h-[720px] rounded-xl sm:rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <Image
                src={getImageUrl(previewMember.photo, '/images/faculty-teaching.jpg', previewMember.updatedAt)}
                alt=""
                fill
                unoptimized={true}
                aria-hidden="true"
                className="object-cover blur-2xl scale-125 opacity-25 pointer-events-none"
              />
              <Image
                src={getImageUrl(previewMember.photo, '/images/faculty-teaching.jpg', previewMember.updatedAt)}
                alt={previewMember.name || 'Faculty Member'}
                fill
                unoptimized={true}
                quality={100}
                className="object-contain p-2 select-none"
              />
            </div>

            {/* Bottom Caption */}
            <div className="p-3 sm:p-4 text-white flex items-center justify-between gap-4">
              <div>
                <h3 className="text-base sm:text-lg font-black truncate text-white">
                  {previewMember.name || 'Faculty Mentor'}
                </h3>
                <p className="text-xs text-amber-300 font-semibold truncate">
                  {previewMember.designation || 'Educator'} • {previewMember.experience || 'Experienced'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPreviewMember(null);
                    openEditModal(previewMember);
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors uppercase tracking-wider"
                >
                  Edit Info
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Optional Edit / Add Custom Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  {editingFaculty ? 'Edit Faculty Details' : 'Add Custom Faculty Profile'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Optional details. You can leave text blank or customized.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleModalSubmit} className="space-y-4">
              {/* Photo Upload & Preview */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Faculty Photo
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-24 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shrink-0">
                    <Image
                      src={getImageUrl(photo, '/images/faculty-teaching.jpg')}
                      alt="Preview"
                      fill
                      unoptimized={true}
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <input
                      ref={modalFileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleModalFileUpload}
                    />
                    <button
                      type="button"
                      onClick={() => modalFileInputRef.current?.click()}
                      disabled={isModalUploading}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      {isModalUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                      <span>Change Photo</span>
                    </button>
                    <input
                      type="text"
                      value={photo}
                      onChange={(e) => setPhoto(e.target.value)}
                      placeholder="/images/faculty/... or URL"
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Name & Designation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Er. A. K. Sharma"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Designation (Optional)
                  </label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g. Mathematics Specialist"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Qualification & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Qualification (Optional)
                  </label>
                  <input
                    type="text"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    placeholder="e.g. M.Sc, B.Ed"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Experience (Optional)
                  </label>
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="e.g. 10+ Years"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Subjects */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subjects Handled (Optional)
                </label>
                <input
                  type="text"
                  value={subjects}
                  onChange={(e) => setSubjects(e.target.value)}
                  placeholder="e.g. Quants, Advanced Arithmetic, Speed Maths"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Bio / Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Brief mentorship notes or achievements..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors uppercase tracking-wider shadow-sm"
                >
                  {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                  <span>Save Faculty</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
