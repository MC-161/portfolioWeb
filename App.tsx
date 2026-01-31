import React, { useState, useEffect, useRef } from 'react';
import Hero from './components/Hero';
import SkillsMatrix from './components/SkillsMatrix';
import ExperienceTimeline from './components/ExperienceTimeline';
import ProjectCard from './components/ProjectCard';
import ContactPortal from './components/ContactPortal';
import { PROJECTS, EXPERIENCE } from './constants';
import { Sun, Moon, FilterX, Search, ArrowDownCircle } from 'lucide-react';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') as 'dark' | 'light' || 'dark';
    }
    return 'light';
  });

  const [activeSkillFilter, setActiveSkillFilter] = useState<string | null>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleSkillClick = (skillName: string) => {
    setActiveSkillFilter(skillName);
    
    // Determine which section to prioritize for scrolling
    const hasProjectMatch = PROJECTS.some(p => p.tech.some(t => t.toLowerCase() === skillName.toLowerCase()));
    const hasExpMatch = EXPERIENCE.some(e => e.tech.some(t => t.toLowerCase() === skillName.toLowerCase()));

    if (hasProjectMatch) {
      projectsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (hasExpMatch) {
      experienceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const filteredProjects = activeSkillFilter 
    ? PROJECTS.filter(p => p.tech.some(t => t.toLowerCase() === activeSkillFilter.toLowerCase()))
    : PROJECTS;

  return (
    <div className="min-h-screen text-mono-fg bg-mono-bg transition-colors duration-300 selection:bg-mono-accent selection:text-white">
      
      {/* Minimal Sticky Nav */}
      <nav className="fixed top-0 left-0 w-full z-[1000] bg-mono-bg/90 backdrop-blur-sm border-b border-mono-light px-6 md:px-12 py-6 flex items-center justify-between transition-colors duration-300">
        <div className="font-bold text-sm tracking-tighter uppercase text-mono-fg">
          MC<span className="opacity-20">_</span>SWE
        </div>

        <div className="hidden md:flex gap-10 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-mono-muted">
          <a href="#" className="hover:text-mono-fg transition-colors">/ HOME</a>
          <a href="#projects" className="hover:text-mono-fg transition-colors">/ PROJECTS</a>
          <a href="#experience" className="hover:text-mono-fg transition-colors">/ EXPERIENCE</a>
          <a href="#skills" className="hover:text-mono-fg transition-colors">/ SKILLS</a>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-mono-light transition-colors text-mono-fg"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <div className="hidden lg:block font-mono text-[9px] font-bold opacity-30 text-mono-fg">
            U_LON // 2026
          </div>
        </div>
      </nav>

      <main>
        <Hero />

        {/* Projects Section */}
        <section ref={projectsRef} id="projects" className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-mono-light scroll-mt-24">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex items-center gap-4 flex-1">
               <div className="h-px bg-mono-fg w-12"></div>
               <h2 className="mono-label text-[10px] text-mono-muted uppercase tracking-[0.3em]">01 // PROJECT_REGISTRY</h2>
               <div className="h-px bg-mono-light flex-1"></div>
            </div>
            
            {activeSkillFilter && (
              <div className="flex items-center gap-4 animate-in fade-in slide-in-from-right-4">
                <div className="font-mono text-[10px] font-bold text-mono-muted uppercase">
                  Tracing: <span className="text-mono-accent">[{activeSkillFilter.toUpperCase()}]</span>
                </div>
                <button 
                  onClick={() => setActiveSkillFilter(null)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-mono-surface border border-mono-accent/30 text-[9px] font-mono font-bold text-mono-accent hover:bg-mono-accent hover:text-white transition-all"
                >
                  <FilterX size={12} />
                  CLEAR_TRACE
                </button>
              </div>
            )}
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-mono-light border border-mono-light overflow-hidden shadow-2xl transition-all duration-500">
              {filteredProjects.map((p, i) => {
                const isMatch = activeSkillFilter && p.tech.some(t => t.toLowerCase() === activeSkillFilter.toLowerCase());
                return (
                  <div key={p.title} className="bg-mono-bg animate-in fade-in zoom-in-95 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                    <ProjectCard project={p} isHighlighted={!!isMatch} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-20 border-2 border-dashed border-mono-light flex flex-col items-center justify-center space-y-4">
              <Search size={40} className="text-mono-light" />
              <div className="font-mono text-xs font-bold text-mono-muted uppercase tracking-widest">No_Projects_Matched_Query</div>
              <button onClick={() => setActiveSkillFilter(null)} className="text-mono-accent font-mono text-[10px] font-black underline">RETURN_TO_FULL_REGISTRY</button>
            </div>
          )}
        </section>

        {/* Experience Section */}
        <section ref={experienceRef} id="experience" className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-mono-light bg-mono-surface/30 scroll-mt-24">
          <div className="mb-20 flex items-center gap-4">
             <div className="h-px bg-mono-fg flex-1"></div>
             <h2 className="mono-label text-[10px] text-mono-muted px-4">02 // EXPERIENCE</h2>
             <div className="h-px bg-mono-light flex-1"></div>
          </div>
          <ExperienceTimeline activeSkill={activeSkillFilter} />
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-mono-light">
          <div className="mb-20 flex items-center gap-4">
             <div className="h-px bg-mono-fg flex-1"></div>
             <h2 className="mono-label text-[10px] text-mono-muted px-4">03 // SKILLS</h2>
             <div className="h-px bg-mono-light flex-1"></div>
          </div>
          <div className="mb-12 p-4 bg-mono-accent/5 border border-mono-accent/20 flex items-center gap-3">
            <div className="h-2 w-2 bg-mono-accent rounded-full animate-pulse"></div>
            <p className="font-mono text-[9px] font-bold text-mono-muted uppercase tracking-widest">
              Bi-directional Linkage Enabled: Click any skill to trace its application across projects and professional experience.
            </p>
          </div>
          <SkillsMatrix onSkillClick={handleSkillClick} activeSkill={activeSkillFilter} />
        </section>
      </main>

      <footer className="py-24 border-t border-mono-light bg-mono-bg transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-4">
            <div className="text-sm font-bold uppercase tracking-widest text-mono-fg">Mahfuz Chowdhury</div>
            <p className="text-[11px] text-mono-muted font-medium max-w-xs leading-relaxed">
              Software engineering focused on reliability and performance. Optimized for scalable distributed environments.
            </p>
          </div>
          
          <div className="flex gap-16 font-mono text-[9px] font-bold uppercase tracking-widest text-mono-muted">
            <div className="space-y-3">
              <span className="text-mono-fg opacity-30">/src</span>
              <a href="https://github.com/MC-161" target="_blank" className="block hover:text-mono-fg">GitHub</a>
              <a href="https://linkedin.com/in/mahfuzcswe" target="_blank" className="block hover:text-mono-fg">LinkedIn</a>
            </div>
            <div className="space-y-3">
              <span className="text-mono-fg opacity-30">/io</span>
              <a href="mailto:mahfuzcswe@gmail.com" className="block hover:text-mono-fg">Email</a>
              <a href="#" className="block hover:text-mono-fg">Resume</a>
            </div>
          </div>

          <div className="md:text-right space-y-1">
            <div className="font-mono text-[9px] font-bold text-mono-muted opacity-40">© 2025 MC_REGISTRY</div>
            <div className="font-mono text-[8px] opacity-20 text-mono-fg">BUILD: 202501_STABLE // REV: 5.3.0</div>
          </div>
        </div>
      </footer>

      <ContactPortal />
    </div>
  );
};

export default App;