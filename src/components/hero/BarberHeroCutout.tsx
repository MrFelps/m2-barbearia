import React from 'react';
import { BARBER_PROFILE } from '../../data/barberData';
import { HeroImageSettings } from '../../types/barber';

interface BarberHeroCutoutProps {
  settings?: HeroImageSettings;
  isSimulator?: boolean;
}

export const BarberHeroCutout: React.FC<BarberHeroCutoutProps> = ({ settings }) => {
  const currentSettings: HeroImageSettings = settings || {
    scale: 100,
    xOffset: 10,
    yOffset: -40,
    zIndex: 10,
    opacity: 100,
    brightness: 105,
    contrast: 105,
  };

  const brightness = currentSettings.brightness ?? 105;
  const contrast = currentSettings.contrast ?? 105;
  const opacity = (currentSettings.opacity ?? 100) / 100;

  return (
    <>
      {/* Versão Mobile (Exata da imagem do usuário: Centralizado, imponente, cabeça visível e degradê suave na base) */}
      <div
        className="sm:hidden absolute inset-x-0 top-14 bottom-0 pointer-events-none flex items-start justify-center select-none overflow-hidden"
        style={{
          zIndex: 10,
          opacity,
        }}
        aria-hidden="true"
      >
        <div
          className="relative transition-transform duration-75"
          style={{
            transform: 'translate(0px, 6px) scale(1.10)',
            transformOrigin: 'top center',
          }}
        >
          <div className="relative inline-block">
            <img
              src="/assets/img/felipe-boccardo.png"
              alt={BARBER_PROFILE.name}
              className="h-[68vh] max-h-[580px] w-auto object-contain object-top drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
              style={{
                filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.25) 3%, rgba(0,0,0,0.75) 8%, black 18%, black 100%)',
                maskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.25) 3%, rgba(0,0,0,0.75) 8%, black 18%, black 100%)',
              }}
            />
            {/* Degradê suave de baixo para cima disfarçando a linha inferior do corte */}
            <div
              className="absolute inset-x-0 bottom-0 h-24 pointer-events-none bg-gradient-to-t from-ink via-ink/75 to-transparent"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Versão Desktop (Monitores / PC): Barbeiro à direita, elevado e proporcional com degradê suave */}
      <div
        className="hidden sm:flex absolute right-0 sm:right-4 md:right-8 lg:right-16 xl:right-28 bottom-10 sm:bottom-14 pointer-events-none items-end justify-end select-none transition-transform duration-75"
        style={{
          zIndex: currentSettings.zIndex ?? 10,
          opacity,
          transform: `translate(${currentSettings.desktopXOffset ?? currentSettings.xOffset ?? 10}px, ${currentSettings.desktopYOffset ?? currentSettings.yOffset ?? -40}px) scale(${((currentSettings.desktopScale ?? currentSettings.scale ?? 100)) / 100})`,
          transformOrigin: 'bottom center',
        }}
        aria-hidden="true"
      >
        <div className="relative inline-block">
          <img
            src="/assets/img/felipe-boccardo.png"
            alt={BARBER_PROFILE.name}
            className="sm:h-[68vh] md:h-[78vh] lg:h-[84vh] max-h-[820px] w-auto object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            style={{
              filter: `brightness(${brightness}%) contrast(${contrast}%)`,
              WebkitMaskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.25) 3%, rgba(0,0,0,0.75) 8%, black 18%, black 100%)',
              maskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.25) 3%, rgba(0,0,0,0.75) 8%, black 18%, black 100%)',
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-20 pointer-events-none bg-gradient-to-t from-ink via-ink/75 to-transparent"
            aria-hidden="true"
          />
        </div>
      </div>
    </>
  );
};
