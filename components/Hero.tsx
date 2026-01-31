import React from 'react';
import { ChevronRight, FileText, Activity, Download } from 'lucide-react';
import { downloadResume, goToGithub } from '../services/resumeService';

const Hero: React.FC = () => {
  return (
    <section className="min-h-[85vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-40 pb-20 relative overflow-hidden print:pt-0 print:min-h-0">
      {/* Background Decorative Element */}
      <div className="absolute top-[20%] right-[-5%] w-[40%] h-[60%] bg-mono-accent/5 blur-[120px] pointer-events-none rounded-full print:hidden" />
      
      <div className="max-w-7xl w-full mx-auto relative z-10">
        {/* Status Line */}
        <div className="mb-12 flex flex-wrap items-center gap-6 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-mono-muted print:hidden">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-mono-accent rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></span>
            <span className="text-mono-fg">Status: Ready_For_Grad_Roles_2026</span>
          </div>
          <span className="opacity-20 hidden sm:inline">|</span>
          <div className="flex items-center gap-2">
            <Activity size={10} className="text-mono-accent" />
            <span className="animate-[pulse_3s_infinite]">Current_Focus: Software Engineering Positions</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-x-24 gap-y-16">
          <div className="space-y-10">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-mono-fg leading-[0.9] print:text-5xl">
                MAHFUZ<br />CHOWDHURY
              </h1>
              <p className="text-xl md:text-2xl text-mono-muted font-bold tracking-tight print:text-lg">
                Software Engineer. Experience in <span className="text-mono-accent">Go</span>, <span className="text-mono-accent">Python</span>, <span className="text-mono-accent">C++</span> & <span className="text-mono-accent">React</span>.
              </p>
            </div>
            
            <p className="text-sm md:text-base leading-relaxed text-mono-muted max-w-xl font-medium print:text-xs print:text-black">
              Final year CS student at <span className="text-mono-fg font-bold">City, University of London</span> (1st Class Predicted). 
              Specialized in high-performance distributed systems. Previously at <span className="text-mono-fg font-bold">American Express</span> 
              building mission-critical observability tools for Go-based microservices.
            </p>

            <div className="flex flex-wrap items-center gap-8 pt-4 print:hidden">
              <button 
                onClick={goToGithub}
                className="group flex items-center gap-3 bg-mono-fg text-mono-bg px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-mono-accent transition-colors shadow-[8px_8px_0px_#10b98140]">
                <span>View_Github</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={downloadResume}
                className="group flex items-center gap-3 border-2 border-mono-fg px-6 py-[14px] font-mono text-[10px] font-bold uppercase tracking-widest text-mono-fg hover:border-mono-accent hover:text-mono-accent transition-all"
              >
                <FileText size={14} />
                <span>View_Resume (.pdf)</span>
              </button>
            </div>
          </div>

          {/* Technical Metadata Column */}
          <div className="flex flex-col justify-end space-y-12 print:space-y-4">
            <div className="space-y-10 border-l-2 border-mono-fg pl-8 relative print:space-y-4">
              <div className="absolute top-0 left-[-2px] h-8 w-[2px] bg-mono-accent animate-pulse print:hidden" />
              
              <div className="space-y-2">
                <div className="mono-label text-[8px] text-mono-muted opacity-50 italic print:text-[10px]">Sys_Langs</div>
                <div className="text-xs font-mono font-black uppercase text-mono-fg tracking-widest flex gap-3 print:text-[10px]">
                  <span className="text-mono-accent">Go</span> / C++ / Java
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="mono-label text-[8px] text-mono-muted opacity-50 italic print:text-[10px]">Full_Stack</div>
                <div className="text-xs font-mono font-black uppercase text-mono-fg tracking-widest print:text-[10px]">
                  React / TypeScript / Node.js
                </div>
              </div>

              <div className="space-y-2">
                <div className="mono-label text-[8px] text-mono-muted opacity-50 italic print:text-[10px]">Infrastructure</div>
                <div className="text-xs font-mono font-black uppercase text-mono-fg tracking-widest print:text-[10px]">
                  Docker / K8s / Kafka / Redis
                </div>
              </div>
            </div>

            <div className="font-mono text-[8px] text-mono-muted uppercase tracking-[0.4em] pl-8 opacity-30 flex items-center gap-4 print:hidden">
              <span>CORE_SPEC_V5.0</span>
              <div className="h-px flex-1 bg-mono-light"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;