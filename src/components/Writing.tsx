import { NOTES } from '../notes';

export default function Writing() {
  return (
    <ul className="writing">
      {NOTES.map((n) => (
        <li key={n.id}>
          <a className="writing__item" href={`#notes-${n.id}`}>
            <span className="writing__project">{n.project}</span>
            <span className="writing__title">{n.title}</span>
            <span className="writing__dek">{n.dek}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
