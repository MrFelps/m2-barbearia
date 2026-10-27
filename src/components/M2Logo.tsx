import React from 'react';

interface M2LogoProps {
  className?: string;
  size?: number;
}

export const M2Logo: React.FC<M2LogoProps> = ({ className = 'h-11 sm:h-12 w-auto', size = 48 }) => {
  return (
    <div className="inline-flex items-center">
      <img
        src="/assets/img/logo-m2-white.png"
        alt="M2 Barbearia"
        style={{ height: size }}
        className={`object-contain transition-transform group-hover:scale-105 drop-shadow-sm ${className}`}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = '/assets/img/logo-m2-original.png';
        }}
      />
    </div>
  );
};
