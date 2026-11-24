export interface HeroImageSettings {
  // 1. Ajuste do Barbeiro
  scale: number; // in percentage, e.g. 100
  xOffset: number; // in pixels, e.g. 10
  yOffset: number; // in pixels, e.g. -40
  zIndex: number; // 10 (behind text) or 30 (in front of text)
  opacity: number; // 20 to 100
  brightness?: number; // 80 to 150, default 105
  contrast?: number; // 90 to 140, default 105

  // 2. Ajuste do Texto Central
  textYOffset?: number; // in pixels, e.g. 0
  textScale?: number; // in percentage, e.g. 100
  textBackdropOpacity?: number; // 0 to 100, default 65

  // 3. Ajuste dos Botões de Agendamento
  buttonsYOffset?: number; // in pixels, e.g. 0
  buttonsScale?: number; // in percentage, e.g. 100

  // 4. Ajuste do WhatsApp Flutuante
  whatsappXOffset?: number; // in pixels, e.g. 0
  whatsappYOffset?: number; // in pixels, e.g. 0
  whatsappScale?: number; // in percentage, e.g. 100

  // 5. Ajustes Específicos para Desktop / Monitor de PC
  desktopScale?: number; // in percentage, e.g. 100
  desktopXOffset?: number; // in pixels, e.g. 0
  desktopYOffset?: number; // in pixels, e.g. 0
  desktopTextYOffset?: number; // in pixels, e.g. 0
  desktopButtonsYOffset?: number; // in pixels, e.g. 0
}

export interface BarberProfile {
  name: string;
  role: string;
  badge: string;
  photoUrl: string;
  instagramUrl: string;
  instagramHandle: string;
  googleReviewUrl: string;
  bookingAppUrl: string;
  bio: string;
  yearsOfExperience: number;
  totalAppointments: string;
  ratingScore: string;
  specialties: string[];
}

export interface ServiceItem {
  id: string;
  name: string;
  category: 'cabelo' | 'barba' | 'tratamentos' | 'combos';
  durationMinutes: number;
  price: number;
  description: string;
  isPopular?: boolean;
}

export interface UnitLocation {
  id: string;
  name: string;
  shortName: string;
  address: string;
  neighborhood: string;
  city: string;
  phone: string;
  whatsapp: string;
  hoursWeekday: string;
  hoursSaturday: string;
  mapsUrl: string;
  imageUrl: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  verifiedOnGoogle?: boolean;
}

export interface BookingState {
  selectedServiceId: string | null;
  selectedUnitId: string | null;
  selectedDate: string;
  selectedTime: string;
  customerName: string;
  customerPhone: string;
  notes: string;
}
