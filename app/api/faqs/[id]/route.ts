import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { faqSchema } from '@/lib/validations';
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
    const validated = faqSchema.parse(body);

    const updated = await db.faq.update({
      where: { id: Number(id) },
      data: validated,
    });

    return NextResponse.json({ success: true, faq: updated });
  } catch (error: any) {
    console.error('Update FAQ error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update FAQ' }, { status: 500 });
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
    await db.faq.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true, message: 'FAQ deleted successfully' });
  } catch (error) {
    console.error('Delete FAQ error:', error);
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 });
  }
}

