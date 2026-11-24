import React from 'react';
import { Calendar, Star, ChevronDown, Award } from 'lucide-react';
import { BARBER_PROFILE } from '../data/barberData';
import { HeroImageSettings } from '../types/barber';
import { BrandBar } from './BrandBar';
import { PromoBanner } from './PromoBanner';
import { BarberHeroCutout } from './hero/BarberHeroCutout';

interface BarberHeroSectionProps {
  imageSettings?: HeroImageSettings;
}

export const BarberHeroSection: React.FC<BarberHeroSectionProps> = ({
  imageSettings,
}) => {
  const currentSettings: HeroImageSettings = imageSettings || {
    scale: 118,
    xOffset: -13,
    yOffset: -234,
    zIndex: 10,
    opacity: 100,
    brightness: 107,
    contrast: 105,
    textYOffset: 150,
    textScale: 108,
    textBackdropOpacity: 65,
    buttonsYOffset: 115,
    buttonsScale: 102,
    whatsappXOffset: 10,
    whatsappYOffset: 20,
    whatsappScale: 85,
    desktopScale: 100,
    desktopXOffset: 0,
    desktopYOffset: 0,
    desktopTextYOffset: 0,
    desktopButtonsYOffset: 0,
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] sm:min-h-screen flex flex-col justify-between pt-16 sm:pt-28 md:pt-32 pb-0 overflow-hidden bg-ink"
    >
      {/* Camada z-0: Imagem de Fundo Desacoplada (Não empurra nem distorce o fluxo vertical) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <img
          src="/assets/img/m2-fachada-cinematic.jpg"
          alt="Fachada M2 Barbearia"
          className="w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 75% 50%, rgba(11,11,11,0.45) 0%, rgba(11,11,11,0.82) 65%, rgba(11,11,11,0.98) 100%),
              linear-gradient(180deg, rgba(11,11,11,0.78) 0%, rgba(11,11,11,0.52) 40%, rgba(11,11,11,0.88) 80%, rgba(11,11,11,1) 100%)
            `,
          }}
        />
      </div>

      {/* Camada do Barbeiro Recortado (Mobile e Desktop) */}
      <BarberHeroCutout settings={currentSettings} />

      {/* Camada z-[15]: Degradê preservando contraste */}
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
        {/* Bloco do Texto Central (Ajustes aplicam-se no Mobile; Desktop permanece no padrão clássico) */}
        <div
          className="flex flex-col items-center text-center transition-transform duration-75 origin-top sm:!transform-none"
          style={{
            transform: `translateY(${currentSettings.textYOffset || 0}px) scale(${(currentSettings.textScale || 100) / 100})`,
          }}
        >
          {/* Emblema M2 Barbearia com Selo Especial */}
          <div className="relative mb-2.5 sm:mb-4 group">
            <div className="w-11 h-11 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-[1.5px] sm:border-2 border-brand-red p-1 sm:p-2 bg-ink-elevated shadow-xl sm:shadow-2xl transition-transform duration-500 group-hover:scale-105 flex items-center justify-center">
              <img
                src="/assets/img/logo-m2-white.png"
                alt="M2 Barbearia"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-ink-elevated border border-neutral-700 text-brand-red px-2 py-0.5 text-[7px] sm:text-[9px] font-display uppercase tracking-widest font-semibold rounded-full whitespace-nowrap shadow-md">
              {BARBER_PROFILE.badge}
            </span>
          </div>

          {/* Título, Nome e Subtítulo */}
          <div className="space-y-1 sm:space-y-2 max-w-2xl bg-ink/40 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none p-2.5 sm:p-0 rounded-lg">
            <span className="text-[10px] sm:text-xs font-display uppercase tracking-[0.3em] text-neutral-400 block font-semibold">
              {BARBER_PROFILE.role}
            </span>
            <h1 className="text-3xl sm:text-6xl md:text-7xl font-display uppercase font-semibold text-white tracking-tight leading-[1.05] drop-shadow-md">
              {BARBER_PROFILE.name}
            </h1>
            <p className="text-[11px] sm:text-sm font-display uppercase tracking-[0.22em] text-brand-gold/90 font-medium pt-0.5 sm:pt-1">
              A barbearia que leva o clássico a sério
            </p>
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-neutral-400">
              <Award className="w-3 h-3 sm:w-4 sm:h-4 text-brand-red" />
              <span className="text-[9px] sm:text-xs font-display uppercase tracking-[0.25em]">
                Especialista em Visagismo Masculino
              </span>
            </div>
          </div>
        </div>

        {/* Bloco dos Botões de Ação (Ajustes no Mobile; Desktop no padrão clássico) */}
        <div
          className="mt-16 sm:mt-24 md:mt-28 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 w-full sm:w-auto transition-transform duration-75 sm:!transform-none"
          style={{
            transform: `translateY(${currentSettings.buttonsYOffset || 0}px) scale(${(currentSettings.buttonsScale || 100) / 100})`,
            transformOrigin: 'top center',
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

      {/* Rodapé da Hero Desktop (Padrão Original do Computador) */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-6 sm:pt-8 border-t border-white/10 hidden sm:flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-textFaint relative z-20 text-center sm:text-left">
        <span className="font-display tracking-[0.2em] uppercase text-[11px]">
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
        <span className="font-display tracking-[0.2em] uppercase text-[11px] hidden md:inline">
          Barba na navalhete • Corte clássico
        </span>
      </div>

      {/* Traço Inferior e Exclusividade M2 no Chão do Celular */}
      <div className="w-full relative z-20 mt-auto sm:hidden">
        <BrandBar />
        <PromoBanner />
      </div>
    </section>
  );
};
