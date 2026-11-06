import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { resultSchema } from '@/lib/validations';
import { getAdminSession } from '@/lib/auth/session';

export async function GET() {
  try {
    const results = await db.result.findMany({
      orderBy: [{ year: 'desc' }, { id: 'desc' }],
    });
    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('Fetch results error:', error);
    return NextResponse.json({ error: 'Failed to fetch results' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validated = resultSchema.parse(body);

    const result = await db.result.create({
      data: validated,
    });

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('Create result error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create result' }, { status: 500 });
  }
}

