import React, { useState, useEffect } from 'react';
import { ViewSwitcherBar, AppView } from './components/ViewSwitcherBar';
import { AppContent } from './components/AppContent';
import { BookingBottomSheet } from './modals/BookingBottomSheet';
import { HeroImageAdjuster } from './components/HeroImageAdjuster';
import { MobileSimulatorFrame } from './components/simulator/MobileSimulatorFrame';
import { SimulatorControlBar } from './components/simulator/SimulatorControlBar';
import { SimulatorHeroAdjusterDrawer } from './components/simulator/SimulatorHeroAdjusterDrawer';
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
      isScrolled={isScrolled}
      isMobileMenuOpen={isMobileMenuOpen}
      onToggleMobileMenu={toggleMobileMenu}
      onCloseMobileMenu={closeMobileMenu}
      onSelectView={setActiveView}
      onSimulateClient={handleSimulateClient}
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
        onToggleAdjuster={() => setIsAdjusterOpen((prev) => !prev)}
        isAdjusterOpen={isAdjusterOpen}
      />

      {/* Modo Simulador Mobile Ativo com Chassi Físico */}
      {simulator.isActive ? (
        <>
          <SimulatorControlBar
            activeDevice={simulator.activeDevice}
            isLandscape={simulator.isLandscape}
            scale={simulator.scale}
            showFrame={simulator.showFrame}
            isAdjusterOpen={isAdjusterOpen}
            isSaved={isAdjusterSaved}
            onSave={saveSettings}
            onOpenDirectly={() => window.open('/?view=home', '_blank')}
            onSelectDevice={simulator.selectDevice}
            onToggleOrientation={simulator.toggleOrientation}
            onSetScale={simulator.setScale}
            onToggleFrame={simulator.toggleFrame}
            onAutoFit={() => simulator.setScale(simulator.calculateAutoFit())}
            onToggleAdjuster={() => setIsAdjusterOpen((prev) => !prev)}
            onClose={simulator.toggleSimulator}
          />

          <MobileSimulatorFrame
            device={simulator.activeDevice}
            isLandscape={simulator.isLandscape}
            scale={simulator.scale}
            showFrame={simulator.showFrame}
            activeView={activeView}
            imageSettings={imageSettings}
            isSaved={isAdjusterSaved}
            onSave={saveSettings}
            onOpenRealSite={() => window.open('/?view=home', '_blank')}
          />

          {/* Gaveta do Joystick Circular integrado ao Simulador Mobile */}
          <SimulatorHeroAdjusterDrawer
            isOpen={isAdjusterOpen}
            settings={imageSettings}
            isSaved={isAdjusterSaved}
            onClose={() => setIsAdjusterOpen(false)}
            onUpdate={updateSetting}
            onSave={saveSettings}
            onReset={resetSettings}
          />
        </>
      ) : (
        /* Modo Desktop Padrão */
        <>
          {content}
          {activeView === 'home' && (
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
        </>
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
