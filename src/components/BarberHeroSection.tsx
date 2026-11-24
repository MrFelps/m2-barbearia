import React from 'react';
import { Calendar, Star, ChevronDown, Award } from 'lucide-react';
import { BARBER_PROFILE } from '../data/barberData';
import { HeroImageSettings } from '../types/barber';

interface BarberHeroSectionProps {
  imageSettings?: HeroImageSettings;
}

export const BarberHeroSection: React.FC<BarberHeroSectionProps> = ({
  imageSettings,
}) => {
  const currentSettings: HeroImageSettings = imageSettings || {
    scale: 100,
    xOffset: 10,
    yOffset: -40,
    zIndex: 10,
    opacity: 100,
    brightness: 105,
    contrast: 105,
    textYOffset: 0,
    textScale: 100,
    textBackdropOpacity: 65,
    buttonsYOffset: 0,
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-between pt-20 sm:pt-28 md:pt-32 pb-6 sm:pb-12 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 75% 50%, rgba(11,11,11,0.45) 0%, rgba(11,11,11,0.82) 65%, rgba(11,11,11,0.98) 100%),
          linear-gradient(180deg, rgba(11,11,11,0.78) 0%, rgba(11,11,11,0.52) 40%, rgba(11,11,11,0.88) 80%, rgba(11,11,11,1) 100%),
          url('/assets/img/m2-fachada-cinematic.jpg')
        `,
      }}
    >
      {/* Camada do Barbeiro com Recorte (z-10: nítido e em evidência) */}
      <div
        className="absolute right-0 sm:right-4 md:right-8 lg:right-16 xl:right-28 bottom-10 sm:bottom-14 pointer-events-none flex items-end justify-end select-none transition-transform duration-75"
        style={{
          zIndex: currentSettings.zIndex,
          opacity: currentSettings.opacity / 100,
          transform: `translate(${currentSettings.xOffset}px, ${currentSettings.yOffset}px) scale(${currentSettings.scale / 100})`,
          transformOrigin: 'bottom center',
        }}
        aria-hidden="true"
      >
        <img
          src="/assets/img/felipe-boccardo.png"
          alt={BARBER_PROFILE.name}
          className="h-[52vh] sm:h-[68vh] md:h-[78vh] lg:h-[84vh] max-h-[820px] w-auto object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          style={{
            filter: `brightness(${currentSettings.brightness || 105}%) contrast(${currentSettings.contrast || 105}%)`,
          }}
        />
      </div>

      {/* Camada z-[15]: Degradê focal preservando a nitidez do rosto e garantindo contraste do texto */}
      <div
        className="absolute inset-0 pointer-events-none z-[15] select-none transition-opacity duration-150"
        style={{
          opacity: (currentSettings.textBackdropOpacity ?? 65) / 100,
          background: `
            radial-gradient(ellipse 70% 55% at 50% 62%, rgba(11,11,11,0.95) 0%, rgba(11,11,11,0.65) 45%, rgba(11,11,11,0.15) 75%, transparent 100%),
            linear-gradient(180deg, transparent 0%, rgba(11,11,11,0.15) 25%, rgba(11,11,11,0.70) 60%, rgba(11,11,11,0.95) 100%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Camada z-20: Textos e Botões na frente da foto do barbeiro */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 my-auto flex flex-col items-center text-center relative z-20">
        {/* Bloco Ajustável do Texto Central (Emblema + Título + Nome + Slogan) */}
        <div
          className="flex flex-col items-center text-center transition-transform duration-75 origin-top"
          style={{
            transform: `translateY(${currentSettings.textYOffset || 0}px) scale(${(currentSettings.textScale || 100) / 100})`,
          }}
        >
          {/* Emblema M2 Barbearia com Selo Especial */}
          <div className="relative mb-2.5 sm:mb-3 group">
            <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full overflow-hidden border-[1.5px] border-brand-red p-1 sm:p-1.5 bg-ink-elevated shadow-xl transition-transform duration-500 group-hover:scale-105 flex items-center justify-center">
              <img
                src="/assets/img/logo-m2-white.png"
                alt="M2 Barbearia"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-ink-elevated border border-neutral-700 text-brand-red px-2 py-0.5 text-[7px] sm:text-[8px] font-display uppercase tracking-widest font-semibold rounded-full whitespace-nowrap shadow-md">
              {BARBER_PROFILE.badge}
            </span>
          </div>

          {/* Título, Nome e Subtítulo */}
          <div className="space-y-1 sm:space-y-1.5 max-w-2xl bg-ink/40 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none p-2.5 sm:p-0 rounded-lg">
            <span className="text-[10px] sm:text-[11px] font-display uppercase tracking-[0.3em] text-neutral-400 block font-semibold">
              {BARBER_PROFILE.role}
            </span>
            <h1 className="text-3xl sm:text-6xl md:text-7xl font-display uppercase font-semibold text-white tracking-tight leading-[1.05] drop-shadow-md">
              {BARBER_PROFILE.name}
            </h1>
            <p className="text-[11px] sm:text-xs font-display uppercase tracking-[0.22em] text-brand-gold/90 font-medium pt-0.5">
              A barbearia que leva o clássico a sério
            </p>
            <div className="flex items-center justify-center gap-1.5 text-neutral-400">
              <Award className="w-3 h-3 text-brand-red" />
              <span className="text-[9px] sm:text-[10px] font-display uppercase tracking-[0.25em]">
                Especialista em Visagismo Masculino
              </span>
            </div>
          </div>
        </div>

        {/* Bloco Ajustável dos Botões de Ação */}
        <div
          className="mt-16 sm:mt-24 md:mt-28 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto transition-transform duration-75"
          style={{
            transform: `translateY(${currentSettings.buttonsYOffset || 0}px)`,
          }}
        >
          <a
            href={BARBER_PROFILE.bookingAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto h-12 min-h-[44px] px-6 sm:px-7 bg-brand-red hover:bg-red-700 active:scale-[0.98] text-white font-display uppercase text-xs tracking-[0.18em] font-semibold flex items-center justify-center gap-2.5 rounded-sm transition-all shadow-xl shadow-red-950/50"
          >
            <Calendar className="w-4 h-4" />
            <span>Agendar no AppBarber</span>
          </a>

          <a
            href={BARBER_PROFILE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto h-12 min-h-[44px] px-6 sm:px-7 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-500 text-white font-display uppercase text-xs tracking-[0.18em] font-semibold flex items-center justify-center gap-2.5 rounded-sm transition-all backdrop-blur-sm"
          >
            <span className="text-xs">Instagram Oficial</span>
          </a>

          <a
            href={BARBER_PROFILE.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto h-12 min-h-[44px] px-6 sm:px-7 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-500 text-white font-display uppercase text-xs tracking-[0.18em] font-semibold flex items-center justify-center gap-2.5 rounded-sm transition-all backdrop-blur-sm"
          >
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Avaliar no Google</span>
          </a>
        </div>
      </div>

      {/* Rodapé da Hero Desktop (Oculto no mobile para desimpedir os botões) */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-6 sm:pt-8 border-t border-white/10 hidden sm:flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-textFaint relative z-20 text-center sm:text-left">
        <span className="font-display tracking-[0.18em] uppercase text-[10px] sm:text-[11px]">
          Rua América do Sul, 57 • Santo André / SP
        </span>
        <a
          href="#qualificacoes"
          aria-label="Rolar para qualificações"
          className="flex items-center justify-center gap-1.5 text-textDim hover:text-white transition-colors"
        >
          <span>Conheça as qualificações</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
        <span className="font-display tracking-[0.18em] uppercase text-[10px] sm:text-[11px] hidden md:inline">
          Barba na navalhete • Corte clássico
        </span>
      </div>

      {/* Indicador Mobile Discreto e Minimalista */}
      <div className="sm:hidden w-full flex justify-center pb-2 pt-1 relative z-20 pointer-events-none">
        <ChevronDown className="w-4 h-4 text-neutral-500 animate-bounce" />
      </div>
    </section>
  );
};
