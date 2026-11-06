import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getAdminSession } from '@/lib/auth/session';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [
      totalEnquiries,
      pendingEnquiries,
      convertedEnquiries,
      totalCourses,
      totalStudents,
      totalFaculty,
      totalNotices,
      totalGallery,
      recentEnquiries,
      popularCourses,
      recentLogs,
    ] = await Promise.all([
      db.enquiry.count(),
      db.enquiry.count({ where: { status: 'PENDING' } }),
      db.enquiry.count({ where: { status: 'CONVERTED' } }),
      db.course.count(),
      db.student.count(),
      db.faculty.count(),
      db.notice.count(),
      db.galleryItem.count(),
      db.enquiry.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { course: { select: { title: true } } },
      }),
      db.course.findMany({
        take: 5,
        where: { isPublished: true },
        orderBy: { isFeatured: 'desc' },
      }),
      db.adminActivityLog.findMany({
        take: 6,
        orderBy: { createdAt: 'desc' },
        include: { admin: { select: { name: true, email: true } } },
      }),
    ]);

    // Mock/derived 6-month enquiry trend for charts
    const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
    const enquiryTrends = months.map((month, idx) => ({
      name: month,
      enquiries: Math.floor(18 + idx * 8 + (idx % 2 === 0 ? 5 : -3)),
      conversions: Math.floor(10 + idx * 5 + (idx % 2 === 0 ? 3 : -1)),
    }));

    return NextResponse.json({
      success: true,
      stats: {
        totalEnquiries,
        pendingEnquiries,
        convertedEnquiries,
        totalCourses,
        totalStudents,
        totalFaculty,
        totalNotices,
        totalGallery,
      },
      recentEnquiries,
      popularCourses,
      recentLogs,
      enquiryTrends,
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json({ error: 'Failed to load stats' }, { status: 500 });
  }
}

