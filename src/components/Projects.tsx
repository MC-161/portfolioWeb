import { useState, type ReactNode } from 'react';
import { EARLIER, FEATURED, PROJECTS, type Project } from '../data';
import QueryRace from './demos/QueryRace';
import MonteCarlo from './demos/MonteCarlo';
import JobClaim from './demos/JobClaim';
import OrderBook from './demos/OrderBook';
import ProductVideo from './ProductVideo';
import Architecture from './Architecture';
import { FLOOR, LIFTSTORE, PRICEWATCH, RISKWATCH } from '../diagrams';

interface View { id: string; label: string; render: () => ReactNode }
interface Showcase { chip: string; views: View[] }

// What each project shows: the real product where there is one, how it is
// built, and a small live model of the core idea.
const SHOWCASE: Showcase[] = [
  {
    chip: '20× faster',
    views: [
      { id: 'demo', label: 'Product', render: () => <ProductVideo src="media/liftstore.mp4" poster="media/liftstore.jpg" address="weak-link.vercel.app" label="Walkthrough of Weak Link: enter your lifts, see which one is holding you back, and try what-if numbers, all answered by the liftstore engine." /> },
      { id: 'arch', label: 'Architecture', render: () => <Architecture d={LIFTSTORE} id="ls" /> },
      { id: 'bench', label: 'Benchmark', render: () => <QueryRace /> },
    ],
  },
  {
    chip: '10,000 paths in 0.41 s',
    views: [
      { id: 'demo', label: 'Product', render: () => <ProductVideo src="media/riskwatch.mp4" poster="media/riskwatch.jpg" address="riskwatch1.vercel.app" label="Walkthrough of Risk Watch: buying a stock in one tap, live prices, stress-testing a bad day, a 10,000-path Monte Carlo on the C++ engine in 0.41 s, cross-checked prices, the model grading itself, and candle-by-candle market replay." /> },
      { id: 'arch', label: 'Architecture', render: () => <Architecture d={RISKWATCH} id="rw" /> },
      { id: 'model', label: 'Monte Carlo', render: () => <MonteCarlo /> },
    ],
  },
  {
    chip: 'In progress',
    views: [
      { id: 'model', label: 'Claim design', render: () => <JobClaim /> },
      { id: 'arch', label: 'Architecture', render: () => <Architecture d={PRICEWATCH} id="pw" /> },
    ],
  },
  {
    chip: 'Replays byte for byte',
    views: [
      { id: 'model', label: 'Order book', render: () => <OrderBook /> },
      { id: 'arch', label: 'Architecture', render: () => <Architecture d={FLOOR} id="tf" /> },
    ],
  },
];

function Stage({ s, i, name }: { s: Showcase; i: number; name: string }) {
  const [active, setActive] = useState(s.views[0].id);
  const view = s.views.find((v) => v.id === active) ?? s.views[0];
  const base = `stage-${i}`;
  return (
    <div className={`stage stage--${i}`}>
      <div className="stage__top">
        <div className="tabs" role="tablist" aria-label={`${name}: what to show`}>
          {s.views.map((v) => (
            <button
              key={v.id}
              type="button"
              role="tab"
              id={`${base}-tab-${v.id}`}
              aria-selected={v.id === view.id}
              aria-controls={`${base}-panel`}
              className="tab"
              onClick={() => setActive(v.id)}
            >
              {v.label}
            </button>
          ))}
        </div>
        <span className="stage__chip">{s.chip}</span>
      </div>
      <div className="stage__panel" role="tabpanel" id={`${base}-panel`} aria-labelledby={`${base}-tab-${view.id}`} key={view.id}>
        {view.render()}
      </div>
    </div>
  );
}

function ProjectRow({ p, i }: { p: Project; i: number }) {
  return (
    <article className="project">
      <div className="project__text">
        <h3 className="project__name">{p.name}</h3>
        <p className="project__kind">{p.kind}, {p.period}</p>
        <ul className="project__points">
          {p.points.map((t) => <li key={t}>{t}</li>)}
        </ul>
        <p className="project__stack">{p.stack.join(' / ')}</p>
        <p className="project__links">
          {p.live && <a className="btn btn--loud btn--sm" href={p.live} target="_blank" rel="noreferrer">Try it live</a>}
          {p.note && <a className="link" href={`#notes-${p.note}`}>Read the write-up</a>}
          {p.repo
            ? <a className="link" href={p.repo} target="_blank" rel="noreferrer">Read the code</a>
            : <span className="project__status">{p.status}, code not public yet</span>}
        </p>
      </div>
      <Stage s={SHOWCASE[i]} i={i} name={p.name} />
    </article>
  );
}

export default function Projects() {
  const all = [FEATURED, ...PROJECTS];
  return (
    <>
      <div className="projects">
        {all.map((p, i) => <ProjectRow key={p.name} p={p} i={i} />)}
      </div>
      <div className="earlier">
        <h3 className="earlier__title">Earlier work</h3>
        <ul>
          {EARLIER.map((e) => (
            <li key={e.name}>
              <a className="link" href={e.repo} target="_blank" rel="noreferrer">{e.name}</a>
              <span>{e.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
