export type AppointmentStatus =
  | 'agendado'
  | 'em_atendimento'
  | 'pendente_pagamento'
  | 'pago'
  | 'cancelado';

export type PaymentMethod = 'pix' | 'cartao_credito' | 'cartao_debito' | 'dinheiro';

export interface PixAccount {
  id: string;
  name: string;
  key: string;
  type: 'cnpj' | 'cpf' | 'email' | 'telefone' | 'aleatoria';
  holder: string;
}

export interface BarberStation {
  id: string;
  slug: string;
  barberName: string;
  role: string;
  photoUrl: string;
  stationNumber: number;
  googleReviewUrl: string;
  instagramUrl: string;
  whatsapp: string;
}

export interface ServiceRecord {
  id: string;
  clientName: string;
  clientPhone?: string;
  barberId: string;
  barberName: string;
  serviceId: string;
  serviceName: string;
  price: number;
  scheduledTime: string;
  status: AppointmentStatus;
  paymentMethod?: PaymentMethod;
  pixAccountId?: string;
  completedAt?: string;
}
