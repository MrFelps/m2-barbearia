import React from 'react';
import { Smartphone, RotateCcw, ZoomIn, ZoomOut, X, Frame, Sliders } from 'lucide-react';
import { DEVICE_PRESETS, DevicePreset } from '../../types/simulator';

interface SimulatorControlBarProps {
  activeDevice: DevicePreset;
  isLandscape: boolean;
  scale: number;
  showFrame: boolean;
  isAdjusterOpen?: boolean;
  onSelectDevice: (id: string) => void;
  onToggleOrientation: () => void;
  onSetScale: (scale: number) => void;
  onToggleFrame: () => void;
  onAutoFit: () => void;
  onToggleAdjuster?: () => void;
  onClose: () => void;
}

export const SimulatorControlBar: React.FC<SimulatorControlBarProps> = ({
  activeDevice,
  isLandscape,
  scale,
  showFrame,
  isAdjusterOpen,
  onSelectDevice,
  onToggleOrientation,
  onSetScale,
  onToggleFrame,
  onAutoFit,
  onToggleAdjuster,
  onClose,
}) => {
  const currentWidth = isLandscape ? activeDevice.height : activeDevice.width;
  const currentHeight = isLandscape ? activeDevice.width : activeDevice.height;

  return (
    <aside aria-label="Controles do Simulador Mobile" className="fixed top-2 left-1/2 -translate-x-1/2 z-[100] max-w-[96vw] w-auto">
      <div className="bg-surface/95 backdrop-blur-md border border-neutral-700/80 rounded-2xl px-3 py-1.5 shadow-2xl flex items-center gap-2 overflow-x-auto">
        {/* Identificador Executivo */}
        <div className="flex items-center gap-2 pr-2 border-r border-neutral-700/60 hidden sm:flex">
          <Smartphone className="w-4 h-4 text-brand-red" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            Simulador Mobile
          </span>
        </div>

        {/* Seletor de Modelo */}
        <select
          value={activeDevice.id}
          onChange={(e) => onSelectDevice(e.target.value)}
          aria-label="Selecionar modelo de smartphone"
          className="bg-ink border border-neutral-700 text-gray-200 text-xs rounded-lg px-2.5 py-1.5 min-h-[44px] focus:outline-none focus:border-brand-red"
        >
          {DEVICE_PRESETS.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} ({d.width}×{d.height})
            </option>
          ))}
        </select>

        {/* Indicador de Resolução */}
        <div className="hidden md:flex flex-col text-[10px] text-gray-400 font-mono px-1">
          <span>{currentWidth} × {currentHeight} px</span>
          <span className="text-[9px] text-neutral-500">{isLandscape ? 'Paisagem' : 'Retrato'}</span>
        </div>

        {/* Alternador de Orientação */}
        <button
          onClick={onToggleOrientation}
          title="Girar orientação (Retrato / Paisagem)"
          aria-label="Girar orientação"
          className="text-gray-300 hover:text-white bg-ink border border-neutral-700/80 p-2 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-neutral-800 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Botão de Ajuste do Barbeiro com Joystick */}
        {onToggleAdjuster && (
          <button
            onClick={onToggleAdjuster}
            title={isAdjusterOpen ? 'Fechar Joystick de posicionamento' : 'Abrir Joystick para posicionar foto do barbeiro no celular'}
            aria-label="Ajustar foto com joystick"
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all min-h-[44px] ${
              isAdjusterOpen
                ? 'bg-brand-red text-white border-white/30 shadow-md'
                : 'bg-ink text-gray-300 hover:text-white border-neutral-700/80 hover:bg-neutral-800'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ajustar Barbeiro</span>
          </button>
        )}

        {/* Controles de Escala / Zoom */}
        <div className="flex items-center gap-1 bg-ink border border-neutral-700/80 rounded-lg p-0.5">
          <button
            onClick={() => onSetScale(scale - 0.05)}
            title="Diminuir Zoom"
            aria-label="Diminuir zoom"
            className="text-gray-300 hover:text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-neutral-800 rounded"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono px-1 text-gray-300 min-w-[40px] text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => onSetScale(scale + 0.05)}
            title="Aumentar Zoom"
            aria-label="Aumentar zoom"
            className="text-gray-300 hover:text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-neutral-800 rounded"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Ajuste Automático à Janela */}
        <button
          onClick={onAutoFit}
          title="Ajustar automaticamente à altura da janela"
          className="text-xs text-gray-300 hover:text-white bg-ink border border-neutral-700/80 px-2.5 py-1.5 rounded-lg min-h-[44px] flex items-center gap-1 hover:bg-neutral-800 transition-colors hidden sm:flex"
        >
          <span>Ajustar</span>
        </button>

        {/* Alternar Moldura */}
        <button
          onClick={onToggleFrame}
          title={showFrame ? 'Ocultar moldura física' : 'Exibir moldura física'}
          aria-label={showFrame ? 'Ocultar moldura' : 'Exibir moldura'}
          className={`p-2 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center border transition-colors ${
            showFrame
              ? 'bg-neutral-800 text-white border-neutral-600'
              : 'bg-ink text-gray-400 border-neutral-700/80 hover:text-white'
          }`}
        >
          <Frame className="w-4 h-4" />
        </button>

        {/* Fechar Simulador */}
        <button
          onClick={onClose}
          title="Sair do Simulador (Voltar ao Desktop)"
          aria-label="Sair do simulador"
          className="bg-brand-red/90 hover:bg-brand-red text-white p-2 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center transition-all ml-1 shadow-md"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
