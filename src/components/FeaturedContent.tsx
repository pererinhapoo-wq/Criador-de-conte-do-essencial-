import React, { useState } from 'react';
import { FeaturedProject } from '../types/creator';
import { Play, ArrowUpRight, Clock, Eye, X, Film, Volume2 } from 'lucide-react';

interface FeaturedContentProps {
  projects: FeaturedProject[];
}

export const FeaturedContent: React.FC<FeaturedContentProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const flagship = projects[0];
  const secondaryProjects = projects.slice(1);

  return (
    <section id="destaques" className="py-20 md:py-28 bg-[#faf8f5] border-b border-[#e7e2d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#78716c] mb-2">
              <span className="text-[#c26747]">03</span>
              <span aria-hidden="true">/</span>
              <span>Trabalhos Selecionados</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif-display tracking-tight text-[#1c1917] text-balance">
              Conteúdos em Destaque.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#78716c] max-w-sm">
            Projetos de maior impacto documental, entrevistas de referência e peças com repercussão cultural.
          </p>
        </div>

        {/* Asymmetric Composition (Not a generic card grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Flagship Spotlight (7 columns on desktop) */}
          {flagship && (
            <div className="lg:col-span-7 flex flex-col bg-white border border-[#e7e2d8] rounded-2xl overflow-hidden shadow-xs hover:border-[#c26747]/60 transition-all duration-300 group">
              
              {/* Media Widescreen Area */}
              <div className="relative aspect-[16/9] w-full bg-[#1c1917] overflow-hidden">
                {!imageErrors[flagship.id] ? (
                  <img
                    src={flagship.imageUrl}
                    alt={flagship.title}
                    referrerPolicy="no-referrer"
                    onError={() => handleImageError(flagship.id)}
                    className="w-full h-full object-cover filter saturate-[0.95] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#292524] text-white p-6">
                    <Film className="w-10 h-10 text-[#c26747] mb-2" />
                    <p className="text-sm font-serif-display">{flagship.title}</p>
                  </div>
                )}

                {/* Subtle scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top overlay unboxed tag */}
                <div className="absolute top-4 left-4 flex items-center gap-2 text-[11px] font-semibold tracking-wider uppercase text-white/90">
                  <span className="bg-[#1c1917]/80 backdrop-blur-md px-2.5 py-1 rounded text-white">
                    {flagship.highlightKicker || 'Destaque'}
                  </span>
                  <span>·</span>
                  <span className="text-[#ded7c8]">{flagship.platform}</span>
                </div>

                {/* Play Trigger on Hover */}
                <button
                  onClick={() => setSelectedProject(flagship)}
                  className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-white/90 text-[#1c1917] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 focus:outline-none"
                  aria-label="Abrir detalhes do conteúdo principal"
                >
                  <Play className="w-6 h-6 fill-[#1c1917] ml-1" />
                </button>

                {/* Bottom stats inside photo */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#ded7c8]" />
                    {flagship.duration}
                  </span>
                  {flagship.stats && (
                    <span className="flex items-center gap-1.5 font-medium">
                      <Eye className="w-3.5 h-3.5 text-[#ded7c8]" />
                      {flagship.stats}
                    </span>
                  )}
                </div>
              </div>

              {/* Text Info Below Media */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-[#78716c] font-medium mb-1.5">
                    {flagship.category} · {flagship.date}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif-display text-[#1c1917] leading-snug group-hover:text-[#c26747] transition-colors mb-3">
                    {flagship.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed line-clamp-3">
                    {flagship.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#f0eae1] flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(flagship)}
                    className="text-xs font-semibold text-[#1c1917] hover:text-[#c26747] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Ver detalhes & ficha técnica</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={flagship.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-xs font-medium text-white bg-[#1c1917] hover:bg-[#38332e] rounded-lg transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Assistir no {flagship.platform}</span>
                    <Play className="w-3 h-3 fill-white" />
                  </a>
                </div>

              </div>

            </div>
          )}

          {/* Secondary Features Stack (5 columns on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {secondaryProjects.map((project, idx) => (
              <div
                key={project.id}
                className="flex-1 bg-white border border-[#e7e2d8] rounded-2xl p-5 sm:p-6 shadow-xs hover:border-[#c26747]/60 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="flex gap-4 sm:gap-5 items-start">
                  
                  {/* Thumbnail */}
                  <div className="relative w-28 sm:w-36 aspect-[16/10] shrink-0 rounded-lg overflow-hidden bg-[#e7e2d8] border border-[#d6cfc0]">
                    {!imageErrors[project.id] ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(project.id)}
                        className="w-full h-full object-cover filter saturate-[0.95] group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#f0eae1]">
                        <Volume2 className="w-6 h-6 text-[#78716c]" />
                      </div>
                    )}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-white/90 text-[#1c1917] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Abrir prévia"
                    >
                      <Play className="w-3.5 h-3.5 fill-[#1c1917] ml-0.5" />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-[11px] text-[#78716c] font-medium mb-1">
                      <span>{project.platform}</span>
                      <span>·</span>
                      <span>{project.duration || project.date}</span>
                    </div>
                    <h4 className="font-serif-display text-base sm:text-lg text-[#1c1917] leading-tight group-hover:text-[#c26747] transition-colors line-clamp-2">
                      {project.title}
                    </h4>
                    <p className="text-xs text-[#57534e] mt-1.5 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                </div>

                {/* Card Footer */}
                <div className="pt-4 mt-4 border-t border-[#f0eae1] flex items-center justify-between text-xs">
                  <span className="text-[#a8a29e] text-[11px] font-medium">
                    {project.stats}
                  </span>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#1c1917] group-hover:text-[#c26747] transition-colors inline-flex items-center gap-1"
                  >
                    <span>Acessar no {project.platform}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Media Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#faf8f5] border border-[#e7e2d8] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="relative aspect-[16/9] w-full bg-black">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                className="w-full h-full object-cover opacity-90"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors"
                aria-label="Fechar janela de detalhes"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-4 text-xs font-medium text-white/90">
                {selectedProject.platform} · {selectedProject.duration}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#c26747] font-semibold">
                  {selectedProject.category} · {selectedProject.date}
                </span>
                <h3 className="text-2xl font-serif-display text-[#1c1917] mt-1 leading-snug">
                  {selectedProject.title}
                </h3>
              </div>

              <p className="text-sm text-[#57534e] leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="pt-4 border-t border-[#e7e2d8] flex items-center justify-between">
                <span className="text-xs text-[#78716c]">
                  Audiência estimada: <strong className="text-[#1c1917]">{selectedProject.stats}</strong>
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2 text-xs font-medium text-[#57534e] hover:text-[#1c1917] transition-colors"
                  >
                    Fechar
                  </button>
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 text-xs font-medium text-white bg-[#1c1917] hover:bg-[#38332e] rounded-lg transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Assistir na Plataforma</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
};
