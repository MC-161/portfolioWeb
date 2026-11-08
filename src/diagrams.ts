import type { Diagram } from './components/Architecture';

// System diagrams, one per project. Coordinates are in a 640 × 340 box.

export const LIFTSTORE: Diagram = {
  title: 'liftstore architecture',
  nodes: [
    { id: 'web', x: 0, y: 141, w: 118, label: 'Weak Link', sub: 'web app' },
    { id: 'api', x: 174, y: 141, w: 118, label: 'Go API', sub: 'HTTP, validation' },
    { id: 'eng', x: 348, y: 141, w: 118, label: 'C++ engine', sub: 'own process', tone: 'loud' },
    { id: 'cols', x: 522, y: 141, w: 118, label: 'Columns', sub: '4M rows in RAM', tone: 'store' },
    { id: 'csv', x: 522, y: 14, w: 118, label: 'Lift results', sub: '786 MB CSV', tone: 'store' },
    { id: 'ref', x: 348, y: 268, w: 118, label: 'Row-store copy', sub: 'checks results', tone: 'ghost' },
  ],
  edges: [
    { from: 'web', to: 'api', label: 'request', ly: -9 },
    { from: 'api', to: 'eng', label: 'gRPC', ly: -9 },
    { from: 'eng', to: 'cols', label: 'scan', ly: -9 },
    { from: 'csv', to: 'cols', label: 'load once', lx: 38, ly: 4 },
    { from: 'ref', to: 'eng', dashed: true, label: 'differential tests', lx: 64, ly: 4 },
  ],
  route: ['web', 'api', 'eng', 'cols', 'eng', 'api', 'web'],
  note: 'The engine runs as its own gRPC service, not through cgo, so if it fails one endpoint degrades and the API stays up.',
};

export const RISKWATCH: Diagram = {
  title: 'Risk Watch architecture',
  nodes: [
    { id: 'web', x: 0, y: 141, w: 118, label: 'React app', sub: 'Vercel' },
    { id: 'api', x: 174, y: 22, w: 118, label: 'FastAPI', sub: 'REST, auth' },
    { id: 'q', x: 348, y: 22, w: 118, label: 'Celery', sub: 'long jobs' },
    { id: 'eng', x: 522, y: 22, w: 118, label: 'C++ engine', sub: 'pybind11', tone: 'loud' },
    { id: 'db', x: 174, y: 141, w: 118, label: 'TimescaleDB', sub: 'daily + 1-min prices', tone: 'store' },
    { id: 'rs', x: 348, y: 141, w: 118, label: 'Redis Streams', sub: 'one per user', tone: 'store' },
    { id: 'ws', x: 348, y: 262, w: 118, label: 'Go gateway', sub: 'WebSocket' },
  ],
  edges: [
    { from: 'web', to: 'api', label: 'run job', lx: -30, ly: 0 },
    { from: 'api', to: 'q', label: 'enqueue', ly: -9 },
    { from: 'q', to: 'eng', label: 'simulate', ly: -9 },
    { from: 'api', to: 'db', label: 'prices', lx: 26, ly: 4 },
    { from: 'q', to: 'rs', label: 'progress', lx: 32, ly: 4 },
    { from: 'rs', to: 'ws', label: 'results', lx: 30, ly: 4 },
    { from: 'ws', to: 'web', label: 'live push', lx: -10, ly: 20 },
  ],
  route: ['web', 'api', 'q', 'eng', 'q', 'rs', 'ws', 'web'],
  note: 'Long jobs never block the API: workers report back through per-user Redis Streams to a Go WebSocket gateway.',
};

