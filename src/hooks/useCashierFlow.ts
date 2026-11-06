import { useState } from 'react';
import { INITIAL_DAILY_SERVICES, PIX_ACCOUNTS } from '../data/stationData';
import { ServiceRecord, PaymentMethod } from '../types/station';

export const useCashierFlow = () => {
  const [records, setRecords] = useState<ServiceRecord[]>(INITIAL_DAILY_SERVICES);
  const [selectedRecordForPayment, setSelectedRecordForPayment] = useState<ServiceRecord | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('pix');
  const [selectedPixAccount, setSelectedPixAccount] = useState<string>(PIX_ACCOUNTS[0].id);
  const [filterBarber, setFilterBarber] = useState<string>('all');

  const filteredRecords = records.filter((rec) => {
    if (filterBarber === 'all') return true;
    return rec.barberId === filterBarber;
  });

  const totalPaid = records
    .filter((r) => r.status === 'pago')
    .reduce((acc, curr) => acc + curr.price, 0);

  const pendingCount = records.filter((r) => r.status === 'pendente_pagamento').length;
  const inProgressCount = records.filter((r) => r.status === 'em_atendimento').length;

  const handleOpenPayment = (record: ServiceRecord) => {
    setSelectedRecordForPayment(record);
    setSelectedPaymentMethod('pix');
    setSelectedPixAccount(PIX_ACCOUNTS[0].id);
  };

  const handleClosePayment = () => {
    setSelectedRecordForPayment(null);
  };

  const handleConfirmPayment = () => {
    if (!selectedRecordForPayment) return;

    setRecords((prev) =>
      prev.map((rec) => {
        if (rec.id === selectedRecordForPayment.id) {
          return {
            ...rec,
            status: 'pago',
            paymentMethod: selectedPaymentMethod,
            pixAccountId: selectedPaymentMethod === 'pix' ? selectedPixAccount : undefined,
            completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
        }
        return rec;
      })
    );

    setSelectedRecordForPayment(null);
  };

  const handleCancelAppointment = (id: string) => {
    setRecords((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, status: 'cancelado' } : rec))
    );
  };

  return {
    records: filteredRecords,
    allRecordsCount: records.length,
    totalPaid,
    pendingCount,
    inProgressCount,
    filterBarber,
    setFilterBarber,
    selectedRecordForPayment,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    selectedPixAccount,
    setSelectedPixAccount,
    handleOpenPayment,
    handleClosePayment,
    handleConfirmPayment,
    handleCancelAppointment,
  };
};
