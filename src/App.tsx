import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Section from './components/Section';
import Experience from './components/Experience';
import Projects from './components/Projects';
import OpenSource from './components/OpenSource';
import Writing from './components/Writing';
import Skills from './components/Skills';
import Contact from './components/Contact';
import NotePage from './components/NotePage';
import { NOTES } from './notes';

// Write-ups open at #notes-<id>; everything else is the main page.
function useNote() {
  const read = () => {
    const h = window.location.hash;
    return h.startsWith('#notes-') ? NOTES.find((n) => `#notes-${n.id}` === h) ?? null : null;
  };
  const [note, setNote] = useState(read);
  useEffect(() => {
    const on = () => {
      const next = read();
      setNote((prev) => {
        if (next && next !== prev) window.scrollTo(0, 0);
        return next;
      });
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return note;
}

export default function App() {
  const note = useNote();

  useEffect(() => {
    document.title = note ? `${note.title} | Mahfuz Chowdhury` : 'Mahfuz Chowdhury | Software Engineer';
  }, [note]);

  // Coming back from a write-up to a section: scroll once the section exists again.
  useEffect(() => {
    if (note) return;
    const id = window.location.hash.slice(1);
    if (!id) return;
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  }, [note]);

  return (
    <div id="top">
      <a className="skip" href={note ? '#note' : '#experience'}>Skip to content</a>
      <Nav />
      {note ? (
        <div id="note"><NotePage note={note} /></div>
      ) : (
        <>
          <Hero />
          <main>
            <Section id="experience" title="Experience"><Experience /></Section>
            <Section id="projects" title="Projects"><Projects /></Section>
            <Section id="open-source" title="Open source"><OpenSource /></Section>
            <Section id="writing" title="Write-ups"><Writing /></Section>
            <Section id="skills" title="Skills"><Skills /></Section>
          </main>
        </>
      )}
      <Contact />
      <Analytics />
    </div>
  );
}
