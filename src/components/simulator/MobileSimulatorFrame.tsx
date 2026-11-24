import React, { useRef, useEffect } from 'react';
import { Check, ExternalLink } from 'lucide-react';
import { DevicePreset } from '../../types/simulator';
import { HeroImageSettings } from '../../types/barber';
import { MobileStatusBar } from './MobileStatusBar';

interface MobileSimulatorFrameProps {
  device: DevicePreset;
  isLandscape: boolean;
  scale: number;
  showFrame: boolean;
  activeView: string;
  imageSettings?: HeroImageSettings;
  isSaved?: boolean;
  onSave?: () => void;
  onOpenRealSite?: () => void;
}

export const MobileSimulatorFrame: React.FC<MobileSimulatorFrameProps> = ({
  device,
  isLandscape,
  scale,
  showFrame,
  activeView,
  imageSettings,
  isSaved,
  onSave,
  onOpenRealSite,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const screenWidth = isLandscape ? device.height : device.width;
  const screenHeight = isLandscape ? device.width : device.height;

  // URL da aplicação isolada dentro da viewport móvel do iframe
  const iframeUrl = `/?view=${encodeURIComponent(activeView)}&sim_embed=1`;

  // Sincroniza em tempo real as coordenadas do joystick do barbeiro com o iframe
  useEffect(() => {
    if (imageSettings && iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: 'M2_HERO_IMAGE_UPDATE', settings: imageSettings },
        '*'
      );
    }
  }, [imageSettings]);

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-start py-8 pb-16 overflow-hidden relative select-none">
      {/* Grade de prancheta de design */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Container com Escala Centralizada */}
      <div
        className="transition-transform duration-200 ease-out origin-top flex items-center justify-center"
        style={{ transform: `scale(${scale})` }}
      >
        <div className="relative">
          {/* Botões Físicos Laterais do Smartphone */}
          {showFrame && device.hasPhysicalButtons && !isLandscape && (
            <>
              <div className="absolute -left-[14px] top-28 w-[4px] h-8 bg-neutral-700 rounded-l-sm" />
              <div className="absolute -left-[14px] top-40 w-[4px] h-12 bg-neutral-700 rounded-l-sm" />
              <div className="absolute -left-[14px] top-56 w-[4px] h-12 bg-neutral-700 rounded-l-sm" />
              <div className="absolute -right-[14px] top-36 w-[4px] h-16 bg-neutral-700 rounded-r-sm" />
            </>
          )}

          {/* Chassi do Smartphone */}
          <div
            className={`transition-all duration-300 relative bg-black ${
              showFrame
                ? 'p-[10px] bg-neutral-900 border-[3px] border-neutral-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.08)]'
                : 'border border-neutral-800 shadow-2xl'
            }`}
            style={{
              borderRadius: showFrame ? device.borderRadius + 10 : 0,
            }}
          >
            {/* Viewport Isolado da Tela do Smartphone */}
            <div
              className="relative bg-ink overflow-hidden flex flex-col"
              style={{
                width: `${screenWidth}px`,
                height: `${screenHeight}px`,
                borderRadius: showFrame ? device.borderRadius : 0,
              }}
            >
              {/* Barra de Status Mobile Nativa */}
              <MobileStatusBar device={device} />

              {/* Viewport Iframe com Media Queries e Largura Mobile 100% Real */}
              <iframe
                ref={iframeRef}
                title="Simulador Mobile M2 Barbearia"
                src={iframeUrl}
                className="w-full flex-1 border-0 bg-ink"
                style={{
                  width: `${screenWidth}px`,
                  height: `${screenHeight - 42}px`,
                }}
              />

              {/* Home Indicator Inferior */}
              <div className="w-full pb-1.5 pt-1 flex justify-center bg-ink pointer-events-none select-none z-50">
                <div className="w-32 h-1 bg-white/40 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dock de Ações Rápidas por Fora do Celular */}
      <div className="mt-5 flex items-center gap-2.5 z-30 bg-ink-elevated/95 backdrop-blur-md border border-neutral-700/80 px-4 py-2 rounded-2xl shadow-2xl">
        {onSave && (
          <button
            type="button"
            onClick={onSave}
            className={`min-h-[44px] px-4 rounded-xl text-xs font-display uppercase tracking-wider font-bold flex items-center gap-2 transition-all ${
              isSaved
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-brand-red hover:bg-red-700 text-white shadow-md'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>{isSaved ? 'Diagramação Gravada!' : 'Gravar no Celular'}</span>
          </button>
        )}

        <button
          type="button"
          onClick={onOpenRealSite || (() => window.open('/?view=home', '_blank'))}
          className="min-h-[44px] px-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white rounded-xl text-xs font-display uppercase tracking-wider font-semibold flex items-center gap-2 transition-all hover:border-neutral-500"
        >
          <ExternalLink className="w-4 h-4 text-brand-gold" />
          <span>Abrir Site Real no Celular</span>
        </button>
      </div>
    </div>
  );
};
