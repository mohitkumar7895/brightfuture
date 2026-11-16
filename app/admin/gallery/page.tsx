'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { 
  Upload, 
  Trash2, 
  ImageIcon, 
  X, 
  Loader2, 
  CheckCircle2, 
  Plus, 
  Filter, 
  Search, 
  Layers, 
  Sparkles,
  AlertCircle,
  Eye,
  CheckSquare,
  Square
} from 'lucide-react';
import { toast } from 'sonner';

interface GalleryItem {
  id: number;
  title: string;
  type: string;
  url: string;
  caption?: string | null;
  categoryId?: number | null;
  category?: { id: number; name: string; slug: string } | null;
  createdAt?: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface SelectedFilePreview {
  file: File;
  previewUrl: string;
  id: string;
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Direct Upload State (Zero Typing Required)
  const [selectedCategory, setSelectedCategory] = useState<string>('1');
  const [fileQueue, setFileQueue] = useState<SelectedFilePreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number; percent: number }>({
    current: 0,
    total: 0,
    percent: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gallery Filter & Selection State
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [previewPhoto, setPreviewPhoto] = useState<GalleryItem | null>(null);

  // Lock background scroll when preview modal is open
  useEffect(() => {
    if (previewPhoto !== null) {
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
  }, [previewPhoto]);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (res.ok) {
        setItems(data.items || []);
        setCategories(data.categories || []);
        if (data.categories && data.categories.length > 0 && !selectedCategory) {
          setSelectedCategory(String(data.categories[0].id));
        }
      }
    } catch {
      toast.error('Failed to load gallery items');
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

  // Drag and drop handlers
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

  // Direct Multi-Image Upload (No Typing Needed!)
  const handleDirectUpload = async () => {
    if (fileQueue.length === 0) return;

    setIsUploading(true);
    setUploadProgress({ current: 0, total: fileQueue.length, percent: 0 });

    const batchSize = 4;
    const totalFiles = fileQueue.length;
    let uploadedCount = 0;
    const newlyCreated: GalleryItem[] = [];

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

        // Post uploaded images to gallery without asking user to type anything!
        const galleryPayload = uploadData.items.map((upItem: any) => ({
          url: upItem.url,
          title: upItem.originalName
            .replace(/\.[^/.]+$/, '')
            .replace(/[-_]+/g, ' ')
            .trim(),
          categoryId: selectedCategory ? Number(selectedCategory) : null,
          isPublished: true,
        }));

        const galleryRes = await fetch('/api/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(galleryPayload),
        });

        const galleryData = await galleryRes.json();
        if (galleryRes.ok && galleryData.items) {
          newlyCreated.push(...galleryData.items);
        }

        uploadedCount += batch.length;
        setUploadProgress({
          current: uploadedCount,
          total: totalFiles,
          percent: Math.round((uploadedCount / totalFiles) * 100),
        });
      }

      toast.success(`✓ Successfully uploaded ${newlyCreated.length} photo(s) to Gallery!`);
      clearQueue();
      fetchGallery();
    } catch (err: any) {
      console.error('Batch upload error:', err);
      toast.error(err.message || 'Error occurred while uploading images');
    } finally {
      setIsUploading(false);
      setUploadProgress({ current: 0, total: 0, percent: 0 });
    }
  };

