import { useState } from 'react';
import { HeroImageSettings } from '../types/barber';

const STORAGE_KEY = 'm2_hero_image_settings';

const DEFAULT_SETTINGS: HeroImageSettings = {
  scale: 100,
  xOffset: 10,
  yOffset: -40,
  zIndex: 10,
  opacity: 100,
};

export function useHeroAdjuster() {
  const [settings, setSettings] = useState<HeroImageSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback to default
    }
    return DEFAULT_SETTINGS;
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

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
    setSettings(DEFAULT_SETTINGS);
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
