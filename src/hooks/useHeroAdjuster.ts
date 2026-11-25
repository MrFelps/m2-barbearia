import { useState, useEffect } from 'react';
import { HeroImageSettings } from '../types/barber';
import savedHeroSettings from '../data/savedHeroSettings.json';

const STORAGE_KEY = 'm2_hero_image_settings';

const syncToServer = (data: HeroImageSettings) => {
  try {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      fetch('/api/sync-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).catch(() => {});
    }
  } catch {
    // ignore
  }
};

export const DEFAULT_HERO_SETTINGS: HeroImageSettings = {
  scale: 118,
  xOffset: 2,
  yOffset: -234,
  zIndex: 10,
  opacity: 100,
  brightness: 107,
  contrast: 105,
  textYOffset: 195,
  textScale: 108,
  textBackdropOpacity: 65,
  buttonsYOffset: 160,
  buttonsScale: 102,
  whatsappXOffset: 10,
  whatsappYOffset: 20,
  whatsappScale: 85,
  desktopScale: 100,
  desktopXOffset: 0,
  desktopYOffset: 0,
  desktopTextYOffset: 0,
  desktopButtonsYOffset: 0,
};

export function useHeroAdjuster() {
  const [settings, setSettings] = useState<HeroImageSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.textYOffset === 150 && parsed.buttonsYOffset === 115) {
          parsed.textYOffset = 195;
          parsed.buttonsYOffset = 160;
        }
        return { ...DEFAULT_HERO_SETTINGS, ...parsed };
      }
      if (savedHeroSettings && Object.keys(savedHeroSettings).length > 0) {
        return { ...DEFAULT_HERO_SETTINGS, ...(savedHeroSettings as Partial<HeroImageSettings>) };
      }
    } catch {
      // fallback to default
    }
    return DEFAULT_HERO_SETTINGS;
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Escuta atualizações vindas do simulador mobile em tempo real
  useEffect(() => {
    syncToServer(settings);
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'M2_HERO_IMAGE_UPDATE' && event.data.settings) {
        setSettings(event.data.settings);
        syncToServer(event.data.settings);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const updateSetting = <K extends keyof HeroImageSettings>(key: K, value: HeroImageSettings[K]) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };
      syncToServer(next);
      return next;
    });
    setIsSaved(false);
  };

  const saveSettings = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      syncToServer(settings);
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
