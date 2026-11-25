import React from 'react';
import { BARBER_PROFILE } from '../../data/barberData';
import { HeroImageSettings } from '../../types/barber';

interface BarberHeroCutoutProps {
  settings?: HeroImageSettings;
  isSimulator?: boolean;
}

export const BarberHeroCutout: React.FC<BarberHeroCutoutProps> = ({
  settings,
  isSimulator = false,
}) => {
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

  // Modo Simulador Mobile: Composição centralizada exclusiva para a moldura do celular
  if (isSimulator) {
    return (
      <div
        className="absolute inset-x-0 top-14 bottom-0 pointer-events-none flex items-start justify-center select-none overflow-hidden"
        style={{ zIndex: 10, opacity }}
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
                WebkitMaskImage:
                  'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.25) 3%, rgba(0,0,0,0.75) 8%, black 18%, black 100%)',
                maskImage:
                  'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.25) 3%, rgba(0,0,0,0.75) 8%, black 18%, black 100%)',
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
    );
  }

  // Padrão Oficial do Site (PC, Monitores e Celular fora do simulador): Barbeiro à direita elevado 1,5cm
  const x = currentSettings.desktopXOffset ?? currentSettings.xOffset ?? 0;
  const y = (currentSettings.desktopYOffset ?? currentSettings.yOffset ?? 0) - 56;
  const scale = (currentSettings.desktopScale ?? currentSettings.scale ?? 100) / 100;

  return (
    <div
      className="absolute right-0 sm:right-2 md:right-6 lg:right-12 xl:right-24 bottom-0 pointer-events-none flex items-end justify-end select-none"
      style={{ zIndex: 10, opacity }}
      aria-hidden="true"
    >
      <div
        className="relative transition-transform duration-75"
        style={{
          transform: `translate(${x}px, ${y}px) scale(${scale})`,
          transformOrigin: 'bottom right',
        }}
      >
        <img
          src="/assets/img/felipe-boccardo.png"
          alt={BARBER_PROFILE.name}
          className="h-[52vh] sm:h-[74vh] md:h-[80vh] lg:h-[86vh] max-h-[880px] max-w-[50vw] sm:max-w-[45vw] lg:max-w-none w-auto object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] opacity-35 sm:opacity-100"
          style={{
            filter: `brightness(${brightness}%) contrast(${contrast}%)`,
            WebkitMaskImage:
              'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.7) 8%, black 22%, black 100%)',
            maskImage:
              'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.7) 8%, black 22%, black 100%)',
          }}
        />
        {/* Degradê preto clareando de baixo para cima disfarçando a linha de corte da barriga */}
        <div
          className="absolute inset-x-0 bottom-0 h-24 pointer-events-none bg-gradient-to-t from-ink via-ink/80 to-transparent"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};
