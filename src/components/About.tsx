import React, { useState } from 'react';
import { CreatorProfile } from '../types/creator';
import { Camera, Compass, Award, ArrowUpRight } from 'lucide-react';

interface AboutProps {
  creator: CreatorProfile;
}

export const About: React.FC<AboutProps> = ({ creator }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="sobre" className="py-20 md:py-28 bg-[#faf8f5] border-b border-[#e7e2d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#78716c] mb-2">
            <span className="text-[#c26747]">01</span>
            <span aria-hidden="true">/</span>
            <span>Sobre o Criador</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-display tracking-tight text-[#1c1917] max-w-xl text-balance">
            Autenticidade, intenção e obsessão pelo detalhe.
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Visual Side: Behind the scenes documentary photo */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#e7e2d8] border border-[#d6cfc0] shadow-sm">
                {!imageError ? (
                  <img
                    src={creator.aboutImage}
                    alt={`Bastidores do trabalho criativo de ${creator.name}`}
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover filter saturate-[0.9] contrast-[1.02] hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#f0eae1] p-6 text-center">
                    <Camera className="w-8 h-8 text-[#78716c] mb-2" />
                    <p className="text-sm font-medium text-[#1c1917]">Estúdio de Criação</p>
                    <p className="text-xs text-[#78716c]">Bastidores e roteirização</p>
                  </div>
                )}
              </div>

              {/* Editorial Caption below photo */}
              <div className="mt-3 flex items-center justify-between text-xs text-[#78716c]">
                <span>Estúdio de Produção · São Paulo</span>
                <span className="italic">Processo analógico & digital</span>
              </div>
            </div>

            {/* Quick credentials / focus pill-free box */}
            <div className="mt-8 p-6 bg-[#f3ede3]/60 border border-[#e7e2d8] rounded-xl">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1c1917] mb-3">
                Pilares do Trabalho
              </h4>
              <ul className="space-y-2.5 text-xs text-[#57534e]">
                <li className="flex items-start gap-2">
                  <span className="text-[#c26747] font-serif-display font-semibold">01.</span>
                  <span>Produção 100% autoral e independente sem mediação algorítmica forçada.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c26747] font-serif-display font-semibold">02.</span>
                  <span>Pesquisa documental e bibliográfica aprofundada para cada vídeo ensaio.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c26747] font-serif-display font-semibold">03.</span>
                  <span>Comunidade engajada em debates culturais de alto valor intelectual.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Text Side: Short bio, areas, and themes */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
            
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-serif-display text-[#1c1917] leading-snug">
                {creator.name} — {creator.role}
              </h3>
              <p className="text-base sm:text-lg text-[#44403c] leading-relaxed font-light">
                {creator.bioShort}
              </p>
              <p className="text-sm sm:text-base text-[#57534e] leading-relaxed">
                {creator.bioFull}
              </p>
            </div>

            {/* Temas Abordados */}
            <div className="pt-4 border-t border-[#e7e2d8]">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#78716c] mb-4">
                Temas Frequentes nos Conteúdos
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {creator.themes.map((theme, index) => (
                  <div
                    key={theme}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/70 border border-[#e7e2d8]/70 hover:border-[#c26747]/40 transition-colors"
                  >
                    <span className="font-serif-display text-sm font-semibold text-[#c26747] w-6 shrink-0">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-[#292524]">
                      {theme}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action */}
            <div className="pt-2 flex items-center gap-4">
              <a
                href="#plataformas"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1c1917] hover:text-[#c26747] transition-colors group"
              >
                <span>Conhecer todas as redes e plataformas</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
