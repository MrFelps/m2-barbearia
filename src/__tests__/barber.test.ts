import { describe, it, expect } from 'vitest';
import { SERVICES_DATA, UNITS_DATA, REVIEWS_DATA } from '../data/barberData';

describe('M2 Barbearia Data Integrity & Business Logic', () => {
  it('should have valid services with positive pricing and durations', () => {
    expect(SERVICES_DATA.length).toBeGreaterThanOrEqual(4);
    SERVICES_DATA.forEach((service) => {
      expect(service.price).toBeGreaterThan(0);
      expect(service.durationMinutes).toBeGreaterThan(0);
      expect(service.name).toBeTruthy();
      expect(service.description).toBeTruthy();
      expect(['cabelo', 'barba', 'tratamentos', 'combos']).toContain(service.category);
    });
  });

  it('should filter services by category correctly', () => {
    const hairServices = SERVICES_DATA.filter((s) => s.category === 'cabelo');
    expect(hairServices.length).toBeGreaterThan(0);
    hairServices.forEach((s) => expect(s.category).toBe('cabelo'));

    const beardServices = SERVICES_DATA.filter((s) => s.category === 'barba');
    expect(beardServices.length).toBeGreaterThan(0);
    beardServices.forEach((s) => expect(s.category).toBe('barba'));
  });

  it('should have valid units with phone, WhatsApp and address details', () => {
    expect(UNITS_DATA.length).toBeGreaterThanOrEqual(2);
    UNITS_DATA.forEach((unit) => {
      expect(unit.name).toBeTruthy();
      expect(unit.whatsapp).toMatch(/^55\d{10,11}$/);
      expect(unit.address).toBeTruthy();
      expect(unit.hoursWeekday).toBeTruthy();
      expect(unit.mapsUrl).toContain('maps.google.com');
    });
  });

  it('should have valid customer reviews with ratings between 4 and 5 stars', () => {
    expect(REVIEWS_DATA.length).toBeGreaterThanOrEqual(3);
    REVIEWS_DATA.forEach((review) => {
      expect(review.rating).toBeGreaterThanOrEqual(4);
      expect(review.rating).toBeLessThanOrEqual(5);
      expect(review.author).toBeTruthy();
      expect(review.comment.length).toBeGreaterThan(10);
    });
  });

  it('should calculate correct combo savings or signature package value', () => {
    const combo = SERVICES_DATA.find((s) => s.id === 'combo-m2-signature');
    const cut = SERVICES_DATA.find((s) => s.id === 'corte-classico');
    const beard = SERVICES_DATA.find((s) => s.id === 'barba-terapeutica');

    expect(combo).toBeDefined();
    expect(cut).toBeDefined();
    expect(beard).toBeDefined();

    if (combo && cut && beard) {
      // Individual sum: 95 + 85 = 180. Combo price: 160.
      const individualSum = cut.price + beard.price;
      expect(combo.price).toBeLessThan(individualSum);
      expect(individualSum - combo.price).toBe(20);
    }
  });
});
