import React from 'react';
import { BarberQRCodeDrawer } from './modals/BarberQRCodeDrawer';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  return <BarberQRCodeDrawer isOpen={isOpen} onClose={onClose} />;
};
