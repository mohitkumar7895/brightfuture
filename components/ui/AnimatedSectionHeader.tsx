'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AnimatedSectionHeaderProps {
  badge?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'center' | 'left';
  className?: string;
}

export default function AnimatedSectionHeader({
  badge,
  title,
  subtitle,
  align = 'center',
  className = '',
}: AnimatedSectionHeaderProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Trigger subtle entrance
    setIsVisible(true);

    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.05 }
      );

      observer.observe(el);
      return () => observer.disconnect();
    }
  }, []);

  const alignClasses = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div
      ref={ref}
      className={`space-y-2.5 transition-all duration-500 ease-out ${alignClasses} ${className}`}
    >
      {/* Badge */}
      {badge && (
        <div className="transition-all duration-500 ease-out opacity-100 translate-y-0">
          {badge}
        </div>
      )}

      {/* Main Heading */}
      <div className="transition-all duration-500 ease-out opacity-100 translate-y-0">
        {title}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div className="transition-all duration-500 ease-out opacity-100 translate-y-0">
          {subtitle}
        </div>
      )}
    </div>
  );
}

