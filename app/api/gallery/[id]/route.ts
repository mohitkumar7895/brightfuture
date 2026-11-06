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
    const { title, url, thumbnailUrl, caption, categoryId, type, isPublished } = body;

    const updated = await db.galleryItem.update({
      where: { id: Number(id) },
      data: {
        ...(title && { title }),
        ...(url && { url }),
        ...(thumbnailUrl !== undefined && { thumbnailUrl }),
        ...(caption !== undefined && { caption }),
        ...(categoryId !== undefined && { categoryId: categoryId ? Number(categoryId) : null }),
        ...(type && { type }),
        ...(isPublished !== undefined && { isPublished }),
      },
    });

    return NextResponse.json({ success: true, item: updated });
  } catch (error: any) {
    console.error('Update gallery item error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update gallery item' }, { status: 500 });
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
    await db.galleryItem.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Delete gallery item error:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}

