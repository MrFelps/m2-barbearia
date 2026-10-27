import React from 'react';

interface BrandBarProps {
  fixed?: boolean;
}

export const BrandBar: React.FC<BrandBarProps> = ({ fixed }) => {
  return (
    <div
      className={`brand-bar ${fixed ? 'fixed top-0 left-0 right-0 z-50' : ''}`}
      aria-hidden="true"
    />
  );
};
