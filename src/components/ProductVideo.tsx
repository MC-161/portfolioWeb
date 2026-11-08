import { useEffect, useRef, useState } from 'react';

interface Props {
  src: string;
  poster: string;
  address: string;
  label: string;
}

// A product walkthrough in a glass browser frame. It plays only while on
// screen, never autoplays for people who ask for reduced motion, and can be paused.
export default function ProductVideo({ src, poster, address, label }: Props) {
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(true);
  const [userPaused, setUserPaused] = useState(false);
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !reduced && !userPaused) v.play().catch(() => setPaused(true));
      else v.pause();
    }, { threshold: 0.35 });
    io.observe(v);
    return () => io.disconnect();
  }, [reduced, userPaused]);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) { setUserPaused(false); v.play().catch(() => undefined); }
    else { setUserPaused(true); v.pause(); }
  };

  return (
    <figure className="browser">
      <div className="browser__bar">
        <span className="browser__addr">{address}</span>
      </div>
      <div className="browser__screen">
        <video
          ref={video}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
        />
        <button type="button" className="browser__toggle" onClick={toggle} aria-label={paused ? 'Play demo' : 'Pause demo'}>
          {paused
            ? <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11l9-5.5z" /></svg>
            : <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" /></svg>}
        </button>
      </div>
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  );
}
