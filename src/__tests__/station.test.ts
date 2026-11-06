import { describe, it, expect } from 'vitest';
import { BARBER_STATIONS, PIX_ACCOUNTS, INITIAL_DAILY_SERVICES } from '../data/stationData';

describe('Barber Station & Cashier Flow Integrity', () => {
  it('should have valid barber stations with unique station numbers', () => {
    expect(BARBER_STATIONS.length).toBeGreaterThanOrEqual(2);
    const stationNumbers = BARBER_STATIONS.map((s) => s.stationNumber);
    const uniqueNumbers = new Set(stationNumbers);
    expect(uniqueNumbers.size).toBe(stationNumbers.length);

    BARBER_STATIONS.forEach((station) => {
      expect(station.barberName).toBeTruthy();
      expect(station.slug).toBeTruthy();
      expect(station.googleReviewUrl).toContain('google.com');
      expect(station.whatsapp).toBe('5511960318915');
    });
  });

  it('should have configured PIX accounts with valid keys and holders', () => {
    expect(PIX_ACCOUNTS.length).toBeGreaterThanOrEqual(2);
    PIX_ACCOUNTS.forEach((acc) => {
      expect(acc.id).toBeTruthy();
      expect(acc.key).toBeTruthy();
      expect(acc.holder).toBeTruthy();
      expect(['cnpj', 'cpf', 'email', 'telefone', 'aleatoria']).toContain(acc.type);
    });
  });

  it('should calculate initial daily cashier financial metrics correctly', () => {
    const paidRecords = INITIAL_DAILY_SERVICES.filter((r) => r.status === 'pago');
    const totalPaid = paidRecords.reduce((sum, r) => sum + r.price, 0);
    expect(totalPaid).toBe(45);

    const inProgress = INITIAL_DAILY_SERVICES.filter((r) => r.status === 'em_atendimento');
    expect(inProgress.length).toBe(1);

    const pending = INITIAL_DAILY_SERVICES.filter((r) => r.status === 'pendente_pagamento');
    expect(pending.length).toBe(1);
  });
});
