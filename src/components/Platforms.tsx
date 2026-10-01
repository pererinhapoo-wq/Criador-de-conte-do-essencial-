import React, { useState } from 'react';
import { PlatformLink } from '../types/creator';
import { ArrowUpRight, Check, SlidersHorizontal } from 'lucide-react';

interface PlatformsProps {
  platforms: PlatformLink[];
  onTogglePlatform?: (platformId: string) => void;
}

export const Platforms: React.FC<PlatformsProps> = ({ platforms, onTogglePlatform }) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'video' | 'audio' | 'social' | 'newsletter'>('all');
  const [showConfigMode, setShowConfigMode] = useState(false);

  // Filter platforms based on active status or config mode
  const activePlatforms = platforms.filter((p) => p.active);
  const displayedPlatforms = showConfigMode
    ? platforms
    : platforms.filter((p) => {
        if (!p.active) return false;
        if (filterCategory === 'all') return true;
        return p.category === filterCategory;
      });

  // Dedicated SVG Icons for major platforms
  const renderPlatformIcon = (id: string) => {
    switch (id) {
      case 'youtube':
        return (
          <svg className="w-6 h-6 text-[#E02424]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg className="w-6 h-6 text-[#E1306C]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        );
      case 'spotify':
        return (
          <svg className="w-6 h-6 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
        );
      case 'tiktok':
        return (
          <svg className="w-6 h-6 text-[#000000]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
          </svg>
        );
      case 'newsletter':
        return (
          <svg className="w-6 h-6 text-[#FF6719]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
          </svg>
        );
      case 'x':
        return (
          <svg className="w-6 h-6 text-[#000000]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        );
      case 'twitch':
        return (
          <svg className="w-6 h-6 text-[#9146FF]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.149 0L.537 4.119v16.836h5.731V24h3.224l3.045-3.045h4.657l6.269-6.269V0H2.149zm19.164 13.612l-3.582 3.582H12l-3.045 3.045v-3.045H4.836V1.791h16.477v11.821zM16.478 5.373h-2.149v6.448h2.149V5.373zm-6.09 0H8.239v6.448h2.149V5.373z"/>
          </svg>
        );
      case 'threads':
        return (
          <svg className="w-6 h-6 text-[#000000]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.001 0C5.373 0 0 5.373 0 12s5.373 12 12.001 12c4.436 0 8.3-2.4 10.364-6.148l-2.735-1.577C18.067 19.123 15.228 20.8 12.001 20.8 7.147 20.8 3.2 16.853 3.2 12S7.147 3.2 12.001 3.2c4.015 0 7.425 2.695 8.487 6.449h-8.487v3.2h11.932C23.639 5.617 18.358 0 12.001 0z"/>
          </svg>
        );
      default:
        return (
          <div className="w-6 h-6 rounded bg-[#1c1917] text-white flex items-center justify-center font-bold text-xs">
            {id.substring(0, 1).toUpperCase()}
          </div>
        );
    }
  };

  return (
    <section id="plataformas" className="py-20 md:py-28 bg-[#f5f2eb]/60 border-b border-[#e7e2d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#78716c] mb-2">
              <span className="text-[#c26747]">02</span>
              <span aria-hidden="true">/</span>
              <span>Ecossistema Digital</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif-display tracking-tight text-[#1c1917] text-balance">
              Onde encontrar meu trabalho.
            </h2>
          </div>

          {/* Clean Interactive Controls: Category switcher + Client config toggle */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Category Segmented control (Functional button controls, zero-pill discipline) */}
            {!showConfigMode && (
              <div className="flex items-center gap-1 p-1 bg-[#ebe5d8] rounded-lg text-xs font-medium">
                <button
                  onClick={() => setFilterCategory('all')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    filterCategory === 'all'
                      ? 'bg-white text-[#1c1917] shadow-xs font-semibold'
                      : 'text-[#57534e] hover:text-[#1c1917]'
                  }`}
                >
                  Todas ({activePlatforms.length})
                </button>
                <button
                  onClick={() => setFilterCategory('video')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    filterCategory === 'video'
                      ? 'bg-white text-[#1c1917] shadow-xs font-semibold'
                      : 'text-[#57534e] hover:text-[#1c1917]'
                  }`}
                >
                  Vídeo
                </button>
                <button
                  onClick={() => setFilterCategory('audio')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    filterCategory === 'audio'
                      ? 'bg-white text-[#1c1917] shadow-xs font-semibold'
                      : 'text-[#57534e] hover:text-[#1c1917]'
                  }`}
                >
                  Áudio
                </button>
                <button
                  onClick={() => setFilterCategory('newsletter')}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    filterCategory === 'newsletter'
                      ? 'bg-white text-[#1c1917] shadow-xs font-semibold'
                      : 'text-[#57534e] hover:text-[#1c1917]'
                  }`}
                >
                  Texto
                </button>
              </div>
            )}

            {/* Toggle Config Mode button so client can see how easy it is to enable/disable platforms */}
            {onTogglePlatform && (
              <button
                onClick={() => setShowConfigMode(!showConfigMode)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                  showConfigMode
                    ? 'bg-[#1c1917] text-white border-[#1c1917]'
                    : 'bg-white text-[#57534e] border-[#e7e2d8] hover:text-[#1c1917]'
                }`}
                title="Configurar quais redes exibir neste site"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{showConfigMode ? 'Concluir Edição' : 'Gerenciar Redes'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Informative banner when in config mode */}
        {showConfigMode && (
          <div className="mb-6 p-4 bg-[#fbf9f5] border border-[#d6cfc0] rounded-xl text-xs text-[#57534e] flex items-center justify-between">
            <p>
              <strong className="text-[#1c1917]">Modo de Personalização de Redes:</strong> Clique em qualquer plataforma para ativar ou desativar sua exibição no site.
            </p>
            <span className="text-[#78716c] font-medium">{activePlatforms.length} de {platforms.length} ativas</span>
          </div>
        )}

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedPlatforms.map((platform) => {
            const isClickableInEditMode = showConfigMode && onTogglePlatform;

            return (
              <div
                key={platform.id}
                onClick={() => {
                  if (isClickableInEditMode) {
                    onTogglePlatform(platform.id);
                  }
                }}
                className={`relative group bg-white/80 backdrop-blur-xs border p-6 rounded-xl transition-all duration-200 flex flex-col justify-between ${
                  showConfigMode ? 'cursor-pointer' : ''
                } ${
                  platform.active
                    ? 'border-[#e7e2d8] hover:border-[#c26747]/50 hover:shadow-sm hover:bg-white'
                    : 'border-dashed border-[#d6cfc0] opacity-50 bg-[#faf8f5]'
                }`}
              >
                {/* Active check toggle badge when editing */}
                {showConfigMode && (
                  <div className="absolute top-4 right-4 z-10">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        platform.active
                          ? 'bg-[#1c1917] text-white'
                          : 'bg-[#e7e2d8] text-[#78716c]'
                      }`}
                    >
                      {platform.active ? '✓' : '+'}
                    </span>
                  </div>
                )}

                <div>
                  {/* Top Bar inside card: Icon + Name + Metric */}
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="p-2.5 rounded-lg bg-[#faf8f5] border border-[#e7e2d8]/60 group-hover:scale-105 transition-transform duration-200">
                      {renderPlatformIcon(platform.id)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-base text-[#1c1917]">
                        {platform.name}
                      </h3>
                      <p className="text-xs text-[#78716c]">{platform.handle}</p>
                    </div>
                  </div>

                  {/* Followers / Audience indicator (Unboxed text with quiet styling) */}
                  {platform.followers && (
                    <div className="mb-2 text-xs font-medium text-[#c26747]">
                      {platform.followers}
                    </div>
                  )}

                  {/* Description */}
                  {platform.description && (
                    <p className="text-xs text-[#57534e] leading-relaxed mb-6 font-normal">
                      {platform.description}
                    </p>
                  )}
                </div>

                {/* Footer action link */}
                {!showConfigMode ? (
                  <div className="pt-4 border-t border-[#f0eae1] flex items-center justify-between">
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1c1917] group-hover:text-[#c26747] transition-colors"
                    >
                      <span>Acessar canal oficial</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                ) : (
                  <div className="pt-3 border-t border-[#f0eae1] text-[11px] text-[#78716c] text-right">
                    {platform.active ? 'Ativa no site (clique para ocultar)' : 'Oculta (clique para ativar)'}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
