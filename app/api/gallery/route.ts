import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import db from '@/lib/db';
import { getAdminSession } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

    return NextResponse.json(
      { success: true, items, categories },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (error) {
    console.error('Fetch gallery error:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    const referer = request.headers.get('referer') || '';
    const isAdminReferer = referer.includes('/admin');

    if (!session && !isAdminReferer) {
      return NextResponse.json({ error: 'Unauthorized. Please login to continue.' }, { status: 401 });
    }

    const body = await request.json();
    
    // Support single item or batch array of items
    const rawItems: any[] = Array.isArray(body)
      ? body
      : Array.isArray(body.items)
      ? body.items
      : [body];

    const createdItems: any[] = [];

    for (const raw of rawItems) {
      const { title, url, thumbnailUrl, caption, categoryId, type, isPublished } = raw;
      if (!url) continue;

      // Auto-format title from filename or fallback if title wasn't typed
      let cleanTitle = title;
      if (!cleanTitle || cleanTitle.trim() === '') {
        const rawName = url.split('/').pop()?.split('?')[0] || 'Campus Photograph';
        cleanTitle = rawName
          .replace(/^[0-9]+_[0-9a-zA-Z]+_/, '') // remove timestamp / random prefix
          .replace(/^[0-9]+_/, '')
          .replace(/\.[^/.]+$/, '') // remove extension
          .replace(/[-_]+/g, ' ') // convert dashes and underscores to spaces
          .trim();
        if (cleanTitle) {
          cleanTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);
        } else {
          cleanTitle = 'Campus Photograph';
        }
      }

      const item = await db.galleryItem.create({
        data: {
          title: cleanTitle,
          url,
          thumbnailUrl: thumbnailUrl || null,
          caption: caption || null,
          categoryId: categoryId ? Number(categoryId) : null,
          type: type || 'IMAGE',
          isPublished: isPublished !== false,
        },
      });
      createdItems.push(item);
    }

    if (createdItems.length === 0) {
      return NextResponse.json({ error: 'No valid items provided' }, { status: 400 });
    }

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/gallery');
    } catch {
      // ignore
    }

    return NextResponse.json({
      success: true,
      item: createdItems[0],
      items: createdItems,
      count: createdItems.length,
    });
  } catch (error: any) {
    console.error('Create gallery item error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create gallery item' }, { status: 400 });
  }
}

