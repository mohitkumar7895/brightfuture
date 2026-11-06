'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  MessageSquare, 
  BookOpen, 
  GraduationCap, 
  Bell, 
  ImageIcon, 
  ArrowUpRight, 
  Clock, 
  Download, 
  Plus, 
  CheckCircle2, 
  AlertCircle,
  FileSpreadsheet,
  TrendingUp,
  Loader2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { formatDate, formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/dashboard/stats');
      const json = await res.json();
      if (res.ok) {
        setData(json);
      }
    } catch {
      toast.error('Failed to load dashboard metrics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-800" />
      </div>
    );
  }

  const stats = data?.stats || {};
  const recentEnquiries = data?.recentEnquiries || [];
  const popularCourses = data?.popularCourses || [];
  const trends = data?.enquiryTrends || [];

  const statCards = [
    { title: 'Total Enquiries', value: stats.totalEnquiries || 0, subtitle: `${stats.pendingEnquiries || 0} Pending`, icon: MessageSquare, color: 'bg-blue-600', link: '/admin/enquiries' },
    { title: 'Active Courses', value: stats.totalCourses || 0, subtitle: 'Across 6 categories', icon: BookOpen, color: 'bg-indigo-600', link: '/admin/courses' },
    { title: 'Enrolled Students', value: stats.totalStudents || 0, subtitle: 'Active records', icon: Users, color: 'bg-emerald-600', link: '/admin/students' },
    { title: 'Faculty Members', value: stats.totalFaculty || 0, subtitle: 'Subject specialists', icon: GraduationCap, color: 'bg-amber-600', link: '/admin/faculty' },
    { title: 'Notices & Circulars', value: stats.totalNotices || 0, subtitle: 'Published updates', icon: Bell, color: 'bg-purple-600', link: '/admin/notices' },
    { title: 'Gallery Media', value: stats.totalGallery || 0, subtitle: 'Photos & videos', icon: ImageIcon, color: 'bg-rose-600', link: '/admin/gallery' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Director Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time analytics and management controls for Bright Future Competition Institute.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href="/api/enquiries/export"
            download
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </a>

          <Link
            href="/admin/courses"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 transition-colors shadow-sm uppercase tracking-wider"
          >
            <Plus className="w-4 h-4" />
            <span>Add Course</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.link}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl ${card.color} text-white flex items-center justify-center shadow-xs`}>
                  <Icon className="w-4 h-4" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-800 transition-colors" />
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900 block">
                  {card.value}
                </span>
                <span className="text-xs font-bold text-slate-700 block truncate mt-0.5">
                  {card.title}
                </span>
                <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                  {card.subtitle}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Analytics Chart & Popular Batches */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Monthly Enquiry Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block">
                Growth Insights
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Monthly Enquiry & Conversion Trends
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+32% This Quarter</span>
            </span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trends} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEnquiries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    color: '#fff',
                    border: 'none',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="enquiries"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorEnquiries)"
                  name="Total Enquiries"
                />
                <Area
                  type="monotone"
                  dataKey="conversions"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorConversions)"
                  name="Admissions Enrolled"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Popular Courses (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Popular Target Batches
              </h3>
              <Link href="/admin/courses" className="text-xs font-bold text-blue-800 hover:underline">
                Manage
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {popularCourses.map((c: any) => (
                <div key={c.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {c.title}
                    </h4>
                    <span className="text-[11px] text-slate-500 block">
                      {formatCurrency(c.discountFee || c.fee)} • {c.duration}
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md shrink-0">
                    {c._count?.enquiries || 0} leads
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/admin/courses"
            className="w-full text-center py-2.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
          >
            View All Courses & Fees
          </Link>
        </div>

      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Recent Admission Enquiries
            </h3>
            <p className="text-xs text-slate-500">
              Newest submissions from student candidates in Lalitpur.
            </p>
          </div>
          <Link
            href="/admin/enquiries"
            className="text-xs font-bold text-blue-800 hover:text-blue-900 flex items-center gap-1"
          >
            <span>View All Enquiries</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="py-3 px-6">Student Name</th>
                <th className="py-3 px-6">Mobile Number</th>
                <th className="py-3 px-6">Course Target</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {recentEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-400">
                    No enquiries submitted yet.
                  </td>
                </tr>
              ) : (
                recentEnquiries.map((enquiry: any) => {
                  const statusColors: Record<string, string> = {
                    PENDING: 'bg-amber-100 text-amber-900',
                    CONTACTED: 'bg-blue-100 text-blue-900',
                    CONVERTED: 'bg-emerald-100 text-emerald-900',
                    REJECTED: 'bg-rose-100 text-rose-900',
                  };

                  return (
                    <tr key={enquiry.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-6 font-bold text-slate-900">
                        {enquiry.studentName}
                        {enquiry.fatherName && (
                          <span className="block text-[10px] text-slate-400 font-normal">
                            S/o {enquiry.fatherName}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-6 font-semibold text-blue-800">
                        <a href={`tel:${enquiry.mobile}`} className="hover:underline">
                          +91 {enquiry.mobile}
                        </a>
                      </td>
                      <td className="py-3.5 px-6 text-slate-700">
                        {enquiry.courseName || enquiry.course?.title || 'General Enquiry'}
                      </td>
                      <td className="py-3.5 px-6">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColors[enquiry.status] || 'bg-slate-100'}`}>
                          {enquiry.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-slate-500">
                        {formatDate(enquiry.createdAt)}
                      </td>
                      <td className="py-3.5 px-6 text-right">
                        <Link
                          href="/admin/enquiries"
                          className="px-3 py-1 bg-slate-100 hover:bg-blue-800 hover:text-white rounded-lg text-slate-700 font-bold transition-colors inline-block"
                        >
                          Review
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

