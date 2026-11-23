/**
 * M2 Barbearia — Visual Feedback & Annotation Engine (Maquininha de Comentários no Front)
 * Permite clicar ou arrastar uma caixa na tela para deixar comentários de revisão visual.
 */
(function () {
  const STORAGE_KEY = 'm2_feedback_annotations_v1';
  let isAnnotationMode = false;
  let isDrawing = false;
  let startX = 0;
  let startY = 0;
  let currentBox = null;
  let pendingAnnotation = null;

  // Carrega comentários do LocalStorage
  function getComments() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }

  function saveComments(comments) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
    renderAnnotations();
    updateBadge();
  }

  function getCurrentTab() {
    const activeScreen = document.querySelector('.view-screen.active');
    return activeScreen ? activeScreen.id : 'default';
  }

  function getTabName(tabId) {
    const map = {
      'view-apresentacao': 'Apresentação (Site)',
      'view-bancada': 'QR Bancada',
      'view-cliente': 'Visão do Cliente',
      'view-caixa': 'Frente de Caixa',
      'view-fluxograma': 'Fluxograma',
    };
    return map[tabId] || 'Geral';
  }

  // Injeta estilos CSS do widget
  const style = document.createElement('style');
  style.id = 'm2-feedback-styles';
  style.textContent = `
    /* Botão flutuante no canto inferior direito */
    .m2-fb-trigger-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 99999;
      background: #17181A;
      color: #FFFFFF;
      border: 2px solid #DC2626;
      border-radius: 9999px;
      padding: 10px 18px;
      font-size: 13px;
      font-weight: 800;
      font-family: inherit;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(220, 38, 38, 0.4);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none;
    }

    .m2-fb-trigger-btn:hover {
      background: #DC2626;
      transform: translateY(-2px);
      box-shadow: 0 14px 35px rgba(220, 38, 38, 0.6);
    }

    .m2-fb-trigger-btn.active-mode {
      background: #DC2626;
      border-color: #FFFFFF;
      box-shadow: 0 0 25px rgba(220, 38, 38, 0.9);
      animation: pulseBorder 1.5s infinite;
    }

    @keyframes pulseBorder {
      0%, 100% { box-shadow: 0 0 15px rgba(220, 38, 38, 0.6); }
      50% { box-shadow: 0 0 30px rgba(220, 38, 38, 1); }
    }

    .m2-fb-badge {
      background: #FFFFFF;
      color: #DC2626;
      font-size: 11px;
      font-weight: 900;
      padding: 2px 7px;
      border-radius: 9999px;
      margin-left: 4px;
    }

    /* Banner informativo do modo de comentário */
    .m2-fb-mode-banner {
      position: fixed;
      top: 14px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(23, 24, 26, 0.96);
      border: 1px solid #DC2626;
      backdrop-filter: blur(12px);
      color: #FFFFFF;
      padding: 8px 18px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 700;
      z-index: 99999;
      display: none;
      align-items: center;
      gap: 10px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.8);
      pointer-events: none;
    }

    /* Overlay de captura transparente com cursor em cruz */
    .m2-fb-overlay {
      position: fixed;
      inset: 0;
      z-index: 99998;
      cursor: crosshair !important;
      display: none;
      background: rgba(0, 0, 0, 0.05);
    }

    /* Caixa desenhada ao arrastar (Bounding Box) */
    .m2-fb-drawing-box {
      position: absolute;
      border: 2px dashed #DC2626;
      background: rgba(220, 38, 38, 0.18);
      border-radius: 6px;
      pointer-events: none;
      z-index: 99999;
      box-shadow: 0 0 20px rgba(220, 38, 38, 0.3);
    }

    /* Elementos de comentário salvos na tela */
    .m2-fb-pin {
      position: absolute;
      z-index: 9990;
      width: 28px;
      height: 28px;
      background: #DC2626;
      color: #FFFFFF;
      border: 2px solid #FFFFFF;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 900;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0,0,0,0.8);
      transform: translate(-50%, -50%);
      transition: transform 0.15s;
    }

    .m2-fb-pin:hover {
      transform: translate(-50%, -50%) scale(1.2);
    }

    .m2-fb-box-marker {
      position: absolute;
      z-index: 9989;
      border: 2px dashed #DC2626;
      background: rgba(220, 38, 38, 0.14);
      border-radius: 6px;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    }

    .m2-fb-box-marker .box-label {
      position: absolute;
      top: -12px;
      left: 6px;
      background: #DC2626;
      color: #FFFFFF;
      border: 1.5px solid #FFFFFF;
      border-radius: 9999px;
      padding: 1px 7px;
      font-size: 10px;
      font-weight: 900;
    }

    /* Popover para escrever comentário */
    .m2-fb-popover {
      position: absolute;
      z-index: 100000;
      background: #17181A;
      border: 1px solid #374151;
      border-radius: 12px;
      padding: 16px;
      width: 320px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.9);
      display: none;
      color: #FFF;
      font-family: inherit;
    }

    .m2-fb-popover h4 {
      font-size: 13px;
      font-weight: 800;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .m2-fb-popover textarea {
      width: 100%;
      height: 75px;
      background: #0D0D0E;
      border: 1px solid #374151;
      border-radius: 8px;
      color: #FFF;
      padding: 10px;
      font-size: 12px;
      font-family: inherit;
      resize: vertical;
      margin-bottom: 10px;
      outline: none;
    }

    .m2-fb-popover textarea:focus {
      border-color: #DC2626;
    }

    .m2-fb-popover input {
      width: 100%;
      background: #0D0D0E;
      border: 1px solid #374151;
      border-radius: 8px;
      color: #FFF;
      padding: 8px 10px;
      font-size: 12px;
      margin-bottom: 12px;
      outline: none;
    }

    .m2-fb-popover .btn-group {
      display: flex;
      gap: 8px;
    }

    .m2-fb-popover button {
      flex: 1;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      border: 1px solid transparent;
    }

    .m2-fb-popover .btn-save {
      background: #DC2626;
      color: #FFF;
    }

    .m2-fb-popover .btn-cancel {
      background: #1F2124;
      color: #D1D5DB;
      border-color: #374151;
    }

    /* Modal / Drawer com a lista de todos os comentários */
    .m2-fb-drawer {
      position: fixed;
      top: 0;
      right: 0;
      width: 380px;
      max-width: 90vw;
      height: 100vh;
      background: #17181A;
      border-left: 1px solid #374151;
      box-shadow: -15px 0 40px rgba(0,0,0,0.8);
      z-index: 100000;
      display: none;
      flex-direction: column;
      padding: 20px;
      color: #FFF;
    }

    .m2-fb-drawer.active {
      display: flex;
    }

    .m2-fb-drawer-list {
      flex: 1;
      overflow-y: auto;
      margin: 16px 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .m2-fb-comment-card {
      background: #0D0D0E;
      border: 1px solid #2D3139;
      border-radius: 8px;
      padding: 12px;
      font-size: 12px;
    }

    .m2-fb-comment-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
      font-size: 11px;
      color: #9CA3AF;
    }
  `;
  document.head.appendChild(style);

  // Injeta HTML estrutural dos elementos do widget
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'm2-feedback-widget-root';
  widgetContainer.innerHTML = `
    <!-- Botão Principal no Canto Inferior Direito -->
    <div style="position: fixed; bottom: 20px; right: 20px; z-index: 99999; display: flex; gap: 8px; align-items: center;">
      <button id="m2-fb-list-btn" title="Ver Lista de Comentários" style="width: 44px; height: 44px; border-radius: 50%; background: #17181A; border: 1px solid #374151; color: #FFF; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 25px rgba(0,0,0,0.7); font-size: 16px;">
        📝
      </button>

      <button id="m2-fb-toggle-btn" class="m2-fb-trigger-btn">
        <span style="font-size: 16px;">💬</span>
        <span id="m2-fb-btn-text">Comentar</span>
        <span id="m2-fb-count-badge" class="m2-fb-badge" style="display: none;">0</span>
      </button>
    </div>

    <!-- Banner Superior do Modo de Desenho -->
    <div id="m2-fb-banner" class="m2-fb-mode-banner">
      <span style="font-size: 14px;">🎯</span>
      <span><strong>Modo de Comentário Ativo:</strong> Clique em um ponto ou arraste para selecionar uma área. (ESC para sair)</span>
    </div>

    <!-- Overlay transparente de captura -->
    <div id="m2-fb-overlay" class="m2-fb-overlay"></div>

    <!-- Caixa temporária sendo desenhada -->
    <div id="m2-fb-box-preview" class="m2-fb-drawing-box" style="display: none;"></div>

    <!-- Popover para digitar o comentário -->
    <div id="m2-fb-popover" class="m2-fb-popover">
      <h4>
        <span id="m2-fb-popover-title">Adicionar Comentário</span>
        <span style="font-size: 11px; color: #DC2626; font-weight: 800;" id="m2-fb-popover-tag">Aba Atual</span>
      </h4>
      <input type="text" id="m2-fb-author-input" placeholder="Seu nome (ex: João)" value="João">
      <textarea id="m2-fb-text-input" placeholder="O que você gostaria de alterar aqui? Digite sua sugestão..."></textarea>
      <div class="btn-group">
        <button type="button" class="btn-cancel" id="m2-fb-btn-cancel">Cancelar</button>
        <button type="button" class="btn-save" id="m2-fb-btn-save">Salvar Comentário ✓</button>
      </div>
    </div>

    <!-- Drawer Lateral com a lista de todos os comentários -->
    <div id="m2-fb-drawer" class="m2-fb-drawer">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #2D3139; padding-bottom: 12px;">
        <h3 style="font-size: 16px; font-weight: 800;">Lista de Comentários</h3>
        <button id="m2-fb-drawer-close" style="background: none; border: none; color: #9CA3AF; font-size: 20px; cursor: pointer;">✕</button>
      </div>

      <div id="m2-fb-drawer-list" class="m2-fb-drawer-list"></div>

      <div style="display: flex; flex-direction: column; gap: 8px; border-top: 1px solid #2D3139; padding-top: 14px;">
        <button id="m2-fb-copy-all" style="background: #25D366; color: #FFF; border: none; padding: 12px; border-radius: 8px; font-weight: 800; font-size: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">
          📋 Copiar Todos para WhatsApp
        </button>
        <button id="m2-fb-clear-all" style="background: transparent; color: #EF4444; border: 1px solid #374151; padding: 8px; border-radius: 6px; font-size: 11px; font-weight: 700; cursor: pointer;">
          Excluir Todos os Comentários
        </button>
      </div>
    </div>

    <!-- Container dos Marcadores Salvos na Página -->
    <div id="m2-fb-markers-layer"></div>
  `;
  document.body.appendChild(widgetContainer);

  const toggleBtn = document.getElementById('m2-fb-toggle-btn');
  const btnText = document.getElementById('m2-fb-btn-text');
  const countBadge = document.getElementById('m2-fb-count-badge');
  const banner = document.getElementById('m2-fb-banner');
  const overlay = document.getElementById('m2-fb-overlay');
  const boxPreview = document.getElementById('m2-fb-box-preview');
  const popover = document.getElementById('m2-fb-popover');
  const textInput = document.getElementById('m2-fb-text-input');
  const authorInput = document.getElementById('m2-fb-author-input');
  const btnSave = document.getElementById('m2-fb-btn-save');
  const btnCancel = document.getElementById('m2-fb-btn-cancel');
  const listBtn = document.getElementById('m2-fb-list-btn');
  const drawer = document.getElementById('m2-fb-drawer');
  const drawerClose = document.getElementById('m2-fb-drawer-close');
  const drawerList = document.getElementById('m2-fb-drawer-list');
  const copyAllBtn = document.getElementById('m2-fb-copy-all');
  const clearAllBtn = document.getElementById('m2-fb-clear-all');
  const markersLayer = document.getElementById('m2-fb-markers-layer');

  // Alterna o modo de anotação
  function toggleAnnotationMode(forceState) {
    isAnnotationMode = typeof forceState === 'boolean' ? forceState : !isAnnotationMode;

    if (isAnnotationMode) {
      toggleBtn.classList.add('active-mode');
      btnText.innerText = 'Cancelar (ESC)';
      banner.style.display = 'flex';
      overlay.style.display = 'block';
    } else {
      toggleBtn.classList.remove('active-mode');
      btnText.innerText = 'Comentar';
      banner.style.display = 'none';
      overlay.style.display = 'none';
      boxPreview.style.display = 'none';
      isDrawing = false;
    }
  }

  toggleBtn.addEventListener('click', () => toggleAnnotationMode());

  // Tecla ESC para sair do modo
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (popover.style.display === 'block') {
        closePopover();
      } else if (isAnnotationMode) {
        toggleAnnotationMode(false);
      } else if (drawer.classList.contains('active')) {
        drawer.classList.remove('active');
      }
    }
  });

  // Eventos de Mousedown, Mousemove e Mouseup no Overlay de captura
  overlay.addEventListener('mousedown', (e) => {
    isDrawing = true;
    startX = e.pageX;
    startY = e.pageY;

    boxPreview.style.left = startX + 'px';
    boxPreview.style.top = startY + 'px';
    boxPreview.style.width = '0px';
    boxPreview.style.height = '0px';
    boxPreview.style.display = 'block';
  });

  overlay.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;

    const currentX = e.pageX;
    const currentY = e.pageY;

    const left = Math.min(startX, currentX);
    const top = Math.min(startY, currentY);
    const width = Math.abs(currentX - startX);
    const height = Math.abs(currentY - startY);

    boxPreview.style.left = left + 'px';
    boxPreview.style.top = top + 'px';
    boxPreview.style.width = width + 'px';
    boxPreview.style.height = height + 'px';
  });

  overlay.addEventListener('mouseup', (e) => {
    if (!isDrawing) return;
    isDrawing = false;

    const endX = e.pageX;
    const endY = e.pageY;
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);
    const left = Math.min(startX, endX);
    const top = Math.min(startY, endY);

    // Se o arraste foi menor que 10px, considera um clique pontual (PIN)
    const isBox = width > 15 && height > 15;

    pendingAnnotation = {
      isBox,
      x: isBox ? left : startX,
      y: isBox ? top : startY,
      width: isBox ? width : 0,
      height: isBox ? height : 0,
      tab: getCurrentTab(),
      tabName: getTabName(getCurrentTab()),
    };

    // Abre o popover na posição selecionada
    openPopover(isBox ? left + width / 2 : startX, isBox ? top + height : startY + 10);
    toggleAnnotationMode(false);
  });

  function openPopover(x, y) {
    popover.style.display = 'block';

    // Ajusta coordenadas para não vazar a tela
    const popoverWidth = 320;
    const maxX = window.innerWidth + window.scrollX - popoverWidth - 20;
    const adjustedX = Math.max(20, Math.min(x - popoverWidth / 2, maxX));

    popover.style.left = adjustedX + 'px';
    popover.style.top = y + 10 + 'px';

    document.getElementById('m2-fb-popover-tag').innerText = pendingAnnotation ? pendingAnnotation.tabName : '';
    textInput.value = '';
    textInput.focus();
  }

  function closePopover() {
    popover.style.display = 'none';
    pendingAnnotation = null;
    boxPreview.style.display = 'none';
  }

  btnCancel.addEventListener('click', closePopover);

  btnSave.addEventListener('click', () => {
    const text = textInput.value.trim();
    if (!text) {
      alert('Por favor, digite seu comentário.');
      return;
    }

    const comments = getComments();
    const newComment = {
      id: 'c_' + Date.now(),
      number: comments.length + 1,
      author: authorInput.value.trim() || 'Usuário',
      comment: text,
      isBox: pendingAnnotation.isBox,
      x: pendingAnnotation.x,
      y: pendingAnnotation.y,
      width: pendingAnnotation.width,
      height: pendingAnnotation.height,
      tab: pendingAnnotation.tab,
      tabName: pendingAnnotation.tabName,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    comments.push(newComment);
    saveComments(comments);
    closePopover();
  });

  // Renderiza os marcadores e caixas na aba ativa
  function renderAnnotations() {
    markersLayer.innerHTML = '';
    const comments = getComments();
    const currentTab = getCurrentTab();

    comments.forEach((c) => {
      // Exibe os marcadores correspondentes à aba atual ou se não houver abas
      if (c.tab && c.tab !== currentTab) return;

      if (c.isBox) {
        // Caixa retangular (Bounding Box)
        const box = document.createElement('div');
        box.className = 'm2-fb-box-marker';
        box.style.left = c.x + 'px';
        box.style.top = c.y + 'px';
        box.style.width = c.width + 'px';
        box.style.height = c.height + 'px';
        box.innerHTML = `<span class="box-label">#${c.number} ${c.author}</span>`;
        box.title = `#${c.number} (${c.author}): ${c.comment}`;
        box.addEventListener('click', (e) => {
          e.stopPropagation();
          showCommentDetails(c);
        });
        markersLayer.appendChild(box);
      } else {
        // Pino pontual (PIN)
        const pin = document.createElement('div');
        pin.className = 'm2-fb-pin';
        pin.style.left = c.x + 'px';
        pin.style.top = c.y + 'px';
        pin.innerText = c.number;
        pin.title = `#${c.number} (${c.author}): ${c.comment}`;
        pin.addEventListener('click', (e) => {
          e.stopPropagation();
          showCommentDetails(c);
        });
        markersLayer.appendChild(pin);
      }
    });
  }

  function showCommentDetails(c) {
    alert(`Comentário #${c.number} (${c.author}) em [${c.tabName}]:\n\n"${c.comment}"\n\nCriado às ${c.createdAt}`);
  }

  function updateBadge() {
    const comments = getComments();
    if (comments.length > 0) {
      countBadge.innerText = comments.length;
      countBadge.style.display = 'inline-block';
    } else {
      countBadge.style.display = 'none';
    }
  }

  // Monitora mudança de abas no app para re-renderizar os marcadores da aba ativa
  const observer = new MutationObserver(() => {
    renderAnnotations();
  });
  observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });

  // Drawer de comentários
  listBtn.addEventListener('click', () => {
    renderDrawer();
    drawer.classList.add('active');
  });

  drawerClose.addEventListener('click', () => {
    drawer.classList.remove('active');
  });

  function renderDrawer() {
    drawerList.innerHTML = '';
    const comments = getComments();

    if (comments.length === 0) {
      drawerList.innerHTML = `<div style="text-align: center; color: #9CA3AF; padding: 40px 10px; font-size: 13px;">Nenhum comentário adicionado ainda.<br>Clique em "Comentar" para selecionar uma área e sugerir alterações!</div>`;
      return;
    }

    comments.forEach((c) => {
      const card = document.createElement('div');
      card.className = 'm2-fb-comment-card';
      card.innerHTML = `
        <div class="m2-fb-comment-header">
          <strong style="color: #DC2626; font-size: 12px;">#${c.number} • ${c.author}</strong>
          <span>${c.tabName} • ${c.createdAt}</span>
        </div>
        <p style="color: #FFF; line-height: 1.5; font-size: 12px;">${c.comment}</p>
        <div style="margin-top: 8px; text-align: right;">
          <button style="background: none; border: none; color: #EF4444; font-size: 11px; cursor: pointer;" onclick="window.__m2DeleteComment('${c.id}')">Excluir ✕</button>
        </div>
      `;
      drawerList.appendChild(card);
    });
  }

  window.__m2DeleteComment = function (id) {
    if (confirm('Deseja excluir este comentário?')) {
      let comments = getComments();
      comments = comments.filter((c) => c.id !== id);
      // Renumera
      comments.forEach((c, idx) => (c.number = idx + 1));
      saveComments(comments);
      renderDrawer();
    }
  };

  copyAllBtn.addEventListener('click', () => {
    const comments = getComments();
    if (comments.length === 0) {
      alert('Não há comentários para copiar.');
      return;
    }

    let text = `*FEEDBACK M2 BARBEARIA - ALTERAÇÕES SOLICITADAS:*\n\n`;
    comments.forEach((c) => {
      text += `📌 *#${c.number} [${c.tabName}] - ${c.author}:*\n"${c.comment}"\n\n`;
    });

    navigator.clipboard.writeText(text);
    alert('Todos os comentários foram copiados em formato formatado para o WhatsApp!');
  });

  clearAllBtn.addEventListener('click', () => {
    if (confirm('Tem certeza de que deseja apagar todos os comentários salvos?')) {
      saveComments([]);
      renderDrawer();
    }
  });

  // Inicialização
  renderAnnotations();
  updateBadge();
})();
