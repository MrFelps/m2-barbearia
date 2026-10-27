import React from 'react';
import { ShieldCheck, Clock, Award } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  return (
    <section id="marca" className="py-20 sm:py-28 bg-ink border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Media Column */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-sm border border-neutral-800 shadow-2xl">
              <img
                src="/assets/img/itaim-bibi/marca.jpg"
                alt="Ambiente M2 Barbearia"
                className="w-full h-[420px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/img/hero-fachada.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-60" />
            </div>

            {/* Floating Luxury Badge */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-ink-elevated border border-neutral-700 p-4 sm:p-5 rounded shadow-2xl max-w-[240px]">
              <span className="text-[10px] font-display uppercase tracking-[0.25em] text-brand-red block mb-1">
                Padrão Artesanal
              </span>
              <p className="text-xs text-neutral-300 font-medium">
                Mais de 10 anos aperfeiçoando o atendimento masculino executivo.
              </p>
            </div>
          </div>

          {/* Narrative Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-display text-brand-red font-bold">01</span>
              <span className="text-[11px] font-display uppercase tracking-[0.3em] text-textFaint">
                Identidade & Propósito
              </span>
              <span className="h-px w-12 bg-neutral-800" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-display uppercase font-semibold text-white tracking-tight">
              Mais do que um corte: <br />
              <span className="text-neutral-400">Um ritual de respeito ao tempo.</span>
            </h2>

            <p className="text-sm sm:text-base text-textDim leading-relaxed">
              A M2 Barbearia nasceu da convicção de que o homem contemporâneo valoriza
              pontualidade, precisão e acolhimento. Resgatamos o ambiente solene das barbearias
              históricas, integrando tecnologia de agendamento ágil e produtos de formulação nobre.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-800">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-brand-red flex-shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-display uppercase font-semibold text-white">Mestres Barbeiros</h3>
                  <p className="text-[11px] text-textFaint mt-0.5">Equipe qualificada nas técnicas clássicas.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-brand-red flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-display uppercase font-semibold text-white">Biosegurança</h3>
                  <p className="text-[11px] text-textFaint mt-0.5">Lâminas descartáveis e toalhas esterilizadas.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-brand-red flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-display uppercase font-semibold text-white">Pontualidade</h3>
                  <p className="text-[11px] text-textFaint mt-0.5">Respeito rigoroso aos horários marcados.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
