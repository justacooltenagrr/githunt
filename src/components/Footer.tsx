import React from 'react';
import { ShieldCheck, GitBranch } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-24 border-t border-white/10 py-14 px-4 sm:px-6 lg:px-8 text-xs text-[#71717A]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        
        {/* Brand & Mission */}
        <div className="max-w-md">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-xl bg-[#0B0F1D] border border-white/15 overflow-hidden flex items-center justify-center p-1 shadow-md">
              <img src="/githunt-icon.jpg" alt="GitHunt" className="w-full h-full object-cover rounded-lg" />
            </div>
            <span className="text-lg font-bold text-white font-editorial tracking-tight">
              Git<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B2C] to-[#00E5FF]">Hunt</span>
            </span>
          </div>
          <p className="text-xs text-[#A1A1AA] font-light leading-relaxed mb-3">
            Free software discovery made effortless. Direct 1-click downloads, verified repository links, and transparent community health metrics.
          </p>
          <p className="text-[11px] text-[#52525B] font-tech">
            &copy; 2026 GitHunt &bull; 100% Free &amp; Open Source under MIT License.
          </p>
        </div>

        {/* Navigation & Trust Links (Liquid Glass Cards) */}
        <div className="flex flex-wrap gap-8 text-xs font-sans">
          <div>
            <h4 className="text-white font-medium mb-3 font-tech uppercase text-[11px] tracking-wider">
              Ecosystem
            </h4>
            <ul className="space-y-2 text-[#A1A1AA]">
              <li><a href="#catalog" className="hover:text-white transition-colors">Software Catalog</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1"><span>GitHub REST API</span> <GitBranch className="w-3 h-3 text-[#00E5FF]" /></a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-3 font-tech uppercase text-[11px] tracking-wider">
              Verification Standards
            </h4>
            <ul className="space-y-2 text-[#A1A1AA]">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Telemetry Guarantee</span>
              </li>
              <li><span>Direct GitHub Releases</span></li>
              <li><span>Multi-OS Binary Verification</span></li>
            </ul>
          </div>

          <div className="max-w-xs">
            <h4 className="text-white font-medium mb-3 font-tech uppercase text-[11px] tracking-wider">
              Free &amp; Open Source
            </h4>
            <p className="text-xs text-[#71717A] leading-relaxed">
              Every tool in GitHunt is licensed under OSI-approved open source terms (MIT, GPL, Apache 2.0, BSD) with direct upstream releases.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
