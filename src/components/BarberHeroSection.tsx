import React from 'react';
import { Calendar, Star, ChevronDown } from 'lucide-react';
import { BARBER_PROFILE } from '../data/barberData';

interface BarberHeroSectionProps {
  onOpenBooking: () => void;
}

export const BarberHeroSection: React.FC<BarberHeroSectionProps> = ({ onOpenBooking }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-32 pb-8 sm:pb-12 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(11,11,11,0.82) 0%, rgba(11,11,11,0.90) 65%, rgba(11,11,11,1) 100%), url('/assets/img/hero-fachada.jpg')`,
      }}
    >
      {/* Layer 2 (z-10): Barber Cutout standing between background and text */}
      <div
        className="absolute right-0 sm:right-4 md:right-8 lg:right-16 xl:right-28 bottom-12 sm:bottom-14 z-10 pointer-events-none flex items-end justify-end select-none"
        aria-hidden="true"
      >
        <img
          src="/assets/img/felipe-boccardo.png"
          alt={BARBER_PROFILE.name}
          className="h-[55vh] sm:h-[68vh] md:h-[78vh] lg:h-[84vh] max-h-[820px] w-auto object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] opacity-30 sm:opacity-95 transition-opacity"
        />
      </div>

      {/* Layer 3 (z-20): Foreground information & buttons */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 my-auto flex flex-col items-center text-center relative z-20">
        {/* Salon / Bench Emblem */}
        <div className="relative mb-5 group">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-brand-red p-1 bg-ink-elevated shadow-2xl transition-transform duration-500 group-hover:scale-105">
            <img
              src="/assets/img/itaim-bibi/atendimento.jpg"
              alt="Bancada M2"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-ink-elevated border border-neutral-700 text-brand-red px-3 py-0.5 text-[9px] sm:text-[10px] font-display uppercase tracking-widest font-semibold rounded-full whitespace-nowrap shadow-md">
            {BARBER_PROFILE.badge}
          </span>
        </div>

        {/* Barber Name & Title */}
        <div className="space-y-2 max-w-3xl bg-ink/30 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none p-4 sm:p-0 rounded-lg">
          <span className="text-[11px] font-display uppercase tracking-[0.35em] text-neutral-400 block">
            {BARBER_PROFILE.role}
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display uppercase font-semibold text-white tracking-tight leading-[1.05] drop-shadow-md">
            {BARBER_PROFILE.name}
          </h1>
          <p className="text-base sm:text-lg font-display uppercase tracking-wider text-brand-gold mt-1">
            A barbearia que leva o clássico a sério
          </p>
          <p className="mt-3 text-xs sm:text-sm text-textDim max-w-xl mx-auto leading-relaxed">
            {BARBER_PROFILE.bio}
          </p>
        </div>

        {/* The 3 Main Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          {/* Button 1: Agendar um Horário */}
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto h-12 min-h-[44px] px-7 bg-brand-red hover:bg-red-700 active:scale-[0.98] text-white font-display uppercase text-xs tracking-[0.2em] font-semibold flex items-center justify-center gap-2.5 rounded-sm transition-all shadow-xl shadow-red-950/50"
          >
            <Calendar className="w-4 h-4" />
            <span>Agendar um Horário</span>
          </button>

          {/* Button 2: Verificar Instagram */}
          <a
            href={BARBER_PROFILE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto h-12 min-h-[44px] px-7 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-500 text-white font-display uppercase text-xs tracking-[0.2em] font-semibold flex items-center justify-center gap-2.5 rounded-sm transition-all backdrop-blur-sm"
          >
            <svg className="w-4 h-4 text-neutral-300 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>Verificar Instagram</span>
          </a>

          {/* Button 3: Avaliar Loja (Google Reviews) */}
          <a
            href={BARBER_PROFILE.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto h-12 min-h-[44px] px-7 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-500 text-white font-display uppercase text-xs tracking-[0.2em] font-semibold flex items-center justify-center gap-2.5 rounded-sm transition-all backdrop-blur-sm"
          >
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Avaliar Loja</span>
          </a>
        </div>
      </div>

      {/* Hero Foot Info */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-textFaint relative z-20">
        <span className="font-display tracking-[0.2em] uppercase text-[11px]">
          Matriz Central • Jardins • Alphaville
        </span>
        <a
          href="#qualificacoes"
          aria-label="Rolar para qualificações"
          className="flex items-center gap-1.5 text-textDim hover:text-white transition-colors"
        >
          <span>Conheça as qualificações</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
        <span className="font-display tracking-[0.2em] uppercase text-[11px]">
          Barba na navalhete • Corte clássico
        </span>
      </div>
    </section>
  );
};
