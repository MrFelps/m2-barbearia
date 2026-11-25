import React, { useState } from 'react';
import { Home, QrCode, DollarSign, ChevronDown, ChevronUp, Smartphone } from 'lucide-react';

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
  const [isCollapsed, setIsCollapsed] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );

  if (isCollapsed) {
    return (
      <div className="fixed bottom-3 sm:bottom-5 left-3 sm:left-5 z-50">
        <button
          onClick={() => setIsCollapsed(false)}
          className="bg-surface/95 backdrop-blur-md border border-border-subtle text-gray-300 hover:text-white px-3.5 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-2xl min-h-[44px]"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse" />
          <span>Ambiente M2</span>
          <ChevronUp className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    );
  }

  return (
    <aside
      aria-label="Alternador de Ambientes M2 Barbearia"
      className="fixed bottom-3 sm:bottom-5 left-3 sm:left-6 z-50 max-w-[calc(100vw-1.5rem)] sm:max-w-max"
    >
      <div className="bg-surface/95 backdrop-blur-md border border-neutral-700/80 rounded-full px-2 sm:px-3 py-1.5 shadow-2xl flex items-center gap-1 sm:gap-1.5 overflow-x-auto">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 px-2 hidden md:inline shrink-0">
          Ambiente:
        </span>

        <button
          onClick={() => onSelectView('home')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all min-h-[44px] shrink-0 ${
            activeView === 'home'
              ? 'bg-brand-red text-white shadow-md'
              : 'text-gray-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Site</span>
        </button>

        <button
          onClick={() => onSelectView('bancada')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all min-h-[44px] shrink-0 ${
            activeView === 'bancada'
              ? 'bg-brand-red text-white shadow-md'
              : 'text-gray-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>Bancada</span>
        </button>

        <button
          onClick={() => onSelectView('caixa')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all min-h-[44px] shrink-0 ${
            activeView === 'caixa'
              ? 'bg-brand-red text-white shadow-md'
              : 'text-gray-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>Caixa</span>
        </button>

        <button
          onClick={() => onSelectView('celular')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all min-h-[44px] shrink-0 ${
            activeView === 'celular'
              ? 'bg-brand-red text-white shadow-md ring-1 ring-white/30'
              : 'text-gray-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5 text-amber-400" />
          <span>📱 Celular</span>
        </button>

        {onToggleSimulator && (
          <>
            <div className="w-[1px] h-5 bg-neutral-700 mx-1 hidden sm:block shrink-0" />
            <button
              onClick={onToggleSimulator}
              title={isSimulatorActive ? 'Desativar Simulador Mobile' : 'Ativar Simulador Mobile'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all min-h-[44px] shrink-0 ${
                isSimulatorActive
                  ? 'bg-brand-blue text-white shadow-md ring-1 ring-white/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Simulador</span>
            </button>
          </>
        )}

        <button
          onClick={() => setIsCollapsed(true)}
          className="text-gray-400 hover:text-white p-2 min-h-[44px] min-w-[36px] flex items-center justify-center rounded-full hover:bg-white/5 ml-1 shrink-0"
          title="Minimizar barra"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
