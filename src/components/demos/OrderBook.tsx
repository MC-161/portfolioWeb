import { useEffect, useState } from 'react';
import { rng, useLive } from './useLive';

interface Level { price: number; size: number }
interface Book { asks: Level[]; bids: Level[]; last: { price: number; side: 'buy' | 'sell'; size: number } | null; seq: number }

const LEVELS = 5;
const TICK = 650;

function initial(): Book {
  const mid = 100;
  return {
    asks: Array.from({ length: LEVELS }, (_, i) => ({ price: +(mid + 0.05 + i * 0.05).toFixed(2), size: 40 + i * 25 })),
    bids: Array.from({ length: LEVELS }, (_, i) => ({ price: +(mid - 0.05 - i * 0.05).toFixed(2), size: 45 + i * 22 })),
    last: null,
    seq: 0,
  };
}

// A shared order book: resting orders change size, and an incoming market
// order matches the best price first (price-time priority).
export default function OrderBook() {
  const { ref, live } = useLive<HTMLDivElement>();
  const [book, setBook] = useState<Book>(initial);

  useEffect(() => {
    if (!live) return;
    const r = rng(Date.now() & 0xffff);
    const id = window.setInterval(() => {
      setBook((b) => {
        const asks = b.asks.map((l) => ({ ...l }));
        const bids = b.bids.map((l) => ({ ...l }));
        let last = b.last;
        if (r() < 0.45) {
          // a market order hits the top of one side
          const buy = r() < 0.5;
          const side = buy ? asks : bids;
          const qty = Math.min(side[0].size, Math.round(10 + r() * 40));
          side[0].size -= qty;
          last = { price: side[0].price, side: buy ? 'buy' : 'sell', size: qty };
          if (side[0].size <= 0) {
            side.shift();
            const tail = side[side.length - 1];
            side.push({ price: +(tail.price + (buy ? 0.05 : -0.05)).toFixed(2), size: Math.round(40 + r() * 80) });
          }
        } else {
          // resting liquidity comes and goes
          const side = r() < 0.5 ? asks : bids;
          const i = Math.floor(r() * LEVELS);
          side[i].size = Math.max(5, side[i].size + Math.round((r() - 0.45) * 30));
        }
        return { asks, bids, last, seq: b.seq + 1 };
      });
    }, TICK);
    return () => window.clearInterval(id);
  }, [live]);

  const max = Math.max(...book.asks.map((l) => l.size), ...book.bids.map((l) => l.size));
  const row = (l: Level, side: 'ask' | 'bid') => (
    <div className={`ob__row ob__row--${side}`} key={`${side}-${l.price}`}>
      <span className="ob__depth" style={{ width: `${(l.size / max) * 100}%` }} />
      <span className="ob__price">{l.price.toFixed(2)}</span>
      <span className="ob__size">{l.size}</span>
    </div>
  );

  return (
    <div className="demo" ref={ref} aria-label="Animation: a live order book where incoming orders match against the best price">
      <div className="demo__bar">
        <span>one book, many traders</span>
        <span className="demo__clock">seq {book.seq.toString().padStart(5, '0')}</span>
      </div>
      <div className="ob">
        <div className="ob__side">{book.asks.slice().reverse().map((l) => row(l, 'ask'))}</div>
        <div className="ob__spread" key={book.last ? `${book.seq}` : 'none'}>
          {book.last
            ? <><span className={`ob__trade ob__trade--${book.last.side}`}>{book.last.side === 'buy' ? 'Bought' : 'Sold'} {book.last.size}</span> at {book.last.price.toFixed(2)}</>
            : 'waiting for the first trade'}
        </div>
        <div className="ob__side">{book.bids.map((l) => row(l, 'bid'))}</div>
      </div>
      <p className="demo__foot"><strong>Event-sourced:</strong> any session replays byte for byte from its log.</p>
    </div>
  );
}
