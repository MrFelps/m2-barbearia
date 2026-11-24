import React from 'react';

interface WhatsAppFloatingButtonProps {
  xOffset?: number;
  yOffset?: number;
  scale?: number;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  xOffset = 0,
  yOffset = 0,
  scale = 100,
}) => {
  return (
    <a
      href="https://wa.me/5511960318915?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20a%20M2%20Barbearia"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 min-w-[44px] min-h-[44px] rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white flex items-center justify-center shadow-2xl transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      style={{
        bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
        transform: `translate(${xOffset}px, ${-yOffset}px) scale(${scale / 100})`,
        transformOrigin: 'bottom right',
      }}
    >
      <svg
        viewBox="0 0 32 32"
        className="w-8 h-8 fill-white pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16.001 2.667c-7.364 0-13.334 5.97-13.334 13.333 0 2.35.615 4.646 1.783 6.667L2.667 29.333l6.83-1.76a13.28 13.28 0 0 0 6.504 1.694h.006c7.363 0 13.333-5.97 13.333-13.334 0-3.56-1.386-6.907-3.903-9.424a13.24 13.24 0 0 0-9.436-3.842zm0 24.4h-.005a11.05 11.05 0 0 1-5.63-1.54l-.404-.24-4.053 1.045 1.083-3.952-.264-.406a11.03 11.03 0 0 1-1.69-5.874c0-6.11 4.973-11.083 11.086-11.083 2.962 0 5.746 1.153 7.84 3.25a11.02 11.02 0 0 1 3.245 7.842c0 6.11-4.972 11.083-11.082 11.083l-.126-.125zm6.077-8.298c-.333-.167-1.97-.972-2.275-1.083-.305-.111-.527-.166-.75.167-.222.333-.86 1.083-1.055 1.305-.194.222-.388.25-.72.083-.334-.167-1.41-.52-2.686-1.657-.993-.885-1.663-1.977-1.858-2.31-.194-.333-.02-.514.146-.68.15-.15.334-.389.5-.583.167-.194.222-.334.334-.556.111-.222.056-.417-.028-.583-.083-.167-.75-1.807-1.028-2.474-.27-.65-.545-.562-.75-.573-.194-.01-.417-.012-.639-.012a1.23 1.23 0 0 0-.889.417c-.305.333-1.166 1.14-1.166 2.778 0 1.639 1.194 3.222 1.36 3.444.166.222 2.35 3.59 5.694 5.035.795.343 1.416.548 1.9.7.798.254 1.524.218 2.098.132.64-.095 1.97-.805 2.248-1.583.278-.778.278-1.444.194-1.583-.083-.14-.305-.222-.638-.389z" />
      </svg>
    </a>
  );
};
