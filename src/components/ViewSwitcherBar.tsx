import React, { useState, useRef, useEffect } from 'react';
import { Home, QrCode, DollarSign, ChevronUp, ChevronDown, Smartphone } from 'lucide-react';

export type AppView = 'home' | 'bancada' | 'caixa' | 'cliente' | 'celular';

interface ViewSwitcherBarProps {
  activeView: AppView;
  onSelectView: (view: AppView) => void;
  isSimulatorActive?: boolean;
  onToggleSimulator?: () => void;
}

export const ViewSwitcherBar: React.FC<ViewSwitcherBarProps> = ({
  activeView,
  onSelectView,
  isSimulatorActive = false,
  onToggleSimulator,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSelect = (view: AppView) => {
    onSelectView(view);
    setIsOpen(false);
  };

  const getActiveLabel = () => {
    if (isSimulatorActive) return 'Simulador';
    switch (activeView) {
      case 'bancada':
        return 'Bancada';
      case 'caixa':
        return 'Caixa';
      default:
        return 'Site';
    }
  };

  return (
    <aside
      ref={containerRef}
      aria-label="Alternador de Ambientes M2 Barbearia"
      className="fixed bottom-3 sm:bottom-5 left-3 sm:left-5 z-50"
    >
      {/* Menu Suspenso de Ambientes (Site, Bancada, Caixa, Simulador) */}
      {isOpen && (
        <div className="mb-2 bg-ink-elevated/95 backdrop-blur-md border border-neutral-700/80 rounded-2xl p-1.5 shadow-2xl flex flex-col gap-1 min-w-[170px] animate-in fade-in slide-in-from-bottom-2 duration-150">
          <button
            type="button"
            onClick={() => handleSelect('home')}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
              activeView === 'home' && !isSimulatorActive
                ? 'bg-brand-red text-white shadow-md'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Site</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelect('bancada')}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
              activeView === 'bancada' && !isSimulatorActive
                ? 'bg-brand-red text-white shadow-md'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Bancada</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelect('caixa')}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
              activeView === 'caixa' && !isSimulatorActive
                ? 'bg-brand-red text-white shadow-md'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Caixa</span>
          </button>

          {onToggleSimulator && (
            <>
              <div className="h-px bg-neutral-800 my-0.5 mx-1" />
              <button
                type="button"
                onClick={() => {
                  onToggleSimulator();
                  setIsOpen(false);
                }}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
                  isSimulatorActive
                    ? 'bg-brand-blue text-white shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Simulador</span>
              </button>
            </>
          )}
        </div>
      )}

      {/* Botão Encolhido Principal "Ambiente" */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-surface/95 backdrop-blur-md border border-neutral-700/80 hover:border-neutral-500 text-gray-200 hover:text-white px-3.5 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-2xl min-h-[44px] transition-all"
        title="Alternar ambiente (Site, Bancada, Caixa, Simulador)"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse" />
        <span className="text-neutral-400 font-normal">Ambiente:</span>
        <span className="text-white font-bold">{getActiveLabel()}</span>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        )}
      </button>
    </aside>
  );
};
