import React from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  isScrolled: boolean;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isScrolled,
  isMobileMenuOpen,
  onToggleMobileMenu,
  onOpenBooking,
}) => {
  return (
    <header
      className={`fixed top-1 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-ink/95 backdrop-blur-md border-b border-neutral-800/80 py-3 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-3 group focus:outline-none">
          <img
            src="/assets/img/logo-simbolo.png"
            alt="M2 Barbearia"
            className="h-10 sm:h-11 w-auto transition-transform group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-display uppercase tracking-[0.2em] font-bold text-base sm:text-lg text-white">
              M2 Barbearia
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-textFaint">
              Tradição Clássica
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <a href="#marca" className="text-xs uppercase tracking-[0.18em] text-textDim hover:text-white transition-colors">
            Nossa Marca
          </a>
          <a href="#servicos" className="text-xs uppercase tracking-[0.18em] text-textDim hover:text-white transition-colors">
            Barba & Cabelo
          </a>
          <a href="#unidades" className="text-xs uppercase tracking-[0.18em] text-textDim hover:text-white transition-colors">
            Unidades
          </a>
          <a href="#avaliacoes" className="text-xs uppercase tracking-[0.18em] text-textDim hover:text-white transition-colors">
            Avaliações
          </a>
          <a href="#recrutamento" className="text-xs uppercase tracking-[0.18em] text-textDim hover:text-white transition-colors">
            Trabalhe Conosco
          </a>
          <a href="#contato" className="text-xs uppercase tracking-[0.18em] text-textDim hover:text-white transition-colors">
            Contato
          </a>
        </nav>

        {/* Action & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenBooking}
            className="h-11 min-h-[44px] px-6 bg-brand-red hover:bg-red-700 active:scale-[0.98] text-white font-display uppercase text-xs tracking-[0.2em] font-semibold transition-all shadow-md shadow-red-950/40 rounded-sm"
          >
            Agende
          </button>

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
