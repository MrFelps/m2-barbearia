import React, { useState } from 'react';
import { Calendar, Clock, Scissors, ShieldCheck, User, Bell, Award, Smartphone } from 'lucide-react';

export const MobileAppPlaceholder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'agendamento' | 'fidelidade' | 'perfil'>('home');

  return (
    <div className="w-full h-full bg-ink text-white flex flex-col font-sans select-none overflow-y-auto">
      {/* Top Header Mobile */}
      <header className="sticky top-0 z-30 bg-surface/95 backdrop-blur-md px-4 py-3 border-b border-border-subtle flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-brand-red flex items-center justify-center font-oswald font-black text-sm text-white shadow-md">
            M2
          </div>
          <div>
            <h1 className="text-xs font-bold uppercase tracking-wider text-white">M2 Barbearia</h1>
            <p className="text-[10px] text-gray-400">Santo André • Matriz</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            aria-label="Notificações"
            className="w-10 h-10 rounded-full bg-surface-elevated border border-border-subtle flex items-center justify-center text-gray-300 hover:text-white"
          >
            <Bell className="w-4 h-4" />
          </button>
          <div className="w-10 h-10 rounded-full bg-neutral-800 border border-brand-red/60 flex items-center justify-center text-xs font-bold text-brand-red">
            FB
          </div>
        </div>
      </header>

      {/* Main Content Scrollable */}
      <div className="flex-1 p-4 space-y-4 pb-20">
        {/* Banner de Boas-Vindas */}
        <div className="bg-gradient-to-r from-surface-elevated to-surface border border-neutral-700/60 rounded-2xl p-4 relative overflow-hidden shadow-lg">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-red/20 text-brand-red border border-brand-red/30 mb-2">
              <ShieldCheck className="w-3 h-3" /> Padrão Executivo M2
            </span>
            <h2 className="text-base font-extrabold text-white">Olá, Cliente M2</h2>
            <p className="text-xs text-gray-300 mt-1 max-w-[240px]">
              Agende com seu visagista de confiança ou acompanhe o status da sua bancada.
            </p>
          </div>
        </div>

        {/* Status do Ponto de Montagem */}
        <div className="border border-dashed border-amber-500/40 bg-amber-500/5 rounded-2xl p-3.5 text-center">
          <div className="flex items-center justify-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Smartphone className="w-4 h-4" />
            <span>Módulo Mobile Pronto para Conexão</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-1">
            Este slot está preparado para receber as telas, agendamento e fluxos desenvolvidos no outro chat.
          </p>
        </div>

        {/* Ações Rápidas */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
            Ações Rápidas
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            <button className="bg-surface hover:bg-surface-elevated border border-border-subtle rounded-xl p-3 text-left transition-all min-h-[56px] flex flex-col justify-between">
              <Scissors className="w-5 h-5 text-brand-red mb-2" />
              <div>
                <span className="text-xs font-bold block text-white">Novo Corte</span>
                <span className="text-[10px] text-gray-400">Escolha serviço & hora</span>
              </div>
            </button>
            <button className="bg-surface hover:bg-surface-elevated border border-border-subtle rounded-xl p-3 text-left transition-all min-h-[56px] flex flex-col justify-between">
              <Clock className="w-5 h-5 text-amber-400 mb-2" />
              <div>
                <span className="text-xs font-bold block text-white">Fila em Tempo Real</span>
                <span className="text-[10px] text-gray-400">Consulte sua vez</span>
              </div>
            </button>
          </div>
        </div>

        {/* Próximo Atendimento Card */}
        <div className="bg-surface border border-border-subtle rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase text-gray-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand-red" /> Atendimento Recente
            </span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              Finalizado
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-border-subtle pt-2.5">
            <div>
              <p className="text-xs font-bold text-white">Corte Master + Barba Terapia</p>
              <p className="text-[11px] text-gray-400">Profissional: Felipe Boccardo</p>
            </div>
            <span className="text-xs font-extrabold text-white">R$ 115,00</span>
          </div>
        </div>
      </div>

      {/* Barra de Navegação Inferior (Mobile Bottom Navigation) */}
      <nav
        aria-label="Navegação do Aplicativo Mobile"
        className="sticky bottom-0 z-30 bg-surface/95 backdrop-blur-md border-t border-border-subtle px-3 py-2 flex items-center justify-around"
      >
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 min-h-[44px] min-w-[56px] justify-center text-[10px] font-bold ${
            activeTab === 'home' ? 'text-brand-red' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Scissors className="w-4 h-4" />
          <span>Início</span>
        </button>
        <button
          onClick={() => setActiveTab('agendamento')}
          className={`flex flex-col items-center gap-1 min-h-[44px] min-w-[56px] justify-center text-[10px] font-bold ${
            activeTab === 'agendamento' ? 'text-brand-red' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Agenda</span>
        </button>
        <button
          onClick={() => setActiveTab('fidelidade')}
          className={`flex flex-col items-center gap-1 min-h-[44px] min-w-[56px] justify-center text-[10px] font-bold ${
            activeTab === 'fidelidade' ? 'text-brand-red' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Clube M2</span>
        </button>
        <button
          onClick={() => setActiveTab('perfil')}
          className={`flex flex-col items-center gap-1 min-h-[44px] min-w-[56px] justify-center text-[10px] font-bold ${
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
