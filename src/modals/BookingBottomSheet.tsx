import React from 'react';
import { X, CheckCircle, ArrowRight } from 'lucide-react';
import { BookingState, ServiceItem, UnitLocation } from '../types/barber';
import { SERVICES_DATA, UNITS_DATA } from '../data/barberData';

interface BookingBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  form: BookingState;
  selectedService: ServiceItem;
  selectedUnit: UnitLocation;
  onUpdateField: <K extends keyof BookingState>(key: K, value: BookingState[K]) => void;
  onSubmit: () => void;
  isSuccess: boolean;
}

export const BookingBottomSheet: React.FC<BookingBottomSheetProps> = ({
  isOpen,
  onClose,
  form,
  selectedService,
  selectedUnit,
  onUpdateField,
  onSubmit,
  isSuccess,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-xl bg-ink-elevated border-t sm:border border-neutral-800 rounded-t-2xl sm:rounded-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 flex flex-col shadow-2xl relative"
        style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
      >
        {/* Mobile Grab Handle */}
        <div className="sm:hidden w-12 h-1.5 bg-neutral-600 rounded-full mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div>
            <span className="text-[11px] font-display uppercase tracking-[0.25em] text-brand-red">Agendamento Executivo</span>
            <h2 className="text-xl font-display uppercase font-semibold text-white">M2 Barbearia</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar modal"
            className="w-11 h-11 flex items-center justify-center text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSuccess ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-display uppercase text-white font-semibold">Solicitação Encaminhada!</h3>
            <p className="text-sm text-textDim mt-2 max-w-md">
              Seu agendamento foi direcionado para a unidade <strong className="text-white">{selectedUnit.shortName}</strong> via WhatsApp. Nossa recepção confirmará os detalhes.
            </p>
            <button
              onClick={onClose}
              className="mt-6 w-full h-12 min-h-[44px] bg-neutral-800 hover:bg-neutral-700 text-white font-display uppercase text-xs tracking-wider rounded transition-colors"
            >
              Concluir
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            className="mt-4 space-y-4"
          >
            {/* Service & Unit Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs uppercase font-display tracking-wider text-textFaint mb-1.5">Serviço</label>
                <select
                  value={form.selectedServiceId || ''}
                  onChange={(e) => onUpdateField('selectedServiceId', e.target.value)}
                  className="w-full h-11 min-h-[44px] px-3 bg-neutral-900 border border-neutral-800 rounded text-sm text-white focus:border-brand-red focus:outline-none"
                >
                  {SERVICES_DATA.map((srv) => (
                    <option key={srv.id} value={srv.id}>
                      {srv.name} — R$ {srv.price}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase font-display tracking-wider text-textFaint mb-1.5">Unidade</label>
                <select
                  value={form.selectedUnitId || ''}
                  onChange={(e) => onUpdateField('selectedUnitId', e.target.value)}
                  className="w-full h-11 min-h-[44px] px-3 bg-neutral-900 border border-neutral-800 rounded text-sm text-white focus:border-brand-red focus:outline-none"
                >
                  {UNITS_DATA.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.shortName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs uppercase font-display tracking-wider text-textFaint mb-1.5">Data Preferencial</label>
                <div className="relative">
                  <input
                    type="date"
                    value={form.selectedDate}
                    onChange={(e) => onUpdateField('selectedDate', e.target.value)}
                    className="w-full h-11 min-h-[44px] px-3 bg-neutral-900 border border-neutral-800 rounded text-sm text-white focus:border-brand-red focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-display tracking-wider text-textFaint mb-1.5">Horário</label>
                <select
                  value={form.selectedTime}
                  onChange={(e) => onUpdateField('selectedTime', e.target.value)}
                  className="w-full h-11 min-h-[44px] px-3 bg-neutral-900 border border-neutral-800 rounded text-sm text-white focus:border-brand-red focus:outline-none"
                >
                  {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'].map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs uppercase font-display tracking-wider text-textFaint mb-1.5">Seu Nome</label>
                <input
                  type="text"
                  required
                  placeholder="Nome completo"
                  value={form.customerName}
                  onChange={(e) => onUpdateField('customerName', e.target.value)}
                  className="w-full h-11 min-h-[44px] px-3 bg-neutral-900 border border-neutral-800 rounded text-sm text-white focus:border-brand-red focus:outline-none placeholder:text-neutral-600"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-display tracking-wider text-textFaint mb-1.5">WhatsApp / Celular</label>
                <input
                  type="tel"
                  required
                  placeholder="(11) 99999-9999"
                  value={form.customerPhone}
                  onChange={(e) => onUpdateField('customerPhone', e.target.value)}
                  className="w-full h-11 min-h-[44px] px-3 bg-neutral-900 border border-neutral-800 rounded text-sm text-white focus:border-brand-red focus:outline-none placeholder:text-neutral-600"
                />
              </div>
            </div>

            {/* Summary Box */}
            <div className="p-3.5 bg-neutral-900/80 border border-neutral-800/90 rounded text-xs space-y-1">
              <div className="flex justify-between text-textDim">
                <span>Duração Estimada:</span>
                <span className="text-white font-medium">{selectedService.durationMinutes} minutos</span>
              </div>
              <div className="flex justify-between text-textDim">
                <span>Valor Total:</span>
                <span className="text-brand-gold font-bold text-sm">R$ {selectedService.price},00</span>
              </div>
            </div>

            {/* Action Buttons */}
            <button
              type="submit"
              className="w-full h-12 min-h-[44px] bg-brand-red hover:bg-red-700 active:scale-[0.99] text-white font-display uppercase text-xs tracking-widest font-semibold rounded flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-950/40"
            >
              <span>Confirmar no WhatsApp da Unidade</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
