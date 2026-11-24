import React from 'react';
import { AppView } from './ViewSwitcherBar';
import { Header } from './Header';
import { MobileDrawer } from './MobileDrawer';
import { BarberHeroSection } from './BarberHeroSection';
import { BrandBar } from './BrandBar';
import { BarberQualificationsSection } from './BarberQualificationsSection';
import { ServicesSection } from './ServicesSection';
import { ExperienceShowcase } from './ExperienceShowcase';
import { UnitsSection } from './UnitsSection';
import { ReviewsSection } from './ReviewsSection';
import { Footer } from './Footer';
import { WhatsAppFloatingButton } from './WhatsAppFloatingButton';
import { BarberChairDisplay } from './station/BarberChairDisplay';
import { CashierDashboard } from './pos/CashierDashboard';
import { CustomerPostServiceView } from './pos/CustomerPostServiceView';
import { MobileSystemContainer } from './mobile-system/MobileSystemContainer';
import { M2Logo } from './M2Logo';
import { AnnotationLayer } from './annotations/AnnotationLayer';
import { BarberStation } from '../types/station';
import { HeroImageSettings } from '../types/barber';

interface AppContentProps {
  activeView: AppView;
  activeStation: BarberStation;
  imageSettings: HeroImageSettings;
  isScrolled: boolean;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onCloseMobileMenu: () => void;
  onSelectView: (view: AppView) => void;
  onSimulateClient: (station: BarberStation) => void;
}

export const AppContent: React.FC<AppContentProps> = ({
  activeView,
  activeStation,
  imageSettings,
  isScrolled,
  isMobileMenuOpen,
  onToggleMobileMenu,
  onCloseMobileMenu,
  onSelectView,
  onSimulateClient,
}) => {
  const isEmbedded = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('sim_embed');

  return (
    <div className="w-full min-h-full flex flex-col relative">
      <BrandBar fixed />

      {/* Camada de Comentários Ancorada (ativa no desktop, oculta no simulador de celular para não poluir) */}
      {!isEmbedded && activeView === 'home' && <AnnotationLayer />}

      {/* Header Operacional para Bancada e Caixa */}
      {activeView !== 'home' && activeView !== 'cliente' && activeView !== 'celular' && (
        <header className="bg-surface/90 border-b border-border-subtle py-3 px-4 pt-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <M2Logo size={34} />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-white">M2 Barbearia</span>
                <span className="text-[10px] text-gray-400 block -mt-0.5">
                  {activeView === 'bancada' ? 'Display & QR Code da Cadeira' : 'Frente de Caixa & Baixa'}
                </span>
              </div>
            </div>
            <button
              onClick={() => onSelectView('home')}
              className="text-xs text-gray-300 hover:text-white px-3 py-1.5 rounded-lg border border-border-subtle bg-ink min-h-[44px] flex items-center"
            >
              ← Voltar ao Site
            </button>
          </div>
        </header>
      )}

      {activeView === 'home' && (
        <>
          <Header
            isScrolled={isScrolled}
            isMobileMenuOpen={isMobileMenuOpen}
            onToggleMobileMenu={onToggleMobileMenu}
          />
          <MobileDrawer isOpen={isMobileMenuOpen} onClose={onCloseMobileMenu} />
          <main className="flex-1">
            <BarberHeroSection imageSettings={imageSettings} />
            <BarberQualificationsSection />
            <ServicesSection />
            <ExperienceShowcase />
            <UnitsSection />
            <ReviewsSection />
          </main>
          <Footer />
          <WhatsAppFloatingButton
            xOffset={imageSettings.whatsappXOffset}
            yOffset={imageSettings.whatsappYOffset}
            scale={imageSettings.whatsappScale}
          />
        </>
      )}

      {activeView === 'bancada' && (
        <main className="flex-1 py-6">
          <BarberChairDisplay onSimulateClientScan={onSimulateClient} />
        </main>
      )}

      {activeView === 'caixa' && (
        <main className="flex-1 py-6">
          <CashierDashboard />
        </main>
      )}

      {activeView === 'cliente' && (
        <main className="flex-1">
          <CustomerPostServiceView
            station={activeStation}
            onBackToMain={() => onSelectView('bancada')}
          />
        </main>
      )}

      {activeView === 'celular' && (
        <main className="flex-1 py-4 sm:py-6">
          <MobileSystemContainer onBackToSite={() => onSelectView('home')} />
        </main>
      )}
    </div>
  );
};
