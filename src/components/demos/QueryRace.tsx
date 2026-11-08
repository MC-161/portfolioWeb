import { useEffect, useState } from 'react';
import { useLive } from './useLive';

const ROW_MS = 104.9;
const COL_MS = 5.2;
const SLOWDOWN = 24;          // 1 ms of query time = 24 ms on screen
const HOLD = 2200;            // pause on the result before replaying

// The same query run against both storage layouts, slowed down so you can see it.
export default function QueryRace() {
  const { ref, live, reduced } = useLive<HTMLDivElement>();
  const [t, setT] = useState(reduced ? ROW_MS : 0);   // simulated ms elapsed

  useEffect(() => {
    if (!live) return;
    let raf = 0;
    let start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const sim = elapsed / SLOWDOWN;
      if (sim > ROW_MS + HOLD / SLOWDOWN) start = now;
      setT(Math.min(ROW_MS, sim));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [live]);

  const lanes = [
    { name: 'Row store', total: ROW_MS, win: false },
    { name: 'Columnar', total: COL_MS, win: true },
  ];

  return (
    <div className="demo race" ref={ref} aria-label="Animation: the same query on a row store takes 104.9 ms and on the columnar engine 5.2 ms">
      <div className="demo__bar">
        <span>top 10 by total, 4,032,180 rows</span>
        <span className="demo__clock">{t.toFixed(1)} ms</span>
      </div>
      <div className="race__lanes">
        {lanes.map((l) => {
          const done = t >= l.total;
          const pct = Math.min(1, t / l.total) * 100;
          return (
            <div className="race__lane" key={l.name}>
              <div className="race__label">
                <span>{l.name}</span>
                <span className={done ? (l.win ? 'race__done race__done--win' : 'race__done') : 'race__run'}>
                  {done ? `${l.total} ms` : 'scanning'}
                </span>
              </div>
              <div className="race__track">
                <div className={`race__fill ${l.win ? 'race__fill--win' : ''}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
      <p className="demo__foot">
        <strong>20× faster</strong> at half the memory (1.49 GB vs 3.07 GB). Shown at 1/24 speed.
      </p>
    </div>
  );
}
