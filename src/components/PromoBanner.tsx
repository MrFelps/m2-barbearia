import React from 'react';

export const PromoBanner: React.FC = () => {
  return (
    <aside aria-label="Aviso promocional" className="w-full bg-ink-higher border-y border-neutral-800/80 py-1 sm:py-1.5 px-3 text-center">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-neutral-400">
        <span className="inline-block px-1.5 py-0.5 bg-brand-red/20 text-brand-red border border-brand-red/30 text-[8px] sm:text-[9px] uppercase font-display tracking-widest font-bold rounded-xs shrink-0">
          Exclusividade M2
        </span>
        <span className="tracking-normal sm:tracking-wide truncate sm:whitespace-normal">
          Atendimento com toalhas quentes aromáticas e bar executivo cortesia em todas as unidades.
        </span>
      </div>
    </aside>
  );
};
