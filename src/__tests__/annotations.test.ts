import { describe, it, expect } from 'vitest';
import { INITIAL_ANNOTATIONS } from '../data/annotationsData';

describe('Anotações de Revisão Visual (Felipe)', () => {
  it('deve carregar exatamente as anotações exportadas no arquivo de revisão', () => {
    expect(INITIAL_ANNOTATIONS.length).toBe(2);
  });

  it('anotação #1 deve conter o pedido de simplificação do Hero e do texto longo', () => {
    const ann1 = INITIAL_ANNOTATIONS.find((a) => a.number === 1);
    expect(ann1).toBeDefined();
    expect(ann1?.comment).toContain('informações de forma mais simples');
    expect(ann1?.comment).toContain('tira para diminuir essas informações');
    expect(ann1?.x).toBe(402);
    expect(ann1?.y).toBe(242);
  });

  it('anotação #2 deve conter o pedido do joystick circular e ajuste de camadas', () => {
    const ann2 = INITIAL_ANNOTATIONS.find((a) => a.number === 2);
    expect(ann2).toBeDefined();
    expect(ann2?.comment).toContain('joystick');
    expect(ann2?.comment).toContain('camadas');
    expect(ann2?.x).toBe(607);
    expect(ann2?.y).toBe(180);
  });

  it('todas as anotações devem possuir autor definido e estado pendente inicial', () => {
    INITIAL_ANNOTATIONS.forEach((ann) => {
      expect(ann.author).toBe('felipe');
      expect(ann.resolved).toBe(false);
      expect(ann.isBox).toBe(true);
      expect(ann.width).toBeGreaterThan(0);
      expect(ann.height).toBeGreaterThan(0);
    });
  });
});
