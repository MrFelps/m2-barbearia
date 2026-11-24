import React, { useState } from 'react';
import { Check, X, User, Trash2 } from 'lucide-react';
import { AnnotationItem } from '../../types/annotation';

interface AnnotationPinProps {
  annotation: AnnotationItem;
  onToggleResolve: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const AnnotationPin: React.FC<AnnotationPinProps> = ({
  annotation,
  onToggleResolve,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (annotation.resolved) return null;

  return (
    <div
      className="absolute pointer-events-auto transition-all duration-200 z-40 select-none"
      style={{
        left: `${annotation.x}px`,
        top: `${annotation.y}px`,
      }}
    >
      {/* Caixa delimitadora sutil (visível apenas quando o pino está selecionado/expandido) */}
      {isExpanded && annotation.isBox && annotation.width && annotation.height && (
        <div
          className="absolute -top-1 -left-1 border-2 border-dashed border-brand-red/60 bg-brand-red/5 rounded pointer-events-none transition-all"
          style={{
            width: `${annotation.width}px`,
            height: `${annotation.height}px`,
          }}
        />
      )}

      {/* Marcador Discreto Numerado (Touch target 44px) */}
      <div className="relative">
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          title={`Comentário #${annotation.number} de ${annotation.author}. Clique para ler ou fechar.`}
          aria-label={`Comentário ${annotation.number}`}
          className="w-8 h-8 sm:w-9 sm:h-9 min-h-[44px] min-w-[44px] rounded-full bg-brand-red hover:bg-red-700 text-white font-mono font-bold text-xs shadow-2xl border-2 border-white/80 flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        >
          #{annotation.number}
        </button>

        {/* Card do Comentário (Abre apenas sob demanda) */}
        {isExpanded && (
          <div className="absolute top-12 left-0 w-72 sm:w-80 bg-ink-elevated/95 backdrop-blur-md border border-neutral-700 rounded-xl p-3.5 shadow-2xl space-y-2.5 text-white animate-fadeIn z-50">
            {/* Topo do Card */}
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <div className="flex items-center gap-1.5 text-xs">
                <User className="w-3.5 h-3.5 text-brand-gold" />
                <span className="font-display uppercase font-bold text-gray-200">
                  {annotation.author}
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">
                  {annotation.createdAt}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onToggleResolve(annotation.id)}
                  title="Concluir e ocultar este comentário"
                  className="p-1.5 text-neutral-400 hover:text-emerald-400 rounded min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <Check className="w-4 h-4" />
                </button>
                {onDelete && (
                  <button
                    onClick={() => onDelete(annotation.id)}
                    title="Excluir anotação"
                    className="p-1.5 text-neutral-400 hover:text-red-400 rounded min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsExpanded(false)}
                  title="Fechar card"
                  className="p-1.5 text-neutral-400 hover:text-white rounded min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Conteúdo da Anotação */}
            <div className="text-xs leading-relaxed text-gray-200 whitespace-pre-line max-h-48 overflow-y-auto pr-1">
              {annotation.comment}
            </div>

            {/* Ação rápida de dispensar */}
            <div className="pt-2 flex items-center justify-between border-t border-neutral-800/80 text-[10px]">
              <span className="text-neutral-500 font-mono">
                Pin #{annotation.number} • ({annotation.x}, {annotation.y})
              </span>
              <button
                onClick={() => onToggleResolve(annotation.id)}
                className="px-2.5 py-1 bg-emerald-600/90 hover:bg-emerald-600 text-white rounded text-[10px] font-semibold flex items-center gap-1"
              >
                <Check className="w-3 h-3" />
                <span>Marcar Concluído</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
