import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { websiteSettingSchema } from '@/lib/validations';
import { getAdminSession } from '@/lib/auth/session';

export async function GET() {
  try {
    let settings = await db.websiteSetting.findFirst();
    if (!settings) {
      settings = await db.websiteSetting.create({
        data: {
          instituteName: 'Bright Future Competition Institute',
          headOfficeAddress: 'Behind Krishna Cinema, Station Road, Lalitpur, Uttar Pradesh, India.',
          marketBranchAddress: 'Richariya Market, Mahaveerpura, Near Ghantaghar, Lalitpur.',
          pinCode: '284403',
          primaryPhone: '9450067223',
          email: 'aj2819147@gmail.com',
          whatsappNumber: '9450067223',
        },
      });
    }
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error('Fetch settings error:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validated = websiteSettingSchema.parse(body);

    const existing = await db.websiteSetting.findFirst();
    const settings = existing
      ? await db.websiteSetting.update({
          where: { id: existing.id },
          data: validated,
        })
      : await db.websiteSetting.create({
          data: validated,
        });

    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    console.error('Update settings error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update settings' }, { status: 500 });
  }
}

