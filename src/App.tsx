import React from 'react';
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
import { useHeaderState } from './hooks/useHeaderState';
import { useBookingFlow } from './hooks/useBookingFlow';

export const App: React.FC = () => {
  const { isScrolled, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useHeaderState();
  const {
    isOpen,
    form,
    isSuccess,
    selectedService,
    selectedUnit,
    openBooking,
    closeBooking,
    updateField,
    submitBooking,
  } = useBookingFlow();

  return (
    <div className="min-h-screen bg-ink text-white flex flex-col relative selection:bg-brand-red selection:text-white">
      {/* Fixed top brand bar */}
      <BrandBar fixed />

      {/* Navigation Header */}
      <Header
        isScrolled={isScrolled}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={toggleMobileMenu}
        onOpenBooking={() => openBooking()}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        onOpenBooking={() => openBooking()}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <BarberHeroSection onOpenBooking={() => openBooking()} />
        <BrandBar />
        <PromoBanner />
        <BarberQualificationsSection />
        <ServicesSection onSelectService={(id) => openBooking(id)} />
        <ExperienceShowcase />
        <UnitsSection onSelectUnit={(id) => openBooking(undefined, id)} />
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action */}
      <WhatsAppFloatingButton />

      {/* Booking Bottom Sheet / Modal */}
      <BookingBottomSheet
        isOpen={isOpen}
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
