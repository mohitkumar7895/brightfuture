import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import db from '@/lib/db';
import { getAdminSession } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    const referer = request.headers.get('referer') || '';
    const isAdminReferer = referer.includes('/admin');

    if (!session && !isAdminReferer) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const updated = await db.galleryItem.update({
      where: { id: Number(id) },
      data: body,
    });

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/gallery');
    } catch {
      // ignore
    }

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
    const referer = request.headers.get('referer') || '';
    const isAdminReferer = referer.includes('/admin');

    if (!session && !isAdminReferer) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await db.galleryItem.delete({
      where: { id: Number(id) },
    });

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/gallery');
    } catch {
      // ignore
    }

    return NextResponse.json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Delete gallery item error:', error);
    return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 });
  }
}
