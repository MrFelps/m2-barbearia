import React, { useState } from 'react';
import { Sliders, User, Type, MousePointerClick, MessageCircle, Check, X } from 'lucide-react';
import { HeroImageSettings } from '../types/barber';
import { AdjusterBarberTab } from './adjuster/AdjusterBarberTab';
import { AdjusterTextTab } from './adjuster/AdjusterTextTab';
import { AdjusterButtonsTab } from './adjuster/AdjusterButtonsTab';
import { AdjusterWhatsAppTab } from './adjuster/AdjusterWhatsAppTab';

type AdjustTarget = 'barber' | 'text' | 'buttons' | 'whatsapp';

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
  const [activeTab, setActiveTab] = useState<AdjustTarget>('barber');

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {!isOpen && (
        <button
          onClick={onToggle}
          className="h-11 min-h-[44px] px-4 bg-ink-elevated hover:bg-neutral-800 text-neutral-200 border border-neutral-700 shadow-2xl rounded-sm flex items-center gap-2 text-xs font-display uppercase tracking-widest transition-all"
        >
          <Sliders className="w-4 h-4 text-brand-red" />
          <span>Diagramar Hero</span>
        </button>
      )}

      {isOpen && (
        <div className="w-80 bg-ink-elevated/95 backdrop-blur-md border border-neutral-700 rounded-xl shadow-2xl p-4 space-y-3 text-white text-xs animate-fadeIn">
          <div className="flex items-center justify-between pb-1.5 border-b border-neutral-800">
            <span className="font-display uppercase tracking-wider font-semibold text-xs">
              Ajuste Visual da Hero
            </span>
            <button
              onClick={onToggle}
              aria-label="Fechar painel"
              className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-1 p-1 bg-ink rounded-lg border border-neutral-800">
            {[
              { id: 'barber', label: 'Barbeiro', icon: User },
              { id: 'text', label: 'Texto', icon: Type },
              { id: 'buttons', label: 'Botões', icon: MousePointerClick },
              { id: 'whatsapp', label: 'Whats', icon: MessageCircle },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as AdjustTarget)}
                  className={`py-1.5 rounded text-[10px] font-display uppercase font-semibold flex flex-col sm:flex-row items-center justify-center gap-1 transition-colors min-h-[44px] ${
                    activeTab === tab.id ? 'bg-brand-red text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {activeTab === 'barber' && (
            <AdjusterBarberTab settings={settings} onUpdate={onUpdate} onReset={onReset} />
          )}
          {activeTab === 'text' && (
            <AdjusterTextTab settings={settings} onUpdate={onUpdate} />
          )}
          {activeTab === 'buttons' && (
            <AdjusterButtonsTab settings={settings} onUpdate={onUpdate} />
          )}
          {activeTab === 'whatsapp' && (
            <AdjusterWhatsAppTab settings={settings} onUpdate={onUpdate} />
          )}

          <button
            onClick={onSave}
            className={`w-full min-h-[44px] text-xs font-display uppercase tracking-wider font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-md ${
              isSaved ? 'bg-emerald-600 text-white' : 'bg-brand-red hover:bg-red-700 text-white'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>{isSaved ? 'Posição Gravada!' : 'Gravar Alterações'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
