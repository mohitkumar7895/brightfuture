import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
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
    const referer = request.headers.get('referer') || '';
    const isAdminReferer = referer.includes('/admin');

    if (!session && !isAdminReferer) {
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
        categoryId: validated.categoryId && Number(validated.categoryId) > 0 ? Number(validated.categoryId) : null,
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

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/courses');
      revalidatePath('/courses/' + validated.slug);
      revalidatePath('/admission');
    } catch {
      // ignore
    }

    return NextResponse.json({ success: true, course: updated });
  } catch (error: any) {
    console.error('Update course error:', error);
    if (error.name === 'ZodError' || error.issues) {
      const msg = error.issues?.[0]?.message || 'Invalid course details provided';
      return NextResponse.json({ error: msg }, { status: 400 });
    }
    if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062 || error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A course with this URL slug or title already exists. Please choose a different title or slug.' },
        { status: 400 }
      );
    }
    if (error.code === 'ER_NO_REFERENCED_ROW_2' || error.errno === 1452) {
      return NextResponse.json({ error: 'Selected course category does not exist.' }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Failed to update course' }, { status: 400 });
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
    const courseId = Number(id);
    if (isNaN(courseId)) {
      return NextResponse.json({ error: 'Invalid course ID' }, { status: 400 });
    }

    await db.course.delete({
      where: { id: courseId },
    });

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/courses');
      revalidatePath('/admission');
    } catch {
      // ignore
    }

    return NextResponse.json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Delete course error:', error);
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
  }
}

