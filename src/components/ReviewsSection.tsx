import React from 'react';
import { Star, ExternalLink, CheckCircle2 } from 'lucide-react';
import { REVIEWS_DATA, BARBER_PROFILE } from '../data/barberData';
import { CustomerReview } from '../types/barber';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="avaliacoes" className="py-20 sm:py-28 bg-ink border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-xs font-display text-brand-red font-bold">04</span>
            <span className="text-[11px] font-display uppercase tracking-[0.3em] text-textFaint">
              Google Avaliações Verificadas
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display uppercase font-semibold text-white tracking-tight">
            Opinião de Quem Confia
          </h2>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-white font-display font-bold text-lg">{BARBER_PROFILE.ratingScore} / 5.0</span>
            </div>
            <span className="hidden sm:inline text-textFaint">•</span>
            <a
              href={BARBER_PROFILE.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-brand-gold hover:underline flex items-center gap-1 font-medium"
            >
              <span>Ver perfil no Google Avaliações</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS_DATA.map((review: CustomerReview) => (
            <div
              key={review.id}
              className="bg-ink-elevated border border-neutral-800 p-6 sm:p-8 rounded-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  {review.verifiedOnGoogle && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Google Verificado</span>
                    </span>
                  )}
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
