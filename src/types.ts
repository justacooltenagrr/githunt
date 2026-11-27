export type PlatformType = 'windows' | 'macos' | 'linux' | 'web' | 'android' | 'ios';

export type CategoryType = 
  | 'all'
  | 'creative'
  | 'office'
  | 'privacy'
  | 'utilities'
  | 'fonts'
  | 'icons'
  | 'webtools';

export type DifficultyType = '1-click' | 'portable' | 'basic-setup' | 'web';

export interface DownloadLink {
  url: string;
  label: string;
  fileType: string;
}

export interface ToolItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: CategoryType;
  categoryLabel: string;
  replaces: {
    name: string;
    annualCost: number;
    category: string;
  };
  platforms: PlatformType[];
  difficulty: DifficultyType;
  difficultyLabel: string;
  stars: number;
  health: {
    status: 'active' | 'maintained' | 'stale';
    lastCommit: string;
    score: number;
  };
  license: string;
  githubUrl: string;
  websiteUrl: string;
  downloads: {
    windows?: DownloadLink;
    macos?: DownloadLink;
    linux?: DownloadLink;
    web?: DownloadLink;
  };
  features: string[];
  whySwitch: string;
  iconBg: string;
  accentColor: string;
  logoUrl?: string;
  starterPacks: string[];
}

export interface StarterPack {
  id: string;
  title: string;
  emoji: string;
  tagline: string;
  description: string;
  toolIds: string[];
  annualSavings: number;
  accent: string;
  targetAudience: string;
}
