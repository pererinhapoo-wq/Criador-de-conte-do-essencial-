import React, { useState } from 'react';
import { CreatorProfile } from '../types/creator';
import { ArrowDown, Play, Sparkles, ExternalLink } from 'lucide-react';

interface HeroProps {
  creator: CreatorProfile;
}

export const Hero: React.FC<HeroProps> = ({ creator }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 border-b border-[#e7e2d8]">
      {/* Subtle organic editorial ambient background wash */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 right-1/4 w-96 h-96 bg-[#f3ede3] rounded-full blur-3xl opacity-60 pointer-events-none -z-10" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Typography & Intent (7 columns on desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Unboxed Metadata / Kicker (Strict zero-pill discipline) */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wide text-[#78716c] uppercase">
              <span className="text-[#c26747] font-semibold">{creator.role}</span>
              <span aria-hidden="true">·</span>
              <span>{creator.niche}</span>
              <span aria-hidden="true">·</span>
              <span>{creator.location}</span>
            </div>

            {/* Artistic Name / Display Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif-display tracking-tight text-[#1c1917] leading-[1.08] text-balance">
                {creator.name}
              </h1>
              <p className="text-xl sm:text-2xl font-light text-[#44403c] leading-relaxed max-w-2xl">
                Criador de conteúdo sobre <span className="font-normal italic text-[#1c1917]">{creator.niche.toLowerCase()}</span>.
              </p>
            </div>

            {/* Core Message & Bio snippet */}
            <p className="text-base sm:text-lg text-[#57534e] leading-relaxed max-w-xl font-normal">
              Conteúdo autoral, projetos cinematográficos, ensaios e todos os meus canais oficiais reunidos em um só lugar.
            </p>

            {/* Proof Metric Adjacency (Discrete editorial numbers, no fake scorecards) */}
            <div className="pt-2 pb-2 flex flex-wrap items-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#78716c] border-y border-[#e7e2d8]/80 py-3.5">
              <div>
                <span className="block font-serif-display text-xl sm:text-2xl text-[#1c1917] leading-none">
                  +14M
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#a8a29e]">Visualizações</span>
              </div>
              <div className="w-[1px] h-7 bg-[#e7e2d8]" />
              <div>
                <span className="block font-serif-display text-xl sm:text-2xl text-[#1c1917] leading-none">
                  700k+
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#a8a29e]">Comunidade Total</span>
              </div>
              <div className="w-[1px] h-7 bg-[#e7e2d8]" />
              <div>
                <span className="block font-serif-display text-xl sm:text-2xl text-[#1c1917] leading-none">
                  {creator.yearsActive}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#a8a29e]">Trajetória Contínua</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#destaques"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-medium text-white bg-[#1c1917] hover:bg-[#38332e] rounded-lg transition-all shadow-sm hover:shadow active:scale-[0.99] whitespace-nowrap"
              >
                <span>Ver conteúdos em destaque</span>
                <ArrowDown className="w-4 h-4 text-[#ded7c8]" />
              </a>

              <a
                href="#plataformas"
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-[#1c1917] bg-[#f0eae1] hover:bg-[#e6dec8] rounded-lg transition-colors whitespace-nowrap"
              >
                <span>Minhas plataformas</span>
                <ExternalLink className="w-4 h-4 text-[#78716c]" />
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Container (5 columns on desktop) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative warm frame backdrop */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#e7dec8] to-[#f5efe6] rounded-2xl -rotate-1 opacity-70" />
              
              {/* Main portrait image wrapper */}
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#e7e2d8] border border-[#d6cfc0] shadow-md group">
                {!imageError ? (
                  <img
                    src={creator.heroImage}
                    alt={`Retrato editorial de ${creator.name}`}
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover object-center filter saturate-[0.92] contrast-[1.03] group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#f2ece2] to-[#e4dccf] p-8 text-center">
                    <Sparkles className="w-10 h-10 text-[#c26747] mb-3" />
                    <p className="font-serif-display text-2xl text-[#1c1917]">{creator.name}</p>
                    <p className="text-xs text-[#78716c] mt-1">{creator.role}</p>
                  </div>
                )}

                {/* Subtle vignette scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/60 via-transparent to-transparent opacity-80 pointer-events-none" />

                {/* Quiet caption inside portrait bottom */}
                <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                  <p className="text-[11px] uppercase tracking-widest text-[#e7dec8] font-medium">
                    Presença Oficial
                  </p>
                  <p className="text-sm font-medium tracking-tight text-white/95">
                    {creator.role}
                  </p>
                </div>
              </div>

              {/* Floating quote / badge minimal */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white/95 backdrop-blur-sm border border-[#e7e2d8] p-3.5 sm:p-4 rounded-xl shadow-lg max-w-[240px]">
                <p className="text-xs text-[#44403c] italic leading-snug">
                  "O cinema e a palavra nos lembram quem somos quando o barulho silencia."
                </p>
                <div className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-[#a8a29e]">
                  {creator.name}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
