import React from 'react';
import { ImportantLinkItem } from '../types/creator';
import { ArrowUpRight, Compass, Sparkles } from 'lucide-react';

interface ImportantLinksProps {
  links: ImportantLinkItem[];
}

export const ImportantLinks: React.FC<ImportantLinksProps> = ({ links }) => {
  return (
    <section id="links" className="py-20 md:py-28 bg-[#faf8f5] border-b border-[#e7e2d8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#78716c] mb-2">
            <span className="text-[#c26747]">05</span>
            <span aria-hidden="true">/</span>
            <span>Acessos Diretos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-display tracking-tight text-[#1c1917]">
            Links Importantes & Projetos
          </h2>
          <p className="text-xs sm:text-sm text-[#78716c] mt-2 max-w-md mx-auto">
            Atalhos para as principais iniciativas, grupos de estudo e produções especiais.
          </p>
        </div>

        {/* Links Stack */}
        <div className="space-y-3.5">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className={`group flex items-center justify-between p-4 sm:p-5 rounded-xl border transition-all duration-200 ${
                link.isPrimary
                  ? 'bg-[#f4eee4] border-[#d6cfc0] hover:border-[#1c1917] hover:bg-[#ede5d8]'
                  : 'bg-white border-[#e7e2d8] hover:border-[#c26747]/60 hover:bg-[#fdfcfb] hover:shadow-xs'
              }`}
            >
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-sm sm:text-base text-[#1c1917] group-hover:text-[#c26747] transition-colors">
                    {link.title}
                  </h3>
                  {link.badge && (
                    <span className="text-[10px] font-semibold text-[#78716c] uppercase tracking-wider bg-[#faf8f5] border border-[#e7e2d8] px-2 py-0.5 rounded">
                      {link.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#57534e] line-clamp-1">
                  {link.description}
                </p>
              </div>

              <div className="w-8 h-8 rounded-full bg-[#faf8f5] border border-[#e7e2d8] flex items-center justify-center text-[#1c1917] group-hover:bg-[#1c1917] group-hover:text-white group-hover:border-[#1c1917] transition-colors shrink-0">
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
