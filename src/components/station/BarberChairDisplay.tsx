import React, { useState } from 'react';
import { BARBER_STATIONS } from '../../data/stationData';
import { BarberStation } from '../../types/station';
import { Smartphone, Monitor, Star, QrCode, ExternalLink, Check } from 'lucide-react';

interface BarberChairDisplayProps {
  onSimulateClientScan: (station: BarberStation) => void;
}

export const BarberChairDisplay: React.FC<BarberChairDisplayProps> = ({ onSimulateClientScan }) => {
  const [selectedStation, setSelectedStation] = useState<BarberStation>(BARBER_STATIONS[0]);
  const [displayMode, setDisplayMode] = useState<'mesa' | 'celular'>('mesa');
  const [copied, setCopied] = useState(false);

  // Link exclusivo gerado para a bancada deste barbeiro
  const clientUrl = `${window.location.origin}/?view=cliente&barbeiro=${selectedStation.slug}`;
  const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&color=DC2626&bgcolor=0D0D0E&data=${encodeURIComponent(clientUrl)}`;

  const copyLink = () => {
    navigator.clipboard.writeText(clientUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Seletor de Barbeiro e Formato */}
      <div className="bg-surface border border-border-subtle rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-red">
            Ponto de Contato na Cadeira
          </span>
          <h2 className="text-lg font-bold text-white mt-0.5">Display & QR Code do Barbeiro</h2>
        </div>

        {/* Escolha da Bancada / Barbeiro */}
        <div className="flex items-center gap-2">
          {BARBER_STATIONS.map((station) => (
            <button
              key={station.id}
              onClick={() => setSelectedStation(station)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all min-h-[44px] ${
                selectedStation.id === station.id
                  ? 'bg-brand-red text-white shadow-md'
                  : 'bg-ink text-gray-400 hover:text-white border border-border-subtle'
              }`}
            >
              Bancada {station.stationNumber}: {station.barberName.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Modo Mesa vs Celular */}
        <div className="flex bg-ink p-1 rounded-lg border border-border-subtle">
          <button
            onClick={() => setDisplayMode('mesa')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium min-h-[40px] ${
              displayMode === 'mesa' ? 'bg-surface text-white' : 'text-gray-400'
            }`}
          >
            <Monitor className="w-4 h-4" /> Display Mesa
          </button>
          <button
            onClick={() => setDisplayMode('celular')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium min-h-[40px] ${
              displayMode === 'celular' ? 'bg-surface text-white' : 'text-gray-400'
            }`}
          >
            <Smartphone className="w-4 h-4" /> No Celular
          </button>
        </div>
      </div>

      {/* Visualizador do Display Físico / Digital */}
      <div className="flex justify-center">
        <div
          className={`w-full max-w-sm bg-gradient-to-b from-surface to-ink border-2 border-border-subtle rounded-2xl p-6 text-center shadow-2xl relative overflow-hidden transition-all ${
            displayMode === 'celular' ? 'max-w-[320px] rounded-3xl border-gray-700' : 'max-w-[360px]'
          }`}
        >
          {/* Badge de Bancada */}
          <div className="inline-flex items-center gap-1.5 bg-brand-red/10 border border-brand-red/40 px-3 py-1 rounded-full text-brand-red text-xs font-bold uppercase tracking-wider mb-3">
            <QrCode className="w-3.5 h-3.5" /> Bancada {selectedStation.stationNumber} — M2 Barbearia
          </div>

          <h3 className="text-xl font-extrabold text-white">{selectedStation.barberName}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{selectedStation.role}</p>

          {/* QR Code Centralizado */}
          <div className="my-5 p-3 bg-ink border border-border-subtle rounded-xl inline-block shadow-inner">
            <img
              src={qrCodeApiUrl}
              alt={`QR Code ${selectedStation.barberName}`}
              className="w-52 h-52 object-contain mx-auto rounded-lg"
            />
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-gray-200">
              Aponte a câmera do celular
            </p>
            <p className="text-[11px] text-gray-400 leading-tight">
              Avalie no Google em 5 segundos ou acesse o PIX oficial
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-center gap-1 text-amber-400 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-gray-300 ml-1 font-semibold">5.0 no Google</span>
          </div>
        </div>
      </div>

      {/* Ações Rápidas de Teste */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => onSimulateClientScan(selectedStation)}
          className="bg-brand-red hover:bg-brand-red/90 text-white font-bold text-xs px-5 py-3 rounded-lg flex items-center gap-2 min-h-[44px] transition-all shadow-lg"
        >
          <ExternalLink className="w-4 h-4" /> Simular Leitura do Cliente (Abrir Tela do QR)
        </button>

        <button
          onClick={copyLink}
          className="bg-surface hover:bg-surface/80 border border-border-subtle text-gray-200 text-xs font-semibold px-4 py-3 rounded-lg flex items-center gap-2 min-h-[44px] transition-all"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : null}
          {copied ? 'Link Copiado!' : 'Copiar Link do Barbeiro'}
        </button>
      </div>
    </div>
  );
};
