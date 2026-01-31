import React from 'react';
import { EXPERIENCE, EDUCATION_MODULES } from '../constants';
import { MapPin, Terminal, Clock, ShieldCheck, Box, Zap } from 'lucide-react';

interface ExperienceTimelineProps {
  activeSkill?: string | null;
}

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ activeSkill }) => {
  return (
    <div className="relative">
      {/* Vertical Connection Line */}
      <div className="absolute left-[20px] md:left-[240px] top-0 bottom-0 w-[1px] bg-mono-light hidden sm:block"></div>

      <div className="space-y-32">
        {EXPERIENCE.map((exp, idx) => {
          const isAmex = exp.company.includes('American Express');
          const isMatch = activeSkill && exp.tech.some(t => t.toLowerCase() === activeSkill.toLowerCase());

          return (
            <div key={idx} className="relative group">
              {/* Desktop Timestamp / Header Column */}
              <div className="md:absolute md:left-0 md:w-[200px] md:text-right pt-2 hidden md:block">
                <div className={`font-mono text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${isMatch ? 'text-mono-accent' : 'text-mono-fg group-hover:text-mono-accent'}`}>
                  {exp.period}
                </div>
                <div className="mt-3 flex flex-col items-end gap-2">
                  <div className="font-mono text-[9px] font-bold text-mono-muted flex items-center gap-2">
                    <MapPin size={10} className="text-mono-accent" />
                    {isAmex ? 'LONDON, UK' : 'REMOTE // UK'}
                  </div>
                  <div className={`px-2 py-0.5 border text-[8px] font-mono font-bold uppercase tracking-widest ${isMatch || idx === 0 ? 'border-mono-accent text-mono-accent bg-mono-accent/5' : 'border-mono-muted text-mono-muted opacity-40'}`}>
                    {isMatch ? '[TRACE: MATCH]' : idx === 0 ? '[TRACE: ACTIVE]' : '[TRACE: ARCHIVED]'}
                  </div>
                </div>
              </div>

              {/* Central Pulse Dot */}
              <div className={`absolute left-[16px] md:left-[236px] top-4 -ml-0 w-2 h-2 border bg-mono-bg z-20 transition-all duration-500 hidden sm:block ${isMatch ? 'border-mono-accent scale-150 shadow-[0_0_15px_#10b981]' : 'border-mono-accent group-hover:scale-150 group-hover:shadow-[0_0_12px_#10b981]'}`}>
                {(idx === 0 || isMatch) && <div className="absolute inset-0 bg-mono-accent animate-ping opacity-30"></div>}
              </div>

              {/* Content Panel */}
              <div className={`md:ml-[300px] border transition-all duration-500 bg-mono-bg ${isMatch ? 'border-mono-accent shadow-[15px_15px_0px_#10b98115]' : 'border-mono-light group-hover:border-mono-accent group-hover:shadow-[15px_15px_0px_#10b98108]'}`}>
                {/* Panel Header */}
                <div className={`border-b border-mono-light p-8 flex flex-wrap items-center justify-between gap-6 transition-colors ${isMatch ? 'bg-mono-accent/10' : 'group-hover:bg-mono-accent/5'}`}>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-black uppercase tracking-tighter text-mono-fg">
                        {exp.role}
                      </h3>
                      {isAmex && <ShieldCheck size={18} className="text-mono-accent" />}
                      {isMatch && <Zap size={18} className="text-mono-accent animate-bounce" />}
                    </div>
                    <div className="font-mono text-[11px] font-black text-mono-accent flex items-center gap-2 tracking-[0.2em]">
                      <Terminal size={14} />
                      {exp.company.toUpperCase()}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.slice(0, 6).map(tech => {
                      const isTechMatch = activeSkill && tech.toLowerCase() === activeSkill.toLowerCase();
                      return (
                        <span key={tech} className={`px-3 py-1 text-[9px] font-mono font-bold border transition-all ${isTechMatch ? 'bg-mono-accent text-white border-mono-accent shadow-[0_0_8px_#10b98140]' : 'bg-mono-surface text-mono-fg border-mono-light group-hover:border-mono-accent/30 hover:border-mono-accent'}`}>
                          {tech}
                        </span>
                      );
                    })}
                    {exp.tech.length > 6 && <span className="px-2 py-1 text-[9px] font-mono text-mono-muted">+{exp.tech.length - 6} MORE</span>}
                  </div>
                </div>

                {/* Mobile Meta */}
                <div className="md:hidden px-8 pt-6 flex justify-between items-center text-[10px] font-mono font-bold text-mono-muted">
                  <span>{exp.period}</span>
                  <span className="text-mono-accent">{isAmex ? 'LONDON' : 'REMOTE'}</span>
                </div>

                {/* Highlights */}
                <div className="p-10">
                  <ul className="space-y-6">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="flex gap-6 group/li">
                        <div className={`mt-2 h-[1px] transition-all ${isMatch ? 'w-6 bg-mono-accent' : 'w-4 bg-mono-accent opacity-30 group-hover/li:w-6 group-hover/li:opacity-100'}`}></div>
                        <p className={`text-[13px] leading-relaxed font-medium transition-colors ${isMatch ? 'text-mono-fg' : 'text-mono-muted group-hover/li:text-mono-fg'}`}>
                          {highlight}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Panel Footer */}
                <div className="px-10 py-4 bg-mono-surface/50 border-t border-mono-light flex items-center justify-between">
                  <div className="font-mono text-[9px] font-bold text-mono-muted opacity-40 uppercase tracking-[0.3em]">
                    Log_Node // {exp.company.replace(/\s+/g, '_').toUpperCase()}
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[8px] font-bold text-mono-accent">
                    <Box size={10} className="animate-spin-slow" />
                    SYSTEM_STABLE_VERIFIED
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Education Section */}
        <div className="relative group pt-16 mt-16 border-t-2 border-dashed border-mono-light">
          <div className="md:absolute md:left-0 md:w-[200px] md:text-right pt-2 hidden md:block">
            <div className="font-mono text-[11px] font-black text-mono-fg uppercase tracking-[0.2em]">
              2022 — 2026
            </div>
            <div className="font-mono text-[9px] font-bold text-mono-muted uppercase tracking-[0.2em] mt-2 opacity-60">
              Academic_Trace
            </div>
          </div>

          <div className="md:ml-[300px] bg-mono-surface/30 border border-mono-light p-10 space-y-10 group-hover:border-mono-accent transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-2">
                <div className="mono-label text-[9px] text-mono-muted uppercase tracking-[0.3em] flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-mono-accent"></div>
                   City, University of London
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter text-mono-fg">BSc Computer Science</h3>
                <div className="flex items-center gap-3 mt-4">
                  <div className="px-3 py-1 bg-mono-accent text-mono-bg font-mono text-[10px] font-black uppercase tracking-widest">
                    PREDICTION: 1st Class
                  </div>
                  <div className="font-mono text-[10px] text-mono-muted font-bold animate-pulse">
                    [FINAL_YEAR_IN_PROGRESS]
                  </div>
                </div>
              </div>
              
              <div className="hidden lg:block">
                 <div className="h-24 w-24 border border-mono-light flex items-center justify-center relative group-hover:border-mono-accent transition-colors">
                    <Terminal size={32} className="text-mono-light group-hover:text-mono-accent transition-colors" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-mono-accent"></div>
                 </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="mono-label text-[10px] text-mono-fg font-black">CORE_MODULE_REGISTRY</div>
                <div className="h-px flex-1 bg-mono-light opacity-30"></div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {EDUCATION_MODULES.map(module => (
                  <div key={module} className="bg-mono-bg border border-mono-light px-4 py-3 text-[10px] font-black text-mono-muted uppercase text-center hover:border-mono-accent hover:text-mono-fg transition-all cursor-default shadow-sm hover:shadow-md">
                    {module}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceTimeline;