import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';
import { DevicePreset } from '../../types/simulator';

interface MobileStatusBarProps {
  device: DevicePreset;
}

export const MobileStatusBar: React.FC<MobileStatusBarProps> = ({ device }) => {
  const [currentTime, setCurrentTime] = useState<string>('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-50 flex items-center justify-between px-6 pt-3 pb-2 text-white select-none pointer-events-none">
      {/* Horário */}
      <div className="w-16 text-left">
        <span className="text-[12px] font-semibold tracking-tight font-body">
          {currentTime}
        </span>
      </div>

      {/* Recorte de Hardware: Dynamic Island, Punch-Hole ou Espaço */}
      <div className="flex-1 flex justify-center">
        {device.notchType === 'dynamic-island' && (
          <div className="h-6 w-28 bg-black rounded-full border border-neutral-800/60 shadow-inner flex items-center justify-between px-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800" />
            <div className="w-2.5 h-2.5 rounded-full bg-blue-950/80 border border-neutral-800 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-blue-500/50" />
            </div>
          </div>
        )}
        {device.notchType === 'punch-hole' && (
          <div className="h-4 w-4 bg-black rounded-full border border-neutral-800 shadow-inner flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-900 border border-neutral-700" />
          </div>
        )}
      </div>

      {/* Ícones de Rede e Bateria */}
      <div className="w-16 flex items-center justify-end gap-1.5 text-neutral-300">
        <Signal className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        <div className="flex items-center gap-0.5">
          <Battery className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
};
