import { useEffect } from 'react';
import { AppView } from '../components/ViewSwitcherBar';

/**
 * Hook para garantir fidelidade visual proporcional no celular:
 * Mantém o site principal na proporção exata de desktop (1200px) sem distorcer ou reposicionar elementos,
 * e comuta dinamicamente para viewport 1:1 móvel apenas quando o módulo 📱 Celular é selecionado.
 */
export const useAdaptiveViewport = (activeView: AppView) => {
  useEffect(() => {
    const meta =
      document.getElementById('viewport-meta') ||
      document.querySelector('meta[name="viewport"]');

    if (!meta) return;

    if (activeView === 'celular') {
      meta.setAttribute(
        'content',
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
      );
    } else {
      meta.setAttribute('content', 'width=1200, user-scalable=yes');
    }
  }, [activeView]);
};
