import { useEffect, useState } from 'react';

interface Line { kind: 'cmd' | 'out'; text: string }

// What each of my systems prints when it does its job. Ids and sequence
// numbers advance on every loop so the log reads as live.
function script(n: number): Line[] {
  const seq = String(412 + n * 17).padStart(5, '0');
  return [
    { kind: 'cmd', text: 'liftstore top10 --sex F --equipment raw --event SBD' },
    { kind: 'out', text: 'scanned 4,032,180 rows in 5.2 ms' },
    { kind: 'cmd', text: 'ghz -c 50 -n 30000 liftstore:50051' },
    { kind: 'out', text: '1,016 req/s   p99 135 ms   0 errors' },
    { kind: 'cmd', text: 'riskwatch simulate --paths 10000' },
    { kind: 'out', text: 'done in 0.41 s, checked against SciPy to 1e-6' },
    { kind: 'cmd', text: 'floor match --book LIFT' },
    { kind: 'out', text: `BUY 14 @ 100.05   seq ${seq}   replayable` },
  ];
}

const KEEP = 9;
const CHAR_MS = 22;
const OUT_DELAY = 260;
const LINE_GAP = 700;

export default function Terminal() {
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [done, setDone] = useState<Line[]>(() => (reduced ? script(0) : []));
  const [typing, setTyping] = useState<Line | null>(null);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    let timer = 0;
    let loop = 0;
    let i = 0;
    let lines = script(0);

    const next = () => {
      if (cancelled) return;
      if (i >= lines.length) { loop += 1; i = 0; lines = script(loop); }
      const line = lines[i++];
      if (line.kind === 'out') {
        timer = window.setTimeout(() => {
          setDone((d) => [...d, line].slice(-KEEP));
          timer = window.setTimeout(next, LINE_GAP);
        }, OUT_DELAY);
        return;
      }
      setTyping(line);
      let c = 0;
      const type = () => {
        if (cancelled) return;
        c += 1;
        setChars(c);
        if (c < line.text.length) { timer = window.setTimeout(type, CHAR_MS); return; }
        timer = window.setTimeout(() => {
          setTyping(null);
          setChars(0);
          setDone((d) => [...d, line].slice(-KEEP));
          next();
        }, 120);
      };
      timer = window.setTimeout(type, 200);
    };
    timer = window.setTimeout(next, 900);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [reduced]);

  return (
    <div className="term" aria-label="A terminal showing output from my projects">
      <div className="term__bar">
        <span className="term__live" aria-hidden="true" />
        <span>mahfuz@systems</span>
        <span className="term__dim">4 services</span>
      </div>
      <div className="term__body" aria-hidden="true">
        {done.map((l, i) => (
          <p key={`${i}-${l.text}`} className={`term__line term__line--${l.kind}`}>
            {l.kind === 'cmd' && <span className="term__prompt">$ </span>}{l.text}
          </p>
        ))}
        {typing && (
          <p className="term__line term__line--cmd">
            <span className="term__prompt">$ </span>{typing.text.slice(0, chars)}<span className="term__caret" />
          </p>
        )}
        {!typing && <p className="term__line term__line--cmd"><span className="term__prompt">$ </span><span className="term__caret" /></p>}
      </div>
    </div>
  );
}
