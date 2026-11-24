export type DevicePlatform = 'apple' | 'android';
export type NotchType = 'dynamic-island' | 'notch' | 'punch-hole' | 'none';

export interface DevicePreset {
  id: string;
  name: string;
  platform: DevicePlatform;
  width: number;
  height: number;
  pixelRatio: number;
  notchType: NotchType;
  borderRadius: number;
  hasPhysicalButtons: boolean;
}

export const DEVICE_PRESETS: DevicePreset[] = [
  {
    id: 'iphone-16-pro',
    name: 'iPhone 16 Pro',
    platform: 'apple',
    width: 393,
    height: 852,
    pixelRatio: 3,
    notchType: 'dynamic-island',
    borderRadius: 54,
    hasPhysicalButtons: true,
  },
  {
    id: 'iphone-se',
    name: 'iPhone SE (Compact)',
    platform: 'apple',
    width: 375,
    height: 667,
    pixelRatio: 2,
    notchType: 'none',
    borderRadius: 36,
    hasPhysicalButtons: true,
  },
  {
    id: 'samsung-s24',
    name: 'Galaxy S24',
    platform: 'android',
    width: 412,
    height: 915,
    pixelRatio: 3,
    notchType: 'punch-hole',
    borderRadius: 44,
    hasPhysicalButtons: true,
  },
  {
    id: 'mobile-standard',
    name: 'Padrão 360px',
    platform: 'android',
    width: 360,
    height: 800,
    pixelRatio: 2,
    notchType: 'punch-hole',
    borderRadius: 38,
    hasPhysicalButtons: true,
  },
];

export interface SimulatorState {
  isActive: boolean;
  activeDeviceId: string;
  isLandscape: boolean;
  scale: number;
  showFrame: boolean;
  showTouchIndicator: boolean;
}
