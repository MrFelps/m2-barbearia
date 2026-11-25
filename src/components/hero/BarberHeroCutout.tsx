import React from 'react';
import { BARBER_PROFILE } from '../../data/barberData';
import { HeroImageSettings } from '../../types/barber';

interface BarberHeroCutoutProps {
  settings?: HeroImageSettings;
}

export const BarberHeroCutout: React.FC<BarberHeroCutoutProps> = ({ settings }) => {
  const brightness = settings?.brightness ?? 107;
  const contrast = settings?.contrast ?? 105;
  const opacity = (settings?.opacity ?? 100) / 100;

  return (
    <>
      {/* Versão Mobile (Travada com precisão no Centro, cabeça inteira visível abaixo do header) */}
      <div
        className="sm:hidden absolute inset-x-0 top-14 bottom-0 pointer-events-none flex items-start justify-center select-none overflow-hidden"
        style={{
          zIndex: 10,
          opacity,
        }}
        aria-hidden="true"
      >
        <div
          className="relative w-full h-full flex items-start justify-center transition-transform duration-75"
          style={{
            transform: 'translate(2px, 8px) scale(1.10)',
            transformOrigin: 'top center',
          }}
        >
          <img
            src="/assets/img/felipe-boccardo.png"
            alt={BARBER_PROFILE.name}
            className="h-[68vh] max-h-[580px] w-auto object-contain object-top drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            style={{
              filter: `brightness(${brightness}%) contrast(${contrast}%)`,
            }}
          />
        </div>
      </div>

      {/* Versão Desktop / Multi-Monitor (Travada à direita, exatamente como no print do PC aprovado) */}
      <div
        className="hidden sm:flex absolute right-0 sm:right-2 md:right-6 lg:right-12 xl:right-24 bottom-0 pointer-events-none items-end justify-end select-none"
        style={{
          zIndex: 10,
          opacity,
        }}
        aria-hidden="true"
      >
        <div
          className="transition-transform duration-75"
          style={{
            transform: `translate(${settings?.desktopXOffset ?? 0}px, ${settings?.desktopYOffset ?? 0}px) scale(${(settings?.desktopScale ?? 100) / 100})`,
            transformOrigin: 'bottom right',
          }}
        >
          <img
            src="/assets/img/felipe-boccardo.png"
            alt={BARBER_PROFILE.name}
            className="sm:h-[74vh] md:h-[80vh] lg:h-[86vh] max-h-[880px] max-w-[50vw] sm:max-w-[45vw] lg:max-w-none w-auto object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            style={{
              filter: `brightness(${brightness}%) contrast(${contrast}%)`,
            }}
          />
        </div>
      </div>
    </>
  );
};
