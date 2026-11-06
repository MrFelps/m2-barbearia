import { BarberStation, PixAccount, ServiceRecord } from '../types/station';

export const BARBER_STATIONS: BarberStation[] = [
  {
    id: 'barber-felipe',
    slug: 'felipe',
    barberName: 'Felipe Boccardo',
    role: 'Master Barber & Visagista',
    photoUrl: '/assets/img/felipe-boccardo.png',
    stationNumber: 1,
    googleReviewUrl:
      'https://www.google.com/search?q=M2+Barbearia+Santo+Andre+avaliacoes#lrd=0x94ce69b8f846db75:0x7b3da7f27dbb32f4,3,,,,',
    instagramUrl: 'https://www.instagram.com/m2barbearia_01/',
    whatsapp: '5511960318915',
  },
  {
    id: 'barber-gabriel',
    slug: 'gabriel',
    barberName: 'Gabriel Santos',
    role: 'Especialista em Degradê & Fade',
    photoUrl: '/assets/img/felipe-boccardo.png',
    stationNumber: 2,
    googleReviewUrl:
      'https://www.google.com/search?q=M2+Barbearia+Santo+Andre+avaliacoes#lrd=0x94ce69b8f846db75:0x7b3da7f27dbb32f4,3,,,,',
    instagramUrl: 'https://www.instagram.com/m2barbearia_01/',
    whatsapp: '5511960318915',
  },
];

export const PIX_ACCOUNTS: PixAccount[] = [
  {
    id: 'pix-loja',
    name: 'M2 Barbearia Oficial (Conta Loja)',
    key: '5511960318915',
    type: 'telefone',
    holder: 'M2 Barbearia Santo André Ltda',
  },
  {
    id: 'pix-gestor',
    name: 'Conta Gestão / Recepção',
    key: 'contato@m2barbearia.com.br',
    type: 'email',
    holder: 'Administração M2',
  },
];

export const INITIAL_DAILY_SERVICES: ServiceRecord[] = [
  {
    id: 'rec-1',
    clientName: 'Rodrigo Antunes',
    clientPhone: '(11) 98451-2290',
    barberId: 'barber-felipe',
    barberName: 'Felipe Boccardo',
    serviceId: 'corte-barba',
    serviceName: 'Corte + Barba',
    price: 80,
    scheduledTime: '14:00',
    status: 'em_atendimento',
  },
  {
    id: 'rec-2',
    clientName: 'Marcelo Dias',
    clientPhone: '(11) 97120-4491',
    barberId: 'barber-felipe',
    barberName: 'Felipe Boccardo',
    serviceId: 'nevou',
    serviceName: 'Nevou ❄️',
    price: 170,
    scheduledTime: '15:00',
    status: 'agendado',
  },
  {
    id: 'rec-3',
    clientName: 'Lucas Ferreira',
    clientPhone: '(11) 99882-3312',
    barberId: 'barber-gabriel',
    barberName: 'Gabriel Santos',
    serviceId: 'corte',
    serviceName: 'Corte Tradicional',
    price: 45,
    scheduledTime: '14:30',
    status: 'pendente_pagamento',
  },
  {
    id: 'rec-4',
    clientName: 'Eduardo Ramos',
    clientPhone: '(11) 96541-1123',
    barberId: 'barber-felipe',
    barberName: 'Felipe Boccardo',
    serviceId: 'barba',
    serviceName: 'Barba Terapia',
    price: 45,
    scheduledTime: '13:00',
    status: 'pago',
    paymentMethod: 'pix',
    pixAccountId: 'pix-loja',
    completedAt: '13:35',
  },
];
