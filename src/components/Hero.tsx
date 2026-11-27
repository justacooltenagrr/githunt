import React from 'react';
import { ArrowDown, Zap, Shield, GitBranch, Ban } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative pt-8 pb-12 overflow-hidden">
      {/* High-Performance Apple Liquid Glass Ambient Light Orbs (Zero Blur Filter Overhead) */}
      <div 
        className="absolute top-0 left-1/3 -translate-x-1/2 -z-10 w-[550px] h-[350px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(255, 107, 44, 0.16) 0%, rgba(255, 138, 61, 0.05) 50%, transparent 70%)' }}
      />
      <div 
        className="absolute top-10 right-1/4 -z-10 w-[600px] h-[380px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(0, 229, 255, 0.14) 0%, rgba(0, 180, 216, 0.04) 50%, transparent 72%)' }}
      />
      <div 
        className="absolute top-32 left-1/2 -translate-x-1/2 -z-10 w-[400px] h-[250px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Header */}
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Liquid Glass Kicker Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-pill text-xs font-tech text-[#F4F4F5] mb-6 select-none">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse"></span>
            <span className="tracking-wider uppercase font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B2C] to-[#00E5FF]">
              GitHunt Platform
            </span>
            <span className="text-[#71717A]">•</span>
            <span className="text-[#A1A1AA] font-normal">Free Software &amp; Direct Repo Links</span>
          </div>

          {/* Official GitHunt Logo Card (Apple Liquid Glass Frame) */}
          <div className="flex justify-center mb-8">
            <div className="relative group p-2 rounded-2xl liquid-glass-card shadow-2xl transition-transform duration-200 hover:scale-[1.01]">
              <img 
                src="/githunt-logo.jpg" 
                alt="GitHunt — Free Software & Direct Repo Links" 
                className="h-24 sm:h-36 w-auto object-contain rounded-xl select-none"
                decoding="async"
              />
            </div>
          </div>

          {/* Ultra-Clean Modern Headline */}
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white mb-5 font-editorial leading-[1.12]">
            Find Free Open-Source Software.{' '}
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B2C] via-[#FFA24C] to-[#00E5FF]">
              Direct Repo Links. Zero Complexity.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#A1A1AA] max-w-2xl mx-auto font-light leading-relaxed mb-8">
            GitHunt tracks the best open-source software and digital tools, bypassing confusing developer tabs to give you 1-click downloads, verified repository links, and free alternatives to expensive subscriptions.
          </p>

          {/* Apple Liquid Glass Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-[#E4E4E7] mb-10 select-none">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full liquid-pill">
              <Zap className="w-3.5 h-3.5 text-[#FF6B2C]" />
              <span>1-Click Direct Downloads</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full liquid-pill">
              <GitBranch className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>Official GitHub Repo Links</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full liquid-pill">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Free &amp; Open Source</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full liquid-pill">
              <Ban className="w-3.5 h-3.5 text-amber-400" />
              <span>Zero Telemetry or Adware</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={onExploreClick}
              className="px-7 py-3.5 rounded-xl liquid-button-primary text-white font-medium text-sm flex items-center gap-2 cursor-pointer"
            >
              <span className="font-semibold tracking-wide">Hunt Free Software</span>
              <ArrowDown className="w-4 h-4" />
            </button>
            <a
              href="#catalog"
              className="px-6 py-3.5 rounded-xl liquid-button-glass text-[#E4E4E7] text-sm font-medium transition-all cursor-pointer"
            >
              Browse Catalog
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
