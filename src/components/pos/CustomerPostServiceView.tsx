import React, { useState } from 'react';
import { BarberStation } from '../../types/station';
import { PIX_ACCOUNTS } from '../../data/stationData';
import { Star, Copy, Check, ExternalLink, Calendar, ArrowLeft } from 'lucide-react';

interface CustomerPostServiceViewProps {
  station: BarberStation;
  onBackToMain?: () => void;
}

export const CustomerPostServiceView: React.FC<CustomerPostServiceViewProps> = ({
  station,
  onBackToMain,
}) => {
  const [copiedPix, setCopiedPix] = useState(false);
  const primaryPix = PIX_ACCOUNTS[0];

  const handleCopyPix = () => {
    navigator.clipboard.writeText(primaryPix.key);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  return (
    <div className="min-h-screen bg-ink text-white p-4 max-w-md mx-auto flex flex-col justify-between">
      <div className="space-y-5">
        {/* Topo com botão voltar */}
        <div className="flex items-center justify-between pt-2">
          {onBackToMain ? (
            <button
              onClick={onBackToMain}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white min-h-[44px] min-w-[44px]"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar
            </button>
          ) : <div />}
          <span className="text-[11px] font-bold tracking-wider uppercase text-brand-red bg-brand-red/10 px-2.5 py-1 rounded-full border border-brand-red/20">
            M2 Barbearia
          </span>
        </div>

        {/* Card do Barbeiro */}
        <div className="bg-surface border border-border-subtle rounded-2xl p-5 text-center">
          <div className="inline-block p-1 bg-ink rounded-full border border-border-subtle mb-3">
            <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center text-xl font-bold text-brand-red border border-brand-red/30">
              {station.barberName.charAt(0)}
            </div>
          </div>
          <h1 className="text-xl font-black text-white">{station.barberName}</h1>
          <p className="text-xs text-gray-400 mt-0.5">Bancada {station.stationNumber} • {station.role}</p>

          <div className="mt-3 inline-flex items-center gap-1 bg-ink/60 px-3 py-1 rounded-full text-amber-400 text-xs font-bold border border-border-subtle">
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-gray-200 ml-1">5.0 Estrelas</span>
          </div>
        </div>

        {/* Ação 1: Avaliação no Google */}
        <a
          href={station.googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-extrabold text-sm py-4 px-4 rounded-xl flex items-center justify-between min-h-[52px] shadow-lg shadow-brand-red/20 transition-transform active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 fill-current text-white" />
            <div className="text-left">
              <div className="leading-tight">Avaliar Atendimento no Google</div>
              <div className="text-[11px] font-normal text-white/80">Leva menos de 10 segundos</div>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 opacity-80" />
        </a>

        {/* Ação 2: Pagamento PIX Rápido */}
        <div className="bg-surface border border-border-subtle rounded-xl p-4 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-gray-200">Chave PIX da Barbearia</span>
            <span className="text-[10px] text-gray-400">Tipo: {primaryPix.type.toUpperCase()}</span>
          </div>
          <div className="bg-ink p-3 rounded-lg border border-border-subtle flex items-center justify-between">
            <span className="font-mono text-xs text-gray-300 font-semibold truncate pr-2">
              {primaryPix.key}
            </span>
            <button
              onClick={handleCopyPix}
              className="bg-brand-red/20 hover:bg-brand-red/30 text-brand-red border border-brand-red/40 px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 min-h-[44px] transition-all"
            >
              {copiedPix ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedPix ? 'Copiado!' : 'Copiar'}
            </button>
          </div>
          <p className="text-[10px] text-gray-400">Titular: {primaryPix.holder}</p>
        </div>

        {/* Ação 3: Próximo Horário & Instagram */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href="https://sites.appbarber.com.br/m2barbearia-7nna"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-surface hover:bg-surface/80 border border-border-subtle p-3.5 rounded-xl text-center space-y-1.5 min-h-[44px] flex flex-col items-center justify-center"
          >
            <Calendar className="w-5 h-5 text-brand-red" />
            <span className="text-xs font-bold block text-gray-200">Próximo Corte</span>
            <span className="text-[10px] text-gray-400 block">Garantir horário</span>
          </a>

          <a
            href={station.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-surface hover:bg-surface/80 border border-border-subtle p-3.5 rounded-xl text-center space-y-1.5 min-h-[44px] flex flex-col items-center justify-center"
          >
            <svg
              className="w-5 h-5 text-pink-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span className="text-xs font-bold block text-gray-200">Instagram</span>
            <span className="text-[10px] text-gray-400 block">@m2barbearia_01</span>
          </a>
        </div>
      </div>

      <div className="text-center pt-6 pb-2 text-[11px] text-gray-400">
        M2 Barbearia • Santo André/SP
      </div>
    </div>
  );
};
