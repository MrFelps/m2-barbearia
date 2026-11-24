import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { HeroImageSettings } from '../../types/barber';

interface AdjusterWhatsAppTabProps {
  settings: HeroImageSettings;
  onUpdate: <K extends keyof HeroImageSettings>(key: K, value: HeroImageSettings[K]) => void;
}

export const AdjusterWhatsAppTab: React.FC<AdjusterWhatsAppTabProps> = ({
  settings,
  onUpdate,
}) => {
  const x = settings.whatsappXOffset || 0;
  const y = settings.whatsappYOffset || 0;
  const scale = settings.whatsappScale || 100;

  const handleReset = () => {
    onUpdate('whatsappXOffset', 0);
    onUpdate('whatsappYOffset', 0);
    onUpdate('whatsappScale', 100);
  };

  return (
    <div className="space-y-3 animate-fadeIn py-1">
      {/* Posição Horizontal (Esquerda / Direita) */}
      <div className="space-y-1">
        <div className="flex justify-between text-neutral-400 text-[10px] font-display uppercase">
          <span>Posição Horizontal (X)</span>
          <span className="text-white font-mono font-bold">{x}px</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onUpdate('whatsappXOffset', x - 10)}
            title="Mover 10px para Esquerda"
            className="p-2 min-h-[44px] min-w-[44px] bg-ink border border-neutral-700 rounded-lg flex items-center justify-center text-white hover:bg-neutral-800"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <input
            type="range"
            min="-160"
            max="160"
            step="5"
            value={x}
            onChange={(e) => onUpdate('whatsappXOffset', Number(e.target.value))}
            className="flex-1 accent-brand-red cursor-pointer h-2 bg-neutral-800 rounded"
          />
          <button
            type="button"
            onClick={() => onUpdate('whatsappXOffset', x + 10)}
            title="Mover 10px para Direita"
            className="p-2 min-h-[44px] min-w-[44px] bg-ink border border-neutral-700 rounded-lg flex items-center justify-center text-white hover:bg-neutral-800"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Posição Vertical (Subir / Descer) */}
      <div className="space-y-1">
        <div className="flex justify-between text-neutral-400 text-[10px] font-display uppercase">
          <span>Posição Vertical (Y)</span>
          <span className="text-white font-mono font-bold">{y}px</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onUpdate('whatsappYOffset', y + 10)}
            title="Subir 10px"
            className="p-2 min-h-[44px] min-w-[44px] bg-ink border border-neutral-700 rounded-lg flex items-center justify-center text-white hover:bg-neutral-800"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <input
            type="range"
            min="-100"
            max="300"
            step="5"
            value={y}
            onChange={(e) => onUpdate('whatsappYOffset', Number(e.target.value))}
            className="flex-1 accent-brand-red cursor-pointer h-2 bg-neutral-800 rounded"
          />
          <button
            type="button"
            onClick={() => onUpdate('whatsappYOffset', y - 10)}
            title="Descer 10px"
            className="p-2 min-h-[44px] min-w-[44px] bg-ink border border-neutral-700 rounded-lg flex items-center justify-center text-white hover:bg-neutral-800"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tamanho / Escala do Ícone */}
      <div className="space-y-1">
        <div className="flex justify-between text-neutral-400 text-[10px] font-display uppercase">
          <span>Tamanho do Ícone</span>
          <span className="text-white font-mono font-bold">{scale}%</span>
        </div>
        <input
          type="range"
          min="50"
          max="150"
          step="5"
          value={scale}
          onChange={(e) => onUpdate('whatsappScale', Number(e.target.value))}
          className="w-full accent-brand-red cursor-pointer h-2 bg-neutral-800 rounded"
        />
      </div>

      <button
        type="button"
        onClick={handleReset}
        className="w-full py-1.5 bg-ink border border-neutral-700 text-[10px] font-display uppercase tracking-wider text-neutral-300 rounded flex items-center justify-center gap-1.5 hover:bg-neutral-800"
      >
        <RotateCcw className="w-3 h-3" />
        <span>Restaurar WhatsApp ao Padrão</span>
      </button>
    </div>
  );
};
