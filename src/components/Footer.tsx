import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink border-t border-neutral-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-800">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/img/simbolo-footer.png"
                alt="M2 Barbearia"
                className="h-10 w-auto"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/img/logo-simbolo.png';
                }}
              />
              <span className="font-display uppercase tracking-[0.2em] font-bold text-lg text-white">
                M2 Barbearia
              </span>
            </div>
            <p className="text-xs text-textFaint leading-relaxed max-w-xs">
              Tradição clássica, navalha afiada e toalhas quentes. Inspirada nas autênticas barbearias executivas.
            </p>
          </div>

          {/* Units */}
          <div>
            <h4 className="text-[11px] font-display uppercase tracking-[0.25em] text-textFaint mb-4">
              Nossas Unidades
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><a href="#unidades" className="hover:text-white transition-colors">Matriz Central — Paulista</a></li>
              <li><a href="#unidades" className="hover:text-white transition-colors">Unidade Jardins — Oscar Freire</a></li>
              <li><a href="#unidades" className="hover:text-white transition-colors">Unidade Alphaville — Rio Negro</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[11px] font-display uppercase tracking-[0.25em] text-textFaint mb-4">
              Institucional
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><a href="#marca" className="hover:text-white transition-colors">Nossa Marca</a></li>
              <li><a href="#servicos" className="hover:text-white transition-colors">Tabela de Serviços</a></li>
              <li><a href="#avaliacoes" className="hover:text-white transition-colors">Opinião de Clientes</a></li>
              <li><a href="#recrutamento" className="hover:text-white transition-colors">Trabalhe Conosco</a></li>
            </ul>
          </div>

          {/* Hours & Contact */}
          <div>
            <h4 className="text-[11px] font-display uppercase tracking-[0.25em] text-textFaint mb-4">
              Horários de Atendimento
            </h4>
            <p className="text-xs text-neutral-400">Segunda a Sexta: 09h às 21h</p>
            <p className="text-xs text-neutral-400 mt-1">Sábados: 09h às 19h</p>
            <p className="text-xs text-neutral-500 mt-3">Agendamentos via aplicativo ou WhatsApp.</p>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <span>© {currentYear} M2 Barbearia. Todos os direitos reservados.</span>
          <span className="font-display uppercase tracking-[0.25em] text-[10px] text-neutral-400">
            Excelência & Respeito ao Estilo Masculino
          </span>
        </div>
      </div>
    </footer>
  );
};
