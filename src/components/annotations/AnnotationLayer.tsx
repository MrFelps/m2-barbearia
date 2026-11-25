import React, { useState, useEffect } from 'react';
import { Plus, Eye, EyeOff, RotateCcw } from 'lucide-react';
import { AnnotationItem } from '../../types/annotation';
import { INITIAL_ANNOTATIONS } from '../../data/annotationsData';
import { AnnotationPin } from './AnnotationPin';
import { NewAnnotationModal } from './NewAnnotationModal';

const STORAGE_KEY = 'm2_barbearia_user_annotations';

export const AnnotationLayer: React.FC = () => {
  const [annotations, setAnnotations] = useState<AnnotationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_ANNOTATIONS;
  });

  const [isVisible, setIsVisible] = useState(false); // Começa recolhido/oculto para não atrapalhar
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [newCoords, setNewCoords] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(annotations));
    } catch {
      // ignora
    }
  }, [annotations]);

  const activeCount = annotations.filter((a) => !a.resolved).length;

  const handleToggleResolve = (id: string) => {
    setAnnotations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, resolved: !a.resolved } : a))
    );
  };

  const handleDelete = (id: string) => {
    setAnnotations((prev) => prev.filter((a) => a.id !== id));
  };

  const handleResetAnnotations = () => {
    setAnnotations(INITIAL_ANNOTATIONS);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isAddingMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setNewCoords({ x, y });
    setIsAddingMode(false);
  };

  const handleCreateAnnotation = (text: string, author: string) => {
    if (!newCoords) return;
    const newAnn: AnnotationItem = {
      id: `c_${Date.now()}`,
      number: annotations.length + 1,
      author,
      comment: text,
      isBox: false,
      x: newCoords.x,
      y: newCoords.y,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      resolved: false,
    };
    setAnnotations((prev) => [...prev, newAnn]);
    setNewCoords(null);
  };

  return (
    <>
      {/* Barra de Ferramentas de Anotações (disponível no desktop para auditoria, oculta no mobile para tela limpa) */}
      <aside aria-label="Ferramentas de Anotações" className="fixed bottom-20 right-4 z-40 pointer-events-auto hidden sm:flex items-center gap-2">
        <button
          onClick={() => setIsVisible((prev) => !prev)}
          title={isVisible ? 'Ocultar comentários' : 'Exibir comentários'}
          className={`h-11 min-h-[44px] px-3.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-2xl border transition-all ${
            isVisible
              ? 'bg-brand-red text-white border-white/20'
              : 'bg-surface/95 text-neutral-300 border-neutral-700 hover:text-white'
          }`}
        >
          {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>Comentários ({activeCount})</span>
        </button>

        {isVisible && (
          <>
            <button
              onClick={() => setIsAddingMode((prev) => !prev)}
              title={isAddingMode ? 'Cancelar modo de clique' : 'Adicionar comentário clicando na tela'}
              className={`h-11 min-h-[44px] px-3 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-2xl border transition-all ${
                isAddingMode
                  ? 'bg-amber-600 text-white border-white/40 animate-pulse'
                  : 'bg-surface/95 text-neutral-300 border-neutral-700 hover:text-white'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>{isAddingMode ? 'Clique na tela...' : 'Novo'}</span>
            </button>

            <button
              onClick={handleResetAnnotations}
              title="Restaurar comentários originais"
              className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-full bg-surface/95 border border-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center shadow-xl"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      </aside>

      {/* Camada Ancorada no Documento com Scroll */}
      {isVisible && (
        <div
          onClick={handleContainerClick}
          className={`absolute inset-0 z-30 overflow-visible ${
            isAddingMode ? 'cursor-crosshair pointer-events-auto bg-brand-red/5' : 'pointer-events-none'
          }`}
        >
          {annotations.map((ann) => (
            <AnnotationPin
              key={ann.id}
              annotation={ann}
              onToggleResolve={handleToggleResolve}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal para Cadastro de Nova Anotação */}
      <NewAnnotationModal
        isOpen={!!newCoords}
        coords={newCoords}
        onClose={() => setNewCoords(null)}
        onSubmit={handleCreateAnnotation}
      />
    </>
  );
};
