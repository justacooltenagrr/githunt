import React from 'react';
import { 
  X, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  Activity, 
  CheckCircle2, 
  Monitor, 
  Apple, 
  Terminal, 
  Globe 
} from 'lucide-react';
import { ToolItem } from '../types';

interface ToolDetailModalProps {
  tool: ToolItem | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (tool: ToolItem) => void;
}

export const ToolDetailModal: React.FC<ToolDetailModalProps> = ({
  tool,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
}) => {
  if (!isOpen || !tool) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-sans">
      
      {/* Liquid Backdrop */}
      <div 
        className="fixed inset-0 bg-[#060810]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog (Apple Liquid Glass) */}
      <div className="relative liquid-glass-nav rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 overflow-hidden my-8">
        
        {/* Top Accent Strip */}
        <div 
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B2C] via-[#FF8A3D] to-[#00E5FF]"
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#A1A1AA] hover:text-white p-2 rounded-xl liquid-pill transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header: Icon, Name & Actions */}
        <div className="flex items-start gap-4 mb-6 pr-10">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center p-2.5 border border-white/20 shadow-xl select-none shrink-0 overflow-hidden bg-white/[0.05]"
            style={{ color: tool.accentColor }}
          >
            {tool.logoUrl ? (
              <img 
                src={tool.logoUrl} 
                alt={`${tool.name} logo`} 
                decoding="async"
                width={56}
                height={56}
                className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.innerHTML = `<span class="font-bold text-lg font-editorial" style="color: ${tool.accentColor}">${tool.name.slice(0, 3).toUpperCase()}</span>`;
                  }
                }}
              />
            ) : (
              <span className="font-bold text-lg font-editorial" style={{ color: tool.accentColor }}>
                {tool.name.slice(0, 3).toUpperCase()}
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-2xl font-bold text-white tracking-tight font-editorial">
                {tool.name}
              </h2>
              <span className="text-xs font-mono-tech px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[#E4E4E7]">
                {tool.license}
              </span>
            </div>
            <p className="text-sm text-[#A1A1AA] mt-1 font-light">
              {tool.tagline}
            </p>
          </div>
        </div>

        {/* Replaces Paid App Comparison Pill */}
        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
          <div>
            <span className="text-[11px] font-tech uppercase tracking-wider text-[#A1A1AA] block">
              Direct Replacement For
            </span>
            <span className="text-base font-semibold text-white">
              {tool.replaces.name}
            </span>
          </div>
          <div className="sm:text-right">
            <span className="text-[11px] font-tech uppercase tracking-wider text-[#A1A1AA] block">
              Annual Subscription Saved
            </span>
            <span className="text-xl font-tech font-bold text-[#00E5FF]">
              ${tool.replaces.annualCost}/year
            </span>
          </div>
        </div>

        {/* Why Switch Section */}
        <div className="mb-6">
          <h3 className="text-xs font-tech uppercase tracking-wider text-[#A1A1AA] mb-2">
            Why Switch to {tool.name}?
          </h3>
          <p className="text-sm text-[#E4E4E7] leading-relaxed font-light">
            {tool.whySwitch}
          </p>
        </div>

        {/* Key Features Bullet Grid */}
        <div className="mb-6">
          <h3 className="text-xs font-tech uppercase tracking-wider text-[#A1A1AA] mb-3">
            Core Highlights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {tool.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-[#D4D4D8]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live GitHub Repository Vetting */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 text-xs text-[#A1A1AA] flex flex-wrap items-center justify-between gap-3 font-tech">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#00E5FF]" />
            <span>Health Score: <strong className="text-white">{tool.health.score}%</strong> (Actively Maintained)</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Stars: <strong className="text-white">{tool.stars.toLocaleString()}</strong></span>
            <span>Status: <strong className="text-emerald-400 capitalize">{tool.health.status}</strong></span>
          </div>
        </div>

        {/* Downloads & External Links */}
        <div className="space-y-3">
          <h3 className="text-xs font-tech uppercase tracking-wider text-[#A1A1AA]">
            Direct 1-Click Installers
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {tool.downloads.windows?.url && (
              <a
                href={tool.downloads.windows.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white text-black hover:bg-white/90 text-xs font-semibold transition-all shadow-md"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Windows (.exe)</span>
              </a>
            )}
            {tool.downloads.macos?.url && (
              <a
                href={tool.downloads.macos.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white text-black hover:bg-white/90 text-xs font-semibold transition-all shadow-md"
              >
                <Apple className="w-3.5 h-3.5" />
                <span>macOS (.dmg)</span>
              </a>
            )}
            {tool.downloads.linux?.url && (
              <a
                href={tool.downloads.linux.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl liquid-button-glass text-white text-xs font-medium transition-all"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Linux (.AppImage)</span>
              </a>
            )}
            {tool.downloads.web?.url && (
              <a
                href={tool.downloads.web.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white text-black hover:bg-white/90 text-xs font-semibold transition-all shadow-md"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Open Web App</span>
              </a>
            )}
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
          <a
            href={tool.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-[#00E5FF] hover:text-white transition-colors font-tech"
          >
            <span>View Source on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => onToggleSave(tool)}
            className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
              isSaved
                ? 'bg-gradient-to-r from-[#FF6B2C]/30 to-[#00E5FF]/30 border border-[#FF6B2C] text-white shadow-[0_0_16px_rgba(255,107,44,0.3)]'
                : 'liquid-button-glass text-white'
            }`}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 text-[#FF6B2C]" /> : <Bookmark className="w-4 h-4" />}
            <span>{isSaved ? 'In Your Stack' : 'Save to Hunt Stack'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
