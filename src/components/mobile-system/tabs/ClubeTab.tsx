import React from 'react';
import { Award, Check, Coffee, ShieldCheck, Flame } from 'lucide-react';

export const ClubeTab: React.FC = () => {
  const totalStamps = 10;
  const currentStamps = 7;

  return (
    <div className="space-y-4 animate-fadeIn pb-4">
      {/* Cartão Fidelidade M2 */}
      <div className="bg-gradient-to-br from-neutral-900 via-surface-elevated to-neutral-900 border border-neutral-700/80 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-brand-gold" />
            <span className="font-display uppercase tracking-widest text-xs font-bold text-white">
              Cartão Fidelidade M2
            </span>
          </div>
          <span className="text-[10px] bg-brand-gold/20 text-brand-gold font-bold px-2 py-0.5 rounded-full border border-brand-gold/30">
            {currentStamps} de {totalStamps} Cortes
          </span>
        </div>

        {/* Grid dos 10 Selos */}
        <div className="grid grid-cols-5 gap-2.5 my-3">
          {Array.from({ length: totalStamps }).map((_, idx) => {
            const isCompleted = idx < currentStamps;
            const isReward = idx === totalStamps - 1;
            return (
              <div
                key={idx}
                className={`aspect-square rounded-xl border flex flex-col items-center justify-center relative transition-all ${
                  isCompleted
                    ? 'bg-brand-red border-red-500 text-white shadow-md'
                    : isReward
                    ? 'bg-brand-gold/15 border-brand-gold/50 text-brand-gold'
                    : 'bg-ink border-border-subtle text-gray-500'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : isReward ? (
                  <Award className="w-4 h-4" />
                ) : (
                  <span className="text-xs font-mono font-bold">{idx + 1}</span>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-gray-300 mt-3 text-center">
          Faltam apenas <strong className="text-brand-gold">{totalStamps - currentStamps} cortes</strong> para seu corte VIP gratuito!
        </p>
      </div>

      {/* Benefícios Exclusivos Ativos */}
      <div className="bg-surface border border-border-subtle rounded-2xl p-4 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
          Benefícios Ativos em Todas as Visitas
        </span>

        <div className="space-y-2.5">
          <div className="flex items-center gap-3 p-2.5 bg-ink rounded-xl border border-neutral-800">
            <Flame className="w-5 h-5 text-brand-red shrink-0" />
            <div>
              <span className="text-xs font-bold text-white block">Toalhas Quentes Aromáticas</span>
              <span className="text-[10px] text-gray-400">Relaxamento térmico facial cortesia</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 bg-ink rounded-xl border border-neutral-800">
            <Coffee className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="text-xs font-bold text-white block">Bar Executivo Cortesia</span>
              <span className="text-[10px] text-gray-400">Café espresso e bebidas selecionadas</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 bg-ink rounded-xl border border-neutral-800">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="text-xs font-bold text-white block">Garantia Visagista M2</span>
              <span className="text-[10px] text-gray-400">Ajuste fino de acabamento em até 7 dias</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
