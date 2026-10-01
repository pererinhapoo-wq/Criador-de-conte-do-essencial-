import React, { useState } from 'react';
import { RecentItem } from '../types/creator';
import { ArrowUpRight, Calendar, Compass } from 'lucide-react';

interface RecentContentProps {
  items: RecentItem[];
}

export const RecentContent: React.FC<RecentContentProps> = ({ items }) => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="recentes" className="py-20 md:py-28 bg-[#f5f2eb]/60 border-b border-[#e7e2d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#78716c] mb-2">
              <span className="text-[#c26747]">04</span>
              <span aria-hidden="true">/</span>
              <span>Feed & Lançamentos</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif-display tracking-tight text-[#1c1917] text-balance">
              Últimas Publicações.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#78716c] max-w-sm">
            Produções recentes distribuídas entre canais de vídeo, episódios em áudio e newsletters reflexivas.
          </p>
        </div>

        {/* Recent Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#e7e2d8] rounded-xl overflow-hidden shadow-xs hover:border-[#c26747]/60 hover:shadow-sm transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] w-full bg-[#e7e2d8] overflow-hidden">
                  {!imageErrors[item.id] ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError(item.id)}
                      className="w-full h-full object-cover filter saturate-[0.92] group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#f0eae1]">
                      <Compass className="w-6 h-6 text-[#78716c]" />
                    </div>
                  )}

                  {/* Platform chip subtle */}
                  <div className="absolute top-2.5 left-2.5 bg-[#1c1917]/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider">
                    {item.platform}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#78716c] font-medium mb-1.5">
                    <Calendar className="w-3 h-3 text-[#a8a29e]" />
                    <span>{item.date}</span>
                    <span>·</span>
                    <span className="truncate">{item.format}</span>
                  </div>

                  <h3 className="font-serif-display text-base text-[#1c1917] leading-snug group-hover:text-[#c26747] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 sm:p-5 pt-0">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 text-xs font-semibold text-[#1c1917] hover:text-white bg-[#faf8f5] hover:bg-[#1c1917] border border-[#e7e2d8] hover:border-[#1c1917] rounded-lg transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  <span>Acessar conteúdo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
