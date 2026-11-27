import React, { useState, useMemo, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { TOOLS } from './data/tools';
import { ToolItem, CategoryType, PlatformType } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SearchAndFilters } from './components/SearchAndFilters';
import { ToolCard } from './components/ToolCard';
import { ToolDetailModal } from './components/ToolDetailModal';
import { MyStackDrawer } from './components/MyStackDrawer';
import { SubmitToolModal } from './components/SubmitToolModal';
import { Footer } from './components/Footer';
import { Layers, CheckCircle2 } from 'lucide-react';

export function App() {
  const [tools, setTools] = useState<ToolItem[]>(TOOLS);
  const [savedToolIds, setSavedToolIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('githunt_saved_tools') || localStorage.getItem('gitradar_saved_tools');
      return stored ? JSON.parse(stored) : ['obs-studio', 'krita', 'libreoffice', 'bitwarden'];
    } catch {
      return ['obs-studio', 'krita', 'libreoffice', 'bitwarden'];
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'stars' | 'savings' | 'updated' | 'name'>('stars');

  // Modals & Drawer States
  const [activeDetailTool, setActiveDetailTool] = useState<ToolItem | null>(null);
  const [isStackOpen, setIsStackOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync saved tools to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('githunt_saved_tools', JSON.stringify(savedToolIds));
    } catch {}
  }, [savedToolIds]);

  // Global Keyboard Shortcuts (Ctrl+K to focus search, Esc to close modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setActiveDetailTool(null);
        setIsStackOpen(false);
        setIsSubmitOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Toggle tool in My Stack
  const handleToggleSave = (tool: ToolItem) => {
    setSavedToolIds((prev) => {
      if (prev.includes(tool.id)) {
        showToast(`Removed ${tool.name} from Hunt Stack`);
        return prev.filter(id => id !== tool.id);
      } else {
        try {
          confetti({
            particleCount: 40,
            spread: 55,
            origin: { y: 0.7 },
            colors: ['#FF6B2C', '#00E5FF', '#FFA24C'],
          });
        } catch {}
        showToast(`Added ${tool.name} to Stack (+$${tool.replaces.annualCost}/yr saved)`);
        return [...prev, tool.id];
      }
    });
  };

  const handleRemoveTool = (id: string) => {
    setSavedToolIds((prev) => prev.filter(toolId => toolId !== id));
  };

  const handleClearStack = () => {
    setSavedToolIds([]);
    showToast('Cleared your hunt stack.');
  };

  const handleAddCommunityTool = (newTool: ToolItem) => {
    setTools((prev) => [newTool, ...prev]);
    showToast(`Added ${newTool.name} to verified catalogue!`);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPlatform('all');
  };

  const handleScrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered & Sorted Tools
  const filteredTools = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return tools.filter((tool) => {
      // Category filter
      if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
        return false;
      }

      // Platform filter
      if (selectedPlatform !== 'all' && !tool.platforms.includes(selectedPlatform)) {
        return false;
      }

      // Search Query filter (matches name, replaces name, description, features, category)
      if (q) {
        const matchesName = tool.name.toLowerCase().includes(q);
        const matchesReplaces = tool.replaces.name.toLowerCase().includes(q);
        const matchesDesc = tool.description.toLowerCase().includes(q);
        const matchesTagline = tool.tagline.toLowerCase().includes(q);
        const matchesCat = tool.categoryLabel.toLowerCase().includes(q);
        const matchesFeatures = tool.features.some(f => f.toLowerCase().includes(q));

        if (!matchesName && !matchesReplaces && !matchesDesc && !matchesTagline && !matchesCat && !matchesFeatures) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'stars') return b.stars - a.stars;
      if (sortBy === 'savings') return b.replaces.annualCost - a.replaces.annualCost;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return b.health.score - a.health.score;
    });
  }, [tools, searchQuery, selectedCategory, selectedPlatform, sortBy]);

  const savedTools = useMemo(() => {
    return tools.filter(t => savedToolIds.includes(t.id));
  }, [tools, savedToolIds]);

  const hasActiveFilters = Boolean(
    searchQuery || 
    selectedCategory !== 'all' || 
    selectedPlatform !== 'all'
  );

  return (
    <div className="min-h-screen bg-[#060810] text-[#F4F4F5] flex flex-col font-sans selection:bg-[#FF6B2C] selection:text-white">
      
      {/* Liquid Glass Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 liquid-glass-nav text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-medium border border-white/20 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#00E5FF]" />
          <span>{notification}</span>
        </div>
      )}

      {/* Floating Apple Liquid Glass Navigation */}
      <Navbar
        savedTools={savedTools}
        onOpenStack={() => setIsStackOpen(true)}
        onSubmitTool={() => setIsSubmitOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchInputRef={searchInputRef}
      />

      {/* Hero Section */}
      <Hero onExploreClick={handleScrollToCatalog} />

      {/* Interactive Catalog Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Search, Categories & Filter Controls */}
        <SearchAndFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedPlatform={selectedPlatform}
          setSelectedPlatform={setSelectedPlatform}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalResults={filteredTools.length}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Bento Grid of Tool Cards (Apple Liquid Glass) */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-20 liquid-glass-card rounded-3xl p-8 max-w-xl mx-auto my-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#A1A1AA]">
              <Layers className="w-7 h-7 text-[#00E5FF]" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1 font-editorial">
              No matching software found
            </h3>
            <p className="text-xs text-[#A1A1AA] mb-6 font-light">
              Try searching by need (e.g. &ldquo;Photoshop&rdquo;, &ldquo;Notion&rdquo;, &ldquo;video editor&rdquo;) or reset your filters.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2.5 rounded-xl liquid-button-glass text-xs font-medium text-white transition-all cursor-pointer"
              >
                Clear All Filters
              </button>
              <button
                onClick={() => setIsSubmitOpen(true)}
                className="px-4 py-2.5 rounded-xl liquid-button-primary text-xs font-semibold text-white transition-all cursor-pointer shadow-md"
              >
                Submit a Tool
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isSaved={savedToolIds.includes(tool.id)}
                onToggleSave={handleToggleSave}
                onOpenDetail={(t) => setActiveDetailTool(t)}
              />
            ))}
          </div>
        )}

      </main>

      {/* Tool Detail Modal */}
      <ToolDetailModal
        tool={activeDetailTool}
        isOpen={Boolean(activeDetailTool)}
        onClose={() => setActiveDetailTool(null)}
        isSaved={activeDetailTool ? savedToolIds.includes(activeDetailTool.id) : false}
        onToggleSave={handleToggleSave}
      />

      {/* My Free Stack Slide-Over Drawer */}
      <MyStackDrawer
        isOpen={isStackOpen}
        onClose={() => setIsStackOpen(false)}
        savedTools={savedTools}
        onRemoveTool={handleRemoveTool}
        onClearStack={handleClearStack}
      />

      {/* Community Tool Submission Modal */}
      <SubmitToolModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onAddTool={handleAddCommunityTool}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;
