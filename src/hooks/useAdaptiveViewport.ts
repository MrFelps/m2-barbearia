import { useEffect } from 'react';
import { AppView } from '../components/ViewSwitcherBar';

/**
 * Hook para garantir viewport responsiva padrão (device-width):
 * Garante que tanto mobile quanto desktop renderizem com precisão suas respectivas media queries.
 */
export const useAdaptiveViewport = (activeView: AppView) => {
  useEffect(() => {
    const meta = document.querySelector('meta[name="viewport"]');
    if (!meta) return;

    meta.setAttribute(
      'content',
      'width=device-width, initial-scale=1.0, maximum-scale=5.0'
    );
  }, [activeView]);
};
