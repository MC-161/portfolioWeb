import { useState } from 'react';
import { EXPERIENCE, type Role } from '../data';
import Architecture from './Architecture';
import { AMEX } from '../diagrams';

const VISIBLE = 4;

function RoleEntry({ role }: { role: Role }) {
  const [open, setOpen] = useState(false);
  const extra = role.points.length - VISIBLE;
  const points = open ? role.points : role.points.slice(0, VISIBLE);
  const listId = `${role.company.replace(/\W+/g, '-').toLowerCase()}-points`;

  return (
    <li className="role">
      <div className="role__when">
        <span>{role.period}</span>
        <span className="role__place">{role.place}</span>
      </div>
      <div className="role__what">
        <h3 className="role__company">{role.company}</h3>
        <p className="role__title">{role.title}</p>
        <ul className="role__points" id={listId}>
          {points.map((p) => <li key={p}>{p}</li>)}
        </ul>
        {extra > 0 && (
          <button
            type="button"
            className="role__more"
            aria-expanded={open}
            aria-controls={listId}
            onClick={() => setOpen(!open)}
          >
            {open ? 'Show fewer' : `Show ${extra} more`}
          </button>
        )}
        <p className="stack">{role.stack.join(', ')}</p>
        {role.company === 'American Express' && (
          <div className="role__diagram">
            <p className="role__diagram-title">How the migration kept consumers running</p>
            <Architecture d={AMEX} id="amex" />
          </div>
        )}
      </div>
    </li>
  );
}

export default function Experience() {
  return (
    <ol className="roles">
      {EXPERIENCE.map((r) => <RoleEntry key={r.company} role={r} />)}
    </ol>
  );
}
