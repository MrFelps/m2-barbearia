import React from 'react';
import { Menu, X } from 'lucide-react';
import { BARBER_PROFILE } from '../data/barberData';
import { M2Logo } from './M2Logo';

interface HeaderProps {
  isScrolled: boolean;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isScrolled,
  isMobileMenuOpen,
  onToggleMobileMenu,
}) => {
  return (
    <header
      className={`fixed top-1 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-ink/95 backdrop-blur-md border-b border-neutral-800/80 py-2.5 sm:py-3 shadow-xl'
          : 'bg-transparent py-3 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Professional Name */}
        <a href="#hero" className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none min-w-0">
          <M2Logo size={36} />
          <div className="flex flex-col truncate">
            <span className="font-display uppercase tracking-[0.18em] sm:tracking-[0.2em] font-bold text-sm sm:text-lg text-white truncate">
              {BARBER_PROFILE.name}
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] text-textFaint">
              M2 Barbearia • Portfólio
            </span>
          </div>
        </a>

        {/* Desktop Navigation (Oculto estritamente no Mobile) */}
        <nav className="hidden lg:flex items-center gap-7">
          <a href="#qualificacoes" className="text-xs uppercase tracking-[0.18em] text-textDim hover:text-white transition-colors">
            Perfil
          </a>
          <a href="#servicos" className="text-xs uppercase tracking-[0.18em] text-textDim hover:text-white transition-colors">
            Cortes & Serviços
          </a>
          <a href="#experiencia" className="text-xs uppercase tracking-[0.18em] text-textDim hover:text-white transition-colors">
            Experiência
          </a>
          <a href="#unidades" className="text-xs uppercase tracking-[0.18em] text-textDim hover:text-white transition-colors">
            Unidades
          </a>
          <a href="#avaliacoes" className="text-xs uppercase tracking-[0.18em] text-textDim hover:text-white transition-colors">
            Avaliações Google
          </a>
        </nav>

        {/* Action & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="https://sites.appbarber.com.br/m2barbearia-7nna"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex h-11 min-h-[44px] px-4 sm:px-6 bg-brand-red hover:bg-red-700 active:scale-[0.98] text-white font-display uppercase text-[11px] sm:text-xs tracking-[0.2em] font-semibold items-center justify-center transition-all shadow-md shadow-red-950/40 rounded-sm"
          >
            Agendar
          </a>

          <button
            onClick={onToggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="lg:hidden w-11 h-11 min-h-[44px] min-w-[44px] flex items-center justify-center text-white bg-neutral-900 border border-neutral-800 rounded-sm hover:bg-neutral-800 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
