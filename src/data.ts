// All copy here mirrors the CV. Edit this file to update the site.

export const PROFILE = {
  name: 'Mahfuz Chowdhury',
  role: 'Graduate software engineer',
  focus: 'I build backend and distributed systems in Go, Java, C++ and Python, and I like proving they work: benchmarks, race reproductions, tests against real databases.',
  facts: [
    'First Class BSc Computer Science, City, University of London',
    'Software engineer intern at American Express, 2025',
    'Graduated 2026, available now for graduate roles in London',
  ],
  email: 'mahfuzcswe@gmail.com',
  github: 'https://github.com/MC-161',
  linkedin: 'https://linkedin.com/in/mahfuzcswe',
  cv: '/Mahfuz_Chowdhury_CV.pdf',
};

export interface Role {
  company: string;
  title: string;
  period: string;
  place: string;
  stack: string[];
  points: string[];
}

export const EXPERIENCE: Role[] = [
  {
    company: 'American Express',
    title: 'Software engineer intern',
    period: 'Jun – Aug 2025',
    place: 'Burgess Hill, Sussex',
    stack: ['Go', 'Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'Kafka', 'Nginx', 'Kubernetes'],
    points: [
      'Built Go services into a live transaction processor during its Java/Spring Boot-to-Go migration, keeping 5 downstream consumers running with versioned contracts on 12 REST/SOAP endpoints.',
      'Co-built the team’s developer hub and event-tracing app, adopted by 10 of 12 engineering teams. Tracing a partner transaction from one ID cut diagnosis from 10–20 minutes to seconds.',
      'Gave 3 product-owner teams self-serve payment data through a Kafka consumer (10,000+ events a day) and a React dashboard.',
      'Cut sub-event reads from 5 queries per transaction to 2 using SQL joins and Redis hot lookups.',
      'Presented the migration and observability work to an SVP and 3 directors across the UK and US.',
      'Reviewed teammates’ pull requests and checked every AI-generated test before merge, rewriting assertions that missed real cases.',
      'Fixed a reverse-proxy failure blocking the tracing app in staging with environment-aware Nginx and Go routing.',
    ],
  },
  {
    company: 'DotPlot / Tech Academia',
    title: 'Software engineering pathway',
    period: 'Jul – Aug 2024',
    place: 'Remote',
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    points: [
      'Won 1st place of 7 teams leading a team of 4 to build Sonomon, a patient-management and breast-scan visualisation app, deployed 24 hours early.',
      'Cut page load from 6.9s to 1.9s by lazy-loading scans and 3D models.',
    ],
  },
];

export interface Project {
  name: string;
  kind: string;
  period: string;
  stack: string[];
  points: string[];
  repo?: string;
  status?: string;
  live?: string;
  note?: string;
}

export const FEATURED: Project = {
  name: 'Powerlifting analytics engine',
  kind: 'C++ columnar engine behind the Weak Link app',
  period: '2026',
  stack: ['C++20', 'Go', 'gRPC', 'Google Benchmark'],
  points: [
    'Answers a question ranking sites can’t precompute: where does your bench sit among lifters who squat what you squat? That’s a full scan of 4 million results per query.',
    'Runs as a standalone gRPC service behind a Go API rather than through cgo, so an engine failure degrades one endpoint, not the whole API. Results are checked against an independent row-oriented implementation.',
  ],
  repo: 'https://github.com/MC-161/liftstore',
  live: 'https://weak-link.vercel.app',
  note: 'liftstore',
};

export const BENCH = [
  { label: 'Query time', unit: 'ms', row: 104.9, col: 5.2 },
  { label: 'Peak memory', unit: 'GB', row: 3.07, col: 1.49 },
];

export const PROJECTS: Project[] = [
  {
    name: 'Risk Watch',
    kind: 'Portfolio risk platform, final-year project',
    period: '2025 – 2026',
    stack: ['C++17', 'Python', 'FastAPI', 'Go', 'Redis', 'TimescaleDB', 'React'],
    points: [
      'C++17 risk engine behind pybind11 runs a 10,000-path Monte Carlo in 0.41s, with 50+ metrics verified against NumPy/SciPy to 1e-6.',
      'Long jobs run on Celery workers and report back through per-user Redis Streams to a rate-limited Go WebSocket gateway, so the API never blocks.',
      'Deployed on Northflank and Vercel with GitHub Actions CI/CD; diagnosed and fixed a production job-queue failure caused by Redis tier limits.',
    ],
    repo: 'https://github.com/MC-161/riskwatch-public',
    live: 'https://riskwatch1.vercel.app',
    note: 'riskwatch',
  },
  {
    name: 'Price Watch',
    kind: 'Distributed price monitoring and alerting',
    period: '2026',
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Testcontainers'],
    points: [
      'Built so far: the poll loop, exact money (BigDecimal to NUMERIC, never floats), and parse failures stored as errors rather than a £0 price, with integration tests on real PostgreSQL via Testcontainers.',
      'Next: SELECT FOR UPDATE SKIP LOCKED claiming with leases so many instances never poll the same target, and a transactional outbox so an alert is never lost or sent twice.',
    ],
    repo: 'https://github.com/MC-161/priceWatch',
    status: 'In progress',
  },
  {
    name: 'Trading Floor',
    kind: 'Real-time multiplayer exchange',
    period: '2026',
    stack: ['Go', 'WebSocket', 'TypeScript'],
    points: [
      'Users trade live against one shared order book; a Go price–time priority matching engine sequences concurrent orders by arrival.',
      'Event-sourced, so any session replays byte-for-byte and reconnecting clients recover exactly.',
    ],
    status: 'In progress',
  },
];

export const EARLIER: { name: string; note: string; repo: string }[] = [
  { name: 'Sonomon', note: 'Hackathon winner, patient management with 3D scan viewing', repo: 'https://github.com/MC-161/DotPlot_App' },
  { name: 'HoopsInsight', note: 'NBA player and team analytics dashboards', repo: 'https://github.com/MC-161/HoopsInsight' },
  { name: 'StageOps', note: 'Venue operations software in Spring Boot', repo: 'https://github.com/MC-161/StageOps' },
];

export const OPEN_SOURCE = {
  repo: 'formancehq/ledger',
  url: 'https://github.com/formancehq/ledger/pull/1988',
  pr: 1988,
  what: 'Programmable double-entry financial ledger in Go',
  before: 2580,
  after: 287,
  points: [
    'Found that chart-of-accounts matching recompiled a regex on every posting, and replaced it with a bounded cache: 62 allocations per op down to 4, measured with benchstat over 6 runs.',
    'Reworked it through two rounds of maintainer review: kept exact JSON round-trip equality, switched the cache to LRU and cut its bound from 4,096 to 512.',
    'The lead maintainer closed it unmerged: the saving was a few microseconds next to a database round trip, not enough to justify a process-wide cache. The lesson I took: profile the whole request before optimising one part.',
  ],
};

export const SKILLS: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['Java', 'Go', 'Python', 'SQL', 'TypeScript', 'JavaScript', 'C++', 'C', 'Bash'] },
  { group: 'Frameworks and tools', items: ['Spring Boot', 'JUnit', 'Testcontainers', 'FastAPI', 'Celery', 'React', 'gRPC', 'pybind11'] },
  { group: 'Data and messaging', items: ['PostgreSQL', 'TimescaleDB', 'Redis', 'Kafka', 'MongoDB'] },
  { group: 'Infrastructure', items: ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'Nginx', 'Linux', 'Maven', 'CMake'] },
];

export const OFF_KEYBOARD = 'Off the keyboard: powerlifting at university meets, parkrun on Saturdays, basketball and badminton.';
