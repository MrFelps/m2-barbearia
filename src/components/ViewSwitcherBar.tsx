import React from 'react';
import { Home, QrCode, DollarSign } from 'lucide-react';

export type AppView = 'home' | 'bancada' | 'caixa' | 'cliente';

interface ViewSwitcherBarProps {
  activeView: AppView;
  onSelectView: (view: AppView) => void;
}

export const ViewSwitcherBar: React.FC<ViewSwitcherBarProps> = ({ activeView, onSelectView }) => {
  return (
    <div className="bg-surface/90 backdrop-blur-md border-b border-border-subtle py-2 px-4 sticky top-1 z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 hidden sm:inline">
            Ambiente M2:
          </span>
          <button
            onClick={() => onSelectView('home')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[44px] ${
              activeView === 'home'
                ? 'bg-brand-red text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-ink'
            }`}
          >
            <Home className="w-3.5 h-3.5" /> Site Principal
          </button>
          <button
            onClick={() => onSelectView('bancada')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[44px] ${
              activeView === 'bancada'
                ? 'bg-brand-red text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-ink'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" /> QR Code da Cadeira
          </button>
          <button
            onClick={() => onSelectView('caixa')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[44px] ${
              activeView === 'caixa'
                ? 'bg-brand-red text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-ink'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" /> Frente de Caixa
          </button>
        </div>

        {activeView === 'cliente' && (
          <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            Modo Visualização do Cliente
          </span>
        )}
      </div>
    </div>
  );
};
