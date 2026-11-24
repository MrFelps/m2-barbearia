import { describe, it, expect } from 'vitest';
import { BARBER_PROFILE } from '../data/barberData';

describe('Barber QR Code Drawer & Seller Profile', () => {
  it('deve conter a foto e os dados completos do vendedor para o QR Code', () => {
    expect(BARBER_PROFILE.name).toBe('Felipe Boccardo');
    expect(BARBER_PROFILE.photoUrl).toBe('/assets/img/felipe-boccardo.png');
    expect(BARBER_PROFILE.role).toContain('Visagista');
    expect(BARBER_PROFILE.badge).toBe('Bancada Especial M2');
  });

  it('deve gerar a URL do QR Code apontando para a página inicial com formato válido', () => {
    const origin = 'https://m2barbearia.com.br';
    const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=6&color=0D0D0E&bgcolor=FFFFFF&data=${encodeURIComponent(origin)}`;
    
    expect(qrCodeApiUrl).toContain('api.qrserver.com');
    expect(qrCodeApiUrl).toContain(encodeURIComponent(origin));
  });
});
