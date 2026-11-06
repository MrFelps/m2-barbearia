import React from 'react';
import { useCashierFlow } from '../../hooks/useCashierFlow';
import { BARBER_STATIONS } from '../../data/stationData';
import { PaymentCheckoutModal } from '../../modals/PaymentCheckoutModal';
import { CheckCircle2, Clock, AlertCircle, Ban, DollarSign } from 'lucide-react';

export const CashierDashboard: React.FC = () => {
  const {
    records,
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
  } = useCashierFlow();

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      {/* Resumo do Caixa do Dia */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface border border-border-subtle rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Total Faturado Hoje</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              R$ {totalPaid.toFixed(2).replace('.', ',')}
            </div>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-surface border border-border-subtle rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Em Atendimento</span>
            <div className="text-2xl font-black text-amber-400 mt-1">{inProgressCount} clientes</div>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-surface border border-border-subtle rounded-xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Aguardando Baixa</span>
            <div className="text-2xl font-black text-brand-red mt-1">{pendingCount} clientes</div>
          </div>
          <div className="p-3 bg-brand-red/10 text-brand-red rounded-lg">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Barra de Filtro de Barbeiro */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-surface p-3 rounded-xl border border-border-subtle">
        <span className="text-xs font-bold text-gray-300">Filtrar por Barbeiro:</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterBarber('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold min-h-[44px] ${
              filterBarber === 'all'
                ? 'bg-brand-red text-white'
                : 'bg-ink text-gray-400 hover:text-white border border-border-subtle'
            }`}
          >
            Todos
          </button>
          {BARBER_STATIONS.map((b) => (
            <button
              key={b.id}
              onClick={() => setFilterBarber(b.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold min-h-[44px] ${
                filterBarber === b.id
                  ? 'bg-brand-red text-white'
                  : 'bg-ink text-gray-400 hover:text-white border border-border-subtle'
              }`}
            >
              {b.barberName}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Atendimentos */}
      <div className="space-y-3">
        {records.map((rec) => (
          <div
            key={rec.id}
            className="bg-surface border border-border-subtle rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <span className="bg-ink px-2.5 py-1.5 rounded-md text-xs font-mono font-bold text-gray-300 border border-border-subtle">
                {rec.scheduledTime}
              </span>
              <div>
                <div className="text-sm font-extrabold text-white flex items-center gap-2">
                  {rec.clientName}
                  <span className="text-[11px] font-normal text-gray-400">• {rec.clientPhone}</span>
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {rec.serviceName} • <span className="text-gray-300 font-semibold">{rec.barberName}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-border-subtle">
              <div className="text-right">
                <div className="text-sm font-bold text-white">R$ {rec.price.toFixed(2).replace('.', ',')}</div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    rec.status === 'pago'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : rec.status === 'em_atendimento'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      : rec.status === 'pendente_pagamento'
                      ? 'bg-brand-red/10 text-brand-red border border-brand-red/30'
                      : rec.status === 'cancelado'
                      ? 'bg-gray-800 text-gray-500 line-through'
                      : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                  }`}
                >
                  {rec.status.replace('_', ' ')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {rec.status !== 'pago' && rec.status !== 'cancelado' && (
                  <>
                    <button
                      onClick={() => handleOpenPayment(rec)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1 min-h-[44px]"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Dar Baixa
                    </button>
                    <button
                      onClick={() => handleCancelAppointment(rec.id)}
                      className="text-gray-400 hover:text-red-400 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      title="Cancelar Agendamento"
                    >
                      <Ban className="w-4 h-4" />
                    </button>
                  </>
                )}
                {rec.status === 'pago' && (
                  <span className="text-xs text-gray-400 italic">Pago às {rec.completedAt}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Pagamento */}
      <PaymentCheckoutModal
        record={selectedRecordForPayment}
        selectedPaymentMethod={selectedPaymentMethod}
        selectedPixAccount={selectedPixAccount}
        onSelectPaymentMethod={setSelectedPaymentMethod}
        onSelectPixAccount={setSelectedPixAccount}
        onConfirm={handleConfirmPayment}
        onClose={handleClosePayment}
      />
    </div>
  );
};
