import React from 'react';
import { HeroImageSettings } from '../../types/barber';
import { HeroJoystick } from '../HeroJoystick';

interface AdjusterBarberTabProps {
  settings: HeroImageSettings;
  mode?: 'mobile' | 'desktop';
  onUpdate: <K extends keyof HeroImageSettings>(key: K, value: HeroImageSettings[K]) => void;
  onReset: () => void;
}

export const AdjusterBarberTab: React.FC<AdjusterBarberTabProps> = ({
  settings,
  mode = 'mobile',
  onUpdate,
  onReset,
}) => {
  const isDesktop = mode === 'desktop';
  const currentX = isDesktop ? (settings.desktopXOffset ?? settings.xOffset ?? 10) : settings.xOffset;
  const currentY = isDesktop ? (settings.desktopYOffset ?? settings.yOffset ?? -40) : settings.yOffset;
  const currentScale = isDesktop ? (settings.desktopScale ?? settings.scale ?? 100) : settings.scale;

  const handleChangeOffset = (x: number, y: number) => {
    if (isDesktop) {
      onUpdate('desktopXOffset', x);
      onUpdate('desktopYOffset', y);
    } else {
      onUpdate('xOffset', x);
      onUpdate('yOffset', y);
    }
  };

  const handleResetPosition = () => {
    if (isDesktop) {
      onUpdate('desktopXOffset', 0);
      onUpdate('desktopYOffset', 0);
      onUpdate('desktopScale', 100);
    } else {
      onReset();
    }
  };

  return (
    <div className="space-y-2.5 animate-fadeIn">
      {/* Indicador de Modo */}
      <div className="flex justify-between items-center text-[10px] uppercase font-bold text-neutral-400 pb-1 border-b border-neutral-800">
        <span>Alvo de Ajuste:</span>
        <span className="text-brand-red font-mono font-bold">
          {isDesktop ? '🖥️ Monitor (PC)' : '📱 Celular (Mobile)'}
        </span>
      </div>

      {/* Joystick Circular Analógico */}
      <HeroJoystick
        xOffset={currentX}
        yOffset={currentY}
        onChangeOffset={handleChangeOffset}
        onReset={handleResetPosition}
      />

      {/* Escala */}
      <div className="space-y-1">
        <div className="flex justify-between text-neutral-400 text-[10px] font-display uppercase">
          <span>Tamanho do Barbeiro</span>
          <span className="text-white font-bold">{currentScale}%</span>
        </div>
        <input
          type="range"
          min="50"
          max="160"
          value={currentScale}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (isDesktop) onUpdate('desktopScale', val);
            else onUpdate('scale', val);
          }}
          className="w-full accent-brand-red cursor-pointer h-2 bg-neutral-800 rounded"
        />
      </div>

      {/* Evidência / Nitidez do Barbeiro */}
      <div className="space-y-1">
        <div className="flex justify-between text-neutral-400 text-[10px] font-display uppercase">
          <span>Evidência / Nitidez da Foto</span>
          <span className="text-white font-bold">{settings.opacity}%</span>
        </div>
        <input
          type="range"
          min="30"
          max="100"
          value={settings.opacity}
          onChange={(e) => onUpdate('opacity', Number(e.target.value))}
          className="w-full accent-brand-red cursor-pointer h-2 bg-neutral-800 rounded"
        />
      </div>

      {/* Iluminação / Destaque */}
      <div className="space-y-1">
        <div className="flex justify-between text-neutral-400 text-[10px] font-display uppercase">
          <span>Iluminação / Brilho</span>
          <span className="text-white font-bold">{settings.brightness || 105}%</span>
        </div>
        <input
          type="range"
          min="80"
          max="150"
          value={settings.brightness || 105}
          onChange={(e) => onUpdate('brightness', Number(e.target.value))}
          className="w-full accent-brand-red cursor-pointer h-2 bg-neutral-800 rounded"
        />
      </div>
    </div>
  );
};
