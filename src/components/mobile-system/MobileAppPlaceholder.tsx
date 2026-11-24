import React, { useState } from 'react';
import { Calendar, Scissors, Award, User, Bell } from 'lucide-react';
import { HomeTab } from './tabs/HomeTab';
import { AgendaTab } from './tabs/AgendaTab';
import { ClubeTab } from './tabs/ClubeTab';
import { PerfilTab } from './tabs/PerfilTab';

export const MobileAppPlaceholder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'agendamento' | 'fidelidade' | 'perfil'>('home');

  return (
    <div className="w-full h-full bg-ink text-white flex flex-col font-sans select-none overflow-x-hidden">
      {/* Top Header Mobile */}
      <header className="sticky top-0 z-30 bg-surface/95 backdrop-blur-md px-4 py-3 border-b border-border-subtle flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-brand-red flex items-center justify-center font-display font-black text-sm text-white shadow-md">
            M2
          </div>
          <div>
            <h1 className="text-xs font-bold uppercase tracking-wider text-white">M2 Barbearia</h1>
            <p className="text-[10px] text-gray-400">Santo André • Matriz</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Notificações"
            className="w-10 h-10 min-h-[40px] min-w-[40px] rounded-full bg-surface-elevated border border-border-subtle flex items-center justify-center text-gray-300 hover:text-white"
          >
            <Bell className="w-4 h-4" />
          </button>
          <div className="w-10 h-10 rounded-full bg-neutral-800 border border-brand-red/60 flex items-center justify-center text-xs font-bold text-brand-red">
            FB
          </div>
        </div>
      </header>

      {/* Conteúdo Dinâmico por Aba com Scroll Vertical */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'home' && <HomeTab onGoToAgenda={() => setActiveTab('agendamento')} />}
        {activeTab === 'agendamento' && <AgendaTab />}
        {activeTab === 'fidelidade' && <ClubeTab />}
        {activeTab === 'perfil' && <PerfilTab />}
      </div>

      {/* Barra de Navegação Inferior (Mobile Bottom Navigation) */}
      <nav
        aria-label="Navegação do Aplicativo Mobile"
        className="sticky bottom-0 z-30 bg-surface/95 backdrop-blur-md border-t border-border-subtle px-3 py-1 flex items-center justify-around shrink-0"
        style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 min-h-[44px] min-w-[56px] justify-center text-[10px] font-bold transition-colors ${
            activeTab === 'home' ? 'text-brand-red' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Scissors className="w-4 h-4" />
          <span>Início</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('agendamento')}
          className={`flex flex-col items-center gap-1 min-h-[44px] min-w-[56px] justify-center text-[10px] font-bold transition-colors ${
            activeTab === 'agendamento' ? 'text-brand-red' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Agenda</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('fidelidade')}
          className={`flex flex-col items-center gap-1 min-h-[44px] min-w-[56px] justify-center text-[10px] font-bold transition-colors ${
            activeTab === 'fidelidade' ? 'text-brand-red' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Clube M2</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('perfil')}
          className={`flex flex-col items-center gap-1 min-h-[44px] min-w-[56px] justify-center text-[10px] font-bold transition-colors ${
            activeTab === 'perfil' ? 'text-brand-red' : 'text-gray-400 hover:text-white'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Perfil</span>
        </button>
      </nav>
    </div>
  );
};
