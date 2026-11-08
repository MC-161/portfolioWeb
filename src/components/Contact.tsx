import { OFF_KEYBOARD, PROFILE } from '../data';
import { trackCv } from '../track';

export default function Contact() {
  return (
    <footer className="contact" id="contact">
      <div className="contact__inner">
        <h2 className="contact__title">Hiring a graduate engineer? I’d like to hear about the role.</h2>
        <a className="contact__email" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        <p className="contact__links">
          <a className="link" href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="link" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="link" href={PROFILE.cv} download onClick={() => trackCv('contact')}>Download CV</a>
        </p>
        <p className="contact__off">{OFF_KEYBOARD}</p>
        <p className="contact__small">© {new Date().getFullYear()} Mahfuz Chowdhury</p>
      </div>
    </footer>
  );
}
