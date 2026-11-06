import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getAdminSession } from '@/lib/auth/session';

export async function GET(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { rollNumber: { contains: search } },
        { phone: { contains: search } },
      ];
    }

    const students = await db.student.findMany({
      where,
      orderBy: { id: 'desc' },
      include: {
        admissions: {
          include: {
            course: {
              select: { id: true, title: true, fee: true },
            },
          },
        },
      },
    });

    return NextResponse.json({ success: true, students });
  } catch (error) {
    console.error('Fetch students error:', error);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, rollNumber, fatherName, email, phone, address, qualification, status, courseId, feePaid, totalFee, batchTime } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    const finalRoll = rollNumber || `BFCI-${Date.now().toString().slice(-6)}`;

    const student = await db.student.create({
      data: {
        name,
        rollNumber: finalRoll,
        fatherName: fatherName || null,
        email: email || null,
        phone,
        address: address || null,
        qualification: qualification || null,
        status: status || 'ACTIVE',
      },
    });

    if (courseId) {
      await db.admission.create({
        data: {
          studentId: student.id,
          courseId: Number(courseId),
          batchTime: batchTime || null,
          feePaid: Number(feePaid) || 0,
          totalFee: Number(totalFee) || 0,
          status: 'ENROLLED',
        },
      });
    }

    return NextResponse.json({ success: true, student });
  } catch (error: any) {
    console.error('Create student error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create student' }, { status: 500 });
  }
}

