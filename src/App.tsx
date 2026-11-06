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
    <div className="min-h-screen bg-ink text-white flex flex-col relative selection:bg-brand-red selection:text-white">
      <BrandBar fixed />
      <ViewSwitcherBar activeView={activeView} onSelectView={setActiveView} />

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
