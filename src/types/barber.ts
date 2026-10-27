export interface HeroImageSettings {
  scale: number; // in percentage, e.g. 100
  xOffset: number; // in pixels or %, e.g. 0
  yOffset: number; // in pixels, e.g. 0
  zIndex: number; // 10 (behind text) or 30 (in front of text)
  opacity: number; // 20 to 100
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
