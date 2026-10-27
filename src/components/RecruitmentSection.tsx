import React from 'react';
import { ArrowRight, Briefcase } from 'lucide-react';

export const RecruitmentSection: React.FC = () => {
  return (
    <section id="recrutamento" className="py-20 bg-ink-elevated border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-900 border border-neutral-800 p-8 sm:p-12 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-brand-red">
              <Briefcase className="w-5 h-5" />
              <span className="text-[11px] font-display uppercase tracking-[0.25em] font-semibold">
                Carreira & Parcerias
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display uppercase font-semibold text-white">
              Faça parte da bancada M2 Barbearia
            </h2>
            <p className="text-sm text-textDim leading-relaxed">
              Buscamos profissionais apaixonados pelo ofício tradicional da barbearia clássica, com alto padrão de pontualidade e postura ética.
            </p>
          </div>

          <a
            href="https://wa.me/5511999990001?text=Ol%C3%A1%2C%20gostaria%20de%20enviar%20meu%20portf%C3%B3lio%20para%20a%20M2%20Barbearia"
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 min-h-[44px] px-8 bg-brand-red hover:bg-red-700 text-white font-display uppercase text-xs tracking-widest font-semibold flex items-center justify-center gap-3 rounded-sm transition-all shadow-lg flex-shrink-0"
          >
            <span>Enviar Portfólio</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
