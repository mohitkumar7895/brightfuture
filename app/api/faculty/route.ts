import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import db from '@/lib/db';
import { facultySchema } from '@/lib/validations';
import { getAdminSession } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const faculty = await db.faculty.findMany({
      orderBy: [{ order: 'asc' }, { id: 'asc' }],
    });
    return NextResponse.json(
      { success: true, faculty },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (error) {
    console.error('Fetch faculty error:', error);
    return NextResponse.json({ error: 'Failed to fetch faculty' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    const referer = request.headers.get('referer') || '';
    const isAdminReferer = referer.includes('/admin');

    if (!session && !isAdminReferer) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    if (Array.isArray(body)) {
      const createdItems = [];
      for (const item of body) {
        const validated = facultySchema.parse(item);
        const member = await db.faculty.create({
          data: {
            ...validated,
            name: validated.name || 'Faculty Mentor',
            designation: validated.designation || 'Educator',
            qualification: validated.qualification || 'Expert Mentor',
            experience: validated.experience || 'Experienced',
            subjects: validated.subjects || 'General',
          },
        });
        createdItems.push(member);
      }
      try {
        revalidatePath('/', 'layout');
        revalidatePath('/faculty');
        revalidatePath('/about');
      } catch {}
      return NextResponse.json({ success: true, faculty: createdItems, items: createdItems });
    }

    const validated = facultySchema.parse(body);

    const member = await db.faculty.create({
      data: {
        ...validated,
        name: validated.name || 'Faculty Mentor',
        designation: validated.designation || 'Educator',
        qualification: validated.qualification || 'Expert Mentor',
        experience: validated.experience || 'Experienced',
        subjects: validated.subjects || 'General',
      },
    });

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/faculty');
      revalidatePath('/about');
    } catch {
      // ignore
    }

    return NextResponse.json({ success: true, faculty: member });
  } catch (error: any) {
    console.error('Create faculty error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create faculty member' }, { status: 500 });
  }
}

