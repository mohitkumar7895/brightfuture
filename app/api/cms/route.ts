import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getAdminSession } from '@/lib/auth/session';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageKey = searchParams.get('pageKey') || 'home';

    const content = await db.pageContent.findUnique({
      where: { pageKey },
    });

    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error('Fetch page content error:', error);
    return NextResponse.json({ error: 'Failed to fetch page content' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { pageKey, ...data } = body;

    if (!pageKey) {
      return NextResponse.json({ error: 'pageKey is required' }, { status: 400 });
    }

    const content = await db.pageContent.upsert({
      where: { pageKey },
      update: data,
      create: { pageKey, ...data },
    });

    return NextResponse.json({ success: true, content });
  } catch (error: any) {
    console.error('Update page content error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update CMS content' }, { status: 500 });
  }
}

