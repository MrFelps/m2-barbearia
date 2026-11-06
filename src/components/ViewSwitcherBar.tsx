import React, { useState } from 'react';
import { Home, QrCode, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';

export type AppView = 'home' | 'bancada' | 'caixa' | 'cliente';

interface ViewSwitcherBarProps {
  activeView: AppView;
  onSelectView: (view: AppView) => void;
}

export const ViewSwitcherBar: React.FC<ViewSwitcherBarProps> = ({ activeView, onSelectView }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (isCollapsed) {
    return (
      <div className="fixed bottom-5 left-5 z-50">
        <button
          onClick={() => setIsCollapsed(false)}
          className="bg-surface/95 backdrop-blur-md border border-border-subtle text-gray-300 hover:text-white px-3 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-2xl min-h-[44px]"
        >
          <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
          <span>Painel M2</span>
          <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 max-w-[95vw]">
      <div className="bg-surface/95 backdrop-blur-md border border-neutral-700/80 rounded-full px-3 py-1.5 shadow-2xl flex items-center gap-1.5 overflow-x-auto">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 px-2 hidden sm:inline">
          Ambiente:
        </span>

        <button
          onClick={() => onSelectView('home')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all min-h-[44px] ${
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
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all min-h-[44px] ${
            activeView === 'bancada'
              ? 'bg-brand-red text-white shadow-md'
              : 'text-gray-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>Bancada (QR)</span>
        </button>

        <button
          onClick={() => onSelectView('caixa')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all min-h-[44px] ${
            activeView === 'caixa'
              ? 'bg-brand-red text-white shadow-md'
              : 'text-gray-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>Frente de Caixa</span>
        </button>

        <button
          onClick={() => setIsCollapsed(true)}
          className="text-gray-400 hover:text-white p-2 min-h-[44px] min-w-[36px] flex items-center justify-center rounded-full hover:bg-white/5 ml-1"
          title="Minimizar barra"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
