import { SKILLS } from '../data';

export default function Skills() {
  return (
    <dl className="skills">
      {SKILLS.map((s) => (
        <div className="skills__group" key={s.group}>
          <dt>{s.group}</dt>
          <dd>{s.items.join(', ')}</dd>
        </div>
      ))}
    </dl>
  );
}
