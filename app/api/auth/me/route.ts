import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth/session';
import db from '@/lib/db';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  const user = await db.adminUser.findUnique({
    where: { id: session.id },
    select: { id: true, name: true, email: true, role: true, phone: true, avatar: true },
  });

  return NextResponse.json({ authenticated: true, user });
}

