import React from 'react';
import { HeroImageSettings } from '../../types/barber';
import { HeroJoystick } from '../HeroJoystick';

interface AdjusterBarberTabProps {
  settings: HeroImageSettings;
  onUpdate: <K extends keyof HeroImageSettings>(key: K, value: HeroImageSettings[K]) => void;
  onReset: () => void;
}

export const AdjusterBarberTab: React.FC<AdjusterBarberTabProps> = ({
  settings,
  onUpdate,
  onReset,
}) => {
  return (
    <div className="space-y-2.5 animate-fadeIn">
      {/* Joystick Circular Analógico */}
      <HeroJoystick
        xOffset={settings.xOffset}
        yOffset={settings.yOffset}
        onChangeOffset={(x, y) => {
          onUpdate('xOffset', x);
          onUpdate('yOffset', y);
        }}
        onReset={onReset}
      />

      {/* Escala */}
      <div className="space-y-1">
        <div className="flex justify-between text-neutral-400 text-[10px] font-display uppercase">
          <span>Tamanho do Barbeiro</span>
          <span className="text-white font-bold">{settings.scale}%</span>
        </div>
        <input
          type="range"
          min="50"
          max="160"
          value={settings.scale}
          onChange={(e) => onUpdate('scale', Number(e.target.value))}
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
