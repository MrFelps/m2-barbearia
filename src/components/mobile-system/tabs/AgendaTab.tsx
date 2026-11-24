import React, { useState } from 'react';
import { Calendar, Clock, Check, Scissors } from 'lucide-react';
import { SERVICES_DATA, BARBER_PROFILE } from '../../../data/barberData';

export const AgendaTab: React.FC = () => {
  const [selectedService, setSelectedService] = useState(SERVICES_DATA[0].id);
  const [selectedTime, setSelectedTime] = useState('14:30');
  const [isSuccess, setIsSuccess] = useState(false);

  const times = ['10:00', '11:00', '14:30', '15:30', '16:30', '18:00'];

  const handleConfirm = () => {
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3500);
  };

  const currentService = SERVICES_DATA.find((s) => s.id === selectedService) || SERVICES_DATA[0];

  return (
    <div className="space-y-4 animate-fadeIn pb-4">
      {/* Cabeçalho da Agenda */}
      <div className="bg-surface border border-border-subtle rounded-2xl p-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-red mb-1">
          <Calendar className="w-4 h-4" />
          <span>Agendar Atendimento</span>
        </div>
        <p className="text-xs text-gray-300">
          Atendimento com {BARBER_PROFILE.name} • Toalhas quentes e bar executivo inclusos.
        </p>
      </div>

      {/* Seleção do Serviço */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
          1. Escolha o Serviço
        </label>
        <div className="space-y-2">
          {SERVICES_DATA.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => setSelectedService(service.id)}
              className={`w-full min-h-[50px] p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                selectedService === service.id
                  ? 'bg-brand-red/15 border-brand-red text-white'
                  : 'bg-surface border-border-subtle text-gray-300 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Scissors className={`w-4 h-4 ${selectedService === service.id ? 'text-brand-red' : 'text-gray-400'}`} />
                <div>
                  <span className="text-xs font-bold block">{service.name}</span>
                  <span className="text-[10px] text-gray-400">{service.durationMinutes} min</span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-brand-gold">R$ {service.price.toFixed(2)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Seleção de Horários Disponíveis */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
          2. Horários Disponíveis Hoje
        </label>
        <div className="grid grid-cols-3 gap-2">
          {times.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setSelectedTime(t)}
              className={`min-h-[44px] py-2 px-3 rounded-lg text-xs font-mono font-bold border transition-all flex items-center justify-center gap-1.5 ${
                selectedTime === t
                  ? 'bg-brand-red text-white border-brand-red shadow-md'
                  : 'bg-surface border-border-subtle text-gray-300 hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{t}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Confirmação com Feedback */}
      <div className="pt-2">
        {isSuccess ? (
          <div className="bg-emerald-600/20 border border-emerald-500 text-emerald-300 p-3.5 rounded-xl flex items-center gap-2.5 text-xs font-bold animate-fadeIn">
            <Check className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Agendamento confirmado para hoje às {selectedTime}!</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full min-h-[48px] bg-brand-red hover:bg-red-700 active:scale-[0.98] text-white font-bold uppercase text-xs tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-red-950/50"
          >
            <Check className="w-4 h-4" />
            <span>Confirmar {currentService.name} às {selectedTime}</span>
          </button>
        )}
      </div>
    </div>
  );
};
