import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, QrCode } from 'lucide-react';
import { BARBER_PROFILE } from '../../data/barberData';
import { M2Logo } from '../M2Logo';

interface BarberQRCodeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BarberQRCodeDrawer: React.FC<BarberQRCodeDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // URL da página inicial que o QR Code aponta
  const homeUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}`
    : 'https://m2barbearia.com.br';

  const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=6&color=0D0D0E&bgcolor=FFFFFF&data=${encodeURIComponent(homeUrl)}`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(homeUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      // Fallback gracioso
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="QR Code do Vendedor"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex flex-col justify-end sm:justify-center items-center p-0 sm:p-4 animate-fadeIn"
      onClick={onClose}
    >
      {/* Bottom Sheet retrátil no Mobile / Modal central no Desktop */}
      <div
        className="w-full max-w-sm sm:max-w-md bg-ink-elevated border-t sm:border border-neutral-800 rounded-t-3xl sm:rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4 animate-slideUp text-white relative max-h-[92vh] overflow-y-auto"
        style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Puxador Tátil (Grab Handle) para Mobile */}
        <div className="w-12 h-1.5 bg-neutral-700/80 rounded-full mx-auto sm:hidden -mt-1 mb-2" />

        {/* Topo: Logo da Barbearia + Botão Fechar */}
        <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <M2Logo size={32} />
            <div className="flex flex-col">
              <span className="font-display uppercase tracking-widest text-xs font-bold text-white">
                M2 Barbearia
              </span>
              <span className="text-[9px] uppercase tracking-wider text-neutral-400">
                Cartão & QR Code do Vendedor
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="w-11 h-11 min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Identificação do Vendedor (Foto + Nome + Selo) */}
        <div className="flex items-center gap-3.5 bg-ink p-3 rounded-xl border border-neutral-800/80">
          <div className="relative shrink-0">
            <img
              src={BARBER_PROFILE.photoUrl}
              alt={BARBER_PROFILE.name}
              className="w-14 h-14 rounded-full object-cover object-top border-2 border-brand-red bg-neutral-900 shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-ink" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[9px] font-display uppercase tracking-widest text-brand-red font-semibold">
              {BARBER_PROFILE.badge}
            </span>
            <span className="font-display uppercase tracking-wider font-bold text-sm text-white truncate">
              {BARBER_PROFILE.name}
            </span>
            <span className="text-[10px] text-neutral-400 truncate">
              {BARBER_PROFILE.role}
            </span>
          </div>
        </div>

        {/* Bloco do QR Code que leva para a Página Inicial */}
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-xl space-y-2">
          <div className="w-48 h-48 sm:w-52 sm:h-52 flex items-center justify-center">
            <img
              src={qrCodeApiUrl}
              alt={`QR Code para ${homeUrl}`}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex items-center gap-1.5 text-neutral-800 text-[11px] font-medium font-sans">
            <QrCode className="w-3.5 h-3.5 text-brand-red" />
            <span>Aponte a câmera para abrir o portfólio</span>
          </div>
        </div>

        {/* Ações Táteis: Copiar Link e Abrir Página */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={handleCopy}
            className="min-h-[44px] px-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white rounded-lg text-xs font-display uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copiado!' : 'Copiar Link'}</span>
          </button>
          <a
            href={homeUrl}
            onClick={onClose}
            className="min-h-[44px] px-3 bg-brand-red hover:bg-red-700 text-white rounded-lg text-xs font-display uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Página Inicial</span>
          </a>
        </div>
      </div>
    </div>
  );
};
