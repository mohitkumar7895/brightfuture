import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { courseSchema } from '@/lib/validations';
import { getAdminSession } from '@/lib/auth/session';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const courseId = Number(id);

    const course = isNaN(courseId)
      ? await db.course.findUnique({
          where: { slug: id },
          include: { category: true },
        })
      : await db.course.findUnique({
          where: { id: courseId },
          include: { category: true },
        });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, course });
  } catch (error) {
    console.error('Fetch course error:', error);
    return NextResponse.json({ error: 'Failed to fetch course' }, { status: 500 });
  }
}

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
    const courseId = Number(id);
    if (isNaN(courseId)) {
      return NextResponse.json({ error: 'Invalid course ID' }, { status: 400 });
    }

    const body = await request.json();
    const validated = courseSchema.parse(body);

    const updated = await db.course.update({
      where: { id: courseId },
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
        image: validated.image,
        isFeatured: validated.isFeatured,
        isPublished: validated.isPublished,
        metaTitle: validated.metaTitle,
        metaDescription: validated.metaDescription,
        keywords: validated.keywords,
      },
    });

    return NextResponse.json({ success: true, course: updated });
  } catch (error: any) {
    console.error('Update course error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update course' }, { status: 500 });
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
    const courseId = Number(id);
    if (isNaN(courseId)) {
      return NextResponse.json({ error: 'Invalid course ID' }, { status: 400 });
    }

    await db.course.delete({
      where: { id: courseId },
    });

    return NextResponse.json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Delete course error:', error);
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
  }
}

