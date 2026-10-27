import { describe, it, expect } from 'vitest';
import { SERVICES_DATA, UNITS_DATA, REVIEWS_DATA, BARBER_PROFILE } from '../data/barberData';

describe('M2 Barbearia Portfolio Data Integrity & Business Logic', () => {
  it('should have a complete barber profile with contact and social links', () => {
    expect(BARBER_PROFILE.name).toBeTruthy();
    expect(BARBER_PROFILE.role).toBeTruthy();
    expect(BARBER_PROFILE.photoUrl).toBeTruthy();
    expect(BARBER_PROFILE.instagramUrl).toContain('instagram.com/m2barbearia_01');
    expect(BARBER_PROFILE.bookingAppUrl).toContain('appbarber.com.br');
    expect(BARBER_PROFILE.specialties.length).toBeGreaterThanOrEqual(3);
    expect(BARBER_PROFILE.yearsOfExperience).toBeGreaterThanOrEqual(1);
  });

  it('should have valid services with positive pricing and durations', () => {
    expect(SERVICES_DATA.length).toBe(11);
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

  it('should have valid units with phone, WhatsApp and Google Maps links in Santo Andre', () => {
    expect(UNITS_DATA.length).toBeGreaterThanOrEqual(1);
    const unit = UNITS_DATA[0];
    expect(unit.name).toContain('M2 Barbearia');
    expect(unit.whatsapp).toBe('5511960318915');
    expect(unit.address).toContain('América do Sul');
    expect(unit.hoursWeekday).toBeTruthy();
    expect(unit.mapsUrl).toContain('share.google');
  });

  it('should have valid Google customer reviews with ratings of 5 stars', () => {
    expect(REVIEWS_DATA.length).toBeGreaterThanOrEqual(3);
    REVIEWS_DATA.forEach((review) => {
      expect(review.rating).toBe(5);
      expect(review.author).toBeTruthy();
      expect(review.verifiedOnGoogle).toBe(true);
    });
  });
});
