import { useEffect, useRef, useState } from 'react';
import { rng, useLive } from './useLive';

const PATHS = 140;
const STEPS = 120;
const DRAW_MS = 2600;
const HOLD_MS = 2400;

function simulate(seed: number) {
  const r = rng(seed);
  const normal = () => {
    const u = Math.max(r(), 1e-9);
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r());
  };
  const paths: number[][] = [];
  for (let p = 0; p < PATHS; p++) {
    let v = 100;
    const path = [v];
    for (let s = 1; s <= STEPS; s++) {
      v *= Math.exp(0.0002 + 0.012 * normal());
      path.push(v);
    }
    paths.push(path);
  }
  const finals = paths.map((p) => p[STEPS]).sort((a, b) => a - b);
  const var95 = finals[Math.floor(PATHS * 0.05)];
  return { paths, var95 };
}

// Portfolio value paths fanning out, then the 5th-percentile outcome marked as the 95% VaR.
export default function MonteCarlo() {
  const { ref, live, reduced } = useLive<HTMLDivElement>();
  const canvas = useRef<HTMLCanvasElement>(null);
  const [run, setRun] = useState(1);
  const [lossPct, setLossPct] = useState<string | null>(null);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = c.clientWidth, h = c.clientHeight;
    c.width = w * dpr; c.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const { paths, var95 } = simulate(run * 7919);
    const all = paths.flat();
    const lo = Math.min(...all) * 0.98, hi = Math.max(...all) * 1.02;
    const x = (i: number) => (i / STEPS) * (w - 8) + 4;
    const y = (v: number) => h - ((v - lo) / (hi - lo)) * (h - 8) - 4;
    const css = getComputedStyle(c);
    const accent = css.getPropertyValue('--loud').trim() || '#3D5CFF';
    const line = css.getPropertyValue('--bone').trim() || '#E9E6DF';

    const draw = (upto: number, showVar: boolean) => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(255,255,255,.06)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, y(100)); ctx.lineTo(w, y(100)); ctx.stroke();

      ctx.globalAlpha = 0.16;
      ctx.strokeStyle = line;
      for (const p of paths) {
        ctx.beginPath();
        ctx.moveTo(x(0), y(p[0]));
        for (let s = 1; s <= upto; s++) ctx.lineTo(x(s), y(p[s]));
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      if (showVar) {
        ctx.strokeStyle = accent;
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 5]);
        ctx.beginPath(); ctx.moveTo(0, y(var95)); ctx.lineTo(w, y(var95)); ctx.stroke();
        ctx.setLineDash([]);
      }
    };

    const loss = ((100 - var95) / 100 * 100).toFixed(1);
    if (!live) {
      draw(STEPS, true);
      setLossPct(loss);
      return;
    }
    setLossPct(null);
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const e = now - start;
      const upto = Math.min(STEPS, Math.floor((e / DRAW_MS) * STEPS));
      draw(upto, upto >= STEPS);
      if (upto >= STEPS) setLossPct(loss);
      if (e > DRAW_MS + HOLD_MS) { setRun((r) => r + 1); return; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [live, run, reduced]);

  return (
    <div className="demo" ref={ref} aria-label="Animation: Monte Carlo simulation of portfolio value paths with the 95% value-at-risk marked">
      <div className="demo__bar">
        <span>Monte Carlo, {PATHS} of 10,000 paths</span>
        <span className="demo__clock">{lossPct ? `95% VaR ${lossPct}%` : 'simulating'}</span>
      </div>
      <canvas ref={canvas} className="mc__canvas" />
      <p className="demo__foot"><strong>10,000 paths in 0.41 s</strong> in the C++ engine, 50+ metrics checked against NumPy/SciPy.</p>
    </div>
  );
}
