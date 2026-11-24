import React, { useState } from 'react';
import { ArrowLeft, Maximize2, Minimize2, CheckCircle2 } from 'lucide-react';
import { MobileAppPlaceholder } from './MobileAppPlaceholder';

interface MobileSystemContainerProps {
  onBackToSite: () => void;
}

export const MobileSystemContainer: React.FC<MobileSystemContainerProps> = ({ onBackToSite }) => {
  const [isFullscreenOnDesktop, setIsFullscreenOnDesktop] = useState(false);

  return (
    <section aria-label="Visualizador do Sistema Mobile" className="w-full flex flex-col items-center justify-start min-h-[calc(100vh-120px)] px-2 sm:px-4">
      {/* Barra de Controle Superior do Módulo Mobile */}
      <header className="w-full max-w-4xl bg-surface/90 border border-border-subtle rounded-2xl p-3 mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToSite}
            className="flex items-center gap-1.5 px-3 py-2 bg-ink border border-border-subtle text-gray-300 hover:text-white rounded-xl text-xs font-bold transition-all min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4 text-brand-red" />
            <span>Voltar ao Site</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-white">Sistema Mobile M2</span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" /> Slot Ativo
              </span>
            </div>
            <p className="text-[11px] text-gray-400">
              Pronto para receber os arquivos consolidados do outro chat
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Alternador de Moldura apenas para Desktop */}
          <button
            onClick={() => setIsFullscreenOnDesktop((prev) => !prev)}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 bg-surface-elevated hover:bg-neutral-800 text-gray-300 hover:text-white rounded-xl text-xs font-bold border border-border-subtle transition-all min-h-[44px]"
            title={isFullscreenOnDesktop ? 'Ativar Moldura de Celular' : 'Expandir para Largura Total'}
          >
            {isFullscreenOnDesktop ? (
              <>
                <Minimize2 className="w-4 h-4 text-amber-400" />
                <span>Modo Celular</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4 text-amber-400" />
                <span>Expandir</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Área de Visualização do Sistema Mobile */}
      <div className="w-full flex items-center justify-center">
        {isFullscreenOnDesktop ? (
          /* Modo Expandido Desktop */
          <div className="w-full max-w-4xl bg-ink border border-border-subtle rounded-2xl overflow-hidden shadow-2xl min-h-[680px]">
            <MobileAppPlaceholder />
          </div>
        ) : (
          /* Modo Chassi de Smartphone (No mobile ocupa 100% naturalmente, no desktop vira a moldura do iPhone) */
          <div className="w-full max-w-[390px] md:h-[780px] bg-neutral-900 border-0 md:border-[10px] md:border-neutral-800 md:rounded-[48px] overflow-hidden shadow-2xl relative flex flex-col md:ring-1 md:ring-white/10">
            {/* Dynamic Island no Desktop */}
            <div className="hidden md:flex absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-40 items-center justify-end px-2">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-800 border border-neutral-700" />
            </div>

            {/* Conteúdo do Aplicativo Mobile */}
            <div className="w-full h-full flex-1 overflow-hidden relative">
              <MobileAppPlaceholder />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