  // Delete single photo
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this photo from the gallery?')) return;

    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.success('Photo removed');

    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        toast.error('Failed to delete photo from server');
        fetchGallery();
      }
    } catch {
      toast.error('Delete request failed');
      fetchGallery();
    }
  };

  // Bulk Delete
  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Are you sure you want to delete all ${selectedIds.length} selected photos?`)) return;

    const idsToDelete = [...selectedIds];
    setItems((prev) => prev.filter((item) => !idsToDelete.includes(item.id)));
    setSelectedIds([]);
    toast.success(`${idsToDelete.length} photos removed`);

    try {
      await Promise.all(idsToDelete.map((id) => fetch(`/api/gallery/${id}`, { method: 'DELETE' })));
    } catch {
      toast.error('Some photos could not be deleted');
      fetchGallery();
    }
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    if (activeTab !== 'all') {
      const matchCat =
        item.category?.slug === activeTab ||
        String(item.categoryId) === activeTab ||
        String(item.category?.id) === activeTab;
      if (!matchCat) return false;
    }
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchTitle = item.title?.toLowerCase().includes(query);
      const matchCatName = item.category?.name?.toLowerCase().includes(query);
      if (!matchTitle && !matchCatName) return false;
    }
    return true;
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredItems.map((item) => item.id));
    }
  };

  const toggleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-900 border border-blue-100">
              <ImageIcon className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Gallery Management
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Seedha photos select karke ek sath bulk upload karein. Koi title ya description likhne ki zaroorat nahi hai.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xl font-black text-blue-950 block leading-none">
              {items.length}
            </span>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Total Photos
            </span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="text-right">
            <span className="text-xl font-black text-amber-600 block leading-none">
              {categories.length}
            </span>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Categories
            </span>
          </div>
        </div>
      </div>

      {/* DIRECT BULK UPLOAD ZONE (Seedha Ek Sath Upload - No Typing Required!) */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-800" />
              <span>Direct Multi-Photo Upload (Ek Sath Upload)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Images select ya drag karein — system automatically upload karke gallery me set kar dega.
            </p>
          </div>

          {/* Category Picker for the upload batch */}
          <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-1.5 rounded-2xl border border-slate-200">
            <Layers className="w-4 h-4 text-blue-700 shrink-0" />
            <span className="text-xs font-bold text-slate-700 shrink-0">Upload Album:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-xs font-black text-blue-900 focus:outline-none cursor-pointer pr-2"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Drag & Drop File Select Box */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer select-none flex flex-col items-center justify-center gap-3 ${
            isDragging
              ? 'border-blue-700 bg-blue-50/80 scale-[1.01]'
              : 'border-blue-300 hover:border-blue-600 bg-gradient-to-b from-blue-50/40 via-white to-slate-50 hover:bg-blue-50/20'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(e) => handleFilesSelected(e.target.files)}
            className="hidden"
          />

          <div className="w-16 h-16 rounded-3xl bg-blue-100/80 text-blue-900 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8 text-blue-800" />
          </div>

          <div>
            <p className="text-base sm:text-lg font-black text-slate-900">
              Click to select multiple photos or drag &amp; drop here
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Select 5, 10, 20 ya jitni chahein images ek sath select karein (JPG, PNG, WEBP)
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black text-white bg-blue-900 hover:bg-blue-950 shadow-md uppercase tracking-wider mt-1">
            <Plus className="w-4 h-4" />
            <span>Select Photos from Computer</span>
          </div>
        </div>

        {/* Selected Photos Tray (Queue) */}
        {fileQueue.length > 0 && (
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-black text-slate-900">
                  {fileQueue.length} Photo(s) Ready to Upload
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  (Category: {categories.find((c) => String(c.id) === selectedCategory)?.name || 'General'})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={clearQueue}
                  disabled={isUploading}
                  className="px-3 py-1.5 text-xs font-bold text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-xl transition-colors disabled:opacity-50"
                >
                  Clear All
                </button>

                <button
                  type="button"
                  onClick={handleDirectUpload}
                  disabled={isUploading}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-md uppercase tracking-wider disabled:opacity-60 cursor-pointer"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Uploading ({uploadProgress.current}/{uploadProgress.total})...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Upload All {fileQueue.length} Photos Now</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Upload Progress Bar */}
            {isUploading && (
              <div className="space-y-1.5 bg-white p-3 rounded-xl border border-slate-200">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Uploading photos to server...</span>
                  <span>{uploadProgress.percent}% ({uploadProgress.current} / {uploadProgress.total})</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress.percent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Thumbnails of queued images */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 max-h-64 overflow-y-auto p-1">
              {fileQueue.map((item) => (
                <div
                  key={item.id}
                  className="group relative aspect-square rounded-xl overflow-hidden bg-slate-900 border border-slate-300 shadow-xs"
                >
                  <img
                    src={item.previewUrl}
                    alt={item.file.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeQueueItem(item.id)}
                    disabled={isUploading}
                    className="absolute top-1 right-1 p-1 rounded-full bg-black/70 hover:bg-rose-600 text-white transition-colors"
                    title="Remove"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <div className="absolute bottom-0 inset-x-0 bg-black/70 px-1 py-0.5 text-[9px] text-white truncate text-center">
                    {item.file.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* GALLERY MANAGEMENT & ITEMS LIST */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Campus Photo Gallery ({items.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live website par display ho rahi sabhi photos ko yahan se filter, preview aur delete kar sakte hain.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search photo name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-900"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-100">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap cursor-pointer transition-all ${
              activeTab === 'all'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Photos ({items.length})
          </button>
          {categories.map((cat) => {
            const count = items.filter(
              (it) => it.category?.slug === cat.slug || String(it.categoryId) === String(cat.id)
            ).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap cursor-pointer transition-all ${
                  activeTab === cat.slug
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Bulk Action Toolbar */}
        {filteredItems.length > 0 && (
          <div className="flex items-center justify-between gap-3 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200 text-xs">
            <button
              type="button"
              onClick={toggleSelectAll}
              className="flex items-center gap-2 font-bold text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              {selectedIds.length === filteredItems.length && filteredItems.length > 0 ? (
                <CheckSquare className="w-4 h-4 text-blue-900" />
              ) : (
                <Square className="w-4 h-4 text-slate-400" />
              )}
              <span>Select All ({selectedIds.length} selected)</span>
            </button>

            {selectedIds.length > 0 && (
              <button
                type="button"
                onClick={handleBulkDelete}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete {selectedIds.length} Selected</span>
              </button>
            )}
          </div>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-blue-900 mx-auto" />
            <p className="text-xs text-slate-500 font-bold">Loading gallery photos...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-16 text-center space-y-3 border-2 border-dashed border-slate-200 rounded-3xl">
            <ImageIcon className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">No photos found in this category.</p>
            <p className="text-xs text-slate-400">Use the direct upload box above to add photos.</p>
          </div>
        ) : (
          /* Photos Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredItems.map((item) => {
              const isSelected = selectedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`group relative bg-white rounded-2xl overflow-hidden border transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'border-blue-900 ring-2 ring-blue-900 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md'
                  }`}
                >
                  {/* Photo Container - Click to open in modal */}
                  <div
                    onClick={() => setPreviewPhoto(item)}
                    className="relative aspect-[4/3] bg-slate-950 overflow-hidden cursor-pointer"
                  >
                    <Image
                      src={item.url}
                      alt={item.title || 'Campus photo'}
                      fill
                      unoptimized={true}
                      sizes="(max-width: 768px) 50vw, 20vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Selection Checkbox */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelectOne(item.id);
                      }}
                      className="absolute top-2 left-2 p-1 rounded-lg bg-black/60 hover:bg-black/80 text-white transition-colors z-10"
                    >
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Square className="w-4 h-4 text-white/80" />
                      )}
                    </button>

                    {/* Action Buttons Overlay */}
                    <div 
                      className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => setPreviewPhoto(item)}
                        className="p-1.5 rounded-lg bg-black/70 hover:bg-blue-600 text-white transition-colors"
                        title="Preview Fullscreen"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg bg-black/70 hover:bg-rose-600 text-white transition-colors"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Category Stamp */}
                    <div className="absolute bottom-2 left-2 z-10">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-black/70 text-white backdrop-blur-xs">
                        {item.category?.name || 'Campus'}
                      </span>
                    </div>
                  </div>

                  {/* Details Card */}
                  <div className="p-3 bg-white space-y-1">
                    <h4
                      className="text-xs font-bold text-slate-900 truncate"
                      title={item.title}
                    >
                      {item.title || 'Campus Photo'}
                    </h4>
                    <p className="text-[10px] text-slate-400 truncate">
                      ID: #{item.id} • {item.url.split('/').pop()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Preview Modal - Compact Modal with 100% Full Uncropped Image */}
      {previewPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setPreviewPhoto(null)}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 cursor-pointer touch-none overscroll-contain animate-in fade-in duration-200"
        >
          {/* Modal Container - Compact & Framed (Chota Sa Modal) */}
          <div
            className="relative w-full max-w-3xl lg:max-w-4xl bg-slate-950/85 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20 p-2 sm:p-3 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button inside the modal frame */}
            <button
              type="button"
              onClick={() => setPreviewPhoto(null)}
              className="absolute top-3.5 right-3.5 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 hover:bg-rose-600 text-white flex items-center justify-center transition-all duration-200 cursor-pointer border border-white/20 shadow-lg hover:scale-110"
              aria-label="Close image modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Stage - Full uncropped photo */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full max-h-[78vh] flex items-center justify-center rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950">
              {/* Soft ambient background */}
              <Image
                src={previewPhoto.url}
                alt=""
                fill
                unoptimized={true}
                aria-hidden="true"
                className="object-cover blur-xl scale-110 opacity-30 pointer-events-none"
              />

              {/* 100% Full Uncropped Image */}
              <Image
                src={previewPhoto.url}
                alt={previewPhoto.title || 'Campus Photo'}
                fill
                priority
                unoptimized={true}
                quality={100}
                className="object-contain p-1 sm:p-2 select-none drop-shadow-2xl"
                sizes="(max-width: 1024px) 95vw, 1000px"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
