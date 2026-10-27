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
