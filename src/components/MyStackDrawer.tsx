import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Download, 
  Share2, 
  Check, 
  Coins, 
  Layers 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ToolItem } from '../types';

interface MyStackDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedTools: ToolItem[];
  onRemoveTool: (id: string) => void;
  onClearStack: () => void;
}

export const MyStackDrawer: React.FC<MyStackDrawerProps> = ({
  isOpen,
  onClose,
  savedTools,
  onRemoveTool,
  onClearStack,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const totalAnnualSavings = savedTools.reduce((acc, t) => acc + t.replaces.annualCost, 0);

  const handleShare = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FF6B2C', '#00E5FF', '#FFA24C', '#6366F1'],
      });
    } catch (e) {}

    const toolList = savedTools.map(t => `• ${t.name} (Replaces ${t.replaces.name} - $${t.replaces.annualCost}/yr)`).join('\n');
    const shareText = `🎯 My Free Open-Source Stack on GitHunt (Saving $${totalAnnualSavings}/year!):\n\n${toolList}\n\nDiscovered via GitHunt — Free Software & Direct Repo Links: https://githunt.netlify.app`;

    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleOpenAllDownloads = () => {
    savedTools.forEach((tool, i) => {
      const url = tool.downloads.windows?.url || tool.downloads.macos?.url || tool.downloads.web?.url || tool.downloads.linux?.url || tool.githubUrl;
      if (url) {
        setTimeout(() => {
          window.open(url, '_blank');
        }, i * 300);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      
      {/* Liquid Backdrop */}
      <div 
        className="absolute inset-0 bg-[#060810]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md liquid-glass-nav border-l border-white/15 flex flex-col justify-between shadow-2xl">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <span className="text-xl font-bold text-white font-editorial tracking-tight">
                  My Hunt Stack
                </span>
                <span className="px-2.5 py-0.5 rounded-full liquid-pill text-xs text-[#00E5FF] font-tech font-bold">
                  {savedTools.length} {savedTools.length === 1 ? 'tool' : 'tools'}
                </span>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl liquid-pill text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Total Annual Savings Highlight Box (Liquid Glass Glow) */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#FF6B2C]/20 via-[#00E5FF]/10 to-transparent border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-tech text-[#A1A1AA] uppercase tracking-wider block">
                    Calculated Annual Savings
                  </span>
                  <div className="text-3xl font-tech font-extrabold text-white mt-1">
                    ${totalAnnualSavings.toLocaleString()}
                    <span className="text-sm font-normal text-[#A1A1AA]"> / year</span>
                  </div>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#FF6B2C] to-[#FFA24C] flex items-center justify-center text-white shadow-lg">
                  <Coins className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Drawer Tool List Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {savedTools.length === 0 ? (
              <div className="text-center py-20 text-[#A1A1AA]">
                <Layers className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#00E5FF]" />
                <p className="text-sm text-white font-medium mb-1 font-editorial">Your stack is empty</p>
                <p className="text-xs text-[#71717A] max-w-xs mx-auto font-light">
                  Click the bookmark icon on any software card to calculate your total annual subscription savings.
                </p>
              </div>
            ) : (
              savedTools.map((tool) => {
                const downloadUrl = tool.downloads.windows?.url || tool.downloads.macos?.url || tool.downloads.web?.url || tool.downloads.linux?.url || tool.githubUrl;
                return (
                  <div
                    key={tool.id}
                    className="p-4 rounded-2xl liquid-glass-card flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center p-1.5 shrink-0 select-none border border-white/10 shadow-sm overflow-hidden bg-white/[0.04]"
                        style={{ color: tool.accentColor }}
                      >
                        {tool.logoUrl ? (
                          <img 
                            src={tool.logoUrl} 
                            alt={`${tool.name} logo`} 
                            decoding="async"
                            width={32}
                            height={32}
                            className="w-full h-full object-contain filter drop-shadow"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              if (target.parentElement) {
                                target.parentElement.innerHTML = `<span class="font-bold text-xs" style="color: ${tool.accentColor}">${tool.name.slice(0, 3).toUpperCase()}</span>`;
                              }
                            }}
                          />
                        ) : (
                          <span className="font-bold text-xs" style={{ color: tool.accentColor }}>
                            {tool.name.slice(0, 3).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-semibold text-white truncate font-editorial">
                          {tool.name}
                        </h4>
                        <p className="text-[11px] text-[#A1A1AA] truncate">
                          Replaces {tool.replaces.name} &bull; <span className="text-[#00E5FF] font-tech font-semibold">+${tool.replaces.annualCost}/yr</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href={downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-white text-black hover:bg-white/90 transition-colors shadow-sm"
                        title="Download Installer"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => onRemoveTool(tool.id)}
                        className="p-2 rounded-xl text-[#71717A] hover:text-red-400 hover:bg-red-950/30 transition-colors cursor-pointer"
                        title="Remove from Stack"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Actions Footer */}
          {savedTools.length > 0 && (
            <div className="p-6 border-t border-white/10 space-y-3">
              
              <button
                onClick={handleShare}
                className="w-full py-3 px-4 rounded-xl liquid-button-primary text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                {copied ? <Check className="w-4 h-4 text-white" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Stack Summary Copied!' : 'Share My Stack Summary'}</span>
              </button>

              <button
                onClick={handleOpenAllDownloads}
                className="w-full py-2.5 px-4 rounded-xl liquid-button-glass text-white text-xs font-medium flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#00E5FF]" />
                <span>Open All Download Links ({savedTools.length})</span>
              </button>

              <button
                onClick={onClearStack}
                className="w-full py-1 text-center text-[11px] text-[#71717A] hover:text-red-400 transition-colors cursor-pointer"
              >
                Clear Entire Stack
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
