import React from 'react';
import { SKILLS } from '../constants';
import { SkillCategory } from '../types';
import { Code2, Cpu, Database, Globe, Layers, Server } from 'lucide-react';

interface SkillsMatrixProps {
  onSkillClick?: (skillName: string) => void;
  activeSkill?: string | null;
}

const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ onSkillClick, activeSkill }) => {
  const categories = Object.values(SkillCategory) as SkillCategory[];

  const getIcon = (cat: SkillCategory) => {
    switch (cat) {
      case SkillCategory.BACKEND: return <Server size={18} className="text-mono-accent" />;
      case SkillCategory.FRONTEND: return <Globe size={18} className="text-mono-accent" />;
      case SkillCategory.ARCH: return <Layers size={18} className="text-mono-accent" />;
      case SkillCategory.DATA: return <Database size={18} className="text-mono-accent" />;
      default: return <Code2 size={18} className="text-mono-accent" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {categories.map((cat) => (
        <div key={cat} className="group border border-mono-light bg-mono-surface/30 p-8 hover:border-mono-accent transition-all duration-300">
          <div className="flex items-center gap-4 mb-8 border-b border-mono-light pb-4">
            {getIcon(cat)}
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-mono-fg">
              {cat}
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {SKILLS.filter(s => s.category === cat).map(skill => {
              const isActive = activeSkill?.toLowerCase() === skill.name.toLowerCase();
              return (
                <button 
                  key={skill.name} 
                  onClick={() => onSkillClick?.(skill.name)}
                  className={`flex flex-col border px-4 py-3 group/skill transition-all cursor-pointer text-left ${isActive ? 'bg-mono-accent border-mono-accent' : 'bg-mono-bg border-mono-light hover:bg-mono-accent/5 hover:border-mono-accent/40'}`}
                >
                  <div className={`text-[11px] font-extrabold uppercase tracking-widest mb-1 ${isActive ? 'text-white' : 'text-mono-fg'}`}>
                    {skill.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`h-1 w-1 rounded-full ${isActive ? 'bg-white' : skill.level > 85 ? 'bg-mono-accent' : 'bg-mono-muted opacity-40'}`}></div>
                    <span className={`font-mono text-[7px] font-bold uppercase tracking-tighter ${isActive ? 'text-white/80' : 'text-mono-muted'}`}>
                      {skill.level > 90 ? 'Advanced_Module' : skill.level > 80 ? 'Core_Module' : 'Entry_Module'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsMatrix;