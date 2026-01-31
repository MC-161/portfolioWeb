import React from 'react';
import { Project } from '../types';
import { Github, ExternalLink, Terminal, Cpu, Info } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  isHighlighted?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isHighlighted }) => {
  const isHighLevel = project.tech.some(t => ['React', 'Node.js', 'TypeScript', 'Tailwind CSS'].includes(t));
  const isLowLevel = project.tech.some(t => ['C++', 'Go', 'Java', 'Gin', 'C / C++'].includes(t));

  return (
    <div className={`group relative bg-mono-bg flex flex-col h-full border border-transparent transition-all duration-500 overflow-hidden ${isHighlighted ? 'border-mono-accent animate-pulse-subtle' : 'hover:border-mono-accent'}`}>
      {/* Interactive Background Gradient (Subtle) */}
      <div className="absolute inset-0 bg-gradient-to-br from-mono-accent/0 to-mono-accent/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      {isHighlighted && (
        <div className="absolute top-0 right-0 bg-mono-accent text-white font-mono text-[7px] font-black px-2 py-1 z-20 uppercase tracking-widest">
          Match_Detected
        </div>
      )}

      <div className="p-8 flex flex-col h-full space-y-6 relative z-10">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 font-mono text-[8px] font-black text-mono-muted uppercase tracking-[0.2em] opacity-40 group-hover:opacity-60 transition-opacity">
              <Terminal size={10} className="text-mono-accent" />
              <span>ENTRY_FILE: {project.title.replace(/\s+/g, '_').toUpperCase()}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className={`px-2 py-0.5 font-mono text-[8px] font-bold border transition-colors ${isLowLevel ? 'border-mono-accent bg-mono-accent/5 text-mono-accent' : 'border-mono-muted/30 text-mono-muted/70'}`}>
                {project.category}
              </span>
              {isHighLevel && (
                <span className="px-2 py-0.5 font-mono text-[8px] font-bold border border-mono-accent/20 bg-mono-accent/5 text-mono-accent/80">
                  DISTRIBUTED_APP
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-4 text-mono-muted opacity-30 group-hover:opacity-100 transition-all duration-300 translate-y-[-4px] group-hover:translate-y-0">
            <a href={project.repoUrl} target="_blank" className="hover:text-mono-accent transition-colors p-1" title="View Source">
              <Github size={16} />
            </a>
            <a href={project.repoUrl} target="_blank" className="hover:text-mono-accent transition-colors p-1" title="Live Preview">
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-black text-mono-fg uppercase tracking-tighter group-hover:text-mono-accent transition-colors duration-300">
            {project.title}
          </h3>
          
          {/* Scrollable Description Area */}
          <div className="relative group/desc">
            <div className="max-h-32 overflow-y-auto pr-2 custom-scrollbar transition-colors">
              <p className="text-[12px] font-medium leading-relaxed text-mono-muted group-hover:text-mono-fg transition-colors">
                {project.description}
              </p>
            </div>
            {/* Visual Indicator for more content */}
            <div className="absolute bottom-0 right-2 pointer-events-none opacity-20 group-hover:opacity-40">
               <Info size={10} className="text-mono-accent" />
            </div>
          </div>
        </div>

        <div className="mt-auto pt-6 space-y-6">
          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map(t => (
              <span 
                key={t} 
                className="px-2 py-1 bg-mono-surface border border-mono-light text-[9px] font-mono font-bold text-mono-muted group-hover:border-mono-accent/30 group-hover:text-mono-fg transition-all hover:bg-mono-accent/10 hover:border-mono-accent"
              >
                {t.toUpperCase()}
              </span>
            ))}
          </div>

          {/* Metrics / Diagnostics Block */}
          <div className="relative overflow-hidden bg-mono-surface p-4 border border-mono-light group-hover:border-mono-accent/30 transition-all duration-500">
            {/* Moving scanline effect on hover */}
            <div className="absolute top-0 left-[-100%] w-full h-[1px] bg-mono-accent/20 group-hover:animate-[scanline_2s_linear_infinite]" />
            
            <div className="space-y-2">
              <div className="mono-label text-[7px] text-mono-accent/50 mb-1 flex items-center gap-2">
                <Cpu size={10} />
                <span>Diagnostic_Output // Performance_Logs</span>
              </div>
              {project.metrics.map((m, i) => (
                <div key={i} className="text-[10px] font-mono text-mono-fg leading-relaxed flex gap-3 group/metric">
                  <span className="text-mono-accent font-black tracking-tighter group-hover/metric:animate-pulse">&gt;_</span>
                  <span className="font-bold opacity-80 group-hover:opacity-100 transition-opacity">{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom accent bar that grows on hover */}
      <div className={`absolute bottom-0 left-0 h-[2px] bg-mono-accent transition-all duration-500 ${isHighlighted ? 'w-full' : 'w-0 group-hover:w-full'}`} />
    </div>
  );
};

// CSS Injection for the animations and custom scrollbar
const style = document.createElement('style');
style.textContent = `
  @keyframes scanline {
    0% { left: -100%; }
    100% { left: 100%; }
  }
  @keyframes pulse-subtle {
    0%, 100% { border-color: #10b98160; }
    50% { border-color: #10b981; }
  }
  .animate-pulse-subtle {
    animation: pulse-subtle 2s infinite;
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 2px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #10b98140;
  }
  .group:hover .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #10b981;
  }
`;
document.head.appendChild(style);

export default ProjectCard;