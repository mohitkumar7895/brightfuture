import { z } from 'zod';

export const enquirySchema = z.object({
  studentName: z.string().min(2, 'Name must be at least 2 characters'),
  fatherName: z.string().optional(),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  courseId: z.string().optional().nullable(),
  courseName: z.string().optional(),
  address: z.string().optional(),
  qualification: z.string().optional(),
  message: z.string().optional(),
});

export const courseSchema = z.object({
  title: z.string().min(3, 'Course title is required'),
  slug: z.string().min(3, 'Slug is required'),
  categoryId: z.coerce.number().optional().nullable(),
  shortDescription: z.string().optional().nullable(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  eligibility: z.string().optional().nullable(),
  duration: z.string().min(1, 'Duration is required'),
  subjects: z.string().optional().nullable(),
  fee: z.coerce.number().min(0, 'Fee cannot be negative'),
  discountFee: z.coerce.number().optional().nullable(),
  batchInfo: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  keywords: z.string().optional().nullable(),
});

export const facultySchema = z.object({
  name: z.string().optional().nullable().default('Faculty Mentor'),
  designation: z.string().optional().nullable().default('Educator'),
  qualification: z.string().optional().nullable().default('Expert Mentor'),
  experience: z.string().optional().nullable().default('Experienced'),
  subjects: z.string().optional().nullable().default('Competitive Exams'),
  bio: z.string().optional().nullable(),
  photo: z.string().optional().nullable(),
  order: z.coerce.number().default(0),
  isPublished: z.boolean().default(true),
});

export const resultSchema = z.object({
  studentName: z.string().min(2, 'Student name is required'),
  examName: z.string().min(2, 'Exam name is required'),
  rank: z.string().optional().nullable(),
  year: z.coerce.number().min(2000).max(2035),
  photo: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  isFeatured: z.boolean().default(true),
});

export const noticeSchema = z.object({
  title: z.string().min(3, 'Notice title is required'),
  content: z.string().min(5, 'Content is required'),
  category: z.string().default('GENERAL'),
  isPinned: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  publishDate: z.string().optional().nullable(),
});

export const faqSchema = z.object({
  question: z.string().min(5, 'Question is required'),
  answer: z.string().min(5, 'Answer is required'),
  category: z.string().default('GENERAL'),
  order: z.coerce.number().default(0),
  isPublished: z.boolean().default(true),
});

export const websiteSettingSchema = z.object({
  instituteName: z.string().min(2),
  tagline: z.string().optional().nullable(),
  headOfficeAddress: z.string().min(5),
  marketBranchAddress: z.string().min(5),
  pinCode: z.string().min(6),
  primaryPhone: z.string().min(10),
  alternatePhones: z.string().optional().nullable(),
  email: z.string().email(),
  whatsappNumber: z.string().min(10),
  openingHours: z.string().optional().nullable(),
  mapEmbedUrl: z.string().optional().nullable(),
  facebookUrl: z.string().optional().nullable(),
  youtubeUrl: z.string().optional().nullable(),
  telegramUrl: z.string().optional().nullable(),
  instagramUrl: z.string().optional().nullable(),
  footerText: z.string().optional().nullable(),
  announcementBarText: z.string().optional().nullable(),
  isAnnouncementBarActive: z.boolean().default(true),
});

