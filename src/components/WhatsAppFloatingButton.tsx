import React from 'react';
import { MessageSquare } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/5511999990001?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20a%20M2%20Barbearia"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 min-w-[44px] min-h-[44px] rounded-full bg-[#1fbd59] hover:bg-[#189b47] active:scale-95 text-white flex items-center justify-center shadow-2xl transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      style={{
        bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
      }}
    >
      <MessageSquare className="w-7 h-7" />
    </a>
  );
};
