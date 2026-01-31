import React, { useState } from 'react';
import { X, Mail, Linkedin, Github, Copy, Check, ExternalLink, FileText } from 'lucide-react';
import { downloadResume } from '../services/resumeService';

const ContactPortal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const email = "mahfuzcswe@gmail.com";
  const linkedinUrl = "https://linkedin.com/in/mahfuzcswe";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-0 right-0 z-[1001] p-6 md:p-8 pointer-events-none print:hidden">
      {/* Contact Card */}
      <div 
        className={`bg-mono-bg border-2 border-mono-fg w-full max-w-[90vw] md:w-[400px] transition-all duration-300 pointer-events-auto flex flex-col shadow-[20px_20px_0px_#10b98130] ${isOpen ? 'opacity-100 translate-y-0 mb-4' : 'opacity-0 translate-y-10 invisible h-0'}`}
      >
        <div className="bg-mono-fg text-mono-bg p-4 flex justify-between items-center h-12">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-mono-accent rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></span>
            <span className="mono-label tracking-[0.2em] text-[9px] font-black">COMMS_UPLINK // DIRECT_PORTAL</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:text-mono-accent transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-8 space-y-8 bg-mono-bg">
          <div className="space-y-2">
            <div className="mono-label text-[8px] text-mono-muted opacity-50 italic">Target_Identity</div>
            <h3 className="text-xl font-black text-mono-fg uppercase tracking-tighter">Mahfuz Chowdhury</h3>
            <p className="text-[11px] text-mono-muted font-medium leading-relaxed">
              Available for Graduate Software Engineering roles starting 2026. Open to discussions regarding Systems Engineering, Full-Stack development, and Distributed Systems.
            </p>
          </div>

          <div className="space-y-4">
            <div className="mono-label text-[8px] text-mono-muted opacity-50 italic">Transmission_Channels</div>
            
            {/* Email Row */}
            <div className="group flex items-center justify-between border border-mono-light p-4 bg-mono-surface hover:border-mono-accent transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-mono-fg text-mono-bg">
                  <Mail size={16} />
                </div>
                <div>
                  <div className="text-[9px] font-bold text-mono-muted uppercase tracking-widest">Email_Primary</div>
                  <div className="text-[12px] font-mono font-bold text-mono-fg">{email}</div>
                </div>
              </div>
              <button 
                onClick={copyToClipboard}
                className="text-mono-muted hover:text-mono-accent transition-colors p-2"
                title="Copy to clipboard"
              >
                {copied ? <Check size={16} className="text-mono-accent" /> : <Copy size={16} />}
              </button>
            </div>

            {/* LinkedIn Row */}
            <a 
              href={linkedinUrl}
              target="_blank" 
              className="group flex items-center justify-between border border-mono-light p-4 bg-mono-surface hover:border-mono-accent transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-mono-fg text-mono-bg">
                  <Linkedin size={16} />
                </div>
                <div>
                  <div className="text-[9px] font-bold text-mono-muted uppercase tracking-widest">Professional_Network</div>
                  <div className="text-[12px] font-mono font-bold text-mono-fg">linkedin.com/in/mahfuzcswe</div>
                </div>
              </div>
              <ExternalLink size={16} className="text-mono-muted group-hover:text-mono-accent transition-colors" />
            </a>

            {/* GitHub Row */}
            <a 
              href="https://github.com/MC-161" 
              target="_blank" 
              className="group flex items-center justify-between border border-mono-light p-4 bg-mono-surface hover:border-mono-accent transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-mono-fg text-mono-bg">
                  <Github size={16} />
                </div>
                <div>
                  <div className="text-[9px] font-bold text-mono-muted uppercase tracking-widest">Source_Registry</div>
                  <div className="text-[12px] font-mono font-bold text-mono-fg">github.com/MC-161</div>
                </div>
              </div>
              <ExternalLink size={16} className="text-mono-muted group-hover:text-mono-accent transition-colors" />
            </a>
          </div>

          <div className="pt-4 border-t border-mono-light">
            <button 
              onClick={downloadResume}
              className="flex items-center justify-center gap-3 w-full bg-mono-fg text-mono-bg py-4 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-mono-accent transition-colors shadow-[8px_8px_0px_#10b98130]"
            >
              <FileText size={16} />
              <span>View_Official_Resume (.pdf)</span>
            </button>
          </div>
        </div>

        <div className="p-4 bg-mono-surface border-t border-mono-light">
          <div className="flex justify-between items-center font-mono text-[8px] text-mono-muted uppercase tracking-widest">
            <span>U_LON // REGISTRY</span>
            <span>BUILD: 2025.01</span>
          </div>
        </div>
      </div>

      {/* Floating Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto bg-mono-fg text-mono-bg px-6 py-4 border-2 border-mono-fg transition-all shadow-[8px_8px_0px_#10b981] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none flex items-center gap-4 group ${isOpen ? 'hidden' : ''}`}
      >
        <div className="relative">
          <Mail size={18} className="group-hover:text-mono-accent transition-colors" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-mono-accent rounded-full animate-ping"></span>
        </div>
        <span className="mono-label text-[10px] font-black tracking-[0.2em]">Contact_Initiate</span>
      </button>
    </div>
  );
};

export default ContactPortal;