import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { facultySchema } from '@/lib/validations';
import { getAdminSession } from '@/lib/auth/session';

export async function GET() {
  try {
    const faculty = await db.faculty.findMany({
      orderBy: [{ order: 'asc' }, { id: 'asc' }],
    });
    return NextResponse.json({ success: true, faculty });
  } catch (error) {
    console.error('Fetch faculty error:', error);
    return NextResponse.json({ error: 'Failed to fetch faculty' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validated = facultySchema.parse(body);

    const member = await db.faculty.create({
      data: validated,
    });

    return NextResponse.json({ success: true, faculty: member });
  } catch (error: any) {
    console.error('Create faculty error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create faculty member' }, { status: 500 });
  }
}

