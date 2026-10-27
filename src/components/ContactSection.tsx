import React, { useState } from 'react';
import { Send, CheckCircle, Mail, MapPin, Phone } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contato" className="py-20 sm:py-28 bg-ink border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-display text-brand-red font-bold">05</span>
              <span className="text-[11px] font-display uppercase tracking-[0.3em] text-textFaint">
                Canais Oficiais
              </span>
              <span className="h-px w-12 bg-neutral-800" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-display uppercase font-semibold text-white tracking-tight">
              Fale Conosco
            </h2>

            <p className="text-sm sm:text-base text-textDim leading-relaxed">
              Dúvidas sobre serviços, reservas corporativas, parcerias ou eventos de Dia do Noivo? Envie sua mensagem ou entre em contato diretamente por nossa central.
            </p>

            <div className="space-y-4 pt-4 border-t border-neutral-800 text-sm text-neutral-300">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-red" />
                <span>Central de Atendimento: (11) 3284-9000</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-red" />
                <span>contato@m2barbearia.com.br</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-brand-red" />
                <span>São Paulo — Jardins • Paulista • Alphaville</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-ink-elevated border border-neutral-800 p-6 sm:p-8 rounded-sm">
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center">
                <CheckCircle className="w-12 h-12 text-emerald-500 mb-3" />
                <h3 className="text-xl font-display uppercase text-white font-semibold">Mensagem Enviada</h3>
                <p className="text-xs text-textDim mt-2">Nossa equipe responderá em até 24 horas úteis.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs text-white uppercase font-display tracking-wider rounded-sm"
                >
                  Nova Mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase font-display tracking-wider text-textFaint mb-1.5">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full h-11 min-h-[44px] px-3 bg-neutral-900 border border-neutral-800 rounded-sm text-sm text-white focus:border-brand-red focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-display tracking-wider text-textFaint mb-1.5">
                    E-mail
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="seu.email@exemplo.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full h-11 min-h-[44px] px-3 bg-neutral-900 border border-neutral-800 rounded-sm text-sm text-white focus:border-brand-red focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-display tracking-wider text-textFaint mb-1.5">
                    Mensagem
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Como podemos lhe atender?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full p-3 bg-neutral-900 border border-neutral-800 rounded-sm text-sm text-white focus:border-brand-red focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 min-h-[44px] bg-brand-red hover:bg-red-700 text-white font-display uppercase text-xs tracking-widest font-semibold rounded-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Enviar Mensagem</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
