import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { faqSchema } from '@/lib/validations';
import { getAdminSession } from '@/lib/auth/session';

export async function GET() {
  try {
    const faqs = await db.faq.findMany({
      where: { isPublished: true },
      orderBy: [{ order: 'asc' }, { id: 'asc' }],
    });
    return NextResponse.json({ success: true, faqs });
  } catch (error) {
    console.error('Fetch FAQs error:', error);
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validated = faqSchema.parse(body);

    const faq = await db.faq.create({
      data: validated,
    });

    return NextResponse.json({ success: true, faq });
  } catch (error: any) {
    console.error('Create FAQ error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create FAQ' }, { status: 500 });
  }
}

