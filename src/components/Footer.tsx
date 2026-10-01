import React from 'react';
import { CreatorProfile } from '../types/creator';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  creator: CreatorProfile;
}

export const Footer: React.FC<FooterProps> = ({ creator }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activePlatforms = creator.platforms.filter((p) => p.active);

  return (
    <footer className="bg-[#f5f2eb] border-t border-[#e7e2d8] text-[#57534e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#e7e2d8]">
          
          {/* Brand & Purpose (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-serif-display text-2xl text-[#1c1917] tracking-tight">
              {creator.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#78716c] leading-relaxed max-w-sm">
              {creator.headlineTitle} Presença digital autoral, projetos cinematográficos e canais de distribuição unificados.
            </p>
            <div className="text-xs text-[#a8a29e]">
              <span>{creator.location}</span>
              <span className="mx-2">·</span>
              <span>{creator.role}</span>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1c1917]">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#sobre" className="hover:text-[#1c1917] transition-colors">
                  Sobre a Trajetória
                </a>
              </li>
              <li>
                <a href="#plataformas" className="hover:text-[#1c1917] transition-colors">
                  Canais & Plataformas
                </a>
              </li>
              <li>
                <a href="#destaques" className="hover:text-[#1c1917] transition-colors">
                  Conteúdos em Destaque
                </a>
              </li>
              <li>
                <a href="#recentes" className="hover:text-[#1c1917] transition-colors">
                  Últimas Produções
                </a>
              </li>
              <li>
                <a href="#links" className="hover:text-[#1c1917] transition-colors">
                  Links Importantes
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-[#1c1917] transition-colors">
                  Contato Direto
                </a>
              </li>
            </ul>
          </div>

          {/* Social Platforms (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1c1917]">
              Redes Oficiais
            </h4>
            <div className="flex flex-wrap gap-2 pt-1">
              {activePlatforms.map((platform) => (
                <a
                  key={platform.id}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#e7e2d8] text-xs font-medium text-[#1c1917] hover:border-[#c26747] hover:text-[#c26747] transition-colors"
                >
                  {platform.name}
                </a>
              ))}
            </div>
            <p className="text-[11px] text-[#a8a29e] pt-2">
              Todas as postagens e publicações são de autoria independente e protegidas por direitos autorais.
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716c]">
          <p>
            © {currentYear} {creator.name}. Todos os direitos reservados.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1c1917] hover:text-[#c26747] transition-colors group"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
};
