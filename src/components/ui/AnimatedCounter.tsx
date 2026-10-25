'use client';

import { useInView, animate } from 'motion/react';
import { useEffect, useRef } from 'react';

type Props = {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
};

export default function AnimatedCounter({ value, suffix = '', prefix = '', duration = 1.5 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate(v) {
        if (ref.current) ref.current.textContent = prefix + Math.round(v).toLocaleString('he-IL') + suffix;
      },
    });
    return controls.stop;
  }, [inView, value, suffix, prefix, duration]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}
