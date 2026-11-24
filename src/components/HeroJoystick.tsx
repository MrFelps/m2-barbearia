import React, { useRef, useState, useCallback, useEffect } from 'react';
import { RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface HeroJoystickProps {
  xOffset: number;
  yOffset: number;
  onChangeOffset: (x: number, y: number) => void;
  onReset: () => void;
}

export const HeroJoystick: React.FC<HeroJoystickProps> = ({
  xOffset,
  yOffset,
  onChangeOffset,
  onReset,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [knobPos, setKnobPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const RADIUS = 48; // Raio máximo do joystick

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      let dx = clientX - centerX;
      let dy = clientY - centerY;
      const distance = Math.hypot(dx, dy);

      if (distance > RADIUS) {
        dx = (dx / distance) * RADIUS;
        dy = (dy / distance) * RADIUS;
      }

      setKnobPos({ x: dx, y: dy });

      // Sensibilidade de movimento da foto do barbeiro
      const deltaX = Math.round((dx / RADIUS) * 8);
      const deltaY = Math.round((dy / RADIUS) * 8);

      onChangeOffset(
        Math.max(-350, Math.min(350, xOffset + deltaX)),
        Math.max(-250, Math.min(250, yOffset + deltaY))
      );
    },
    [xOffset, yOffset, onChangeOffset]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      setIsDragging(true);
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX, e.clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onEnd = () => {
      if (isDragging) {
        setIsDragging(false);
        setKnobPos({ x: 0, y: 0 }); // Retorna a manopla ao centro suavemente
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onEnd);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [isDragging, handleMove]);

  return (
    <div className="flex flex-col items-center gap-3 p-3 bg-ink/90 border border-neutral-800 rounded-xl select-none">
      <div className="flex items-center justify-between w-full px-1 text-[11px] font-mono text-neutral-400">
        <span>X: <strong className="text-white">{xOffset}px</strong></span>
        <span>Y: <strong className="text-white">{yOffset}px</strong></span>
        <button
          onClick={onReset}
          title="Centralizar posição"
          className="text-neutral-400 hover:text-white p-1 rounded hover:bg-neutral-800"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Joystick Circular Analógico */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="relative w-32 h-32 rounded-full bg-neutral-900 border-2 border-neutral-700/80 shadow-inner flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
      >
        {/* Retículo / Mira direcional */}
        <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-[1px] bg-neutral-800 pointer-events-none" />
        <div className="absolute inset-y-2 left-1/2 -translate-x-1/2 w-[1px] bg-neutral-800 pointer-events-none" />

        {/* Manopla Central */}
        <div
          className="w-12 h-12 rounded-full bg-brand-red border-2 border-white/40 shadow-xl flex items-center justify-center text-white transition-transform duration-75 pointer-events-none"
          style={{
            transform: `translate(${knobPos.x}px, ${knobPos.y}px)`,
          }}
        >
          <div className="w-3 h-3 rounded-full bg-white/80" />
        </div>
      </div>

      {/* Controles de Passo Fino */}
      <div className="flex items-center gap-1.5 pt-1">
        <button
          onClick={() => onChangeOffset(xOffset - 5, yOffset)}
          aria-label="Mover para esquerda"
          className="p-2 min-h-[44px] min-w-[44px] bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded flex items-center justify-center text-neutral-300"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => onChangeOffset(xOffset, yOffset - 5)}
            aria-label="Mover para cima"
            className="p-2 min-h-[44px] min-w-[44px] bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded flex items-center justify-center text-neutral-300"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => onChangeOffset(xOffset, yOffset + 5)}
            aria-label="Mover para baixo"
            className="p-2 min-h-[44px] min-w-[44px] bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded flex items-center justify-center text-neutral-300"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={() => onChangeOffset(xOffset + 5, yOffset)}
          aria-label="Mover para direita"
          className="p-2 min-h-[44px] min-w-[44px] bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded flex items-center justify-center text-neutral-300"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
