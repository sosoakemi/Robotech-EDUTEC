(function(){
  // Helpers
  const qs = sel => document.querySelector(sel);
  const qsa = sel => Array.from(document.querySelectorAll(sel));
  const params = new URLSearchParams(window.location.search);
  const COURSE_KEY = params.get('course') || 'geral';
  const LESSON_NUMBER = Math.max(1, parseInt(params.get('lesson'), 10) || 1); // 1..N
  const LESSON_INDEX = LESSON_NUMBER - 1;

  // Carrega payload de aulas gerado na index (derivado dos módulos)
  function loadLessonsPayload(){
    try {
      const raw = localStorage.getItem('robotech_lessons_current');
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || !Array.isArray(data.lessons)) return null;
      return data;
    } catch(_){ return null; }
  }

  // Persistência de progresso (curso+índice da aula)
  function progressKey(course){ return `robotech_player_progress_${course}`; }
  function loadProgress(course){
    try {
      const raw = localStorage.getItem(progressKey(course));
      return raw ? JSON.parse(raw) : { lessonIndex: 0, done: false };
    } catch(_){ return { lessonIndex: 0, done: false }; }
  }
  function saveProgress(course, data){ localStorage.setItem(progressKey(course), JSON.stringify(data)); }

  // Notas por curso
  function notesKey(course){ return `robotech_player_notes_${course||'geral'}`; }
  function initNotes(course){
    const area = qs('#notes-text');
    const status = qs('#notes-status');
    const saved = localStorage.getItem(notesKey(course));
    if (saved !== null) { area.value = saved; if (status) status.textContent = 'Salvo'; }
    area.addEventListener('input', ()=>{ if (status) status.textContent = 'Não salvo'; });
    qs('#save-notes').addEventListener('click', ()=>{
      localStorage.setItem(notesKey(course), area.value);
      if (status) status.textContent = 'Salvo';
    });
    qs('#clear-notes').addEventListener('click', ()=>{
      area.value = '';
      localStorage.removeItem(notesKey(course));
      if (status) status.textContent = 'Não salvo';
    });
  }

  // Player
  function setPlayerById(id){
    const frame = qs('#player-frame');
    const ph = qs('#video-ph');
    if (id) {
      const p = 'autoplay=0&rel=0&modestbranding=1&enablejsapi=0';
      frame.src = `https://www.youtube.com/embed/${id}?${p}`;
      ph.style.display = 'none';
    } else {
      frame.src = '';
      ph.style.display = 'flex';
    }
  }

  function hideManualLoader(){
    const ctrl = qs('.video-controls');
    if (ctrl) ctrl.style.display = 'none';
  }

  function renderPlaylist(lessons){
    const list = qs('#playlist');
    list.innerHTML = '';
    lessons.forEach((l, i) => {
      const el = document.createElement('div');
      el.className = 'playlist-item';
      el.dataset.index = String(i);
      const hasMulti = Array.isArray(l.videos) && l.videos.length > 1;
      el.innerHTML = `<span>${i+1}. ${l.title}${hasMulti ? ' (2 vídeos)' : ''}</span><span class="muted">${l.module || ''}</span>`;
      el.addEventListener('click', ()=> selectLesson(i));
      list.appendChild(el);
    });
  }

  function highlightActive(index){
    qsa('.playlist-item').forEach(el => el.classList.remove('active'));
    const active = qs(`.playlist-item[data-index="${index}"]`);
    if (active) active.classList.add('active');
  }

  function updateLabels(courseKey, payload, idx, subIndex, totalSubs){
    const lesson = payload.lessons[idx];
    qs('#course-pill').textContent = `Curso: ${courseKey}`;
    const suffix = totalSubs > 1 ? ` — Vídeo ${subIndex+1}/${totalSubs}` : '';
    qs('#lesson-label').textContent = `${lesson.module || ''} — ${lesson.title}${suffix}`;
    const lab = qs('#video-progress-label');
    if (lab) lab.textContent = `Aula ${idx+1}/${payload.lessons.length}`;
  }

  function ensureConcludeButton(){
    let bar = qs('#conclude-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'conclude-bar';
      bar.style.marginTop = '.75rem';
      bar.style.display = 'flex';
      bar.style.justifyContent = 'space-between';
      bar.style.alignItems = 'center';
      bar.innerHTML = `
        <span id=\"video-progress-label\" class=\"muted\">Aula</span>
        <div>
          <button id=\"btn-conclude\" class=\"btn btn-primary\"><i class=\"fas fa-check\"></i> Concluir aula</button>
        </div>
      `;
      const shell = qs('.video-shell');
      shell.appendChild(bar);
    }
  }

  // Estado e navegação de aulas
  const payload = loadLessonsPayload();
  const progress = loadProgress(COURSE_KEY);
  let subVideoIndex = 0; // para aulas com vários vídeos

  function selectLesson(index){
    if (!payload || !payload.lessons[index]) return;
    progress.lessonIndex = index;
    saveProgress(COURSE_KEY, progress);
    const l = payload.lessons[index];
    subVideoIndex = 0;
    const vids = Array.isArray(l.videos) ? l.videos : (l.videoId ? [l.videoId] : []);
    setPlayerById(vids[0] || '');
    highlightActive(index);
    updateLabels(COURSE_KEY, payload, index, subVideoIndex, vids.length);
    // Atualiza URL para permitir retorno direto à aula
    const sp = new URLSearchParams(window.location.search);
    sp.set('lesson', String(index+1));
    const url = `${window.location.pathname}?${sp.toString()}`;
    window.history.replaceState({}, '', url);
  }

  function concludeLesson(){
    if (!payload) return;
    const l = payload.lessons[progress.lessonIndex];
    const vids = Array.isArray(l.videos) ? l.videos : (l.videoId ? [l.videoId] : []);
    if (subVideoIndex < vids.length - 1) {
      subVideoIndex += 1;
      setPlayerById(vids[subVideoIndex]);
      updateLabels(COURSE_KEY, payload, progress.lessonIndex, subVideoIndex, vids.length);
      return;
    }

    if (progress.lessonIndex < payload.lessons.length - 1) {
      selectLesson(progress.lessonIndex + 1);
    } else {
      progress.done = true; saveProgress(COURSE_KEY, progress);
      alert('Curso concluído!');
    }
  }

  function init(){
    hideManualLoader();
    ensureConcludeButton();
    initNotes(COURSE_KEY);

    const lessons = payload?.lessons || [];
    renderPlaylist(lessons);

    // Evento concluir
    const btn = qs('#btn-conclude');
    if (btn) btn.addEventListener('click', concludeLesson);

    // Se existir LESSON_NUMBER na URL, usar esse; caso contrário, usar progresso salvo
    const startIndex = Math.min(
      Math.max(LESSON_INDEX, 0),
      Math.max(lessons.length - 1, 0)
    );
    const effectiveIndex = Number.isFinite(startIndex) ? startIndex : 0;

    selectLesson(effectiveIndex);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
