import React from 'react';

interface M2LogoProps {
  className?: string;
  size?: number;
}

export const M2Logo: React.FC<M2LogoProps> = ({ className = 'h-10 sm:h-11 w-auto', size = 44 }) => {
  return (
    <div className="inline-flex items-center gap-2">
      <img
        src="/assets/img/logo-m2-white.png"
        alt="M2 Barbearia"
        style={{ height: size }}
        className={`object-contain transition-transform group-hover:scale-105 ${className}`}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = '/assets/img/logo-simbolo.png';
        }}
      />
    </div>
  );
};
