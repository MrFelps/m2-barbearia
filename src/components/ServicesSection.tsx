import React, { useState } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../data/barberData';
import { ServiceItem } from '../types/barber';

export const ServicesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'cabelo', label: 'Cabelo' },
    { id: 'barba', label: 'Barba' },
    { id: 'combos', label: 'Combos & Noivo' },
    { id: 'tratamentos', label: 'Tratamentos' },
  ];

  const filteredServices =
    activeCategory === 'todos'
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.category === activeCategory);

  return (
    <section id="servicos" className="py-20 sm:py-28 bg-ink-elevated border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-display text-brand-red font-bold">02</span>
              <span className="text-[11px] font-display uppercase tracking-[0.3em] text-textFaint">
                Menu de Serviços
              </span>
              <span className="h-px w-12 bg-neutral-800" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-display uppercase font-semibold text-white tracking-tight">
              Barba, Cabelo & Rituais
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`min-h-[44px] px-4 py-2 text-xs font-display uppercase tracking-[0.15em] rounded-sm transition-all ${
                  activeCategory === cat.id
                    ? 'bg-brand-red text-white font-semibold shadow-md'
                    : 'bg-neutral-900 border border-neutral-800 text-textDim hover:text-white hover:bg-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
          {filteredServices.map((service: ServiceItem) => (
            <div
              key={service.id}
              className="bg-ink border border-neutral-800/90 rounded-sm p-3.5 sm:p-6 flex flex-col justify-between hover:border-neutral-700 transition-all group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <h3 className="text-base sm:text-lg font-display uppercase font-semibold text-white group-hover:text-neutral-100">
                    {service.name}
                  </h3>
                  {service.isPopular && (
                    <span className="px-1.5 sm:px-2 py-0.5 bg-brand-red/10 border border-brand-red/30 text-brand-red text-[9px] sm:text-[10px] font-display uppercase tracking-widest rounded-sm whitespace-nowrap">
                      Destaque
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-textFaint mb-2 sm:mb-4">
                  <Clock className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-brand-red shrink-0" />
                  <span>{service.durationMinutes} minutos</span>
                </div>

                <p className="text-xs sm:text-sm text-textDim leading-snug sm:leading-relaxed mb-3 sm:mb-6 line-clamp-2 sm:line-clamp-none">
                  {service.description}
                </p>
              </div>

              <div className="pt-2.5 sm:pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-textFaint block">Valor</span>
                  <span className="text-lg sm:text-xl font-display font-bold text-white">
                    R$ {service.price},00
                  </span>
                </div>

                <a
                  href="https://sites.appbarber.com.br/m2barbearia-7nna"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-3.5 sm:px-4 bg-neutral-900 hover:bg-brand-red text-white text-[11px] sm:text-xs font-display uppercase tracking-wider rounded-sm flex items-center gap-1.5 sm:gap-2 transition-colors border border-neutral-800 group-hover:border-transparent active:scale-[0.98]"
                >
                  <span>Agendar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
