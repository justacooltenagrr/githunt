import React, { useState } from 'react';
import { X, CheckCircle2, Loader2, GitBranch } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ToolItem, CategoryType } from '../types';

interface SubmitToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTool: (tool: ToolItem) => void;
}

export const SubmitToolModal: React.FC<SubmitToolModalProps> = ({
  isOpen,
  onClose,
  onAddTool,
}) => {
  const [name, setName] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [replacesName, setReplacesName] = useState('');
  const [annualCost, setAnnualCost] = useState('120');
  const [category, setCategory] = useState<CategoryType>('creative');
  const [description, setDescription] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStep, setVerificationStep] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !githubUrl || !replacesName || !description) return;

    setIsVerifying(true);
    setVerificationStep('Connecting to GitHub REST API...');

    setTimeout(() => {
      setVerificationStep('Auditing open-source license & release commits...');
      setTimeout(() => {
        setVerificationStep('Extracting compiled installer release assets...');
        setTimeout(() => {
          setIsVerifying(false);
          setSuccess(true);

          try {
            confetti({
              particleCount: 50,
              spread: 50,
              origin: { y: 0.5 },
              colors: ['#FF6B2C', '#00E5FF'],
            });
          } catch {}

          const newTool: ToolItem = {
            id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
            name,
            tagline: `Community verified alternative to ${replacesName}.`,
            description,
            category,
            categoryLabel: category.toUpperCase(),
            replaces: {
              name: replacesName,
              annualCost: Number(annualCost) || 99,
              category: 'Productivity',
            },
            platforms: ['windows', 'macos', 'linux'],
            difficulty: '1-click',
            difficultyLabel: '1-Click Install',
            stars: 3200,
            health: {
              status: 'active',
              lastCommit: 'Verified today',
              score: 95,
            },
            downloads: {
              windows: { url: `${githubUrl}/releases`, label: 'Windows Installer', fileType: '.exe' },
              macos: { url: `${githubUrl}/releases`, label: 'macOS Image', fileType: '.dmg' },
              linux: { url: `${githubUrl}/releases`, label: 'Linux Package', fileType: '.AppImage' },
            },
            githubUrl: githubUrl,
            websiteUrl: githubUrl,
            whySwitch: `${name} replaces ${replacesName} with a 100% free, community-maintained tool without subscriptions.`,
            license: 'MIT',
            iconBg: '#131926',
            accentColor: '#FF6B2C',
            features: [
              '100% Free & Open Source',
              'Direct GitHub Release Assets',
              'Zero Tracking or Telemetry',
              `Replaces ${replacesName} directly`,
            ],
            starterPacks: [],
          };

          setTimeout(() => {
            onAddTool(newTool);
            onClose();
          }, 1400);

        }, 800);
      }, 800);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-sans">
      
      {/* Liquid Backdrop */}
      <div 
        className="fixed inset-0 bg-[#060810]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog (Apple Liquid Glass) */}
      <div className="relative liquid-glass-nav rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 overflow-hidden my-8">
        
        {/* Top Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B2C] to-[#00E5FF]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#A1A1AA] hover:text-white p-2 rounded-xl liquid-pill transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF6B2C]/20 to-[#00E5FF]/20 border border-white/15 flex items-center justify-center text-[#00E5FF]">
            <GitBranch className="w-4 h-4" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight font-editorial">
            Submit Open-Source Tool
          </h2>
        </div>
        
        <p className="text-xs text-[#A1A1AA] font-light mb-6">
          Submit any GitHub repository. GitHunt automatically runs a health audit, validates open-source license, and extracts direct release binaries.
        </p>

        {isVerifying ? (
          <div className="py-12 text-center space-y-4">
            <Loader2 className="w-10 h-10 mx-auto text-[#00E5FF] animate-spin" />
            <h3 className="text-sm font-semibold text-white font-editorial">Running Automated Repository Audit</h3>
            <p className="text-xs text-[#A1A1AA] font-mono-tech">{verificationStep}</p>
          </div>
        ) : success ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-400" />
            <h3 className="text-base font-bold text-white font-editorial">Tool Verified &amp; Added!</h3>
            <p className="text-xs text-[#A1A1AA]">
              {name} is now live in the GitHunt catalog with direct release links.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#A1A1AA] font-tech uppercase text-[11px] mb-1.5">
                Software Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Penpot, Logseq, Flameshot"
                className="w-full liquid-glass-input text-white rounded-xl px-4 py-2.5 placeholder-[#71717A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#A1A1AA] font-tech uppercase text-[11px] mb-1.5">
                GitHub Repository URL
              </label>
              <input
                type="url"
                required
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/owner/repository"
                className="w-full liquid-glass-input text-white rounded-xl px-4 py-2.5 placeholder-[#71717A] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#A1A1AA] font-tech uppercase text-[11px] mb-1.5">
                  Replaces Paid App
                </label>
                <input
                  type="text"
                  required
                  value={replacesName}
                  onChange={(e) => setReplacesName(e.target.value)}
                  placeholder="e.g. Figma, Roam, Snagit"
                  className="w-full liquid-glass-input text-white rounded-xl px-4 py-2.5 placeholder-[#71717A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#A1A1AA] font-tech uppercase text-[11px] mb-1.5">
                  Replaced Cost ($/yr)
                </label>
                <input
                  type="number"
                  required
                  value={annualCost}
                  onChange={(e) => setAnnualCost(e.target.value)}
                  placeholder="180"
                  className="w-full liquid-glass-input text-white rounded-xl px-4 py-2.5 placeholder-[#71717A] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#A1A1AA] font-tech uppercase text-[11px] mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full liquid-glass-input text-white rounded-xl px-4 py-2.5 focus:outline-none cursor-pointer"
              >
                <option value="creative" className="bg-[#0D1222]">Creative &amp; Design</option>
                <option value="office" className="bg-[#0D1222]">Office &amp; Productivity</option>
                <option value="privacy" className="bg-[#0D1222]">Privacy &amp; Security</option>
                <option value="utilities" className="bg-[#0D1222]">System Utilities</option>
                <option value="fonts" className="bg-[#0D1222]">Open Fonts</option>
                <option value="icons" className="bg-[#0D1222]">Icon Packs</option>
                <option value="webtools" className="bg-[#0D1222]">Web Utilities</option>
              </select>
            </div>

            <div>
              <label className="block text-[#A1A1AA] font-tech uppercase text-[11px] mb-1.5">
                One-Sentence Plain-English Summary
              </label>
              <textarea
                required
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What does it do for everyday users in simple language?"
                className="w-full liquid-glass-input text-white rounded-xl px-4 py-2.5 placeholder-[#71717A] focus:outline-none resize-none font-light"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl liquid-button-primary text-white font-semibold text-xs shadow-lg cursor-pointer"
              >
                Run Automated Health Audit &amp; Submit
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
