import React from 'react';
import { BARBER_PROFILE } from '../../data/barberData';
import { HeroImageSettings } from '../../types/barber';

interface BarberHeroCutoutProps {
  settings: HeroImageSettings;
}

export const BarberHeroCutout: React.FC<BarberHeroCutoutProps> = ({ settings }) => {
  return (
    <div
      className="absolute right-0 sm:right-2 md:right-6 lg:right-12 xl:right-24 bottom-4 sm:bottom-8 lg:bottom-12 pointer-events-none flex items-end justify-end select-none transition-transform duration-75"
      style={{
        zIndex: settings.zIndex,
        opacity: settings.opacity / 100,
      }}
      aria-hidden="true"
    >
      {/* Versão Mobile: Altura e coordenadas calibradas para o celular */}
      <div
        className="sm:hidden"
        style={{
          transform: `translate(${settings.xOffset}px, ${settings.yOffset}px) scale(${settings.scale / 100})`,
          transformOrigin: 'bottom center',
        }}
      >
        <img
          src="/assets/img/felipe-boccardo.png"
          alt={BARBER_PROFILE.name}
          className="h-[68vh] max-h-[840px] w-auto object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          style={{
            filter: `brightness(${settings.brightness || 105}%) contrast(${settings.contrast || 105}%)`,
          }}
        />
      </div>

      {/* Versão Multi-Monitor (Monitor em Pé, Estreito, Widescreen e Ultrawide) */}
      <div
        className="hidden sm:block"
        style={{
          transform: `translate(${settings.desktopXOffset ?? 0}px, ${settings.desktopYOffset ?? 0}px) scale(${((settings.desktopScale ?? 100)) / 100})`,
          transformOrigin: 'bottom right',
        }}
      >
        <img
          src="/assets/img/felipe-boccardo.png"
          alt={BARBER_PROFILE.name}
          className="sm:h-[65vh] md:h-[75vh] lg:h-[82vh] xl:h-[86vh] max-h-[880px] max-w-[50vw] sm:max-w-[45vw] lg:max-w-none w-auto object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          style={{
            filter: `brightness(${settings.brightness || 105}%) contrast(${settings.contrast || 105}%)`,
          }}
        />
      </div>
    </div>
  );
};
