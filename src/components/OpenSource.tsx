import { OPEN_SOURCE as os } from '../data';

export default function OpenSource() {
  const speedup = Math.round(os.before / os.after);
  return (
    <article className="oss">
      <div className="oss__head">
        <h3 className="oss__repo"><a className="link" href={os.url} target="_blank" rel="noreferrer">{os.repo} #{os.pr}</a></h3>
        <p className="oss__what">{os.what}. Pull request, reviewed and closed by the maintainers.</p>
      </div>
      <p className="oss__figure">
        <span className="oss__old">{os.before.toLocaleString()} ns</span>
        <span className="oss__arrow" aria-hidden="true">to</span>
        <span className="oss__new">{os.after} ns</span>
        <span className="oss__x">per pattern match, about {speedup}× faster</span>
      </p>
      <ul className="oss__points">
        {os.points.map((p) => <li key={p}>{p}</li>)}
      </ul>
      <a className="link oss__more" href="#notes-formance">Read the write-up</a>
    </article>
  );
}
