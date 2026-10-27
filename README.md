# M2 Barbearia — Plataforma Web

Aplicação web institucional e de agendamento executivo para a **M2 Barbearia**, construída no padrão visual e estrutural inspirado na [Barbearia Corleone](https://barbeariacorleone.com.br/).

## Características e Diretrizes Arquiteturais

- **Identidade Visual Clássica:** Fundo preto profundo (`#0b0b0b`), tipografia condensada e display (`Oswald`), tipografia de leitura (`Inter`), detalhe de assinatura bicolor (vermelho e azul) e estética sóbria.
- **Modularidade Estrita:** Todos os arquivos contam com menos de 200 linhas (faixa de excelência entre 50 e 180 linhas).
- **Paridade Mobile-First:**
  - Alvos de toque com dimensão mínima de 44px x 44px.
  - Modal de agendamento responsivo com comportamento de **Bottom Sheet** no celular, alça de puxar (*grab handle*) e suporte a `safe-area-inset-bottom`.
  - Zero rolagem horizontal em telas de 320px a 420px.
- **Design Sóbrio & Executivo:** Sem ícones de estrelinhas ou floreios; ícones objetivos e analíticos.
- **Suíte de Testes Automatizados:** Testes unitários de integridade de dados e lógica de agendamento via Vitest.

## Comandos

```bash
# Instalação
npm install

# Servidor de Desenvolvimento
npm run dev

# Execução dos Testes Automatizados
npm test

# Build de Produção
npm run build
```
