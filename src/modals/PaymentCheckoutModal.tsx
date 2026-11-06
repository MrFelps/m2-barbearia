import React from 'react';
import { ServiceRecord, PaymentMethod } from '../types/station';
import { PIX_ACCOUNTS } from '../data/stationData';
import { X, CheckCircle, CreditCard, DollarSign, QrCode } from 'lucide-react';

interface PaymentCheckoutModalProps {
  record: ServiceRecord | null;
  selectedPaymentMethod: PaymentMethod;
  selectedPixAccount: string;
  onSelectPaymentMethod: (method: PaymentMethod) => void;
  onSelectPixAccount: (id: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export const PaymentCheckoutModal: React.FC<PaymentCheckoutModalProps> = ({
  record,
  selectedPaymentMethod,
  selectedPixAccount,
  onSelectPaymentMethod,
  onSelectPixAccount,
  onConfirm,
  onClose,
}) => {
  if (!record) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-surface border border-border-subtle rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border-subtle pb-3">
          <div>
            <h3 className="text-base font-bold text-white">Dar Baixa no Atendimento</h3>
            <p className="text-xs text-gray-400">Atribuir recebimento e conciliar caixa</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-ink p-4 rounded-xl border border-border-subtle flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-white">{record.clientName}</div>
            <div className="text-xs text-gray-400">{record.serviceName} • {record.barberName}</div>
          </div>
          <div className="text-xl font-extrabold text-emerald-400">
            R$ {record.price.toFixed(2).replace('.', ',')}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-300 block">Forma de Pagamento</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelectPaymentMethod('pix')}
              className={`p-3 rounded-lg border text-xs font-bold flex items-center gap-2 min-h-[44px] ${
                selectedPaymentMethod === 'pix'
                  ? 'bg-brand-red text-white border-brand-red'
                  : 'bg-ink text-gray-300 border-border-subtle hover:border-gray-500'
              }`}
            >
              <QrCode className="w-4 h-4" /> PIX
            </button>
            <button
              onClick={() => onSelectPaymentMethod('cartao_credito')}
              className={`p-3 rounded-lg border text-xs font-bold flex items-center gap-2 min-h-[44px] ${
                selectedPaymentMethod === 'cartao_credito'
                  ? 'bg-brand-red text-white border-brand-red'
                  : 'bg-ink text-gray-300 border-border-subtle hover:border-gray-500'
              }`}
            >
              <CreditCard className="w-4 h-4" /> Cartão Crédito
            </button>
            <button
              onClick={() => onSelectPaymentMethod('cartao_debito')}
              className={`p-3 rounded-lg border text-xs font-bold flex items-center gap-2 min-h-[44px] ${
                selectedPaymentMethod === 'cartao_debito'
                  ? 'bg-brand-red text-white border-brand-red'
                  : 'bg-ink text-gray-300 border-border-subtle hover:border-gray-500'
              }`}
            >
              <CreditCard className="w-4 h-4" /> Cartão Débito
            </button>
            <button
              onClick={() => onSelectPaymentMethod('dinheiro')}
              className={`p-3 rounded-lg border text-xs font-bold flex items-center gap-2 min-h-[44px] ${
                selectedPaymentMethod === 'dinheiro'
                  ? 'bg-brand-red text-white border-brand-red'
                  : 'bg-ink text-gray-300 border-border-subtle hover:border-gray-500'
              }`}
            >
              <DollarSign className="w-4 h-4" /> Dinheiro
            </button>
          </div>
        </div>

        {selectedPaymentMethod === 'pix' && (
          <div className="space-y-1.5 bg-ink/70 p-3 rounded-xl border border-border-subtle">
            <label className="text-[11px] font-bold text-gray-400 block">Conta / Destino do PIX</label>
            <div className="space-y-1.5">
              {PIX_ACCOUNTS.map((acc) => (
                <label
                  key={acc.id}
                  className={`flex items-center justify-between p-2 rounded-lg border text-xs cursor-pointer min-h-[44px] ${
                    selectedPixAccount === acc.id
                      ? 'border-brand-red bg-brand-red/10 text-white'
                      : 'border-border-subtle text-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="pixAccount"
                      checked={selectedPixAccount === acc.id}
                      onChange={() => onSelectPixAccount(acc.id)}
                      className="accent-brand-red"
                    />
                    <span>{acc.name}</span>
                  </div>
                  <span className="text-[10px] text-gray-400">{acc.type.toUpperCase()}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 bg-ink hover:bg-gray-800 border border-border-subtle text-gray-300 text-xs font-semibold py-3 rounded-xl min-h-[44px]"
          >
            Voltar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-3 rounded-xl min-h-[44px] flex items-center justify-center gap-1.5 shadow-lg"
          >
            <CheckCircle className="w-4 h-4" /> Confirmar Baixa
          </button>
        </div>
      </div>
    </div>
  );
};
