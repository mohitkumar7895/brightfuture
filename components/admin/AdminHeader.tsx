'use client';

import React from 'react';
import { Menu, Bell, User, Shield, Search } from 'lucide-react';

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
  adminName?: string;
  adminRole?: string;
}

export default function AdminHeader({
  onToggleSidebar,
  adminName = 'Institute Director',
  adminRole = 'SUPER_ADMIN',
}: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-3.5 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between sticky top-0 z-30 min-w-0">
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="lg:hidden p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 shrink-0"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-slate-800 font-bold text-xs sm:text-base min-w-0">
          <Shield className="w-4 h-4 text-blue-700 shrink-0" />
          <span className="truncate hidden sm:inline">Bright Future Management System</span>
          <span className="truncate inline sm:hidden">Bright Future Admin</span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* User Badge */}
        <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-xs shrink-0">
            <User className="w-4 h-4 text-blue-800" />
          </div>
          <div className="hidden sm:block text-left">
            <span className="block text-xs font-bold text-slate-900 leading-tight">
              {adminName}
            </span>
            <span className="block text-[10px] text-slate-500 font-medium leading-tight">
              {adminRole}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

