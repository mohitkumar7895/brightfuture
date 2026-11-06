'use client';

import React, { useEffect, useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  Phone, 
  Mail, 
  BookOpen, 
  X, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';
import { formatDate, formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [qualification, setQualification] = useState('');
  const [status, setStatus] = useState('ACTIVE');
  const [courseId, setCourseId] = useState('');
  const [batchTime, setBatchTime] = useState('');
  const [feePaid, setFeePaid] = useState('');
  const [totalFee, setTotalFee] = useState('');

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/courses');
      const data = await res.json();
      if (res.ok) setCourses(data.courses || []);
    } catch {
      // ignore
    }
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);

      const res = await fetch(`/api/students?${params.toString()}`);
      const data = await res.json();
      if (res.ok) {
        setStudents(data.students || []);
      }
    } catch {
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStudents();
  };

  const openAddModal = () => {
    setEditingStudent(null);
    setName('');
    setRollNumber(`BFCI-2026-${Math.floor(100 + Math.random() * 900)}`);
    setFatherName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setQualification('');
    setStatus('ACTIVE');
    setCourseId('');
    setBatchTime('Morning 7:30 AM - 10:30 AM');
    setFeePaid('');
    setTotalFee('');
    setModalOpen(true);
  };

  const openEditModal = (s: any) => {
    setEditingStudent(s);
    setName(s.name);
    setRollNumber(s.rollNumber);
    setFatherName(s.fatherName || '');
    setPhone(s.phone);
    setEmail(s.email || '');
    setAddress(s.address || '');
    setQualification(s.qualification || '');
    setStatus(s.status || 'ACTIVE');
    setCourseId('');
    setBatchTime('');
    setFeePaid('');
    setTotalFee('');
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name,
      rollNumber,
      fatherName,
      phone,
      email,
      address,
      qualification,
      status,
      courseId,
      batchTime,
      feePaid,
      totalFee,
    };

    try {
      const url = editingStudent ? `/api/students/${editingStudent.id}` : '/api/students';
      const method = editingStudent ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(editingStudent ? 'Student updated' : 'Student enrolled successfully');
        setModalOpen(false);
        fetchStudents();
      } else {
        toast.error(data.error || 'Operation failed');
      }
    } catch {
      toast.error('Error saving student record');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this student record?')) return;

    try {
      const res = await fetch(`/api/students/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Student deleted');
        fetchStudents();
      } else {
        toast.error('Failed to delete student');
      }
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Student Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Maintain institutional enrollment records, roll numbers, course assignments, and admission status.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 transition-colors shadow-sm self-start sm:self-auto uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          <span>New Student Admission</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <form onSubmit={handleSearch} className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by student name, roll, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600"
          />
        </form>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-slate-400">Loading students...</div>
        ) : students.length === 0 ? (
          <div className="p-16 text-center text-slate-400 space-y-3">
            <Users className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-sm font-bold text-slate-600">No students enrolled yet.</p>
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-blue-800 text-white rounded-xl text-xs font-bold"
            >
              Enroll First Student
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="py-3.5 px-6">Roll No / Student</th>
                  <th className="py-3.5 px-6">Father&apos;s Name</th>
                  <th className="py-3.5 px-6">Contact Number</th>
                  <th className="py-3.5 px-6">Enrolled Batch</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      <div>
                        <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-black inline-block mb-1">
                          {s.rollNumber}
                        </span>
                        <span className="text-sm block">{s.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-700">
                      {s.fatherName || '—'}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 font-bold text-slate-800">
                        <Phone className="w-3.5 h-3.5 text-blue-700" />
                        <a href={`tel:${s.phone}`} className="hover:underline">
                          +91 {s.phone}
                        </a>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-700">
                      {s.admissions && s.admissions.length > 0 ? (
                        <div>
                          <span className="font-semibold block">
                            {s.admissions[0].course?.title}
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            Paid: {formatCurrency(s.admissions[0].feePaid)} / {formatCurrency(s.admissions[0].totalFee)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">No active course</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900">
                        {s.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(s)}
                        className="p-1.5 text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Student"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(s.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Student"
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
                {editingStudent ? 'Edit Student Record' : 'Enroll New Student'}
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
                  <label className="block font-bold text-slate-700 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Vikas Kushwaha"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Roll Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    placeholder="BFCI-2026-001"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Father&apos;s Name
                  </label>
                  <input
                    type="text"
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    placeholder="e.g. Shri Ramdas Kushwaha"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9838000000"
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Residential Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Mahaveerpura, Lalitpur"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden"
                />
              </div>

              {!editingStudent && (
                <div className="p-4 bg-blue-50/70 border border-blue-200/80 rounded-2xl space-y-3">
                  <span className="font-bold text-blue-900 block text-xs uppercase tracking-wider">
                    Course Admission Details
                  </span>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Assign Course
                    </label>
                    <select
                      value={courseId}
                      onChange={(e) => setCourseId(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-hidden"
                    >
                      <option value="">-- Choose Batch --</option>
                      {courses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title} (₹{c.discountFee || c.fee})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Fee Paid (₹)
                      </label>
                      <input
                        type="number"
                        value={feePaid}
                        onChange={(e) => setFeePaid(e.target.value)}
                        placeholder="5000"
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Total Fee (₹)
                      </label>
                      <input
                        type="number"
                        value={totalFee}
                        onChange={(e) => setTotalFee(e.target.value)}
                        placeholder="5999"
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              )}

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
                  {isSubmitting ? 'Saving...' : editingStudent ? 'Save Changes' : 'Confirm Admission'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

