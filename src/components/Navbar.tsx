import React from 'react';
import { Bookmark, PlusCircle, Search } from 'lucide-react';
import type { ToolItem } from '../types';

interface NavbarProps {
  savedTools: ToolItem[];
  onOpenStack: () => void;
  onSubmitTool: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
}

export const Navbar: React.FC<NavbarProps> = ({
  savedTools,
  onOpenStack,
  onSubmitTool,
  searchQuery,
  setSearchQuery,
  searchInputRef,
}) => {
  const totalSavings = savedTools.reduce((acc, t) => acc + t.replaces.annualCost, 0);

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-6 lg:px-8 pt-3 pb-2 transition-all">
      <div className="max-w-7xl mx-auto h-16 rounded-2xl liquid-glass-nav px-4 sm:px-6 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Name */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none group shrink-0" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="relative h-10 w-10 rounded-xl bg-[#0B0F1D]/80 border border-white/15 overflow-hidden flex items-center justify-center p-1 group-hover:border-[#00E5FF]/60 group-hover:shadow-[0_0_16px_rgba(0,229,255,0.3)] transition-all">
            <img 
              src="/githunt-icon.jpg" 
              alt="GitHunt Logo" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white font-editorial">
                Git<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B2C] to-[#00E5FF]">Hunt</span>
              </span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5FF]"></span>
              </span>
            </div>
            <p className="text-[9px] font-tech tracking-wider text-[#A1A1AA] uppercase">
              Free Software &amp; Repo Links
            </p>
          </div>
        </div>

        {/* Apple Liquid Glass Global Search in Nav */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
          <Search className="w-3.5 h-3.5 text-[#A1A1AA] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Hunt free software: 'Photoshop', 'Notion', 'OBS'..."
            className="w-full liquid-glass-input text-xs text-[#F4F4F5] pl-9 pr-14 py-2.5 rounded-xl placeholder-[#71717A] focus:outline-none transition-all font-sans"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[9px] font-tech text-[#A1A1AA] bg-white/10 border border-white/10 rounded">
            Ctrl K
          </kbd>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Submit Tool Button */}
          <button
            onClick={onSubmitTool}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl liquid-pill text-xs font-medium text-[#E4E4E7] hover:text-white transition-all cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>Submit Tool</span>
          </button>

          {/* My Stack Drawer Trigger (Liquid Gradient Glass) */}
          <button
            onClick={onOpenStack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF6B2C] to-[#FF8A3D] text-white text-xs font-medium transition-all shadow-[0_4px_20px_rgba(255,107,44,0.4)] hover:shadow-[0_6px_28px_rgba(255,107,44,0.6)] hover:scale-[1.02] cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
            <span className="font-tech font-bold">Hunt Stack</span>
            {savedTools.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-md bg-black/35 text-[10px] font-tech font-extrabold text-[#00E5FF]">
                ${totalSavings}/yr
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
