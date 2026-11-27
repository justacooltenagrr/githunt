import React from 'react';
import { Search, X, Monitor, Apple, Terminal, Globe, ArrowUpDown } from 'lucide-react';
import { CategoryType, PlatformType } from '../types';

interface SearchAndFiltersProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: CategoryType;
  setSelectedCategory: (c: CategoryType) => void;
  selectedPlatform: PlatformType | 'all';
  setSelectedPlatform: (p: PlatformType | 'all') => void;
  sortBy: 'stars' | 'savings' | 'updated' | 'name';
  setSortBy: (s: 'stars' | 'savings' | 'updated' | 'name') => void;
  totalResults: number;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedPlatform,
  setSelectedPlatform,
  sortBy,
  setSortBy,
  totalResults,
  onResetFilters,
  hasActiveFilters,
}) => {
  const categories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'All Software' },
    { id: 'creative', label: 'Creative & Design' },
    { id: 'office', label: 'Office & Productivity' },
    { id: 'privacy', label: 'Privacy & Security' },
    { id: 'utilities', label: 'System Utilities' },
    { id: 'fonts', label: 'Open Fonts' },
    { id: 'icons', label: 'Icon Packs' },
    { id: 'webtools', label: 'Web Utilities' },
  ];

  const suggestedSearches = [
    'Photoshop',
    'Microsoft 365',
    'Notion',
    'OBS Studio',
    'Figma',
    '1Password',
  ];

  return (
    <div id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 space-y-5">
      
      {/* Liquid Glass Search Bar */}
      <div className="relative">
        <Search className="w-5 h-5 text-[#A1A1AA] absolute left-4.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by need or paid software (e.g. 'Photoshop', 'Notion', 'video editor', 'PDF')..."
          className="w-full liquid-glass-input text-sm sm:text-base text-white pl-13 pr-12 py-4 rounded-2xl placeholder-[#71717A] focus:outline-none transition-all font-light"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggested Quick Searches in Liquid Glass Pills */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs text-[#A1A1AA] font-tech scrollbar-none pb-1">
        <span className="shrink-0 text-[#71717A]">Quick Hunt:</span>
        {suggestedSearches.map((term) => (
          <button
            key={term}
            onClick={() => setSearchQuery(term)}
            className="shrink-0 px-3 py-1 rounded-full liquid-pill hover:text-white transition-all cursor-pointer"
          >
            {term}
          </button>
        ))}
      </div>

      {/* Category Pills Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#FF6B2C] to-[#FFA24C] text-white font-semibold shadow-[0_4px_16px_rgba(255,107,44,0.4)] border border-white/25'
                  : 'liquid-pill text-[#A1A1AA] hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Filter Bar: Platform & Sorting (Liquid Glass Strip) */}
      <div className="p-3 rounded-2xl liquid-glass-card flex flex-wrap items-center justify-between gap-4 text-xs text-[#A1A1AA]">
        
        {/* Platform Selection */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-tech text-[#71717A] mr-1">OS:</span>
          {[
            { id: 'all', label: 'All' },
            { id: 'windows', label: 'Windows', icon: Monitor },
            { id: 'mac', label: 'macOS', icon: Apple },
            { id: 'linux', label: 'Linux', icon: Terminal },
            { id: 'web', label: 'Web', icon: Globe },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = selectedPlatform === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedPlatform(item.id as PlatformType | 'all')}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white/15 text-white font-medium border border-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.3)]'
                    : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sorting & Results Count */}
        <div className="flex items-center gap-3">
          <span className="font-tech text-[#A1A1AA]">
            <strong className="text-white font-semibold">{totalResults}</strong> tools found
          </span>

          <div className="flex items-center gap-1.5 pl-3 border-l border-white/10">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#71717A]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#0D1222] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="stars">Most GitHub Stars</option>
              <option value="savings">Highest Savings</option>
              <option value="updated">Recently Updated</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="text-[#00E5FF] hover:text-white underline text-xs cursor-pointer ml-1 font-tech"
            >
              Reset
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
