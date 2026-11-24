import React from 'react';
import { ArrowUp, ArrowDown, RotateCcw } from 'lucide-react';
import { HeroImageSettings } from '../../types/barber';

interface AdjusterButtonsTabProps {
  settings: HeroImageSettings;
  onUpdate: <K extends keyof HeroImageSettings>(key: K, value: HeroImageSettings[K]) => void;
}

export const AdjusterButtonsTab: React.FC<AdjusterButtonsTabProps> = ({
  settings,
  onUpdate,
}) => {
  const buttonsY = settings.buttonsYOffset || 0;
  const buttonsScale = settings.buttonsScale || 100;

  const handleReset = () => {
    onUpdate('buttonsYOffset', 0);
    onUpdate('buttonsScale', 100);
  };

  return (
    <div className="space-y-3 animate-fadeIn py-1">
      {/* Posição Vertical (Subir / Descer) */}
      <div className="space-y-1">
        <div className="flex justify-between text-neutral-400 text-[10px] font-display uppercase">
          <span>Subir / Descer Botões</span>
          <span className="text-white font-mono font-bold">{buttonsY}px</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onUpdate('buttonsYOffset', buttonsY - 10)}
            title="Subir 10px"
            className="p-2 min-h-[44px] min-w-[44px] bg-ink border border-neutral-700 rounded-lg flex items-center justify-center text-white hover:bg-neutral-800"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <input
            type="range"
            min="-100"
            max="400"
            step="5"
            value={buttonsY}
            onChange={(e) => onUpdate('buttonsYOffset', Number(e.target.value))}
            className="flex-1 accent-brand-red cursor-pointer h-2 bg-neutral-800 rounded"
          />
          <button
            type="button"
            onClick={() => onUpdate('buttonsYOffset', buttonsY + 10)}
            title="Descer 10px"
            className="p-2 min-h-[44px] min-w-[44px] bg-ink border border-neutral-700 rounded-lg flex items-center justify-center text-white hover:bg-neutral-800"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tamanho / Escala dos Botões */}
      <div className="space-y-1">
        <div className="flex justify-between text-neutral-400 text-[10px] font-display uppercase">
          <span>Tamanho dos Botões</span>
          <span className="text-white font-mono font-bold">{buttonsScale}%</span>
        </div>
        <input
          type="range"
          min="60"
          max="140"
          step="2"
          value={buttonsScale}
          onChange={(e) => onUpdate('buttonsScale', Number(e.target.value))}
          className="w-full accent-brand-red cursor-pointer h-2 bg-neutral-800 rounded"
        />
      </div>

      <button
        type="button"
        onClick={handleReset}
        className="w-full py-1.5 bg-ink border border-neutral-700 text-[10px] font-display uppercase tracking-wider text-neutral-300 rounded flex items-center justify-center gap-1.5 hover:bg-neutral-800"
      >
        <RotateCcw className="w-3 h-3" />
        <span>Restaurar Botões ao Padrão</span>
      </button>
    </div>
  );
};
