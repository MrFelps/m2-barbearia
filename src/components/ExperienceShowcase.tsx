import React from 'react';

export const ExperienceShowcase: React.FC = () => {
  const images = [
    {
      src: '/assets/img/itaim-bibi/navalha.jpg',
      title: 'Navalha de Precisão',
      desc: 'Acabamento milimétrico e toalhas quentes.',
    },
    {
      src: '/assets/img/itaim-bibi/atendimento.jpg',
      title: 'Atendimento Individual',
      desc: 'Cadeiras anatômicas e conforto absoluto.',
    },
    {
      src: '/assets/img/itaim-bibi/unidade.jpg',
      title: 'Espaço Executivo',
      desc: 'Cafeteria, destilados e ambiente reservado.',
    },
  ];

  return (
    <section id="experiencia" className="py-20 bg-ink border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-display uppercase tracking-[0.3em] text-brand-red">
            Ambiente & Conforto
          </span>
          <h2 className="text-3xl sm:text-4xl font-display uppercase font-semibold text-white tracking-tight mt-2">
            A Experiência M2 Barbearia
          </h2>
          <p className="text-sm text-textDim mt-3">
            Cada detalhe arquitetônico foi planejado para proporcionar tranquilidade, pontualidade e excelência estética.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((item, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-sm border border-neutral-800 bg-neutral-900"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/img/m2-fachada.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-lg font-display uppercase font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-300 mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
