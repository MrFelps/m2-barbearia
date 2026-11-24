import React from 'react';
import { Scissors, Clock, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';
import { BARBER_PROFILE, SERVICES_DATA } from '../../../data/barberData';

interface HomeTabProps {
  onGoToAgenda: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({ onGoToAgenda }) => {
  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Banner de Boas-Vindas Executivo */}
      <div className="bg-gradient-to-r from-surface-elevated to-surface border border-neutral-700/60 rounded-2xl p-4 relative overflow-hidden shadow-lg">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-red/20 text-brand-red border border-brand-red/30 mb-2">
            <ShieldCheck className="w-3 h-3" /> Padrão Executivo M2
          </span>
          <h2 className="text-base font-extrabold text-white">Olá, Cliente M2</h2>
          <p className="text-xs text-gray-300 mt-1 max-w-[260px]">
            Agende com {BARBER_PROFILE.name} ou consulte a fila em tempo real da bancada.
          </p>
        </div>
      </div>

      {/* Ações Rápidas Mobile */}
      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
          Ações Rápidas
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={onGoToAgenda}
            className="bg-surface hover:bg-surface-elevated border border-border-subtle rounded-xl p-3 text-left transition-all min-h-[56px] flex flex-col justify-between active:scale-[0.98]"
          >
            <Scissors className="w-5 h-5 text-brand-red mb-2" />
            <div>
              <span className="text-xs font-bold block text-white">Agendar Horário</span>
              <span className="text-[10px] text-gray-400">Escolha serviço & hora</span>
            </div>
          </button>

          <a
            href="https://sites.appbarber.com.br/m2barbearia-7nna"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-surface hover:bg-surface-elevated border border-border-subtle rounded-xl p-3 text-left transition-all min-h-[56px] flex flex-col justify-between active:scale-[0.98]"
          >
            <Clock className="w-5 h-5 text-amber-400 mb-2" />
            <div>
              <span className="text-xs font-bold block text-white">Fila no AppBarber</span>
              <span className="text-[10px] text-gray-400">Consulte sua vez</span>
            </div>
          </a>
        </div>
      </div>

      {/* Visagista em Destaque */}
      <div className="bg-surface border border-border-subtle rounded-2xl p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={BARBER_PROFILE.photoUrl}
            alt={BARBER_PROFILE.name}
            className="w-12 h-12 rounded-full object-cover object-top border-2 border-brand-red bg-neutral-900"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white">{BARBER_PROFILE.name}</span>
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <span className="text-[10px] text-gray-400 block">{BARBER_PROFILE.role}</span>
            <span className="text-[9px] text-brand-gold font-semibold uppercase">{BARBER_PROFILE.badge}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={onGoToAgenda}
          className="min-h-[44px] px-3 bg-brand-red/90 hover:bg-brand-red text-white text-xs font-bold uppercase rounded-lg flex items-center gap-1"
        >
          <span>Agendar</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Serviços Populares */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Serviços em Destaque
        </h3>
        <div className="space-y-2">
          {SERVICES_DATA.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-surface border border-border-subtle rounded-xl p-3 flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-bold text-white block">{item.name}</span>
                <span className="text-[10px] text-gray-400">{item.durationMinutes} min • {item.description}</span>
              </div>
              <span className="text-xs font-extrabold text-brand-gold shrink-0 pl-2">
                R$ {item.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
