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
  shortDescription: z.string().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  eligibility: z.string().optional(),
  duration: z.string().min(1, 'Duration is required'),
  subjects: z.string().optional(),
  fee: z.coerce.number().min(0, 'Fee cannot be negative'),
  discountFee: z.coerce.number().optional().nullable(),
  batchInfo: z.string().optional(),
  image: z.string().optional(),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  keywords: z.string().optional(),
});

export const facultySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  designation: z.string().min(2, 'Designation is required'),
  qualification: z.string().min(2, 'Qualification is required'),
  experience: z.string().min(1, 'Experience is required'),
  subjects: z.string().min(2, 'Subjects are required'),
  bio: z.string().optional(),
  photo: z.string().optional(),
  order: z.coerce.number().default(0),
  isPublished: z.boolean().default(true),
});

export const resultSchema = z.object({
  studentName: z.string().min(2, 'Student name is required'),
  examName: z.string().min(2, 'Exam name is required'),
  rank: z.string().optional(),
  year: z.coerce.number().min(2000).max(2035),
  photo: z.string().optional(),
  description: z.string().optional(),
  isFeatured: z.boolean().default(true),
});

export const noticeSchema = z.object({
  title: z.string().min(3, 'Notice title is required'),
  content: z.string().min(5, 'Content is required'),
  category: z.string().default('GENERAL'),
  isPinned: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  publishDate: z.string().optional(),
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
  tagline: z.string().optional(),
  headOfficeAddress: z.string().min(5),
  marketBranchAddress: z.string().min(5),
  pinCode: z.string().min(6),
  primaryPhone: z.string().min(10),
  alternatePhones: z.string().optional(),
  email: z.string().email(),
  whatsappNumber: z.string().min(10),
  openingHours: z.string().optional(),
  mapEmbedUrl: z.string().optional(),
  facebookUrl: z.string().optional(),
  youtubeUrl: z.string().optional(),
  telegramUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  footerText: z.string().optional(),
  announcementBarText: z.string().optional(),
  isAnnouncementBarActive: z.boolean().default(true),
});

