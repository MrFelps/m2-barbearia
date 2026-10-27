import React from 'react';

export const PromoBanner: React.FC = () => {
  return (
    <aside aria-label="Aviso promocional" className="w-full bg-ink-higher border-y border-neutral-800/80 py-2.5 px-4 text-center">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs text-neutral-300">
        <span className="inline-block px-2 py-0.5 bg-brand-red/20 text-brand-red border border-brand-red/30 text-[10px] uppercase font-display tracking-widest font-bold rounded-sm">
          Exclusividade M2
        </span>
        <span className="tracking-wide">
          Atendimento com toalhas quentes aromáticas e bar executivo cortesia em todas as unidades.
        </span>
      </div>
    </aside>
  );
};
