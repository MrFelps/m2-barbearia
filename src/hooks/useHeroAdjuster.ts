import { useState, useEffect } from 'react';
import { HeroImageSettings } from '../types/barber';

const STORAGE_KEY = 'm2_hero_image_settings';

export const DEFAULT_HERO_SETTINGS: HeroImageSettings = {
  scale: 100,
  xOffset: 10,
  yOffset: -40,
  zIndex: 10,
  opacity: 100,
  brightness: 105,
  contrast: 105,
  textYOffset: 0,
  textScale: 100,
  textBackdropOpacity: 65,
  buttonsYOffset: 0,
};

export function useHeroAdjuster() {
  const [settings, setSettings] = useState<HeroImageSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...DEFAULT_HERO_SETTINGS, ...JSON.parse(saved) };
    } catch {
      // fallback to default
    }
    return DEFAULT_HERO_SETTINGS;
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Escuta atualizações vindas do simulador mobile em tempo real
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'M2_HERO_IMAGE_UPDATE' && event.data.settings) {
        setSettings(event.data.settings);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const updateSetting = <K extends keyof HeroImageSettings>(key: K, value: HeroImageSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setIsSaved(false);
  };

  const saveSettings = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    } catch {
      // ignore storage errors
    }
  };

  const resetSettings = () => {
    setSettings(DEFAULT_HERO_SETTINGS);
    localStorage.removeItem(STORAGE_KEY);
    setIsSaved(false);
  };

  return {
    settings,
    isOpen,
    isSaved,
    setIsOpen,
    updateSetting,
    saveSettings,
    resetSettings,
  };
}
