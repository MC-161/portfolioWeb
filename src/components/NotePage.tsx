import type { Note } from '../notes';

export default function NotePage({ note }: { note: Note }) {
  return (
    <main className="note">
      <a className="note__back" href="#projects">Back to the portfolio</a>
      <header className="note__head">
        <p className="note__project">{note.project}</p>
        <h1 className="note__title">{note.title}</h1>
        <p className="note__dek">{note.dek}</p>
      </header>
      <article className="note__body">
        {note.blocks.map((b, i) => {
          if ('h' in b) return <h2 key={i}>{b.h}</h2>;
          if ('p' in b) return <p key={i}>{b.p}</p>;
          if ('code' in b) return <pre key={i}><code>{b.code}</code></pre>;
          if ('list' in b) return <ul key={i}>{b.list.map((t) => <li key={t}>{t}</li>)}</ul>;
          const [head, ...rows] = b.table;
          return (
            <div className="note__table" key={i}>
              <table>
                <thead><tr>{head.map((c, j) => <th key={j} scope="col">{c}</th>)}</tr></thead>
                <tbody>{rows.map((r, k) => <tr key={k}>{r.map((c, j) => j === 0 ? <th key={j} scope="row">{c}</th> : <td key={j}>{c}</td>)}</tr>)}</tbody>
              </table>
            </div>
          );
        })}
      </article>
      <p className="note__foot">
        <a className="link" href={note.link.href} target="_blank" rel="noreferrer">{note.link.label}</a>
      </p>
    </main>
  );
}
