import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { courseSchema } from '@/lib/validations';
import { getAdminSession } from '@/lib/auth/session';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category');
    const featured = searchParams.get('featured');
    const all = searchParams.get('all'); // if 'true', include unpublished for admin

    const where: any = {};
    if (all !== 'true') {
      where.isPublished = true;
    }
    if (featured === 'true') {
      where.isFeatured = true;
    }
    if (categorySlug) {
      where.category = { slug: categorySlug };
    }

    const courses = await db.course.findMany({
      where,
      orderBy: [{ isFeatured: 'desc' }, { id: 'asc' }],
      include: {
        category: {
          select: { id: true, name: true, slug: true, icon: true },
        },
      },
    });

    return NextResponse.json({ success: true, courses });
  } catch (error) {
    console.error('Fetch courses error:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validated = courseSchema.parse(body);

    const course = await db.course.create({
      data: {
        title: validated.title,
        slug: validated.slug,
        categoryId: validated.categoryId || null,
        shortDescription: validated.shortDescription || null,
        description: validated.description,
        eligibility: validated.eligibility || null,
        duration: validated.duration,
        subjects: validated.subjects || null,
        fee: validated.fee,
        discountFee: validated.discountFee || null,
        batchInfo: validated.batchInfo || null,
        image: validated.image || '/images/hero-classroom.jpg',
        isFeatured: validated.isFeatured,
        isPublished: validated.isPublished,
        metaTitle: validated.metaTitle || null,
        metaDescription: validated.metaDescription || null,
        keywords: validated.keywords || null,
      },
    });

    return NextResponse.json({ success: true, course });
  } catch (error: any) {
    console.error('Create course error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'A course with this slug or title already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Failed to create course' }, { status: 500 });
  }
}

