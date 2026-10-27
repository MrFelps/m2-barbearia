import React from 'react';
import { BARBER_PROFILE } from '../data/barberData';
import { M2Logo } from './M2Logo';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink border-t border-neutral-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-800">
          {/* Brand & Barber Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <M2Logo size={38} />
              <div>
                <span className="font-display uppercase tracking-[0.2em] font-bold text-base text-white block">
                  {BARBER_PROFILE.name}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-textFaint">
                  M2 Barbearia
                </span>
              </div>
            </div>
            <p className="text-xs text-textFaint leading-relaxed max-w-xs">
              Atendimento executivo de alta precisão. Barba no navalhete, toalhas quentes e respeito ao estilo clássico masculino.
            </p>
          </div>

          {/* Units */}
          <div>
            <h4 className="text-[11px] font-display uppercase tracking-[0.25em] text-textFaint mb-4">
              Localização
            </h4>
            <a
              href="https://share.google/YLvYi2iUDPjDRO0h2"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <p className="text-xs text-neutral-300 group-hover:text-brand-red transition-colors">Rua América do Sul, 57</p>
              <p className="text-xs text-neutral-400 mt-0.5">Parque Novo Oratório</p>
              <p className="text-xs text-neutral-400">Santo André - SP • CEP 09270-410</p>
              <p className="text-[11px] text-brand-gold mt-1.5 underline">Abrir no Google Maps →</p>
            </a>
            <p className="text-xs text-brand-gold mt-2 font-medium">Tel / WhatsApp: (11) 96031-8915</p>
          </div>

          {/* Direct Actions */}
          <div>
            <h4 className="text-[11px] font-display uppercase tracking-[0.25em] text-textFaint mb-4">
              Acesso Rápido
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><a href="https://sites.appbarber.com.br/m2barbearia-7nna" target="_blank" rel="noopener noreferrer" className="text-brand-red font-semibold hover:underline">Agendar no AppBarber</a></li>
              <li><a href={BARBER_PROFILE.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram Oficial</a></li>
              <li><a href={BARBER_PROFILE.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Google Avaliações</a></li>
              <li><a href="#experiencia" className="hover:text-white transition-colors">Ambiente & Galeria</a></li>
            </ul>
          </div>

          {/* Hours & Contact */}
          <div>
            <h4 className="text-[11px] font-display uppercase tracking-[0.25em] text-textFaint mb-4">
              Horários de Atendimento
            </h4>
            <p className="text-xs text-neutral-300 font-medium">Segunda a Sábado:</p>
            <p className="text-xs text-neutral-400">09:00 - 12:00 | 13:00 - 20:00</p>
            <p className="text-xs text-neutral-300 font-medium mt-1.5">Domingo:</p>
            <p className="text-xs text-neutral-400">08:00 - 13:00</p>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <span>© {currentYear} {BARBER_PROFILE.name} • M2 Barbearia. Todos os direitos reservados.</span>
          <span className="font-display uppercase tracking-[0.25em] text-[10px] text-neutral-400">
            Tradição & Visagismo Masculino
          </span>
        </div>
      </div>
    </footer>
  );
};
