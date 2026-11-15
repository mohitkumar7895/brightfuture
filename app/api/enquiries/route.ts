import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { enquirySchema } from '@/lib/validations';
import { getAdminSession } from '@/lib/auth/session';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = enquirySchema.parse(body);

    const numericCourseId =
      validated.courseId && !isNaN(Number(validated.courseId))
        ? Number(validated.courseId)
        : null;

    let courseName = validated.courseName;
    if (numericCourseId && !courseName) {
      const course = await db.course.findUnique({
        where: { id: numericCourseId },
      });
      if (course) courseName = course.title;
    }

    const enquiry = await db.enquiry.create({
      data: {
        studentName: validated.studentName,
        fatherName: validated.fatherName || null,
        mobile: validated.mobile,
        email: validated.email || null,
        courseId: numericCourseId,
        courseName: courseName || null,
        address: validated.address || null,
        qualification: validated.qualification || null,
        message: validated.message || null,
        status: 'PENDING',
      },
    });

    // Formatted WhatsApp payload to 8726343417 so enquiry reaches counselor directly
    const whatsAppText = encodeURIComponent(
      `*Admission Enquiry - Bright Future Competition Institute Lalitpur*\n\n` +
      `👤 *Student Name:* ${validated.studentName}\n` +
      `📞 *Mobile Number:* ${validated.mobile}\n` +
      `📚 *Course Applied:* ${courseName || 'General Competitive Batch'}\n` +
      (validated.qualification ? `🎓 *Qualification:* ${validated.qualification}\n` : '') +
      (validated.fatherName ? `👨 *Father Name:* ${validated.fatherName}\n` : '') +
      (validated.address ? `📍 *Address:* ${validated.address}\n` : '') +
      (validated.message ? `💬 *Message:* ${validated.message}\n` : '') +
      `\n_Sent via Online Admission Portal_`
    );

    const whatsappUrl = `https://wa.me/918726343417?text=${whatsAppText}`;

    return NextResponse.json({
      success: true,
      message: 'Your admission enquiry has been submitted successfully! Our counseling team (+91 8726343417) will contact you shortly.',
      enquiryId: enquiry.id,
      whatsappUrl,
      helpline: '8726343417',
    });
  } catch (error: any) {
    console.error('Enquiry submission error:', error);
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to submit enquiry. Please call Counselor directly at 8726343417.' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const courseId = searchParams.get('courseId');

    const where: any = {};

    if (search) {
      where.OR = [
        { studentName: { contains: search } },
        { mobile: { contains: search } },
        { email: { contains: search } },
        { fatherName: { contains: search } },
      ];
    }

    if (status) {
      where.status = status;
    }

    if (courseId && !isNaN(Number(courseId))) {
      where.courseId = Number(courseId);
    }

    const enquiries = await db.enquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        course: {
          select: { title: true, fee: true },
        },
      },
    });

    return NextResponse.json({ success: true, enquiries });
  } catch (error) {
    console.error('Fetch enquiries error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch enquiries' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const body = await request.json().catch(() => ({}));
    const id = body.id || searchParams.get('id');
    const { status, adminNotes } = body;

    if (!id) {
      return NextResponse.json({ error: 'Enquiry ID is required' }, { status: 400 });
    }

    const updated = await db.enquiry.update({
      where: { id: Number(id) },
      data: {
        ...(status && { status }),
        ...(adminNotes !== undefined && { adminNotes }),
      },
    });

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (error) {
    console.error('Update enquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to update enquiry' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Enquiry ID is required' }, { status: 400 });
    }

    await db.enquiry.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    console.error('Delete enquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to delete enquiry' },
      { status: 500 }
    );
  }
}

