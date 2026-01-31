export interface Project {
  title: string;
  description: string;
  tech: string[];
  metrics: string[];
  repoUrl: string;
  category: 'Systems' | 'FullStack' | 'Observability';
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  highlights: string[];
  tech: string[]; // Added to support skill cross-linking
}

export enum SkillCategory {
  BACKEND = 'Backend & Systems',
  ARCH = 'Architecture & Ops',
  DATA = 'Data & Storage',
  FRONTEND = 'Frontend & UI'
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: SkillCategory;
}

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: Date;
}