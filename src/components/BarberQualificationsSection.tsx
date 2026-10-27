import React from 'react';
import { Check } from 'lucide-react';
import { BARBER_PROFILE } from '../data/barberData';

export const BarberQualificationsSection: React.FC = () => {
  return (
    <section id="qualificacoes" className="py-20 sm:py-28 bg-ink border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Narrative & Qualifications */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-display text-brand-red font-bold">01</span>
              <span className="text-[11px] font-display uppercase tracking-[0.3em] text-textFaint">
                Perfil Profissional
              </span>
              <span className="h-px w-12 bg-neutral-800" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-display uppercase font-semibold text-white tracking-tight">
              Qualificações & <br />
              <span className="text-neutral-400">Domínio da Técnica Clássica</span>
            </h2>

            <p className="text-sm sm:text-base text-textDim leading-relaxed">
              Com formação em escolas tradicionais de barbearia e especialização contínua em visagismo,
              cada atendimento é executado com foco absoluto na anatomia craniana, simetria facial e na rotina profissional do cliente.
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 py-4 border-y border-neutral-800 text-center sm:text-left">
              <div>
                <span className="text-2xl sm:text-3xl font-display font-bold text-white block">
                  {BARBER_PROFILE.yearsOfExperience} Anos
                </span>
                <span className="text-[10px] sm:text-xs text-textFaint uppercase tracking-wider">
                  Experiência
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-display font-bold text-white block">
                  {BARBER_PROFILE.totalAppointments}
                </span>
                <span className="text-[10px] sm:text-xs text-textFaint uppercase tracking-wider">
                  Cortes & Barbas
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-display font-bold text-amber-400 block">
                  ★ {BARBER_PROFILE.ratingScore}
                </span>
                <span className="text-[10px] sm:text-xs text-textFaint uppercase tracking-wider">
                  Satisfação
                </span>
              </div>
            </div>

            {/* Specialties List */}
            <div className="space-y-2.5">
              <span className="text-xs font-display uppercase tracking-wider text-textFaint block">
                O que você encontra na bancada:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {BARBER_PROFILE.specialties.map((item, index) => (
                  <div key={index} className="flex items-center gap-2.5 text-xs text-neutral-300">
                    <div className="w-5 h-5 rounded-full bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red flex-shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Media Showcase */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-sm border border-neutral-800 shadow-2xl">
              <img
                src="/assets/img/felipe-em-acao.jpg"
                alt="Felipe Boccardo em ação na bancada"
                className="w-full h-[440px] sm:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/img/m2-fachada.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-60" />
            </div>

            <div className="absolute -bottom-6 -left-2 sm:left-6 bg-ink-elevated border border-neutral-700 p-5 rounded shadow-2xl max-w-[260px]">
              <span className="text-[10px] font-display uppercase tracking-[0.25em] text-brand-red block mb-1">
                Navalhete & Toalha Quente
              </span>
              <p className="text-xs text-neutral-300 font-medium leading-relaxed">
                Biossegurança rigorosa com lâminas 100% descartáveis e navalha esterilizada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
