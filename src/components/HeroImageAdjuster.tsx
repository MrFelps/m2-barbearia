import React from 'react';
import { Sliders, Layers, Check, RotateCcw, X } from 'lucide-react';
import { HeroImageSettings } from '../types/barber';

interface HeroImageAdjusterProps {
  settings: HeroImageSettings;
  isOpen: boolean;
  isSaved: boolean;
  onToggle: () => void;
  onUpdate: <K extends keyof HeroImageSettings>(key: K, value: HeroImageSettings[K]) => void;
  onSave: () => void;
  onReset: () => void;
}

export const HeroImageAdjuster: React.FC<HeroImageAdjusterProps> = ({
  settings,
  isOpen,
  isSaved,
  onToggle,
  onUpdate,
  onSave,
  onReset,
}) => {
  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="h-11 min-h-[44px] px-4 bg-ink-elevated hover:bg-neutral-800 text-neutral-200 border border-neutral-700 shadow-2xl rounded-sm flex items-center gap-2 text-xs font-display uppercase tracking-widest transition-all"
          style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
        >
          <Sliders className="w-4 h-4 text-brand-red" />
          <span>Ajustar Foto</span>
        </button>
      )}

      {/* Floating Control Panel */}
      {isOpen && (
        <div
          className="w-80 sm:w-96 bg-ink-elevated/95 backdrop-blur-md border border-neutral-700 rounded-lg shadow-2xl p-5 space-y-4 text-white text-xs animate-fadeIn"
          style={{ marginBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-brand-red" />
              <span className="font-display uppercase tracking-wider font-semibold text-sm">
                Ajuste da Imagem (Hero)
              </span>
            </div>
            <button
              onClick={onToggle}
              aria-label="Fechar painel"
              className="w-8 h-8 min-h-[44px] min-w-[44px] -mr-2 flex items-center justify-center text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scale Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-neutral-400 text-[11px] font-display uppercase">
              <span>Tamanho (Escala)</span>
              <span className="text-white font-bold">{settings.scale}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="180"
              value={settings.scale}
              onChange={(e) => onUpdate('scale', Number(e.target.value))}
              className="w-full accent-brand-red cursor-pointer h-2 bg-neutral-800 rounded"
            />
          </div>

          {/* Horizontal Position X Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-neutral-400 text-[11px] font-display uppercase">
              <span>Posição Horizontal (X)</span>
              <span className="text-white font-bold">{settings.xOffset}px</span>
            </div>
            <input
              type="range"
              min="-350"
              max="350"
              step="5"
              value={settings.xOffset}
              onChange={(e) => onUpdate('xOffset', Number(e.target.value))}
              className="w-full accent-brand-red cursor-pointer h-2 bg-neutral-800 rounded"
            />
          </div>

          {/* Vertical Position Y Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-neutral-400 text-[11px] font-display uppercase">
              <span>Posição Vertical (Y)</span>
              <span className="text-white font-bold">{settings.yOffset}px</span>
            </div>
            <input
              type="range"
              min="-200"
              max="200"
              step="5"
              value={settings.yOffset}
              onChange={(e) => onUpdate('yOffset', Number(e.target.value))}
              className="w-full accent-brand-red cursor-pointer h-2 bg-neutral-800 rounded"
            />
          </div>

          {/* Opacity Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-neutral-400 text-[11px] font-display uppercase">
              <span>Opacidade</span>
              <span className="text-white font-bold">{settings.opacity}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={settings.opacity}
              onChange={(e) => onUpdate('opacity', Number(e.target.value))}
              className="w-full accent-brand-red cursor-pointer h-2 bg-neutral-800 rounded"
            />
          </div>

          {/* Layer (Z-Index) Selector */}
          <div className="space-y-1.5 pt-1">
            <span className="text-neutral-400 text-[11px] font-display uppercase block">
              Ordem da Camada (Layer)
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onUpdate('zIndex', 10)}
                className={`min-h-[44px] px-3 py-2 text-xs font-display uppercase tracking-wider rounded-sm flex items-center justify-center gap-1.5 transition-colors ${
                  settings.zIndex === 10
                    ? 'bg-brand-red text-white font-bold'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Atrás do Texto (z-10)</span>
              </button>

              <button
                type="button"
                onClick={() => onUpdate('zIndex', 30)}
                className={`min-h-[44px] px-3 py-2 text-xs font-display uppercase tracking-wider rounded-sm flex items-center justify-center gap-1.5 transition-colors ${
                  settings.zIndex === 30
                    ? 'bg-brand-red text-white font-bold'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>À Frente (z-30)</span>
              </button>
            </div>
          </div>

          {/* Action Buttons: Save & Reset */}
          <div className="pt-2 flex items-center gap-2 border-t border-neutral-800">
            <button
              onClick={onSave}
              className={`flex-1 min-h-[44px] text-xs font-display uppercase tracking-widest font-semibold rounded-sm flex items-center justify-center gap-2 transition-all ${
                isSaved
                  ? 'bg-emerald-600 text-white'
                  : 'bg-brand-red hover:bg-red-700 text-white'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{isSaved ? 'Posição Salva!' : 'Salvar Posição'}</span>
            </button>

            <button
              onClick={onReset}
              title="Restaurar padrão"
              className="w-11 min-h-[44px] min-w-[44px] bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white rounded-sm flex items-center justify-center transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
