// Engineering write-ups. Every number here comes from the project's own
// benchmarks, tests or review thread; edit freely, but keep it that way.

export type Block =
  | { h: string }
  | { p: string }
  | { code: string }
  | { list: string[] }
  | { table: string[][] };

export interface Note {
  id: string;
  title: string;
  dek: string;
  project: string;
  link: { label: string; href: string };
  blocks: Block[];
}

export const NOTES: Note[] = [
  {
    id: 'liftstore',
    title: 'Twenty times faster while doing more work',
    dek: 'Rebuilding a query engine around memory, not instructions: 104.9 ms to 5.2 ms over 4 million rows.',
    project: 'liftstore',
    link: { label: 'liftstore on GitHub', href: 'https://github.com/MC-161/liftstore' },
    blocks: [
      { p: 'Ranking sites tell you where your bench press sits among all lifters. I wanted the more useful comparison: where it sits among lifters who squat what you squat. That finds your weak lift instead of measuring how long you have been training.' },
      { p: 'It cannot be precomputed. The condition is a runtime range over a different column, so every question is a full scan of 4,032,180 competition results. The goal was to answer it in single-digit milliseconds.' },

      { h: 'The first version' },
      { p: 'I started the obvious way: one struct per result, in a vector. Each struct was 528 bytes. A ranking query reads 4 of the 42 fields, but the CPU fetches memory in 64-byte cache lines, so most of every line it fetched was thrown away. The top-10 query took 104.9 ms.' },

      { h: 'Storing columns instead of rows' },
      { p: 'I switched to one contiguous array per field. Filtering now walks four small arrays instead of striding through 2.13 GB of mostly irrelevant struct. A few choices made the arrays smaller still:' },
      { list: [
        'Text columns are dictionary-encoded, 24 bytes per row down to 2.',
        'Missing numbers use a NaN sentinel instead of optional<float>: 4 bytes, not 8, and NaN compares false, so scans skip it without a branch.',
        'Dates are YYYYMMDD integers, so a date range stays an integer comparison.',
      ] },
      { p: 'The layout alone took the query from 107.6 ms to 78.6 ms, which is 1.4×. The bigger win came from the algorithm: a top 10 does not need a full sort, so partial_sort with a retry took it from 78.6 ms to 5.19 ms. Measuring the two changes separately mattered, because together they would have looked like one 20× layout win.' },

      { h: 'The number that surprised me' },
      { table: [
        ['', 'Row-oriented', 'Columnar'],
        ['Query', '101.7 ms', '5.2 ms'],
        ['Peak memory', '3.07 GB', '1.49 GB'],
        ['Instructions retired', '38.6 B', '41.3 B'],
      ] },
      { p: 'The fast version executes 7% more instructions and finishes twenty times sooner. It is not doing less work; it is waiting on memory far less. Judged on instruction counts alone, the rewrite looks like a regression.' },

      { h: 'Keeping the comparison honest' },
      { p: 'The row-oriented engine is still in the repo and still benchmarked beside the columnar one, and both return byte-identical results. It is the reference implementation, not a strawman.' },
      { p: 'I also ran the same questions through DuckDB and Polars, with a script that exits if any library’s answer differs from the engine’s. The engine wins the top-10 query everywhere, including against DuckDB on eight cores. On a plain filtered scan it is level with single-threaded Polars, and with eight cores both libraries beat it. The engine uses one core per query, so that table puts a number on the next thing to build.' },

      { h: 'Serving it' },
      { p: 'The engine core knows nothing about gRPC or protobuf, so Google Benchmark links it directly and the transport can change without touching it. A thin Go gateway turns HTTP/JSON into gRPC calls and holds no state, so there is one source of truth for every number. Client errors pass through verbatim, because the engine’s messages are written to be useful; internal errors are logged and replaced with a generic message.' },
      { p: 'Under load with 50 concurrent clients it served 1,016 requests a second, p99 135 ms, with 0 errors in 30,000 requests. One finding along the way: a stray per-request debug log was costing 14% of throughput.' },

      { h: 'What I took from it' },
      { p: 'I kept a log of predictions I made before measuring. Partitioning would be required: it was not. Removing logging would give more than 5×: it gave 1.16×. The mechanisms behind the predictions were right every time, and the magnitudes and signs were not. A good mental model tells you what to measure; it does not let you skip the measurement.' },
    ],
  },
  {
    id: 'riskwatch',
    title: 'Keeping the API responsive while the maths runs',
    dek: 'How Risk Watch hands seconds of simulation work to background workers and pushes the result back live.',
    project: 'Risk Watch',
    link: { label: 'Try Risk Watch', href: 'https://riskwatch1.vercel.app' },
    blocks: [
      { p: 'Risk Watch is a simulated investing platform for students and new investors: build a portfolio, then see the same risk numbers a professional desk would, such as value at risk, drawdown and the efficient frontier. Several of those numbers come from simulations that take real CPU time, and the API must never wait for them.' },

      { h: 'The problem' },
      { p: 'A Monte Carlo value-at-risk run simulates thousands of possible futures for a portfolio. A backtest replays a strategy over years of prices. If either ran inside the request handler, one heavy user would slow the API down for everyone.' },

      { h: 'The shape' },
      { list: [
        'The browser asks FastAPI to run a job. FastAPI queues it on Celery and returns straight away.',
        'A Celery worker runs the job. The heavy loops are in a C++ engine exposed to Python through pybind11, which runs a 10,000-path Monte Carlo in 0.41 s.',
        'When the job finishes, the worker stores the result in Redis for an hour and appends a small event to that user’s Redis Stream, jobs:user:{id}, trimmed to about 100 entries.',
        'A Go gateway holds each user’s WebSocket, reads their stream and pushes the event to the browser, which then fetches the result by id. If the socket is down, the browser can poll the job status instead.',
      ] },
      { p: 'Each piece does one job. The API stays fast because it never computes; the workers scale on their own; and the gateway is the only thing holding long-lived connections, which suits Go well. A Redis Stream keeps its entries until trimmed, unlike pub/sub, so an event written while nobody is listening is still there to read.' },

      { h: 'Checking the maths' },
      { p: 'Fast but wrong is worse than slow, so the engine has a golden-source test: with a fixed seed, every metric the C++ engine produces is compared with a NumPy or SciPy reference implementation to a tolerance of 1e-6. A refactor of the engine cannot quietly change a number.' },

      { h: 'Running it' },
      { p: 'The frontend is on Vercel and the services on Northflank, deployed through GitHub Actions. Running it for real surfaced a failure no local test would: background jobs stopped completing because the managed Redis plan hit its tier limits. I diagnosed it and fixed it.' },

      { h: 'What is still open' },
      { p: 'The gateway starts a new price-streaming goroutine when a client re-subscribes but does not yet cancel the previous one; there is a TODO for it in the handler. It is harmless at current traffic, and it is the next thing I would fix before more users arrive.' },
    ],
  },
  {
    id: 'formance',
    title: 'A 9× speed-up that didn’t get merged',
    dek: 'My pull request to an open-source financial ledger, two rounds of review, and why closing it was the right call.',
    project: 'formancehq/ledger',
    link: { label: 'Read the pull request', href: 'https://github.com/formancehq/ledger/pull/1988' },
    blocks: [
      { p: 'Formance Ledger is an open-source double-entry ledger written in Go. Ledgers can declare a chart of accounts, where account names are matched against patterns such as ^[0-9]{3}$.' },

      { h: 'What I found' },
      { p: 'An open issue reported that matching recompiled the regex on every call. The pattern was compiled once at parse time, purely to validate it, and then thrown away. Matching then recompiled it once per variable level, per address, per posting.' },

      { h: 'The change' },
      { p: 'I cached compiled patterns in a bounded, process-level cache keyed on the pattern text, using gcache, which the project already depended on. The account structs stayed byte-for-byte identical, so nothing about serialisation changed.' },
      { table: [
        ['', 'Before', 'After'],
        ['Match, parsed chart', '2,580 ns', '287 ns'],
        ['Allocations per op', '62', '4'],
        ['Memory per op', '4,834 B', '112 B'],
      ] },
      { p: 'Six runs each, compared with benchstat. An unbounded sync.Map version was a little faster, but patterns are client-supplied through the schemas endpoint, so an unbounded cache was a memory-growth risk. I chose the bound and said why in the PR.' },

      { h: 'Review' },
      { p: 'The first version stored the compiled regex on the struct. A maintainer showed that this broke reflect.DeepEqual between a chart and its JSON round trip, which the project’s no-behaviour-change policy forbids. I moved the cache out of the struct and added a regression test for the round trip.' },
      { p: 'A second reviewer suggested LRU instead of LFU, because a pattern that is hot right now is by definition recently used, while LFU can keep a pattern that was popular long ago. They also questioned the 4,096-entry bound, since a real chart has a handful of patterns. I switched to LRU and lowered the bound to 512.' },

      { h: 'The outcome' },
      { p: 'The lead maintainer closed it. The operation was clearly faster, but a few microseconds saved per match is marginal next to a PostgreSQL round trip per transaction, and the change added a process-wide cache with an eviction policy to maintain. They left the door open if profiling a representative workload ever shows regex compilation mattering.' },

      { h: 'What I learned' },
      { p: 'My benchmark proved the function was faster. It did not prove the system was. Next time I would profile a whole transaction first and lead with what share of it the change removes; that is the number a maintainer weighs against the cost of new code.' },
      { p: 'The part I would keep: stating the risk, known concerns and review focus up front made both review rounds quick and specific.' },
    ],
  },
];
