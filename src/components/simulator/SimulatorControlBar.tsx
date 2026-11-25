import React from 'react';
import { Smartphone, RotateCcw, ZoomIn, ZoomOut, X, Frame, ExternalLink } from 'lucide-react';
import { DEVICE_PRESETS, DevicePreset } from '../../types/simulator';

interface SimulatorControlBarProps {
  activeDevice: DevicePreset;
  isLandscape: boolean;
  scale: number;
  showFrame: boolean;
  onOpenDirectly?: () => void;
  onSelectDevice: (id: string) => void;
  onToggleOrientation: () => void;
  onSetScale: (scale: number) => void;
  onToggleFrame: () => void;
  onAutoFit: () => void;
  onClose: () => void;
}

export const SimulatorControlBar: React.FC<SimulatorControlBarProps> = ({
  activeDevice,
  isLandscape,
  scale,
  showFrame,
  onOpenDirectly,
  onSelectDevice,
  onToggleOrientation,
  onSetScale,
  onToggleFrame,
  onAutoFit,
  onClose,
}) => {
  const currentWidth = isLandscape ? activeDevice.height : activeDevice.width;
  const currentHeight = isLandscape ? activeDevice.width : activeDevice.height;

  return (
    <aside aria-label="Controles do Simulador Mobile" className="fixed top-2 left-1/2 -translate-x-1/2 z-[100] max-w-[96vw] w-auto">
      <div className="bg-surface/95 backdrop-blur-md border border-neutral-700/80 rounded-2xl px-3 py-1.5 shadow-2xl flex items-center gap-2 overflow-x-auto">
        <div className="flex items-center gap-2 pr-2 border-r border-neutral-700/60 hidden sm:flex">
          <Smartphone className="w-4 h-4 text-brand-red" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">Simulador Mobile</span>
        </div>

        {/* Seletor de Modelo */}
        <select
          value={activeDevice.id}
          onChange={(e) => onSelectDevice(e.target.value)}
          aria-label="Selecionar modelo de smartphone"
          className="bg-ink border border-neutral-700 text-gray-200 text-xs rounded-lg px-2.5 py-1.5 min-h-[44px] focus:outline-none focus:border-brand-red"
        >
          {DEVICE_PRESETS.map((d) => (
            <option key={d.id} value={d.id}>{d.name} ({d.width}×{d.height})</option>
          ))}
        </select>

        <div className="hidden md:flex flex-col text-[10px] text-gray-400 font-mono px-1">
          <span>{currentWidth} × {currentHeight} px</span>
          <span className="text-[9px] text-neutral-500">{isLandscape ? 'Paisagem' : 'Retrato'}</span>
        </div>

        <button
          onClick={onToggleOrientation}
          title="Girar orientação"
          className="text-gray-300 hover:text-white bg-ink border border-neutral-700/80 p-2 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-neutral-800"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Botão Abrir Site no Celular */}
        <button
          onClick={onOpenDirectly || (() => window.open('/?view=home', '_blank'))}
          title="Abrir a tela como site real no seu celular"
          className="px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-neutral-700/80 bg-ink text-gray-200 hover:text-white hover:bg-neutral-800 min-h-[44px]"
        >
          <ExternalLink className="w-3.5 h-3.5 text-brand-gold" />
          <span className="hidden sm:inline">Abrir no Celular</span>
        </button>

        {/* Zoom */}
        <div className="flex items-center gap-1 bg-ink border border-neutral-700/80 rounded-lg p-0.5">
          <button onClick={() => onSetScale(scale - 0.05)} title="Zoom -" className="text-gray-300 hover:text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center">
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono px-1 text-gray-300 min-w-[40px] text-center">{Math.round(scale * 100)}%</span>
          <button onClick={() => onSetScale(scale + 0.05)} title="Zoom +" className="text-gray-300 hover:text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center">
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        <button onClick={onAutoFit} title="Ajustar" className="text-xs text-gray-300 hover:text-white bg-ink border border-neutral-700/80 px-2.5 py-1.5 rounded-lg min-h-[44px] hidden sm:flex items-center">
          Ajustar
        </button>

        <button onClick={onToggleFrame} title="Alternar Moldura" className={`p-2 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center border ${showFrame ? 'bg-neutral-800 text-white border-neutral-600' : 'bg-ink text-gray-400 border-neutral-700/80'}`}>
          <Frame className="w-4 h-4" />
        </button>

        <button onClick={onClose} title="Sair do Simulador" className="bg-brand-red/90 hover:bg-brand-red text-white p-2 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center ml-1 shadow-md">
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
