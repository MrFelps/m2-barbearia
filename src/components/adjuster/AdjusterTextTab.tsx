import React from 'react';
import { ArrowUp, ArrowDown, RotateCcw } from 'lucide-react';
import { HeroImageSettings } from '../../types/barber';

interface AdjusterTextTabProps {
  settings: HeroImageSettings;
  onUpdate: <K extends keyof HeroImageSettings>(key: K, value: HeroImageSettings[K]) => void;
}

export const AdjusterTextTab: React.FC<AdjusterTextTabProps> = ({
  settings,
  onUpdate,
}) => {
  const textY = settings.textYOffset || 0;
  const textScale = settings.textScale || 100;
  const backdrop = settings.textBackdropOpacity ?? 65;

  return (
    <div className="space-y-3 animate-fadeIn py-1">
      {/* Posição Vertical */}
      <div className="space-y-1">
        <div className="flex justify-between text-neutral-400 text-[10px] font-display uppercase">
          <span>Posição Vertical do Texto</span>
          <span className="text-white font-mono font-bold">{textY}px</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onUpdate('textYOffset', textY - 5)}
            className="p-2 min-h-[44px] min-w-[44px] bg-ink border border-neutral-700 rounded-lg flex items-center justify-center text-white"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <input
            type="range"
            min="-150"
            max="250"
            step="5"
            value={textY}
            onChange={(e) => onUpdate('textYOffset', Number(e.target.value))}
            className="flex-1 accent-brand-red cursor-pointer h-2 bg-neutral-800 rounded"
          />
          <button
            type="button"
            onClick={() => onUpdate('textYOffset', textY + 5)}
            className="p-2 min-h-[44px] min-w-[44px] bg-ink border border-neutral-700 rounded-lg flex items-center justify-center text-white"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tamanho do Texto */}
      <div className="space-y-1">
        <div className="flex justify-between text-neutral-400 text-[10px] font-display uppercase">
          <span>Tamanho do Texto Central</span>
          <span className="text-white font-bold">{textScale}%</span>
        </div>
        <input
          type="range"
          min="70"
          max="130"
          value={textScale}
          onChange={(e) => onUpdate('textScale', Number(e.target.value))}
          className="w-full accent-brand-red cursor-pointer h-2 bg-neutral-800 rounded"
        />
      </div>

      {/* Intensidade do Degradê do Texto */}
      <div className="space-y-1">
        <div className="flex justify-between text-neutral-400 text-[10px] font-display uppercase">
          <span>Degradê / Contraste do Texto</span>
          <span className="text-white font-bold">{backdrop}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={backdrop}
          onChange={(e) => onUpdate('textBackdropOpacity', Number(e.target.value))}
          className="w-full accent-brand-red cursor-pointer h-2 bg-neutral-800 rounded"
        />
      </div>

      <button
        type="button"
        onClick={() => {
          onUpdate('textYOffset', 0);
          onUpdate('textScale', 100);
          onUpdate('textBackdropOpacity', 65);
        }}
        className="w-full py-1.5 bg-ink border border-neutral-700 text-[10px] font-display uppercase tracking-wider text-neutral-300 rounded flex items-center justify-center gap-1.5"
      >
        <RotateCcw className="w-3 h-3" />
        <span>Restaurar Texto ao Padrão</span>
      </button>
    </div>
  );
};
