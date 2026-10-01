import React, { useState } from 'react';
import { defaultCreatorProfile, creatorPresets } from './data/creatorConfig';
import { CreatorProfile } from './types/creator';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Platforms } from './components/Platforms';
import { FeaturedContent } from './components/FeaturedContent';
import { RecentContent } from './components/RecentContent';
import { ImportantLinks } from './components/ImportantLinks';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const [profile, setProfile] = useState<CreatorProfile>(defaultCreatorProfile);
  const [activePresetKey, setActivePresetKey] = useState<string>('filmmaker');

  // Handle switching preset demo niches
  const handleSelectPreset = (presetKey: string) => {
    setActivePresetKey(presetKey);
    const presetData = creatorPresets[presetKey];
    if (presetData) {
      setProfile((prev) => ({
        ...prev,
        ...presetData,
      }));
    }
  };

  // Handle toggling platform visibility (active/inactive)
  const handleTogglePlatform = (platformId: string) => {
    setProfile((prev) => ({
      ...prev,
      platforms: prev.platforms.map((p) =>
        p.id === platformId ? { ...p, active: !p.active } : p
      ),
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#1c1917] selection:bg-[#e7dec8] selection:text-[#1c1917]">
      {/* 3-Zone Top Navigation */}
      <Header
        creator={profile}
        onSelectPreset={handleSelectPreset}
        activePresetKey={activePresetKey}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero creator={profile} />

        {/* 2. Sobre Section */}
        <About creator={profile} />

        {/* 3. Plataformas Section */}
        <Platforms
          platforms={profile.platforms}
          onTogglePlatform={handleTogglePlatform}
        />

        {/* 4. Conteúdos em Destaque Section */}
        <FeaturedContent projects={profile.featuredProjects} />

        {/* 5. Últimos Conteúdos Section */}
        <RecentContent items={profile.recentItems} />

        {/* 6. Links Importantes Section */}
        <ImportantLinks links={profile.importantLinks} />

        {/* 7. Contato Section (with Gmail Workspace Integration) */}
        <Contact creator={profile} />
      </main>

      {/* 8. Footer Section */}
      <Footer creator={profile} />
    </div>
  );
}
