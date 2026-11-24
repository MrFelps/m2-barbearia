import { useState, useEffect, useMemo, useCallback } from 'react';
import { DevicePreset, DEVICE_PRESETS, SimulatorState } from '../types/simulator';

const STORAGE_KEY = 'm2_barbearia_simulator_state';

const DEFAULT_STATE: SimulatorState = {
  isActive: false,
  activeDeviceId: 'iphone-16-pro',
  isLandscape: false,
  scale: 0.88,
  showFrame: true,
  showTouchIndicator: false,
};

export const useMobileSimulator = () => {
  const [state, setState] = useState<SimulatorState>(() => {
    if (typeof window === 'undefined') return DEFAULT_STATE;
    const urlParams = new URLSearchParams(window.location.search);
    const urlActive = urlParams.has('sim') || urlParams.has('mobile');
    const urlDevice = urlParams.get('device');

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...parsed,
          isActive: urlActive || parsed.isActive,
          activeDeviceId: urlDevice || parsed.activeDeviceId || 'iphone-16-pro',
        };
      }
    } catch {
      // Fallback ao padrão se houver falha de parsing
    }

    return {
      ...DEFAULT_STATE,
      isActive: urlActive,
      activeDeviceId: urlDevice || DEFAULT_STATE.activeDeviceId,
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignora falhas de persistência em modo anônimo
    }
  }, [state]);

  const activeDevice = useMemo<DevicePreset>(() => {
    return (
      DEVICE_PRESETS.find((d) => d.id === state.activeDeviceId) ||
      DEVICE_PRESETS[0]
    );
  }, [state.activeDeviceId]);

  const toggleSimulator = useCallback(() => {
    setState((prev) => ({ ...prev, isActive: !prev.isActive }));
  }, []);

  const selectDevice = useCallback((deviceId: string) => {
    setState((prev) => ({ ...prev, activeDeviceId: deviceId }));
  }, []);

  const toggleOrientation = useCallback(() => {
    setState((prev) => ({ ...prev, isLandscape: !prev.isLandscape }));
  }, []);

  const setScale = useCallback((scale: number) => {
    setState((prev) => ({ ...prev, scale: Math.max(0.5, Math.min(1.2, scale)) }));
  }, []);

  const toggleFrame = useCallback(() => {
    setState((prev) => ({ ...prev, showFrame: !prev.showFrame }));
  }, []);

  const calculateAutoFit = useCallback(() => {
    if (typeof window === 'undefined') return 0.85;
    const availableHeight = window.innerHeight - 140; // Espaço para barra de controle e margens
    const deviceHeight = state.isLandscape ? activeDevice.width : activeDevice.height;
    const fitScale = Math.min(1, Math.max(0.55, availableHeight / (deviceHeight + 50)));
    return Number(fitScale.toFixed(2));
  }, [activeDevice, state.isLandscape]);

  return {
    ...state,
    activeDevice,
    toggleSimulator,
    selectDevice,
    toggleOrientation,
    setScale,
    toggleFrame,
    calculateAutoFit,
  };
};
