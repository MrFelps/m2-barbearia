import React, { useState, useEffect } from 'react';
import { ViewSwitcherBar, AppView } from './components/ViewSwitcherBar';
import { AppContent } from './components/AppContent';
import { BookingBottomSheet } from './modals/BookingBottomSheet';
import { MobileSimulatorFrame } from './components/simulator/MobileSimulatorFrame';
import { BARBER_STATIONS } from './data/stationData';
import { BarberStation } from './types/station';
import { useHeaderState } from './hooks/useHeaderState';
import { useBookingFlow } from './hooks/useBookingFlow';
import { useHeroAdjuster } from './hooks/useHeroAdjuster';
import { useMobileSimulator } from './hooks/useMobileSimulator';
import { useAdaptiveViewport } from './hooks/useAdaptiveViewport';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>('home');
  const [activeStation, setActiveStation] = useState<BarberStation>(BARBER_STATIONS[0]);
  const { isScrolled, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useHeaderState();

  const simulator = useMobileSimulator();
  useAdaptiveViewport(activeView);

  const {
    isOpen: isBookingOpen,
    form,
    isSuccess,
    selectedService,
    selectedUnit,
    openBooking,
    closeBooking,
    updateField,
    submitBooking,
  } = useBookingFlow();

  const { settings: imageSettings } = useHeroAdjuster();

  // Modo embutido dentro da moldura do simulador mobile
  const isEmbedded = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('sim_embed');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view') as AppView;
    if (viewParam && ['home', 'bancada', 'caixa', 'cliente', 'celular'].includes(viewParam)) {
      setActiveView(viewParam);
    }
  }, []);

  const handleSimulateClient = (station: BarberStation) => {
    setActiveStation(station);
    setActiveView('cliente');
  };

  const content = (
    <AppContent
      activeView={activeView}
      activeStation={activeStation}
      imageSettings={imageSettings}
      isSimulator={isEmbedded}
      isScrolled={isScrolled}
      isMobileMenuOpen={isMobileMenuOpen}
      onToggleMobileMenu={toggleMobileMenu}
      onCloseMobileMenu={closeMobileMenu}
      onSelectView={setActiveView}
      onSimulateClient={handleSimulateClient}
      onOpenBooking={() => openBooking()}
    />
  );

  // Modo Embutido no Simulador Mobile: Viewport estrito e direto
  if (isEmbedded) {
    return (
      <div className="min-h-screen bg-ink text-white flex flex-col relative selection:bg-brand-red selection:text-white pb-6">
        {content}
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
  }

  return (
    <div className="min-h-screen bg-ink text-white flex flex-col relative selection:bg-brand-red selection:text-white pb-16">
      {/* Barra de Troca de Ambiente e Alternador do Simulador */}
      <ViewSwitcherBar
        activeView={activeView}
        onSelectView={setActiveView}
        isSimulatorActive={simulator.isActive}
        onToggleSimulator={simulator.toggleSimulator}
      />

      {/* Modo Simulador Mobile Ativo com Chassi Físico */}
      {simulator.isActive ? (
        <MobileSimulatorFrame
          device={simulator.activeDevice}
          isLandscape={simulator.isLandscape}
          scale={simulator.scale}
          showFrame={simulator.showFrame}
          activeView={activeView}
          imageSettings={imageSettings}
          onOpenRealSite={() => window.open('/?view=home', '_blank')}
        />
      ) : (
        /* Modo Desktop Padrão */
        content
      )}

      {/* Modal / Bottom Sheet de Agendamento */}
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
