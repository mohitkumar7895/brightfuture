'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

interface SiteLayoutWrapperProps {
  topBar?: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
  floatingWhatsApp: React.ReactNode;
  floatingCall: React.ReactNode;
  children: React.ReactNode;
}

export default function SiteLayoutWrapper({
  topBar,
  header,
  footer,
  floatingWhatsApp,
  floatingCall,
  children,
}: SiteLayoutWrapperProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  // If in Admin panel (e.g. /admin, /admin/login, /admin/courses, etc.),
  // do NOT render website navbar, footer, topbar, or floating buttons!
  if (isAdmin) {
    return <>{children}</>;
  }

  // Normal public website layout
  return (
    <>
      {topBar}
      {header}
      <main className="flex-1">{children}</main>
      {footer}
      {floatingWhatsApp}
      {floatingCall}
    </>
  );
}

