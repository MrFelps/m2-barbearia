import React from 'react';
import { Star } from 'lucide-react';
import { REVIEWS_DATA } from '../data/barberData';
import { CustomerReview } from '../types/barber';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="avaliacoes" className="py-20 sm:py-28 bg-ink border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-xs font-display text-brand-red font-bold">04</span>
            <span className="text-[11px] font-display uppercase tracking-[0.3em] text-textFaint">
              Satisfação & Avaliações
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display uppercase font-semibold text-white tracking-tight">
            Excelência Comprovada
          </h2>

          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="text-white font-display font-bold text-lg ml-2">4.9 / 5.0</span>
            <span className="text-xs text-textFaint">(Mais de 1.200 avaliações verificadas)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS_DATA.map((review: CustomerReview) => (
            <div
              key={review.id}
              className="bg-ink-elevated border border-neutral-800 p-6 sm:p-8 rounded-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex text-amber-400 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed italic mb-6">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-display uppercase font-semibold text-white">
                    {review.author}
                  </h4>
                  <span className="text-xs text-textFaint">{review.role}</span>
                </div>
                <span className="text-[11px] text-textFaint">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
