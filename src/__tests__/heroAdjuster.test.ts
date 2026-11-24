import { describe, it, expect } from 'vitest';
import { DEFAULT_HERO_SETTINGS } from '../hooks/useHeroAdjuster';
import { HeroImageSettings } from '../types/barber';

describe('Hero Visual Diagramming & Adjuster Settings', () => {
  it('deve conter as configurações padrão para o barbeiro, texto e botões', () => {
    expect(DEFAULT_HERO_SETTINGS).toBeDefined();
    expect(DEFAULT_HERO_SETTINGS.xOffset).toBe(-13);
    expect(DEFAULT_HERO_SETTINGS.yOffset).toBe(-234);
    expect(DEFAULT_HERO_SETTINGS.scale).toBe(118);
    expect(DEFAULT_HERO_SETTINGS.zIndex).toBe(10);
    expect(DEFAULT_HERO_SETTINGS.textYOffset).toBe(150);
    expect(DEFAULT_HERO_SETTINGS.textScale).toBe(108);
    expect(DEFAULT_HERO_SETTINGS.buttonsYOffset).toBe(115);
    expect(DEFAULT_HERO_SETTINGS.buttonsScale).toBe(102);
    expect(DEFAULT_HERO_SETTINGS.whatsappXOffset).toBe(10);
    expect(DEFAULT_HERO_SETTINGS.whatsappYOffset).toBe(20);
    expect(DEFAULT_HERO_SETTINGS.whatsappScale).toBe(85);
    expect(DEFAULT_HERO_SETTINGS.desktopScale).toBe(100);
    expect(DEFAULT_HERO_SETTINGS.desktopXOffset).toBe(0);
    expect(DEFAULT_HERO_SETTINGS.desktopYOffset).toBe(0);
  });

  it('deve conter configurações de iluminação e evidência do barbeiro sem deixá-lo fosco', () => {
    expect(DEFAULT_HERO_SETTINGS.opacity).toBe(100);
    expect(DEFAULT_HERO_SETTINGS.brightness).toBe(107);
    expect(DEFAULT_HERO_SETTINGS.contrast).toBe(105);
    expect(DEFAULT_HERO_SETTINGS.textBackdropOpacity).toBe(65);
  });

  it('deve permitir mutações e deslocamentos válidos de texto e botões', () => {
    const customSettings: HeroImageSettings = {
      ...DEFAULT_HERO_SETTINGS,
      textYOffset: 45,
      textScale: 85,
      buttonsYOffset: 60,
      brightness: 120,
      textBackdropOpacity: 50,
    };

    expect(customSettings.textYOffset).toBe(45);
    expect(customSettings.textScale).toBe(85);
    expect(customSettings.buttonsYOffset).toBe(60);
    expect(customSettings.brightness).toBe(120);
    expect(customSettings.textBackdropOpacity).toBe(50);
  });

  it('ordem de camadas padrão deve ser zIndex 10 para o barbeiro ficar atrás do texto', () => {
    expect(DEFAULT_HERO_SETTINGS.zIndex).toBe(10);
  });
});
