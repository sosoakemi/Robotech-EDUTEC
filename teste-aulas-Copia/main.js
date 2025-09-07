document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('toggleProfessores');
  const maisProfessores = document.getElementById('maisProfessores');

  if (btn && maisProfessores) {
    btn.addEventListener('click', () => {
      maisProfessores.classList.toggle('active');
      btn.textContent = maisProfessores.classList.contains('active') ? 'Ver menos' : 'Ver mais';
    });
  }

  // Mapear cards de cursos para as chaves do app e navegar para index.html?course=KEY
  const norm = (s) => (s || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().trim();

  const mapTitleToKey = (title) => {
    const t = norm(title);
    if (t.includes('conheca as linguagens') || t.includes('conheça as linguagens')) return 'linguagens';
    if (t === 'css') return 'css';
    if (t === 'gamificacao' || t === 'gamificação') return 'gamificacao';
    if (t === 'inteligencia artificial' || t === 'inteligência artificial') return 'inteligencia-artificial';
    if (t === 'ux design') return 'ux-design';
    if (t === 'javascript') return 'javascript';
    if (t === 'banco de dados') return 'banco-dados';
    if (t === 'c++' || t === 'c + +' || t === 'c++ ') return 'cpp';
    if (t === 'ingles basico' || t === 'inglês basico' || t === 'ingles básico' || t === 'inglês básico') return 'ingles-basico';
    return '';
  };

  document.querySelectorAll('.aulas .card').forEach(card => {
    card.addEventListener('click', () => {
      const titleEl = card.querySelector('.title');
      const key = mapTitleToKey(titleEl ? titleEl.textContent : '');
      if (!key) return;
      window.location.href = `index.html?course=${encodeURIComponent(key)}`;
    });
  });

  // ===== Chatbot (Gemini) na página de aulas =====
  function ensureChatUI() {
    if (document.getElementById('floating-chat')) return;

    // Botão flutuante
    const btn = document.createElement('div');
    btn.id = 'floating-chat';
    btn.style.cssText = [
      'position:fixed','right:2rem','bottom:2rem','width:60px','height:60px','border-radius:50%',
      'display:flex','align-items:center','justify-content:center','cursor:pointer',
      'background:linear-gradient(135deg,#7c3aed,#0066ff)','box-shadow:0 10px 30px rgba(124,58,237,.4)',
      'z-index:2000'
    ].join(';');
    const img = document.createElement('img');
    img.src = 'chaticon.png'; // Caminho correto da imagem do bot
    img.alt = 'Chatbot';
    img.style.cssText = 'width:35px;height:35px;object-fit:contain;';
    btn.appendChild(img);

    // Modal
    const modal = document.createElement('div');
    modal.id = 'chat-modal';
    modal.className = 'modal';
    modal.style.cssText = [
      'display:none','position:fixed','inset:0','background:rgba(0,0,0,.8)','backdrop-filter:blur(10px)',
      'z-index:3000'
    ].join(';');

    const box = document.createElement('div');
    box.className = 'modal-content';
    box.style.cssText = [
      'background:rgba(15,15,35,.95)','margin:5% auto','padding:0','border-radius:20px','width:90%','max-width:860px',
      'border:1px solid rgba(255,255,255,.1)','box-shadow:0 25px 50px rgba(0,0,0,.5)'
    ].join(';');

    const header = document.createElement('div');
    header.className = 'modal-header';
    header.style.cssText = 'padding:1rem 1.5rem;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,.1)';
    const h3 = document.createElement('h3');
    h3.textContent = 'Chat com IA';
    h3.style.cssText = 'color:#fff;margin:0;font-size:1.1rem;';
    const close = document.createElement('span');
    close.textContent = '×';
    close.style.cssText = 'color:#aaa;font-size:28px;font-weight:700;cursor:pointer;';
    header.appendChild(h3); header.appendChild(close);

    const body = document.createElement('div');
    body.className = 'modal-body';
    body.style.cssText = 'padding:0;';

    const iframe = document.createElement('iframe');
    iframe.src = 'chatbot.html';
    iframe.title = 'Chatbot';
    iframe.style.cssText = 'width:100%;height:70vh;border:0;border-radius:12px;background:#0f0f23;';
    body.appendChild(iframe);

    box.appendChild(header); box.appendChild(body);
    modal.appendChild(box);

    document.body.appendChild(btn);
    document.body.appendChild(modal);

    // Eventos
    btn.addEventListener('click', () => { modal.style.display = 'block'; });
    close.addEventListener('click', () => { modal.style.display = 'none'; });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  ensureChatUI();
});
