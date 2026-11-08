import { PROFILE } from '../data';
import { trackCv } from '../track';

const LINKS = [
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['open-source', 'Open source'],
  ['writing', 'Write-ups'],
  ['contact', 'Contact'],
] as const;

export default function Nav() {
  return (
    <nav className="nav" aria-label="Sections">
      <a className="nav__mark" href="#top">Mahfuz Chowdhury</a>
      <ul className="nav__links">
        {LINKS.map(([id, label]) => (
          <li key={id}><a href={`#${id}`}>{label}</a></li>
        ))}
      </ul>
      <a className="nav__cv" href={PROFILE.cv} download onClick={() => trackCv('nav')}>CV</a>
    </nav>
  );
}
