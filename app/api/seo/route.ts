import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { getAdminSession } from '@/lib/auth/session';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageSlug = searchParams.get('slug');

    if (pageSlug) {
      const seo = await db.seoMetadata.findUnique({
        where: { pageSlug },
      });
      return NextResponse.json({ success: true, seo });
    }

    const allSeo = await db.seoMetadata.findMany({
      orderBy: { pageSlug: 'asc' },
    });
    return NextResponse.json({ success: true, allSeo });
  } catch (error) {
    console.error('Fetch SEO metadata error:', error);
    return NextResponse.json({ error: 'Failed to fetch SEO metadata' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { pageSlug, metaTitle, metaDescription, keywords, canonicalUrl, ogImage, robots, structuredData } = body;

    if (!pageSlug || !metaTitle || !metaDescription) {
      return NextResponse.json({ error: 'pageSlug, metaTitle, and metaDescription are required' }, { status: 400 });
    }

    const seo = await db.seoMetadata.upsert({
      where: { pageSlug },
      update: {
        metaTitle,
        metaDescription,
        keywords: keywords || null,
        canonicalUrl: canonicalUrl || null,
        ogImage: ogImage || null,
        robots: robots || 'index, follow',
        structuredData: structuredData || null,
      },
      create: {
        pageSlug,
        metaTitle,
        metaDescription,
        keywords: keywords || null,
        canonicalUrl: canonicalUrl || null,
        ogImage: ogImage || null,
        robots: robots || 'index, follow',
        structuredData: structuredData || null,
      },
    });

    return NextResponse.json({ success: true, seo });
  } catch (error: any) {
    console.error('Update SEO error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update SEO' }, { status: 500 });
  }
}

