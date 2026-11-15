import React from 'react';

export default function Loading() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-6 space-y-3.5">
      <div className="w-10 h-10 rounded-full border-3 border-blue-100 border-t-blue-800 animate-spin" />
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">
        Loading...
      </span>
    </div>
  );
}
