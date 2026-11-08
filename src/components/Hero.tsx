import { useEffect, useRef } from 'react';
import { PROFILE } from '../data';
import { trackCv } from '../track';
import Terminal from './Terminal';

// Glass readouts around the terminal. Every number is from the CV.
function QueryWidget() {
  return (
    <div className="glass w w--query" style={{ '--d': 18 } as React.CSSProperties}>
      <p className="w__label">Query time, 4M rows</p>
      <div className="w__bars">
        <div className="w__barrow"><span>Row store</span><b>104.9 ms</b></div>
        <div className="w__track"><i style={{ width: '100%' }} className="w__fill w__fill--slow" /></div>
        <div className="w__barrow"><span>Columnar</span><b className="w__win">5.2 ms</b></div>
        <div className="w__track"><i style={{ width: '5%' }} className="w__fill" /></div>
      </div>
      <p className="w__note">20× faster, half the memory</p>
    </div>
  );
}

function AdoptionWidget() {
  const r = 38;
  const c = 2 * Math.PI * r;
  return (
    <div className="glass w w--ring" style={{ '--d': 30 } as React.CSSProperties}>
      <svg viewBox="0 0 100 100" className="ring" aria-hidden="true">
        <circle cx="50" cy="50" r="46" className="ring__ticks" />
        <circle cx="50" cy="50" r={r} className="ring__base" />
        <circle cx="50" cy="50" r={r} className="ring__val" strokeDasharray={`${c * (10 / 12)} ${c}`} />
      </svg>
      <div className="ring__text">
        <b>10/12</b>
        <span>teams</span>
      </div>
      <p className="w__note w__note--center">adopted the tracing app I co-built at American Express</p>
    </div>
  );
}

function AllocWidget() {
  return (
    <div className="glass w w--alloc" style={{ '--d': 22 } as React.CSSProperties}>
      <p className="w__label">Allocations per op</p>
      <p className="w__big"><s>62</s> 4</p>
      <div className="w__spark" aria-hidden="true">
        {[62, 62, 61, 62, 4, 4, 4, 4].map((v, i) => (
          <i key={i} style={{ height: `${(v / 62) * 100}%` }} className={v < 10 ? 'is-low' : ''} />
        ))}
      </div>
      <p className="w__note">formance/ledger #1988</p>
    </div>
  );
}

function LoadWidget() {
  return (
    <div className="glass w w--claim" style={{ '--d': 34 } as React.CSSProperties}>
      <p className="w__label">Errors under load</p>
      <p className="w__big">0</p>
      <div className="w__load" aria-hidden="true">
        <span><b>1,016</b> req/s</span>
        <span><b>135 ms</b> p99</span>
      </div>
      <p className="w__note">30,000 requests, 50 clients, liftstore gRPC</p>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Widgets drift a little with the pointer, each at its own depth.
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
        el.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
      });
    };
    el.addEventListener('pointermove', onMove);
    return () => { el.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <header className="hero" ref={ref}>
      <div className="hero__glow" aria-hidden="true" />
      <svg className="hero__arcs" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="arcA" x1="0" x2="1">
            <stop offset="0" stopColor="#3D5CFF" stopOpacity="0" />
            <stop offset=".35" stopColor="#3D5CFF" />
            <stop offset=".7" stopColor="#8EA2FF" />
            <stop offset="1" stopColor="#8EA2FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path className="arc arc--glow" d="M-80 860 C 260 840, 420 520, 700 420 S 1180 120, 1520 60" />
        <path className="arc" d="M-80 860 C 260 840, 420 520, 700 420 S 1180 120, 1520 60" />
        <path className="arc arc--thin" d="M-60 300 C 200 120, 520 80, 760 180 S 1220 520, 1500 470" />
      </svg>

      <div className="hero__stage">
        <svg className="links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M24 17 H28.5 L32 24" />
          <path d="M25 58 H28.5 L32 50" />
          <path d="M77 17 H71.5 L68 24" />
          <path d="M76 58 H71.5 L68 50" />
        </svg>
        <span className="dot" style={{ left: '32%', top: '24%' }} />
        <span className="dot" style={{ left: '32%', top: '50%' }} />
        <span className="dot" style={{ left: '68%', top: '24%' }} />
        <span className="dot" style={{ left: '68%', top: '50%' }} />

        <div className="hero__term" style={{ '--d': 8 } as React.CSSProperties}><Terminal /></div>
        <QueryWidget />
        <AdoptionWidget />
        <AllocWidget />
        <LoadWidget />
      </div>

      <h1 className="hero__name">
        <span className="hero__line">Mahfuz</span>
        <span className="hero__line hero__line--2">Chowdhury</span>
      </h1>

      <div className="hero__copy">
        <p className="hero__lede">Backend engineer. I build systems that hold up, and I measure them to prove it.</p>
        <p className="hero__facts">First Class CS, City, University of London, 2026. Software engineer intern at American Express, 2025.</p>
        <p className="hero__avail"><span className="hero__availdot" aria-hidden="true" />Available now for graduate backend roles in London</p>
        <div className="hero__actions">
          <a className="btn btn--loud" href={PROFILE.cv} download onClick={() => trackCv('hero')}>Download CV</a>
          <a className="btn btn--glass" href={`mailto:${PROFILE.email}`}>Email me</a>
          <a className="btn btn--glass" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </header>
  );
}
