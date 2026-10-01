import React, { useState } from 'react';
import { CreatorProfile } from '../types/creator';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

interface HeaderProps {
  creator: CreatorProfile;
  onSelectPreset?: (presetKey: string) => void;
  activePresetKey?: string;
}

export const Header: React.FC<HeaderProps> = ({
  creator,
  onSelectPreset,
  activePresetKey = 'filmmaker',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDemoSelector, setShowDemoSelector] = useState(false);

  const navLinks = [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Plataformas', href: '#plataformas' },
    { label: 'Destaques', href: '#destaques' },
    { label: 'Recentes', href: '#recentes' },
    { label: 'Links', href: '#links' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#faf8f5]/90 backdrop-blur-md border-b border-[#e7e2d8] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Zone 1: Brand title (Single text element wordmark in display face) */}
          <a
            href="#"
            className="text-2xl sm:text-3xl font-serif-display tracking-tight text-[#1c1917] hover:text-[#c26747] transition-colors whitespace-nowrap"
          >
            {creator.name}
          </a>

          {/* Zone 2: Navigation Links (Clean text links with subtle hover underlines) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57534e]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#1c1917] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#1c1917] after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-bottom-left after:transition-transform"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Actions (CTA + Demo Switcher) */}
          <div className="flex items-center gap-3">
            {/* Quick Demo Profile Switcher (shows adaptability for different niches) */}
            {onSelectPreset && (
              <div className="relative">
                <button
                  onClick={() => setShowDemoSelector(!showDemoSelector)}
                  className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#78716c] hover:text-[#1c1917] bg-[#f0eae1] hover:bg-[#e7dec8] rounded-md transition-colors"
                  title="Alternar perfil demonstrativo para testar diferentes nichos de criadores"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#c26747]" />
                  <span>Perfil: {activePresetKey === 'filmmaker' ? 'Cinema' : activePresetKey === 'podcaster' ? 'Podcast' : 'Foto'}</span>
                </button>

                {showDemoSelector && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-[#e7e2d8] rounded-xl shadow-lg p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <p className="px-2 py-1 text-[11px] font-semibold text-[#78716c] uppercase tracking-wider">
                      Simular Nicho de Criador
                    </p>
                    <button
                      onClick={() => {
                        onSelectPreset('filmmaker');
                        setShowDemoSelector(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 text-xs rounded-lg transition-colors flex items-center justify-between ${
                        activePresetKey === 'filmmaker'
                          ? 'bg-[#f5efe6] font-semibold text-[#1c1917]'
                          : 'text-[#57534e] hover:bg-[#faf8f5]'
                      }`}
                    >
                      <span>Matheus (Audiovisual)</span>
                      {activePresetKey === 'filmmaker' && <span className="text-xs text-[#c26747]">✓</span>}
                    </button>
                    <button
                      onClick={() => {
                        onSelectPreset('podcaster');
                        setShowDemoSelector(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 text-xs rounded-lg transition-colors flex items-center justify-between ${
                        activePresetKey === 'podcaster'
                          ? 'bg-[#f5efe6] font-semibold text-[#1c1917]'
                          : 'text-[#57534e] hover:bg-[#faf8f5]'
                      }`}
                    >
                      <span>Beatriz (Podcaster)</span>
                      {activePresetKey === 'podcaster' && <span className="text-xs text-[#c26747]">✓</span>}
                    </button>
                    <button
                      onClick={() => {
                        onSelectPreset('photographer');
                        setShowDemoSelector(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 text-xs rounded-lg transition-colors flex items-center justify-between ${
                        activePresetKey === 'photographer'
                          ? 'bg-[#f5efe6] font-semibold text-[#1c1917]'
                          : 'text-[#57534e] hover:bg-[#faf8f5]'
                      }`}
                    >
                      <span>Lucas (Fotógrafo)</span>
                      {activePresetKey === 'photographer' && <span className="text-xs text-[#c26747]">✓</span>}
                    </button>
                  </div>
                )}
              </div>
            )}

            <a
              href="#contato"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-[#1c1917] hover:bg-[#38332e] rounded-lg transition-colors whitespace-nowrap shadow-sm"
            >
              <span>Falar Comigo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#57534e] hover:text-[#1c1917] rounded-lg transition-colors focus:outline-none"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#e7e2d8] bg-[#faf8f5] px-6 py-6 space-y-4 animate-in fade-in duration-200">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-[#1c1917] hover:text-[#c26747] transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {onSelectPreset && (
              <div className="pt-4 border-t border-[#e7e2d8]">
                <p className="text-xs font-semibold text-[#78716c] uppercase tracking-wider mb-2">
                  Trocar Nicho (Demonstração)
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      onSelectPreset('filmmaker');
                      setMobileMenuOpen(false);
                    }}
                    className={`py-1.5 text-xs rounded-md border text-center transition-colors ${
                      activePresetKey === 'filmmaker'
                        ? 'border-[#1c1917] bg-[#1c1917] text-white font-medium'
                        : 'border-[#e7e2d8] text-[#57534e]'
                    }`}
                  >
                    Cinema
                  </button>
                  <button
                    onClick={() => {
                      onSelectPreset('podcaster');
                      setMobileMenuOpen(false);
                    }}
                    className={`py-1.5 text-xs rounded-md border text-center transition-colors ${
                      activePresetKey === 'podcaster'
                        ? 'border-[#1c1917] bg-[#1c1917] text-white font-medium'
                        : 'border-[#e7e2d8] text-[#57534e]'
                    }`}
                  >
                    Podcast
                  </button>
                  <button
                    onClick={() => {
                      onSelectPreset('photographer');
                      setMobileMenuOpen(false);
                    }}
                    className={`py-1.5 text-xs rounded-md border text-center transition-colors ${
                      activePresetKey === 'photographer'
                        ? 'border-[#1c1917] bg-[#1c1917] text-white font-medium'
                        : 'border-[#e7e2d8] text-[#57534e]'
                    }`}
                  >
                    Foto
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </header>
    </>
  );
};
