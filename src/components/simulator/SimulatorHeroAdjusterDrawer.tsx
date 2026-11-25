import React, { useState } from 'react';
import { User, Type, MousePointerClick, MessageCircle, Check, X, Copy } from 'lucide-react';
import { HeroImageSettings } from '../../types/barber';
import { AdjusterBarberTab } from '../adjuster/AdjusterBarberTab';
import { AdjusterTextTab } from '../adjuster/AdjusterTextTab';
import { AdjusterButtonsTab } from '../adjuster/AdjusterButtonsTab';
import { AdjusterWhatsAppTab } from '../adjuster/AdjusterWhatsAppTab';

type AdjustTarget = 'barber' | 'text' | 'buttons' | 'whatsapp';

interface SimulatorHeroAdjusterDrawerProps {
  isOpen: boolean;
  settings: HeroImageSettings;
  isSaved: boolean;
  onClose: () => void;
  onUpdate: <K extends keyof HeroImageSettings>(key: K, value: HeroImageSettings[K]) => void;
  onSave: () => void;
  onReset: () => void;
}

export const SimulatorHeroAdjusterDrawer: React.FC<SimulatorHeroAdjusterDrawerProps> = ({
  isOpen,
  settings,
  isSaved,
  onClose,
  onUpdate,
  onSave,
  onReset,
}) => {
  const [activeTab, setActiveTab] = useState<AdjustTarget>('barber');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(JSON.stringify(settings));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // ignore
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-16 right-3 sm:right-6 z-[110] w-80 bg-ink-elevated/95 backdrop-blur-md border border-neutral-700/90 rounded-2xl p-4 shadow-2xl text-white space-y-3 animate-fadeIn">
      {/* Topo com Título e Fechar */}
      <div className="flex items-center justify-between pb-1.5 border-b border-neutral-800">
        <span className="font-display uppercase tracking-wider font-bold text-xs text-white">
          Diagramação Visual Mobile
        </span>
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* As 4 Abas Solicitadas */}
      <div className="grid grid-cols-4 gap-1 p-1 bg-ink rounded-lg border border-neutral-800">
        {[
          { id: 'barber', label: 'Barbeiro', icon: User },
          { id: 'text', label: 'Texto', icon: Type },
          { id: 'buttons', label: 'Botões', icon: MousePointerClick },
          { id: 'whatsapp', label: 'Whats', icon: MessageCircle },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as AdjustTarget)}
              className={`py-1.5 rounded text-[10px] font-display uppercase tracking-wider font-semibold flex flex-col sm:flex-row items-center justify-center gap-1 transition-colors min-h-[44px] ${
                isActive ? 'bg-brand-red text-white shadow-md' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Conteúdo da Aba Selecionada */}
      {activeTab === 'barber' && (
        <AdjusterBarberTab settings={settings} mode="mobile" onUpdate={onUpdate} onReset={onReset} />
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

      {/* Gravar Diagramação no Celular e Copiar JSON */}
      <div className="pt-1.5 border-t border-neutral-800 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="min-h-[44px] px-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white rounded-lg text-xs font-display uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-brand-gold" />}
          <span>{copied ? 'Copiado!' : 'Copiar JSON'}</span>
        </button>
        <button
          onClick={onSave}
          className={`min-h-[44px] text-xs font-display uppercase tracking-wider font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-md ${
            isSaved ? 'bg-emerald-600 text-white' : 'bg-brand-red hover:bg-red-700 text-white'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>{isSaved ? 'Gravado!' : 'Gravar'}</span>
        </button>
      </div>
    </div>
  );
};
