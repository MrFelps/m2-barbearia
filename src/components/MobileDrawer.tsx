import React from 'react';
import { Calendar, Phone } from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  if (!isOpen) return null;

  const links = [
    { label: 'Perfil & Qualificações', href: '#qualificacoes' },
    { label: 'Cortes & Serviços', href: '#servicos' },
    { label: 'Experiência & Bancada', href: '#experiencia' },
    { label: 'Unidades & Maps', href: '#unidades' },
    { label: 'Avaliações do Google', href: '#avaliacoes' },
  ];

  return (
    <div className="fixed inset-0 z-30 lg:hidden bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="fixed inset-x-0 top-[72px] bottom-0 bg-ink-elevated border-t border-neutral-800 flex flex-col justify-between p-6 overflow-y-auto"
        style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <nav className="flex flex-col space-y-1">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="min-h-[48px] flex items-center px-4 py-3 text-sm font-display uppercase tracking-[0.2em] text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-sm transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="pt-6 border-t border-neutral-800 space-y-3">
          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="w-full h-12 min-h-[44px] bg-brand-red hover:bg-red-700 text-white font-display uppercase text-xs tracking-widest font-semibold flex items-center justify-center gap-2 rounded-sm"
          >
            <Calendar className="w-4 h-4" />
            <span>Agendar Horário Online</span>
          </button>

          <a
            href="tel:+551132849000"
            className="w-full h-12 min-h-[44px] bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white font-display uppercase text-xs tracking-widest flex items-center justify-center gap-2 rounded-sm"
          >
            <Phone className="w-4 h-4" />
            <span>(11) 3284-9000</span>
          </a>
        </div>
      </div>
    </div>
  );
};
