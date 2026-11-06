import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getAdminSession } from '@/lib/auth/session';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category');
    const type = searchParams.get('type');

    const where: any = { isPublished: true };
    if (categorySlug) {
      where.category = { slug: categorySlug };
    }
    if (type) {
      where.type = type;
    }

    const items = await db.galleryItem.findMany({
      where,
      orderBy: { id: 'desc' },
      include: {
        category: {
          select: { id: true, name: true, slug: true },
        },
      },
    });

    const categories = await db.galleryCategory.findMany({
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({ success: true, items, categories });
  } catch (error) {
    console.error('Fetch gallery error:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, url, thumbnailUrl, caption, categoryId, type, isPublished } = body;

    if (!title || !url) {
      return NextResponse.json({ error: 'Title and media URL are required' }, { status: 400 });
    }

    const item = await db.galleryItem.create({
      data: {
        title,
        url,
        thumbnailUrl: thumbnailUrl || null,
        caption: caption || null,
        categoryId: categoryId ? Number(categoryId) : null,
        type: type || 'IMAGE',
        isPublished: isPublished !== false,
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error: any) {
    console.error('Create gallery item error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create gallery item' }, { status: 500 });
  }
}

