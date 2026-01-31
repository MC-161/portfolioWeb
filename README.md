# Mahfuz Chowdhury — Systems Engineer Portfolio

A modern, interactive portfolio website built with React and TypeScript, showcasing professional experience, skills, and projects. Features a dark/light theme toggle, AI-powered chat functionality, and a responsive design.

## Features

- **Dark/Light Theme Toggle** - Seamless theme switching with persistent preferences
- **Interactive Components**
  - Hero section with dynamic introduction
  - Skills matrix visualization
  - Experience timeline
  - Project showcase cards
  - Contact portal with terminal-style chat
- **Responsive Design** - Optimized for desktop and mobile devices
- **Modern Tech Stack** - React 19, TypeScript, Vite, and TailwindCSS

## Project Structure

```
src/
├── components/
│   ├── Hero.tsx              # Landing section
│   ├── SkillsMatrix.tsx       # Skills visualization
│   ├── ExperienceTimeline.tsx # Work experience
│   ├── ProjectCard.tsx        # Project showcase
│   ├── ContactPortal.tsx      # Contact section
│   └── TerminalChat.tsx       # AI chat interface
├── services/
│   └── resumeService.ts       # Resume and data service
├── App.tsx                    # Main application component
├── constants.ts               # Configuration and constants
├── types.ts                   # TypeScript type definitions
└── vite.config.ts            # Vite configuration
```

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Technologies

- **React** 19.2.3 - UI library
- **TypeScript** 5.8.2 - Type safety
- **Vite** 6.2.0 - Build tool
- **TailwindCSS** - Styling
- **Lucide React** 0.562.0 - Icons
- **Google GenAI** 1.37.0 - AI chat integration

## Configuration

### Theme Preferences
Theme selection is automatically saved to localStorage and persists across sessions.

## Components

| Component | Purpose |
|-----------|---------|
| Hero | Main landing section with introduction |
| SkillsMatrix | Display technical skills with filtering |
| ExperienceTimeline | Chronological work experience display |
| ProjectCard | Individual project showcase |
| ContactPortal | Contact information and chat interface |


**Built with React, TypeScript**


