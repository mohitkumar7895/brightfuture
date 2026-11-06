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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const alignClasses = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div
      ref={ref}
      className={`space-y-2.5 transition-all duration-700 ease-out ${alignClasses} ${className}`}
    >
      {/* Badge with Entrance Slide */}
      {badge && (
        <div
          className={`transition-all duration-700 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          {badge}
        </div>
      )}

      {/* Main Heading with Staggered Entrance Slide */}
      <div
        className={`transition-all duration-800 delay-100 ease-out ${
          isVisible
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-6 scale-98'
        }`}
      >
        {title}
      </div>

      {/* Subtitle with Final Entrance Slide */}
      {subtitle && (
        <div
          className={`transition-all duration-700 delay-200 ease-out ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}