export const PRICEWATCH: Diagram = {
  title: 'Price Watch architecture',
  nodes: [
    { id: 'a', x: 8, y: 30, label: 'Scheduler A' },
    { id: 'b', x: 8, y: 252, label: 'Scheduler B' },
    { id: 'pg', x: 200, y: 128, w: 150, h: 84, label: 'PostgreSQL', sub: 'jobs + outbox, one txn', tone: 'loud' },
    { id: 'src', x: 470, y: 30, w: 160, label: 'Price sources', sub: 'retailer APIs' },
    { id: 'disp', x: 470, y: 141, w: 160, label: 'Outbox dispatcher', sub: 'idempotent' },
    { id: 'out', x: 470, y: 252, w: 160, label: 'Alerts', sub: 'email, push', tone: 'store' },
  ],
  edges: [
    { from: 'a', to: 'pg', label: 'SKIP LOCKED', lx: -8, ly: -10 },
    { from: 'b', to: 'pg', label: 'SKIP LOCKED', lx: -8, ly: 20 },
    { from: 'pg', to: 'src', label: 'fetch', ly: -10 },
    { from: 'pg', to: 'disp', label: 'outbox rows' },
    { from: 'disp', to: 'out', label: 'send once', lx: 40, ly: 0 },
  ],
  route: ['a', 'pg', 'src', 'pg', 'disp', 'out'],
  route2: ['b', 'pg', 'src', 'pg'],
  note: 'The design being built: each instance only sees rows nobody else has locked, and the alert is written in the same transaction as the price, so it is never lost or sent twice.',
};

export const FLOOR: Diagram = {
  title: 'Trading Floor architecture',
  nodes: [
    { id: 't1', x: 0, y: 22, w: 96, label: 'Trader' },
    { id: 't2', x: 0, y: 141, w: 96, label: 'Trader' },
    { id: 't3', x: 0, y: 260, w: 96, label: 'Trader' },
    { id: 'gw', x: 156, y: 141, w: 120, label: 'Go gateway', sub: 'WebSocket' },
    { id: 'me', x: 330, y: 141, w: 136, label: 'Matching engine', sub: 'price-time priority', tone: 'loud' },
    { id: 'log', x: 520, y: 141, w: 120, label: 'Event log', sub: 'append-only', tone: 'store' },
    { id: 'rp', x: 338, y: 266, w: 120, label: 'Replay', sub: 'from any seq', tone: 'ghost' },
  ],
  edges: [
    { from: 't1', to: 'gw' },
    { from: 't2', to: 'gw', label: 'orders', ly: -9 },
    { from: 't3', to: 'gw' },
    { from: 'gw', to: 'me', label: 'in order', ly: -9 },
    { from: 'me', to: 'log', label: 'events', ly: -9 },
    { from: 'log', to: 'rp', dashed: true, label: 'read', lx: 24, ly: 10 },
    { from: 'rp', to: 'gw', dashed: true, label: 'reconnect', lx: -34, ly: 14 },
  ],
  route: ['t1', 'gw', 'me', 'log'],
  route2: ['t3', 'gw', 'me', 'gw', 't2'],
  note: 'Every order becomes an event in one log, so any session replays byte for byte and a reconnecting client recovers exactly where it left off.',
};

// A sanitised sketch of the pattern, not American Express's real system.
export const AMEX: Diagram = {
  title: 'Migration pattern at American Express',
  nodes: [
    { id: 'c', x: 0, y: 141, w: 112, label: '5 consumers', sub: 'downstream' },
    { id: 'v', x: 180, y: 141, w: 126, label: 'Versioned API', sub: '12 REST/SOAP endpoints' },
    { id: 'j', x: 356, y: 30, w: 132, label: 'Java / Spring', sub: 'being retired', tone: 'ghost' },
    { id: 'g', x: 356, y: 252, w: 124, label: 'Go services', sub: 'migrated routes', tone: 'loud' },
    { id: 'd', x: 532, y: 252, w: 108, label: 'PostgreSQL', sub: '+ Redis lookups', tone: 'store' },
  ],
  edges: [
    { from: 'c', to: 'v', label: 'v1 API', ly: -9 },
    { from: 'v', to: 'j', dashed: true, label: 'not yet moved', lx: -34, ly: -2 },
    { from: 'v', to: 'g', label: 'moved', lx: -22, ly: 10 },
    { from: 'g', to: 'd', label: '5 reads to 2', ly: 22 },
  ],
  route: ['c', 'v', 'g', 'd', 'g', 'v', 'c'],
  note: 'A sketch of the pattern, not the real system: consumers keep calling the same versioned contracts while routes move from Java to Go behind them, so nothing downstream breaks mid-migration.',
};
