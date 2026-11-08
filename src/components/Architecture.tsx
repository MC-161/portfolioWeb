import { useState } from 'react';

export interface Node { id: string; x: number; y: number; w?: number; h?: number; label: string; sub?: string; tone?: 'loud' | 'store' | 'ghost' }
export interface Edge { from: string; to: string; label?: string; dashed?: boolean; lx?: number; ly?: number }
export interface Diagram { title: string; nodes: Node[]; edges: Edge[]; route: string[]; route2?: string[]; note: string }

const W = 128, H = 58;

const box = (n: Node) => ({ w: n.w ?? W, h: n.h ?? H });
const centre = (n: Node) => { const { w, h } = box(n); return { x: n.x + w / 2, y: n.y + h / 2 }; };

// Where the line from a node's centre towards a point leaves its rectangle.
function exit(n: Node, toward: { x: number; y: number }, pad = 4) {
  const c = centre(n);
  const { w, h } = box(n);
  const dx = toward.x - c.x, dy = toward.y - c.y;
  const sx = dx === 0 ? Infinity : (w / 2 + pad) / Math.abs(dx);
  const sy = dy === 0 ? Infinity : (h / 2 + pad) / Math.abs(dy);
  const s = Math.min(sx, sy);
  return { x: c.x + dx * s, y: c.y + dy * s };
}

export default function Architecture({ d, id }: { d: Diagram; id: string }) {
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const byId = Object.fromEntries(d.nodes.map((n) => [n.id, n]));
  const routePath = (r: string[]) => 'M' + r.map((k) => { const c = centre(byId[k]); return `${c.x} ${c.y}`; }).join(' L');

  return (
    <figure className="arch">
      <div className="arch__scroll">
      <svg viewBox="0 0 640 340" className="arch__svg" role="img" aria-label={`${d.title}. ${d.note}`}>
        <defs>
          <marker id={`ah-${id}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" className="arch__head" />
          </marker>
        </defs>

        {d.edges.map((e, i) => {
          const a = byId[e.from], b = byId[e.to];
          const p1 = exit(a, centre(b)), p2 = exit(b, centre(a));
          const mx = (p1.x + p2.x) / 2 + (e.lx ?? 0), my = (p1.y + p2.y) / 2 + (e.ly ?? -7);
          return (
            <g key={i}>
              <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} className={`arch__edge ${e.dashed ? 'arch__edge--dashed' : ''}`} markerEnd={`url(#ah-${id})`} />
              {e.label && <text x={mx} y={my} className="arch__elabel" textAnchor="middle">{e.label}</text>}
            </g>
          );
        })}

        {!reduced && (
          <>
            <circle r="5" className="arch__packet">
              <animateMotion dur="7s" repeatCount="indefinite" path={routePath(d.route)} />
            </circle>
            {d.route2 && (
              <circle r="4" className="arch__packet arch__packet--2" opacity="0">
                <set attributeName="opacity" to="1" begin="3.5s" />
                <animateMotion dur="7s" begin="3.5s" repeatCount="indefinite" path={routePath(d.route2)} />
              </circle>
            )}
          </>
        )}

        {d.nodes.map((n) => {
          const { w, h } = box(n);
          return (
            <g key={n.id} className={`arch__node arch__node--${n.tone ?? 'plain'}`}>
              <rect x={n.x} y={n.y} width={w} height={h} rx="10" />
              <text x={n.x + w / 2} y={n.y + (n.sub ? h / 2 - 3 : h / 2 + 5)} textAnchor="middle" className="arch__label">{n.label}</text>
              {n.sub && <text x={n.x + w / 2} y={n.y + h / 2 + 14} textAnchor="middle" className="arch__sub">{n.sub}</text>}
            </g>
          );
        })}
      </svg>
      </div>
      <figcaption className="arch__note">{d.note}</figcaption>
    </figure>
  );
}
