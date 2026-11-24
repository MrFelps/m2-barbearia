import { describe, it, expect } from 'vitest';
import { DEVICE_PRESETS, DevicePreset } from '../types/simulator';

describe('Mobile Simulator Presets & Logic', () => {
  it('deve conter ao menos 3 presets de smartphones reais e populares', () => {
    expect(DEVICE_PRESETS.length).toBeGreaterThanOrEqual(3);
  });

  it('todos os presets devem possuir largura mobile estrita (entre 320px e 430px)', () => {
    DEVICE_PRESETS.forEach((preset: DevicePreset) => {
      expect(preset.width).toBeGreaterThanOrEqual(320);
      expect(preset.width).toBeLessThanOrEqual(430);
    });
  });

  it('todos os presets devem possuir altura condizente com smartphones (entre 600px e 950px)', () => {
    DEVICE_PRESETS.forEach((preset: DevicePreset) => {
      expect(preset.height).toBeGreaterThanOrEqual(600);
      expect(preset.height).toBeLessThanOrEqual(950);
    });
  });

  it('deve possuir IDs únicos para cada preset de dispositivo', () => {
    const ids = DEVICE_PRESETS.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('deve conter o preset de referência iPhone 16 Pro com Dynamic Island', () => {
    const iphone = DEVICE_PRESETS.find((p) => p.id === 'iphone-16-pro');
    expect(iphone).toBeDefined();
    expect(iphone?.width).toBe(393);
    expect(iphone?.height).toBe(852);
    expect(iphone?.notchType).toBe('dynamic-island');
  });

  it('deve conter o preset compacto iPhone SE (375px)', () => {
    const se = DEVICE_PRESETS.find((p) => p.id === 'iphone-se');
    expect(se).toBeDefined();
    expect(se?.width).toBe(375);
    expect(se?.height).toBe(667);
  });

  it('deve conter o preset Android Galaxy S24 com Punch Hole', () => {
    const galaxy = DEVICE_PRESETS.find((p) => p.id === 'samsung-s24');
    expect(galaxy).toBeDefined();
    expect(galaxy?.width).toBe(412);
    expect(galaxy?.height).toBe(915);
    expect(galaxy?.notchType).toBe('punch-hole');
  });
});
