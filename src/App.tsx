import React, { useState, useEffect } from 'react';
import { BrandBar } from './components/BrandBar';
import { Header } from './components/Header';
import { MobileDrawer } from './components/MobileDrawer';
import { BarberHeroSection } from './components/BarberHeroSection';
import { PromoBanner } from './components/PromoBanner';
import { BarberQualificationsSection } from './components/BarberQualificationsSection';
import { ServicesSection } from './components/ServicesSection';
import { ExperienceShowcase } from './components/ExperienceShowcase';
import { UnitsSection } from './components/UnitsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { BookingBottomSheet } from './modals/BookingBottomSheet';
import { HeroImageAdjuster } from './components/HeroImageAdjuster';
import { ViewSwitcherBar, AppView } from './components/ViewSwitcherBar';
import { BarberChairDisplay } from './components/station/BarberChairDisplay';
import { CashierDashboard } from './components/pos/CashierDashboard';
import { CustomerPostServiceView } from './components/pos/CustomerPostServiceView';
import { M2Logo } from './components/M2Logo';
import { BARBER_STATIONS } from './data/stationData';
import { BarberStation } from './types/station';
import { useHeaderState } from './hooks/useHeaderState';
import { useBookingFlow } from './hooks/useBookingFlow';
import { useHeroAdjuster } from './hooks/useHeroAdjuster';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>('home');
  const [activeStation, setActiveStation] = useState<BarberStation>(BARBER_STATIONS[0]);
  const { isScrolled, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useHeaderState();
  const {
    isOpen: isBookingOpen,
    form,
    isSuccess,
    selectedService,
    selectedUnit,
    closeBooking,
    updateField,
    submitBooking,
  } = useBookingFlow();

  const {
    settings: imageSettings,
    isOpen: isAdjusterOpen,
    isSaved: isAdjusterSaved,
    setIsOpen: setIsAdjusterOpen,
    updateSetting,
    saveSettings,
    resetSettings,
  } = useHeroAdjuster();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view') as AppView;
    if (viewParam && ['home', 'bancada', 'caixa', 'cliente'].includes(viewParam)) {
      setActiveView(viewParam);
    }
  }, []);

  const handleSimulateClient = (station: BarberStation) => {
    setActiveStation(station);
    setActiveView('cliente');
  };

  const showAdjuster = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('ajuste');

  return (
    <div className="min-h-screen bg-ink text-white flex flex-col relative selection:bg-brand-red selection:text-white pb-16">
      <BrandBar fixed />

      {/* Floating dock for quick view switching without colliding with header */}
      <ViewSwitcherBar activeView={activeView} onSelectView={setActiveView} />

      {/* Operational Header for Bancada and Caixa views */}
      {activeView !== 'home' && activeView !== 'cliente' && (
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
              onClick={() => setActiveView('home')}
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
            onToggleMobileMenu={toggleMobileMenu}
          />
          <MobileDrawer isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
          <main className="flex-1">
            <BarberHeroSection imageSettings={imageSettings} />
            <BrandBar />
            <PromoBanner />
            <BarberQualificationsSection />
            <ServicesSection />
            <ExperienceShowcase />
            <UnitsSection />
            <ReviewsSection />
          </main>
          <Footer />
          <WhatsAppFloatingButton />
        </>
      )}

      {activeView === 'bancada' && (
        <main className="flex-1 py-6">
          <BarberChairDisplay onSimulateClientScan={handleSimulateClient} />
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
            onBackToMain={() => setActiveView('bancada')}
          />
        </main>
      )}

      {showAdjuster && activeView === 'home' && (
        <HeroImageAdjuster
          settings={imageSettings}
          isOpen={isAdjusterOpen}
          isSaved={isAdjusterSaved}
          onToggle={() => setIsAdjusterOpen((prev) => !prev)}
          onUpdate={updateSetting}
          onSave={saveSettings}
          onReset={resetSettings}
        />
      )}

      <BookingBottomSheet
        isOpen={isBookingOpen}
        onClose={closeBooking}
        form={form}
        selectedService={selectedService}
        selectedUnit={selectedUnit}
        onUpdateField={updateField}
        onSubmit={submitBooking}
        isSuccess={isSuccess}
      />
    </div>
  );
};

export default App;
