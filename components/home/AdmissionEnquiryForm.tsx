'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { enquirySchema } from '@/lib/validations';
import { z } from 'zod';
import { toast } from 'sonner';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  User, 
  Users, 
  Phone, 
  Mail, 
  BookOpen, 
  GraduationCap, 
  MapPin, 
  MessageSquare,
  Sparkles,
  PhoneCall
} from 'lucide-react';

type FormData = z.infer<typeof enquirySchema>;

interface AdmissionEnquiryFormProps {
  courses?: Array<{ id: number; title: string }>;
  defaultCourseId?: number;
  className?: string;
  isCompact?: boolean;
}

export default function AdmissionEnquiryForm({
  courses = [],
  defaultCourseId,
  className = '',
  isCompact = false,
}: AdmissionEnquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      courseId: defaultCourseId ? String(defaultCourseId) : '',
      courseName: '',
      studentName: '',
      fatherName: '',
      mobile: '',
      email: '',
      address: '',
      qualification: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Find course title if courseId is present
      const selectedCourse = courses.find((c) => String(c.id) === String(data.courseId));
      const payload = {
        ...data,
        courseName: selectedCourse ? selectedCourse.title : data.courseName || '',
      };

      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit enquiry');
      }

      setSubmittedData(payload);
      toast.success('Admission enquiry submitted successfully! Our counseling team will contact you shortly.');
      reset();
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong. Please call 9450067223 directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedData) {
    return (
      <div
        role="region"
        aria-live="polite"
        className={`p-8 sm:p-10 bg-gradient-to-b from-emerald-50 to-white border-2 border-emerald-300 rounded-3xl text-center space-y-6 shadow-xl ${className}`}
      >
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner ring-8 ring-emerald-50">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-emerald-800 bg-emerald-100 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Registration Successful
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
            Seat Enquiry Received!
          </h3>
          <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Thank you, <strong className="text-slate-900">{submittedData.studentName}</strong>! Your demo registration request for{' '}
            <strong className="text-blue-900">{submittedData.courseName || 'Selected Competitive Batch'}</strong> has been securely logged in our institutional records.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200/80 shadow-xs max-w-md mx-auto text-left space-y-2 text-xs sm:text-sm text-slate-700">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-slate-500">Contact Number:</span>
            <span className="font-bold text-slate-900">+91 {submittedData.mobile}</span>
          </div>
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-slate-500">Demo Class Pass:</span>
            <span className="font-bold text-emerald-700">2 Days Free Demo Approved</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Campus Verification:</span>
            <span className="font-semibold text-slate-900">Station Rd / Ghantaghar</span>
          </div>
        </div>

        <p className="text-xs text-slate-500">
          Our senior counseling mentor will call you within 24 hours to confirm your batch time (Morning/Evening).
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href="tel:9450067223"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors uppercase tracking-wider"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Admission Desk: 9450067223</span>
          </a>
          <button
            type="button"
            onClick={() => setSubmittedData(null)}
            className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors uppercase tracking-wider"
          >
            Submit Another Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      method="POST"
      noValidate
      className={`space-y-4 sm:space-y-5 ${className}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Student Name */}
        <div>
          <label htmlFor="studentName" className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1.5">
            <User className="w-3.5 h-3.5 text-blue-700" />
            <span>Student Full Name</span>
            <span className="text-rose-600">*</span>
          </label>
          <input
            id="studentName"
            type="text"
            autoComplete="name"
            placeholder="e.g. Rahul Sharma"
            {...register('studentName')}
            className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm bg-slate-50 hover:bg-white focus:bg-white border rounded-xl focus:outline-hidden focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all ${
              errors.studentName ? 'border-rose-400 bg-rose-50/40 text-rose-900' : 'border-slate-300'
            }`}
          />
          {errors.studentName && (
            <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.studentName.message}</span>
            </p>
          )}
        </div>

        {/* Father's Name */}
        <div>
          <label htmlFor="fatherName" className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1.5">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span>Father&apos;s Name</span>
          </label>
          <input
            id="fatherName"
            type="text"
            placeholder="e.g. Shri Rajesh Sharma"
            {...register('fatherName')}
            className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Mobile Number */}
        <div>
          <label htmlFor="mobile" className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1.5">
            <Phone className="w-3.5 h-3.5 text-blue-700" />
            <span>Mobile Number (10 digits)</span>
            <span className="text-rose-600">*</span>
          </label>
          <input
            id="mobile"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            maxLength={10}
            placeholder="e.g. 9450067223"
            {...register('mobile')}
            className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm bg-slate-50 hover:bg-white focus:bg-white border rounded-xl focus:outline-hidden focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all ${
              errors.mobile ? 'border-rose-400 bg-rose-50/40 text-rose-900' : 'border-slate-300'
            }`}
          />
          {errors.mobile && (
            <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.mobile.message}</span>
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1.5">
            <Mail className="w-3.5 h-3.5 text-slate-500" />
            <span>Email Address</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            placeholder="e.g. student@gmail.com"
            {...register('email')}
            className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm bg-slate-50 hover:bg-white focus:bg-white border rounded-xl focus:outline-hidden focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all ${
              errors.email ? 'border-rose-400 bg-rose-50/40 text-rose-900' : 'border-slate-300'
            }`}
          />
          {errors.email && (
            <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.email.message}</span>
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Course Selection */}
        <div>
          <label htmlFor="courseId" className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1.5">
            <BookOpen className="w-3.5 h-3.5 text-blue-700" />
            <span>Select Course Interested In</span>
          </label>
          <select
            id="courseId"
            {...register('courseId')}
            className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all cursor-pointer font-medium text-slate-800"
          >
            <option value="">-- Choose Target Batch --</option>
            {courses.length > 0 ? (
              courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))
            ) : (
              <>
                <option value="1">UP Police Constable & SI Special Target Batch</option>
                <option value="2">SSC CGL & CHSL (Tier 1 + Tier 2) Comprehensive Course</option>
                <option value="3">Railway RRB NTPC & Group D Success Batch</option>
                <option value="4">UPSSSC PET, VDO & Lekhpal Targeted Course</option>
                <option value="5">Banking Foundation & Speed Math (IBPS/SBI)</option>
                <option value="6">General Competition 1-Year Master Foundation</option>
              </>
            )}
          </select>
        </div>

        {/* Qualification */}
        <div>
          <label htmlFor="qualification" className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-blue-700" />
            <span>Current Qualification</span>
          </label>
          <select
            id="qualification"
            {...register('qualification')}
            className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all cursor-pointer font-medium text-slate-800"
          >
            <option value="">-- Select Highest Education --</option>
            <option value="10th Pass">High School (10th Pass)</option>
            <option value="12th Appearing">Intermediate (12th Appearing)</option>
            <option value="12th Pass">Intermediate (12th Pass)</option>
            <option value="Undergraduate">Graduation Pursuing / Appearing</option>
            <option value="Graduate">Graduate (B.A., B.Sc., B.Com, B.Tech, etc.)</option>
            <option value="Postgraduate">Postgraduate (M.A., M.Sc., M.Com, etc.)</option>
          </select>
        </div>
      </div>

      {!isCompact && (
        <>
          {/* Address */}
          <div>
            <label htmlFor="address" className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-700" />
              <span>Residential Area / Tehsil / Village in Lalitpur</span>
            </label>
            <input
              id="address"
              type="text"
              autoComplete="street-address"
              placeholder="e.g. Mahaveerpura, Lalitpur / Talbehat / Mehroni"
              {...register('address')}
              className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all"
            />
          </div>

          {/* Message / Query */}
          <div>
            <label htmlFor="message" className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
              <span>Any Questions or Specific Requirements? (Optional)</span>
            </label>
            <textarea
              id="message"
              rows={3}
              placeholder="Tell us about your target examination year or preferred batch timing (Morning/Evening)..."
              {...register('message')}
              className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all resize-y"
            />
          </div>
        </>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 rounded-2xl text-sm sm:text-base font-extrabold text-white bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 shadow-xl shadow-blue-900/20 hover:shadow-2xl hover:shadow-blue-900/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2.5 uppercase tracking-wider disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Submitting Admission Enquiry...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 text-amber-300" />
              <span>Submit Admission Enquiry & Book Demo Class</span>
            </>
          )}
        </button>
      </div>

      <div className="pt-1 text-center">
        <p className="text-xs text-slate-500 inline-flex items-center gap-1.5 justify-center flex-wrap">
          <span>🔒 Your personal details are completely confidential. You can also call directly at</span>
          <a
            href="tel:9450067223"
            className="font-bold text-blue-700 hover:underline hover:text-blue-900"
          >
            9450067223
          </a>
          <span>.</span>
        </p>
      </div>
    </form>
  );
}
