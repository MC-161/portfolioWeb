import { useEffect, useRef, useState } from 'react';

// Runs a demo only while it is on screen, and never for people who ask for
// reduced motion (they get the finished state instead).
export function useLive<T extends Element>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  const [reduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, live: visible && !reduced, reduced };
}

// Small seeded RNG so every replay looks plausible but varied.
export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
