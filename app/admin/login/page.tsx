'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap, Lock, Mail, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@brightfuture.com');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      toast.success('Welcome back, Director!');
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-10 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-900 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-900/30">
            <GraduationCap className="w-8 h-8 text-amber-300" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Bright Future Admin
            </h1>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">
              Management Portal • Lalitpur
            </p>
          </div>
        </div>

        {/* Demo Credentials Pill */}
        <div className="bg-blue-50 border border-blue-200/80 rounded-2xl p-3.5 text-xs text-blue-900 space-y-1">
          <div className="flex items-center gap-1.5 font-bold">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Default Administrator Credentials:</span>
          </div>
          <p className="text-slate-600 pl-5">
            Email: <strong className="text-slate-900">admin@brightfuture.com</strong>
          </p>
          <p className="text-slate-600 pl-5">
            Password: <strong className="text-slate-900">admin123</strong>
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} method="POST" className="space-y-4">
          <div>
            <label htmlFor="adminEmail" className="block text-xs font-bold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                id="adminEmail"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@brightfuture.com"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="adminPassword" className="block text-xs font-bold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                id="adminPassword"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 shadow-lg shadow-blue-800/25 transition-all duration-200 flex items-center justify-center gap-2 uppercase tracking-wider disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Admin Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center">
          <a
            href="/"
            className="text-xs text-slate-500 hover:text-slate-900 transition-colors"
          >
            ← Back to Public Website
          </a>
        </div>

      </div>
    </div>
  );
}

