import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { noticeSchema } from '@/lib/validations';
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
    const validated = noticeSchema.parse(body);

    const updated = await db.notice.update({
      where: { id: Number(id) },
      data: {
        title: validated.title,
        content: validated.content,
        category: validated.category,
        isPinned: validated.isPinned,
        isPublished: validated.isPublished,
        publishDate: validated.publishDate ? new Date(validated.publishDate) : undefined,
      },
    });

    return NextResponse.json({ success: true, notice: updated });
  } catch (error: any) {
    console.error('Update notice error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update notice' }, { status: 500 });
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
    await db.notice.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true, message: 'Notice deleted successfully' });
  } catch (error) {
    console.error('Delete notice error:', error);
    return NextResponse.json({ error: 'Failed to delete notice' }, { status: 500 });
  }
}

