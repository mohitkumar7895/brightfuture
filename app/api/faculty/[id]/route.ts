import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { facultySchema } from '@/lib/validations';
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
    const facultyId = Number(id);
    const body = await request.json();
    const validated = facultySchema.parse(body);

    const updated = await db.faculty.update({
      where: { id: facultyId },
      data: validated,
    });

    return NextResponse.json({ success: true, faculty: updated });
  } catch (error: any) {
    console.error('Update faculty error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update faculty' }, { status: 500 });
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
    await db.faculty.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true, message: 'Faculty deleted successfully' });
  } catch (error) {
    console.error('Delete faculty error:', error);
    return NextResponse.json({ error: 'Failed to delete faculty' }, { status: 500 });
  }
}

