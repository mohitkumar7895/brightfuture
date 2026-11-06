import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { noticeSchema } from '@/lib/validations';
import { getAdminSession } from '@/lib/auth/session';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const pinned = searchParams.get('pinned');

    const where: any = { isPublished: true };
    if (category) where.category = category;
    if (pinned === 'true') where.isPinned = true;

    const notices = await db.notice.findMany({
      where,
      orderBy: [{ isPinned: 'desc' }, { publishDate: 'desc' }, { id: 'desc' }],
    });

    return NextResponse.json({ success: true, notices });
  } catch (error) {
    console.error('Fetch notices error:', error);
    return NextResponse.json({ error: 'Failed to fetch notices' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validated = noticeSchema.parse(body);

    const notice = await db.notice.create({
      data: {
        title: validated.title,
        content: validated.content,
        category: validated.category,
        isPinned: validated.isPinned,
        isPublished: validated.isPublished,
        publishDate: validated.publishDate ? new Date(validated.publishDate) : new Date(),
      },
    });

    return NextResponse.json({ success: true, notice });
  } catch (error: any) {
    console.error('Create notice error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create notice' }, { status: 500 });
  }
}

