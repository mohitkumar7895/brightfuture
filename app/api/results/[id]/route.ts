import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { resultSchema } from '@/lib/validations';
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
    const validated = resultSchema.parse(body);

    const updated = await db.result.update({
      where: { id: Number(id) },
      data: validated,
    });

    return NextResponse.json({ success: true, result: updated });
  } catch (error: any) {
    console.error('Update result error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update result' }, { status: 500 });
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
    await db.result.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true, message: 'Result deleted successfully' });
  } catch (error) {
    console.error('Delete result error:', error);
    return NextResponse.json({ error: 'Failed to delete result' }, { status: 500 });
  }
}

