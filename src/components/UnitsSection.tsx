import React from 'react';
import { MapPin, Phone, Clock, ExternalLink, Calendar } from 'lucide-react';
import { UNITS_DATA } from '../data/barberData';
import { UnitLocation } from '../types/barber';

interface UnitsSectionProps {
  onSelectUnit: (unitId: string) => void;
}

export const UnitsSection: React.FC<UnitsSectionProps> = ({ onSelectUnit }) => {
  return (
    <section id="unidades" className="py-20 sm:py-28 bg-ink-elevated border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-display text-brand-red font-bold">03</span>
              <span className="text-[11px] font-display uppercase tracking-[0.3em] text-textFaint">
                Localizações Privilegiadas
              </span>
              <span className="h-px w-12 bg-neutral-800" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-display uppercase font-semibold text-white tracking-tight">
              Nossas Unidades
            </h2>
          </div>
          <p className="text-sm text-textDim max-w-md">
            Espaços projetados com estacionamento ou manobrista, bar executivo e conforto de ponta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {UNITS_DATA.map((unit: UnitLocation) => (
            <div
              key={unit.id}
              className="bg-ink border border-neutral-800/90 rounded-sm overflow-hidden flex flex-col justify-between hover:border-neutral-700 transition-all group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-neutral-900">
                  <img
                    src={unit.imageUrl}
                    alt={unit.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/assets/img/m2-fachada.jpg';
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-ink/90 border border-neutral-800 px-3 py-1 text-[10px] font-display uppercase tracking-widest text-white rounded-sm">
                    {unit.neighborhood}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-display uppercase font-semibold text-white">
                    {unit.name}
                  </h3>

                  <div className="space-y-2 text-xs text-textDim">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                      <span>{unit.address}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-brand-red flex-shrink-0" />
                      <span>{unit.phone}</span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                      <div>
                        <p>{unit.hoursWeekday}</p>
                        <p>{unit.hoursSaturday}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-2.5">
                <button
                  onClick={() => onSelectUnit(unit.id)}
                  className="w-full min-h-[44px] bg-brand-red hover:bg-red-700 text-white font-display uppercase text-xs tracking-wider font-semibold rounded-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Agendar nesta unidade</span>
                </button>

                <a
                  href={unit.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 font-display uppercase text-xs tracking-wider rounded-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Ver no Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
