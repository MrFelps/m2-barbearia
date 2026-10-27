import { useState } from 'react';
import { BookingState } from '../types/barber';
import { SERVICES_DATA, UNITS_DATA } from '../data/barberData';

const INITIAL_BOOKING: BookingState = {
  selectedServiceId: 'corte-classico',
  selectedUnitId: 'unidade-central',
  selectedDate: '',
  selectedTime: '14:00',
  customerName: '',
  customerPhone: '',
  notes: '',
};

export function useBookingFlow() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<BookingState>(INITIAL_BOOKING);
  const [isSuccess, setIsSuccess] = useState(false);

  const openBooking = (preselectedServiceId?: string, preselectedUnitId?: string) => {
    setForm((prev) => ({
      ...prev,
      selectedServiceId: preselectedServiceId || prev.selectedServiceId || 'corte-classico',
      selectedUnitId: preselectedUnitId || prev.selectedUnitId || 'unidade-central',
    }));
    setIsSuccess(false);
    setIsOpen(true);
  };

  const closeBooking = () => {
    setIsOpen(false);
  };

  const updateField = <K extends keyof BookingState>(key: K, value: BookingState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const selectedService = SERVICES_DATA.find((s) => s.id === form.selectedServiceId) || SERVICES_DATA[0];
  const selectedUnit = UNITS_DATA.find((u) => u.id === form.selectedUnitId) || UNITS_DATA[0];

  const submitBooking = () => {
    const text = [
      `*M2 BARBEARIA - SOLICITAÇÃO DE AGENDAMENTO*`,
      `• Serviço: ${selectedService.name} (R$ ${selectedService.price},00)`,
      `• Unidade: ${selectedUnit.shortName}`,
      `• Data: ${form.selectedDate || 'A combinar'}`,
      `• Horário: ${form.selectedTime}`,
      `• Cliente: ${form.customerName || 'Não informado'}`,
      `• Telefone: ${form.customerPhone || 'Não informado'}`,
      form.notes ? `• Observações: ${form.notes}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    const encoded = encodeURIComponent(text);
    const targetPhone = selectedUnit.whatsapp || '5511999990001';
    window.open(`https://wa.me/${targetPhone}?text=${encoded}`, '_blank');
    setIsSuccess(true);
  };

  return {
    isOpen,
    form,
    isSuccess,
    selectedService,
    selectedUnit,
    openBooking,
    closeBooking,
    updateField,
    submitBooking,
  };
}
