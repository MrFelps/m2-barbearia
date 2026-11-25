import React from 'react';
import { Calendar, Star } from 'lucide-react';
import { BARBER_PROFILE } from '../../data/barberData';
import { HeroImageSettings } from '../../types/barber';

interface HeroActionButtonsProps {
  settings: HeroImageSettings;
  isSimulator: boolean;
}

export const HeroActionButtons: React.FC<HeroActionButtonsProps> = ({
  settings,
  isSimulator,
}) => {
  return (
    <div
      className={`${
        isSimulator
          ? 'mt-16 flex flex-col items-center justify-center gap-2.5 w-full transition-transform duration-75'
          : 'mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 w-full sm:w-auto'
      }`}
      style={
        isSimulator
          ? {
              transform: `translateY(${settings.buttonsYOffset || 0}px) scale(${
                (settings.buttonsScale || 100) / 100
              })`,
              transformOrigin: 'top center',
            }
          : undefined
      }
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
  );
};
