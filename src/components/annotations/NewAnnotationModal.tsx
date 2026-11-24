import React, { useState } from 'react';
import { X, MessageSquare, Send } from 'lucide-react';

interface NewAnnotationModalProps {
  isOpen: boolean;
  coords: { x: number; y: number } | null;
  onClose: () => void;
  onSubmit: (text: string, author: string) => void;
}

export const NewAnnotationModal: React.FC<NewAnnotationModalProps> = ({
  isOpen,
  coords,
  onClose,
  onSubmit,
}) => {
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState('felipe');

  if (!isOpen || !coords) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onSubmit(comment.trim(), author.trim() || 'felipe');
    setComment('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn pointer-events-auto">
      <div className="w-full max-w-sm bg-ink-elevated border border-neutral-700 rounded-xl p-5 shadow-2xl space-y-3.5 text-white">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-brand-red" />
            <span className="font-display uppercase tracking-wider font-bold text-sm">
              Novo Comentário
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[11px] font-display uppercase tracking-wider text-neutral-400 block mb-1">
              Seu Nome / Autor
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full bg-ink border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-red"
              placeholder="Ex: felipe"
            />
          </div>

          <div>
            <label className="text-[11px] font-display uppercase tracking-wider text-neutral-400 block mb-1">
              Anotação / Feedback ({coords.x}px, {coords.y}px)
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-ink border border-neutral-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-brand-red resize-none"
              placeholder="Escreva a alteração ou observação desejada..."
              autoFocus
            />
          </div>

          <button
            type="submit"
            className="w-full h-11 min-h-[44px] bg-brand-red hover:bg-red-700 text-white font-display uppercase text-xs tracking-wider font-bold rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Adicionar Anotação</span>
          </button>
        </form>
      </div>
    </div>
  );
};
