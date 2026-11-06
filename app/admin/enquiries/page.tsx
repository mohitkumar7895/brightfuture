'use client';

import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Download, 
  Trash2, 
  Edit3, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Clock, 
  X, 
  Loader2,
  Calendar,
  MessageCircle,
  Filter
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [loading, setLoading] = useState(true);

  // Edit / Status Modal State
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
  const [editStatus, setEditStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchEnquiries();
    fetchCourses();
  }, [statusFilter, courseFilter]);

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/courses?all=true');
      const data = await res.json();
      if (res.ok) setCourses(data.courses || []);
    } catch {
      // ignore
    }
  };

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (statusFilter) params.set('status', statusFilter);
      if (courseFilter) params.set('courseId', courseFilter);

      const res = await fetch(`/api/enquiries?${params.toString()}`);
      const data = await res.json();
      if (res.ok) {
        setEnquiries(data.enquiries || []);
      } else {
        toast.error(data.error || 'Failed to load enquiries');
      }
    } catch {
      toast.error('Network error loading enquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEnquiries();
  };

  const openUpdateModal = (enquiry: any) => {
    setSelectedEnquiry(enquiry);
    setEditStatus(enquiry.status);
    setAdminNotes(enquiry.adminNotes || '');
  };

  const handleUpdateStatus = async () => {
    if (!selectedEnquiry) return;
    setIsUpdating(true);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedEnquiry.id,
          status: editStatus,
          adminNotes,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Enquiry updated successfully');
        setSelectedEnquiry(null);
        fetchEnquiries();
      } else {
        toast.error(data.error || 'Update failed');
      }
    } catch {
      toast.error('Failed to update enquiry');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this enquiry record?')) return;

    try {
      const res = await fetch(`/api/enquiries?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        toast.success('Enquiry deleted');
        fetchEnquiries();
      } else {
        toast.error('Delete failed');
      }
    } catch {
      toast.error('Failed to delete enquiry');
    }
  };

  const statusColors: Record<string, string> = {
    PENDING: 'bg-amber-100 text-amber-900 border-amber-300',
    CONTACTED: 'bg-blue-100 text-blue-900 border-blue-300',
    CONVERTED: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    REJECTED: 'bg-rose-100 text-rose-900 border-rose-300',
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Admission Enquiries
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review student candidates, manage counseling statuses, add notes, and export to CSV.
          </p>
        </div>

        <a
          href="/api/enquiries/export"
          download
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-sm self-start sm:self-auto uppercase tracking-wider"
        >
          <Download className="w-4 h-4" />
          <span>Export All to CSV</span>
        </a>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search name, phone, father name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600"
          />
        </form>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden text-slate-700 font-semibold"
          >
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="CONTACTED">Contacted</option>
            <option value="CONVERTED">Converted</option>
            <option value="REJECTED">Rejected</option>
          </select>

          {/* Course Filter */}
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden text-slate-700 font-semibold max-w-xs truncate"
          >
            <option value="">All Target Batches</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-16 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-800" />
          </div>
        ) : enquiries.length === 0 ? (
          <div className="p-16 text-center text-slate-400 space-y-2">
            <p className="text-sm font-bold text-slate-600">No enquiries found matching filters.</p>
            <p className="text-xs">Try clearing your search query or filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Candidate</th>
                  <th className="py-3.5 px-6">Contact Details</th>
                  <th className="py-3.5 px-6">Course Target</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Admin Notes</th>
                  <th className="py-3.5 px-6">Date</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {enquiries.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      <div>
                        <span className="text-sm block">{e.studentName}</span>
                        {e.fatherName && (
                          <span className="text-[11px] text-slate-500 font-normal block">
                            Father: {e.fatherName}
                          </span>
                        )}
                        {e.qualification && (
                          <span className="text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-semibold inline-block mt-0.5">
                            {e.qualification}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-6 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-slate-800">
                        <Phone className="w-3 h-3 text-blue-700" />
                        <a href={`tel:${e.mobile}`} className="hover:underline">
                          +91 {e.mobile}
                        </a>
                      </div>
                      {e.email && (
                        <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span>{e.email}</span>
                        </div>
                      )}
                      {e.address && (
                        <span className="text-[10px] text-slate-400 block truncate max-w-xs">
                          Loc: {e.address}
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-6 text-slate-800">
                      <span className="font-semibold block">
                        {e.courseName || e.course?.title || 'General Enquiry'}
                      </span>
                      {e.message && (
                        <span className="text-[11px] text-slate-500 italic block mt-0.5 line-clamp-2 max-w-xs">
                          &ldquo;{e.message}&rdquo;
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusColors[e.status] || 'bg-slate-100 text-slate-800 border-slate-200'}`}>
                        {e.status}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-slate-600 max-w-xs">
                      {e.adminNotes ? (
                        <span className="text-[11px] bg-slate-50 p-1.5 rounded-md border border-slate-200 block truncate">
                          {e.adminNotes}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[10px] italic">No notes</span>
                      )}
                    </td>

                    <td className="py-4 px-6 text-slate-500 text-[11px]">
                      {formatDate(e.createdAt)}
                    </td>

                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => openUpdateModal(e)}
                        className="px-3 py-1.5 bg-blue-50 text-blue-900 hover:bg-blue-800 hover:text-white rounded-lg text-xs font-bold transition-colors"
                      >
                        Status / Note
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(e.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Enquiry"
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

      {/* Status & Notes Modal */}
      {selectedEnquiry && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Update Enquiry Status
                </h3>
                <p className="text-xs text-slate-500">
                  Candidate: {selectedEnquiry.studentName} (+91 {selectedEnquiry.mobile})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Enquiry Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 font-semibold"
                >
                  <option value="PENDING">PENDING (New)</option>
                  <option value="CONTACTED">CONTACTED (Follow-up)</option>
                  <option value="CONVERTED">CONVERTED (Admission Enrolled)</option>
                  <option value="REJECTED">REJECTED (Declined / Not Interested)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Counseling & Admin Notes
                </label>
                <textarea
                  rows={4}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="e.g. Called candidate. Invited for demo class on Monday. Mother attended call..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdateStatus}
                disabled={isUpdating}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 transition-colors uppercase tracking-wider disabled:opacity-70"
              >
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

