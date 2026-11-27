import React, { useState } from 'react';
import { 
  Download, 
  Bookmark, 
  BookmarkCheck, 
  Star, 
  ChevronDown, 
  Info, 
  ShieldCheck, 
  Zap, 
  Globe,
  ExternalLink
} from 'lucide-react';
import { ToolItem } from '../types';

interface ToolCardProps {
  tool: ToolItem;
  isSaved: boolean;
  onToggleSave: (tool: ToolItem) => void;
  onOpenDetail: (tool: ToolItem) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  isSaved,
  onToggleSave,
  onOpenDetail,
}) => {
  const [downloadDropdownOpen, setDownloadDropdownOpen] = useState(false);

  const primaryDownload = tool.downloads.windows?.url || tool.downloads.macos?.url || tool.downloads.web?.url || tool.downloads.linux?.url || tool.githubUrl;

  return (
    <div className="liquid-glass-card relative rounded-2xl p-5 sm:p-6 flex flex-col justify-between group">
      
      {/* Top Header Section */}
      <div>
        
        {/* Top Badges & Actions */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          
          <div className="flex items-center gap-3">
            {/* Liquid Glass App Logo */}
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center p-2 border border-white/15 select-none transition-transform group-hover:scale-105 shadow-[0_4px_16px_rgba(0,0,0,0.4)] shrink-0 overflow-hidden bg-white/[0.05]"
              style={{ color: tool.accentColor }}
            >
              {tool.logoUrl ? (
                <img 
                  src={tool.logoUrl} 
                  alt={`${tool.name} logo`} 
                  loading="lazy"
                  decoding="async"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `<span class="font-bold text-sm tracking-wider font-editorial" style="color: ${tool.accentColor}">${tool.name.slice(0, 3).toUpperCase()}</span>`;
                    }
                  }}
                />
              ) : (
                <span className="font-bold text-sm tracking-wider font-editorial" style={{ color: tool.accentColor }}>
                  {tool.name.slice(0, 3).toUpperCase()}
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-white group-hover:text-[#00E5FF] transition-colors font-editorial">
                  {tool.name}
                </h3>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-md bg-white/10 border border-white/10 text-[#D4D4D8]">
                  {tool.license}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-[#A1A1AA] mt-0.5 font-tech">
                <div className="flex items-center gap-1 text-amber-300">
                  <Star className="w-3 h-3 fill-amber-300" />
                  <span>{(tool.stars / 1000).toFixed(1)}k</span>
                </div>
                <span>•</span>
                <span className="capitalize">{tool.category}</span>
              </div>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={() => onToggleSave(tool)}
            title={isSaved ? 'In your Hunt Stack' : 'Save to Stack'}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              isSaved
                ? 'bg-gradient-to-r from-[#FF6B2C]/25 to-[#00E5FF]/20 border-[#FF6B2C] text-white shadow-[0_0_16px_rgba(255,107,44,0.3)]'
                : 'liquid-pill text-[#A1A1AA] hover:text-white'
            }`}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 text-[#FF6B2C]" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        {/* Replaces Paid App Banner (Apple Liquid Pill) */}
        <div className="mb-3.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-xs">
          <span className="text-[#A1A1AA] truncate mr-2">
            Replaces: <strong className="text-white font-medium">{tool.replaces.name}</strong>
          </span>
          <span className="text-[#00E5FF] font-tech font-bold shrink-0">
            Saves ${tool.replaces.annualCost}/yr
          </span>
        </div>

        {/* 1-Sentence Plain English Description */}
        <p className="text-xs text-[#D4D4D8] line-clamp-2 leading-relaxed mb-4 font-light">
          {tool.description}
        </p>

      </div>

      {/* Card Footer: Health & Action Buttons */}
      <div className="space-y-3 pt-3.5 border-t border-white/10">
        
        {/* Health status & difficulty badge */}
        <div className="flex items-center justify-between text-[11px] text-[#A1A1AA]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]"></span>
            <span className="text-emerald-400 font-medium font-tech">{tool.health.score}% Health</span>
          </div>

          <div className="flex items-center gap-1 text-[#D4D4D8]">
            {tool.difficulty === '1-click' ? (
              <Zap className="w-3 h-3 text-[#FF6B2C]" />
            ) : (
              <ShieldCheck className="w-3 h-3 text-[#00E5FF]" />
            )}
            <span className="capitalize">{tool.difficulty}</span>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center gap-2">
          {/* Direct 1-Click Download Button (Apple VisionOS Pill) */}
          <div className="relative flex-1">
            <div className="flex rounded-xl overflow-hidden shadow-lg">
              <a
                href={primaryDownload}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3.5 bg-white text-black hover:bg-white/90 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-[0_4px_16px_rgba(255,255,255,0.2)]"
              >
                {tool.downloads.web && !tool.downloads.windows ? (
                  <Globe className="w-3.5 h-3.5" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span>1-Click Download</span>
              </a>

              {/* OS Dropdown Toggle */}
              <button
                onClick={() => setDownloadDropdownOpen(!downloadDropdownOpen)}
                className="px-2.5 bg-white border-l border-black/10 text-black hover:bg-[#E4E4E7] transition-colors cursor-pointer"
                title="Select OS"
              >
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            {/* Dropdown Menu for all OS */}
            {downloadDropdownOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 liquid-glass-nav rounded-xl p-1.5 z-30 space-y-1 text-xs shadow-2xl">
                {tool.downloads.windows?.url && (
                  <a
                    href={tool.downloads.windows.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 text-white transition-colors"
                  >
                    <span>Windows (.exe / .msi)</span>
                    <Download className="w-3.5 h-3.5 text-[#00E5FF]" />
                  </a>
                )}
                {tool.downloads.macos?.url && (
                  <a
                    href={tool.downloads.macos.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 text-white transition-colors"
                  >
                    <span>macOS (.dmg / Apple Silicon)</span>
                    <Download className="w-3.5 h-3.5 text-[#FF6B2C]" />
                  </a>
                )}
                {tool.downloads.linux?.url && (
                  <a
                    href={tool.downloads.linux.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 text-white transition-colors"
                  >
                    <span>Linux (.AppImage / deb)</span>
                    <Download className="w-3.5 h-3.5 text-purple-400" />
                  </a>
                )}
                {tool.downloads.web?.url && (
                  <a
                    href={tool.downloads.web.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 text-white transition-colors"
                  >
                    <span>Launch Web App</span>
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Quick Details Modal Trigger */}
          <button
            onClick={() => onOpenDetail(tool)}
            className="p-2.5 rounded-xl liquid-pill text-[#A1A1AA] hover:text-white transition-all cursor-pointer"
            title="View Details & Comparison"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
