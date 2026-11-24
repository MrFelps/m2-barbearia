import React from 'react';
import { Phone, MapPin, ExternalLink } from 'lucide-react';
import { BARBER_PROFILE } from '../../../data/barberData';

export const PerfilTab: React.FC = () => {
  return (
    <div className="space-y-4 animate-fadeIn pb-4">
      {/* Dados do Cliente */}
      <div className="bg-surface border border-border-subtle rounded-2xl p-4 flex items-center gap-3.5">
        <div className="w-14 h-14 rounded-full bg-surface-elevated border-2 border-brand-red flex items-center justify-center font-bold text-lg text-white">
          CM
        </div>
        <div>
          <span className="text-sm font-bold text-white block">Cliente M2</span>
          <span className="text-xs text-gray-400 block">+55 (11) 99999-8888</span>
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Cliente Fidelidade VIP</span>
        </div>
      </div>

      {/* Preferências Visagistas Salvas */}
      <div className="bg-surface border border-border-subtle rounded-2xl p-4 space-y-2.5">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
          Minha Ficha Visagista
        </span>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2.5 bg-ink rounded-lg border border-neutral-800">
            <span className="text-gray-400">Estilo Preferido:</span>
            <span className="font-bold text-white">Degradê Fade Médio + Tesoura</span>
          </div>
          <div className="flex items-center justify-between p-2.5 bg-ink rounded-lg border border-neutral-800">
            <span className="text-gray-400">Barba:</span>
            <span className="font-bold text-white">Desenhada com Navalhete</span>
          </div>
          <div className="flex items-center justify-between p-2.5 bg-ink rounded-lg border border-neutral-800">
            <span className="text-gray-400">Profissional Titular:</span>
            <span className="font-bold text-brand-gold">{BARBER_PROFILE.name}</span>
          </div>
        </div>
      </div>

      {/* Contato e Unidade */}
      <div className="bg-surface border border-border-subtle rounded-2xl p-4 space-y-2.5">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
          Unidade de Atendimento
        </span>
        <div className="flex items-center gap-2.5 text-xs text-gray-300">
          <MapPin className="w-4 h-4 text-brand-red shrink-0" />
          <span>Rua América do Sul, 57 • Santo André / SP</span>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-gray-300">
          <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>(11) 96031-8915</span>
        </div>
      </div>

      {/* Botão de Agendamento Externo */}
      <a
        href={BARBER_PROFILE.bookingAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full min-h-[44px] bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors"
      >
        <ExternalLink className="w-4 h-4 text-brand-gold" />
        <span>Abrir Conta no AppBarber</span>
      </a>
    </div>
  );
};
