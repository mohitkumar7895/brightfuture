import React from 'react';
import { getAdminSession } from '@/lib/auth/session';
import AdminLayoutClient from '@/components/admin/AdminLayoutClient';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  return (
    <AdminLayoutClient adminUser={session}>
      {children}
    </AdminLayoutClient>
  );
}

