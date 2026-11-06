import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getAdminSession } from '@/lib/auth/session';

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const enquiries = await db.enquiry.findMany({
      orderBy: { createdAt: 'desc' },
      include: { course: { select: { title: true } } },
    });

    const headers = [
      'ID',
      'Student Name',
      'Father Name',
      'Mobile',
      'Email',
      'Course',
      'Status',
      'Qualification',
      'Address',
      'Message',
      'Admin Notes',
      'Date',
    ];

    const rows = enquiries.map((e) => [
      e.id,
      `"${(e.studentName || '').replace(/"/g, '""')}"`,
      `"${(e.fatherName || '').replace(/"/g, '""')}"`,
      `"${e.mobile}"`,
      `"${e.email || ''}"`,
      `"${(e.courseName || e.course?.title || '').replace(/"/g, '""')}"`,
      `"${e.status}"`,
      `"${(e.qualification || '').replace(/"/g, '""')}"`,
      `"${(e.address || '').replace(/"/g, '""')}"`,
      `"${(e.message || '').replace(/"/g, '""')}"`,
      `"${(e.adminNotes || '').replace(/"/g, '""')}"`,
      `"${e.createdAt.toISOString()}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="Bright_Future_Enquiries_${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error('Export enquiries error:', error);
    return NextResponse.json({ error: 'Export failed' }, { status: 500 });
  }
}

