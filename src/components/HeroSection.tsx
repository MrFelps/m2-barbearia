import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-32 pb-8 sm:pb-12 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(11,11,11,0.75) 0%, rgba(11,11,11,0.85) 60%, rgba(11,11,11,1) 100%), url('/assets/img/hero-fachada.jpg')`,
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center my-auto flex flex-col items-center">
        {/* Kicker */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-brand-red" />
          <span className="text-[11px] font-display uppercase tracking-[0.35em] text-neutral-300">
            Tradição & Excelência desde 2014
          </span>
          <span className="h-px w-8 bg-brand-red" />
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display uppercase font-semibold text-white tracking-tight leading-[1.05] max-w-4xl">
          A barbearia que leva <br />
          <span className="text-white">o clássico a sério</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-sm sm:text-base text-textDim max-w-2xl leading-relaxed font-body">
          Inspirada nas barbearias clássicas de meados do século XX. Barba no navalhete,
          ritual de toalhas quentes e corte milimétrico em um ambiente refinado com atendimento de alta precisão.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto h-12 min-h-[44px] px-8 bg-brand-red hover:bg-red-700 active:scale-[0.98] text-white font-display uppercase text-xs tracking-[0.2em] font-semibold flex items-center justify-center gap-3 rounded-sm transition-all shadow-xl shadow-red-950/50"
          >
            <span>Agende seu horário</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#unidades"
            className="w-full sm:w-auto h-12 min-h-[44px] px-8 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 text-white font-display uppercase text-xs tracking-[0.2em] font-semibold flex items-center justify-center rounded-sm transition-all"
          >
            Nossas unidades
          </a>
        </div>
      </div>

      {/* Hero Foot Info */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-textFaint">
        <span className="font-display tracking-[0.2em] uppercase text-[11px]">
          Matriz Central • Jardins • Alphaville
        </span>
        <a
          href="#marca"
          aria-label="Rolar para a próxima seção"
          className="flex items-center gap-1.5 text-textDim hover:text-white transition-colors"
        >
          <span>Role</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
        <span className="font-display tracking-[0.2em] uppercase text-[11px]">
          Barba no navalhete • Corte clássico
        </span>
      </div>
    </section>
  );
};
