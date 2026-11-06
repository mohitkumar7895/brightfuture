import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getAdminSession } from '@/lib/auth/session';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { name, fatherName, email, phone, address, qualification, status } = body;

    const updated = await db.student.update({
      where: { id: Number(id) },
      data: {
        ...(name && { name }),
        fatherName: fatherName !== undefined ? fatherName : undefined,
        email: email !== undefined ? email : undefined,
        ...(phone && { phone }),
        address: address !== undefined ? address : undefined,
        qualification: qualification !== undefined ? qualification : undefined,
        ...(status && { status }),
      },
    });

    return NextResponse.json({ success: true, student: updated });
  } catch (error: any) {
    console.error('Update student error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update student' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await db.student.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Delete student error:', error);
    return NextResponse.json({ error: 'Failed to delete student' }, { status: 500 });
  }
}

