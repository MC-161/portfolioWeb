import { useEffect, useState } from 'react';
import { rng, useLive } from './useLive';

const JOBS = 24;
const TICK = 260;

type Owner = 'A' | 'B' | null;

// Two scheduler instances pull due jobs from one table. SKIP LOCKED means a row
// one instance holds is invisible to the other, so no job is ever claimed twice.
export default function JobClaim() {
  const { ref, live, reduced } = useLive<HTMLDivElement>();
  const finished = (): Owner[] => Array.from({ length: JOBS }, (_, i) => (i % 2 ? 'B' : 'A'));
  const [owners, setOwners] = useState<Owner[]>(() => (reduced ? finished() : Array(JOBS).fill(null)));
  const [locked, setLocked] = useState<number[]>([]);
  const [round, setRound] = useState(1);

  useEffect(() => {
    if (!live) return;
    const r = rng(round * 31);
    let state: Owner[] = Array(JOBS).fill(null);
    setOwners(state);
    let holdTicks = 0;
    const id = window.setInterval(() => {
      const free = state.map((o, i) => (o ? -1 : i)).filter((i) => i >= 0);
      if (free.length === 0) {
        setLocked([]);
        if (++holdTicks > 8) { window.clearInterval(id); setRound((n) => n + 1); }
        return;
      }
      // Both instances ask for the next due job at the same moment.
      const first: Owner = r() < 0.5 ? 'A' : 'B';
      const second: Owner = first === 'A' ? 'B' : 'A';
      const a = free[0];
      const b = free[1];                      // the other row: SKIP LOCKED passes over `a`
      const next = state.slice();
      next[a] = first;
      if (b !== undefined) next[b] = second;
      state = next;
      setLocked([a, b].filter((x) => x !== undefined) as number[]);
      setOwners(next);
    }, TICK);
    return () => window.clearInterval(id);
  }, [live, round]);

  const count = (o: Owner) => owners.filter((x) => x === o).length;

  return (
    <div className="demo" ref={ref} aria-label="Animation: two scheduler instances claim jobs from one table without ever claiming the same job">
      <div className="demo__bar">
        <span>SELECT … FOR UPDATE SKIP LOCKED</span>
        <span className="demo__clock">each job claimed once</span>
      </div>
      <div className="jobs">
        {owners.map((o, i) => (
          <span
            key={i}
            className={`job ${o ? `job--${o}` : ''} ${locked.includes(i) ? 'job--locked' : ''}`}
            title={o ? `job ${i + 1}: instance ${o}` : `job ${i + 1}: due`}
          >
            {o ?? ''}
          </span>
        ))}
      </div>
      <div className="jobs__legend">
        <span><i className="job job--A" />instance A · {count('A')}</span>
        <span><i className="job job--B" />instance B · {count('B')}</span>
      </div>
      <p className="demo__foot"><strong>The claim model being built:</strong> rows one instance holds are skipped by the other, so no job is taken twice.</p>
    </div>
  );
}
