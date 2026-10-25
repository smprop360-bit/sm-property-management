'use client';

import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  reverse?: boolean;
  gap?: number;
  className?: string;
  fadeEdges?: boolean;
}

export function Marquee({
  children,
  speed = 40,
  pauseOnHover = true,
  reverse = false,
  gap = 24,
  className,
  fadeEdges = true,
}: MarqueeProps) {
  const duration = `${speed}s`;

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Edge fades */}
      {fadeEdges && (
        <>
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-current to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-linear-to-r from-current to-transparent" />
        </>
      )}

      <div
        className="flex w-max"
        style={{
          animation: `marquee-scroll ${duration} linear infinite${reverse ? ' reverse' : ''}`,
          gap: `${gap}px`,
          animationPlayState: 'running',
        }}
        onMouseEnter={pauseOnHover ? (e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused'; } : undefined}
        onMouseLeave={pauseOnHover ? (e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running'; } : undefined}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
