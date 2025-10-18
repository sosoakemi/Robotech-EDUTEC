// Sistema RoboTech de Múltiplas Aulas
class RoboTechAulas {
    constructor() {
        this.currentCourse = null;
        this.courses = {
            'css': {
                title: 'CSS - Cascading Style Sheets',
                description: 'Aprenda a estilizar suas páginas web com CSS moderno e responsivo.',
                instructor: 'Profa. Ana Oliveira',
                specialty: 'CSS Especialista',
                duration: '18 minutos',
                students: '1.248 alunos',
                level: 'Intermediario',
                lessonNumber: 'Aula 7',
                lessonTitle: 'Display Flex?',
                lessonDescription: 'Aprenda a criar layouts flexíveis e responsivos com a propriedade Display Flex do CSS.',
                backgroundImage: 'imagem CSS (3).png',
                goals: [
                    'Entender o conceito de Flexbox e seu propósito',
                    'Configurar um container flex e seus itens',
                    'Trabalhar com os eixos principal e transversal',
                    'Criar layouts responsivos com flexbox'
                ],
                content: [
                    { title: 'Introdução ao Flexbox', duration: '3:45' },
                    { title: 'Propriedades do Container', duration: '5:20' },
                    { title: 'Propriedades dos Itens', duration: '4:55' },
                    { title: 'Exemplo Prático', duration: '4:00' }
                ],
                modules: [
                    {
                        number: 1,
                        title: 'Introdução ao CSS',
                        status: 'completed',
                        lessons: [
                            { title: 'O que é CSS?', completed: true },
                            { title: 'Cores,fontes,tamanhos e alinhamentos', completed: true }
                        ]
                    },
                    {
                        number: 2,
                        title: 'Básicos',
                        status: 'in-progress',
                        lessons: [
                            { title: 'Box Model: margin, padding e border', completed: true },
                            { title: 'Layouts com Flexbox e Grid', completed: true },
                            { title: ' Transições, animações e media queries', completed: true },
                        ]
                    },
                    {
                        number: 3,
                        title: 'Layout Avançado',
                        status: 'locked',
                        lessons: []
                    },
                    {
                        number: 4,
                        title: 'Responsividade',
                        status: 'locked',
                        lessons: []
                    }
                ]
            },
            //preciso fzer
            'linguagens': {
                title: 'Conheça as Linguagens',
                description: 'Descubra as principais linguagens de programação e suas aplicações no mercado.',
                instructor: 'Prof. Jade Jennse',
                specialty: 'Arquiteta de Software',
                duration: '25 minutos',
                students: '1.140 alunos',
                level: 'Intermediario',
                lessonNumber: 'Aula 1',
                lessonTitle: 'Introdução às Linguagens de Programação',
                lessonDescription: 'Conheça as linguagens mais populares e entenda qual escolher para seus projetos.',
                backgroundImage: 'imagem CSS (3).png',
                goals: [
                    'Compreender os conceitos de classes e objetos',
                    'Trabalhar com encapsulamento e abstração',
                    'Implementar herança e polimorfismo',
                    'Criar projetos usando princípios de OOP'
                ],
                content: [
                    { title: 'O que é Programação?', duration: '4:15' },
                    { title: 'Linguagens Compiladas vs Interpretadas', duration: '6:30' },
                    { title: 'Top 10 Linguagens do Mercado', duration: '8:45' },
                    { title: 'Como Escolher sua Primeira Linguagem', duration: '5:30' }
                ],
                modules: [
                    {
                        number: 1,
                        title: 'Fundamentos',
                        status: 'in-progress',
                        lessons: [
                            { title: 'Fundamentos da Programação', completed: true },
                            { title: 'Quais linguagens de programação existem', completed: false },
                            { title: 'Algoritmos Básicos', completed: false }
                        ]
                    },
                    {
                       number: 2,
                        title: 'Programação',
                        status: 'in-progress',
                        lessons: [
                            { title: 'Estruturas de Dados', completed: true },
                            { title: 'Bibliotecas e Frameworks', completed: true },
                           
                        ]
                    },
            
                ]
            },
            'gamificacao': {
                title: 'Gamificação',
                description: 'Aprenda a aplicar elementos de jogos para engajar usuários e melhorar experiências.',
                instructor: 'Prof. Jean Silva',
                specialty: 'Especialista em Gamificação',
                duration: '22 minutos',
                students: '1.890 alunos',
                level: 'Intermediario',
                lessonNumber: 'Aula 5',
                lessonTitle: 'Sistemas de Conquistas e Recompensas',
                lessonDescription: 'Aprenda a criar sistemas de conquistas e recompensas engajadores para motivar seus jogadores.',
                backgroundImage: 'imagem CSS (3).png',
                goals: [
                    'Entender o conceito de recompensas na gamificação',
                    'Trabalhar com diferentes tipos de recompensa',
                    'Configurar um sistema de recompensas básico',
                    'Criar mecânicas motivacionais com recompensas'
                ],
                content: [
                    { title: 'Introdução às Recompensas', duration: '3:45' },
                    { title: 'Tipos de Recompensa', duration: '5:20' },
                    { title: 'Sistema de Conquistas', duration: '4:55' },
                    { title: 'Exemplo Prático', duration: '4:00' }
                ],
                modules: [
                    {
                        number: 1,
                        title: 'Introdução à Gamificação',
                        status: 'completed',
                        lessons: [
                            { title: 'O que é Gamificação?', completed: true },
                            { title: 'Elementos dos jogos aplicados fora dos jogo', completed: true },
                            { title: ' Gamificação em aplicativos, sites e educação', completed: true }
                        ]
                    },
                    {
                        number: 2,
                        title: 'Elementos Básicos',
                        status: 'in-progress',
                        lessons: [
                            { title: 'Como criar um sistema simples de pontos e níveis', completed: true },
                            { title: 'Dicas práticas para usar gamificação nos estudos', completed: true },
                          
                        ]
                    },
                    {
                        number: 3,
                        title: 'Mecânicas Avançadas',
                        status: 'locked',
                        lessons: []
                    },
                
                ]
            },
            'inteligencia-artificial': {
                title: 'Inteligência Artificial',
                description: 'Explore o mundo da IA e aprenda a criar sistemas inteligentes.',
                instructor: 'Prof. Léo Eduardo',
                specialty: 'PhD em Inteligência Artificial',
                duration: '30 minutos',
                students: '3.245 alunos',
                level: 'Avançado',
                lessonNumber: 'Aula 3',
                lessonTitle: 'Machine Learning Básico',
                lessonDescription: 'Explore os fundamentos das redes neurais artificiais e aprenda como implementar modelos de deep learning para resolver problemas complexos de IA.',
                backgroundImage: 'imagem CSS (3).png',
                goals: [
                    ' O que é IA e onde usamos hoje',
                    'Diferença entre IA, Machine Learning e Deep Learning',
                    'Como uma IA "aprende" com dados (conceito de treino)',
                    'Exemplos de IA simples: chatbots, recomendações'
                ],
                content: [
                    { title: 'O que é Machine Learning?', duration: '5:15' },
                    { title: 'Tipos de Aprendizado', duration: '7:30' },
                    { title: 'Algoritmos Básicos', duration: '8:45' },
                    { title: 'Aplicações Práticas', duration: '8:30' }
                ],
                modules: [
                    {
                        number: 1,
                        title: 'Fundamentos da IA',
                        status: 'completed',
                        lessons: [
                            { title: 'O que é Inteligência Artificial?', completed: true },
                            { title: 'Diferença entre IA', completed: true },
                            { title: 'Como uma IA "aprende" com dados', completed: true }
                        ]
                    },
                    {
                        number: 2,
                        title: 'Futuro da IA',
                        status: 'in-progress',
                        lessons: [
                            { title: 'Exemplos de IA simples', completed: true },
                            { title: 'Ética, futuro da IA e como começar a estudar', completed: true },
                        ]
                    },

                    {
                        number: 3,
                        title: 'Visão Computacional',
                        status: 'locked',
                        lessons: []
                    }
                ]
            },
            'ux-design': {
                title: 'UX Design',
                description: 'Crie experiências de usuário excepcionais com princípios de design centrado no usuário.',
                instructor: 'Prof. Travis Scott',
                specialty: 'Designer Lider de UX/UI ',
                duration: '20 minutos',
                students: '200 alunos',
                level: 'Intermediario',
                lessonNumber: 'Aula 4',
                lessonTitle: 'Design de Interfaces e Prototipagem',
                lessonDescription: 'Aprenda a criar interfaces intuitivas e intuitivas, dominando as técnicas de prototipagem e os princípios fundamentais do design de interação.',
                backgroundImage: 'imagem CSS (3).png',
                goals: [
                    'Princípios de Design de Interface',
                    'Sistema de Design e Componentes',
                    'Ferramentas de Prototipagem',
                    'Melhorar a experiência do usuário'
                ],
                content: [
                    { title: 'Introdução ao Design de Interface', duration: '3:45' },
                    { title: 'Criação de Wireframes', duration: '8:20' },
                    { title: 'Prototipagem Interativa', duration: '7:15' },
                    { title: 'Testes e Iterações', duration: '4:40' }
                ],
                modules: [
                    {
                        number: 1,
                        title: 'Fundamentos do UX',
                        status: 'completed',
                        lessons: [
                            { title: 'O que é UX e qual a sua importância', completed: true },
                            { title: 'Princípios básicos de usabilidade', completed: true },
                            { title: 'Criando fluxos e protótipos simples', completed: true }
                        ]
                    },
                    {
                        number: 2,
                        title: 'UX na prática',
                        status: 'in-progress',
                        lessons: [
                            { title: 'Melhorar um site/app', completed: true },
                            { title: 'Ferramentas e como começar na área', completed: true },
                        ]
                    }
                ]
            },
            'javascript': {
                title: 'JavaScript',
                description: 'Domine conceitos avançados de funções em JavaScript',
                instructor: 'Prof. Daniel Santos',
                specialty: 'Desenvolvedor Sênior de JavaScript',
                duration: '35 minutos',
                students: '4.123 alunos',
                level: 'Intermediario',
                lessonNumber: 'Aula 8',
                lessonTitle: 'Funções Avançadas e Fechamentos',
                lessonDescription: 'Domine conceitos avançados de funções em JavaScript, incluindo fechamentos, escopo léxico e padrões de design específicos para escrever código mais limpo e eficiente.',
                backgroundImage: 'imagem CSS (3).png',
                goals: [
                    'Escopo e Closures',
                    'Padrões Funcionais',
                    'Funções de ordem superior',
                    'Otimização de Performance'
                ],
                content: [
                    { title: 'Entendendo Escopo em JavaScript', duration: '6:15' },
                    { title: 'Fechamentos na Prática', duration: '8:30' },
                    { title: 'Implementando Funções de Fábrica', duration: '7:45' },
                    { title: 'Exercícios Práticos', duration: '12:30' }
                ],
                modules: [
                    {
                        number: 1,
                        title: 'Fundamentos',
                        status: 'completed',
                        lessons: [
                            { title: 'O que é JavaScript ', completed: true },
                            { title: 'Operadores', completed: true },
                            { title: 'Eventos (clique, digitação, etc.)', completed: true }
                        ]
                    },
                    {
                        number: 2,
                        title: 'Interatividade na Web',
                        status: 'in-progress',
                        lessons: [
                            { title: 'Manipulando elementos com DOM', completed: true },
                            { title: 'Condições, loops e lógica prática', completed: true }
                        ]
                    }
                ]
            },
            'banco-dados': {
                title: 'Banco de Dados',
                description: 'Aprenda os conceitos essenciais de bancos de dados e domine técnicas para armazenar, gerenciar e consultar informações de forma eficiente.',
                instructor: 'Prof. Yuri Tanaka',
                specialty: 'Banco de Dados especialista',
                duration: '20 minutos',
                students: '200 alunos',
                level: 'Intermediario',
                lessonNumber: 'Aula 8',
                lessonTitle: 'Banco de Dados – Guardando e Organizando Dados',
                lessonDescription: 'Aprenda os conceitos essenciais de bancos de dados e domine técnicas para armazenar, gerenciar e consultar informações de forma eficiente.',
                backgroundImage: 'img-Yuri.png',
                goals: [
                    'O que é um banco de dados e para que serve',
                    'Tabelas, colunas, linhas e chaves',
                    'Comandos básicos: SELECT, INSERT, UPDATE, DELETE',
                    'Relacionamentos entre tabelas'
                ],
                content: [
                    { title: 'O que é um banco de dados e para que serve', duration: '5:45' },
                    { title: 'Tabelas, colunas, linhas e chaves', duration: '8:20' },
                    { title: 'Comandos básicos: SELECT, INSERT, UPDATE, DELETE', duration: '9:15' },
                ],
                modules: [
                    {
                        number: 1,
                        title: 'Introdução',
                        status: 'completed',
                        lessons: [
                            { title: 'Para que serve o banco de dados', completed: true },
                            { title: 'Tabelas, colunas, linhas e chaves', completed: true },
                            { title: 'Comandos básicos', completed: true }
                        ]
                    },
                    {
                        number: 2,
                        title: 'Modelagem',
                        status: 'in-progress',
                        lessons: [
                            { title: 'Relacionamentos entre tabelas', completed: true },
                            { title: 'Criando um mini banco de dados', completed: true }
                        ]
                    }
                ]
            },
            'cpp': {
                title: 'C++',
                description: 'Aprenda uma das linguagens mais poderosas para desenvolvimento de sistemas e jogos.',
                instructor: 'Prof. Prof. João Chad',
                specialty: 'Desenvolvedor Sênior de C++',
                duration: '40 minutos',
                students: '1.456 alunos',
                level: 'Avançado',
                lessonNumber: 'Aula 9',
                lessonTitle: 'Programação e Lógica',
                lessonDescription: 'Domine conceitos avançados de funções em C++, para escrever código mais limpo e eficiente.',
                backgroundImage: 'imagem CSS (3).png',
                goals: [
                    'Tipos de dados, variáveis e operadores',
                    'Condições (if, else) e laços (for, while)',
                    'Funções e escopo',
                    'Arrays, vetores e lógica de programação'
                ],
                content: [
                    { title: 'Entendendo C++', duration: '8:15' },
                    { title: 'Tipos de dados, variáveis e operadores', duration: '7:30' }
                ],
                modules: [
                    {
                        number: 1,
                        title: 'Introdução ao C++',
                        status: 'completed',
                        lessons: [
                            { title: 'Introdução ao C++', completed: true },
                            { title: 'Tipos de dados', completed: true },
                            { title: 'Condições', completed: true }
                        ]
                    },
                    {
                        number: 2,
                        title: 'Funções',
                        status: 'in-progress',
                        lessons: [
                            { title: 'Funções e escopo', completed: true },
                            { title: 'Arrays, vetores e lógica de programação', completed: true },
                        ]
                    }
                ]
            },
            'ingles-basico': {
                title: 'Inglês Básico',
                description: 'Aprenda inglês essencial para programadores e desenvolvedores.',
                instructor: 'Profa. Sarah Johnson',
                specialty: 'English Teacher for Tech',
                duration: '20 minutos',
                students: '3.567 alunos',
                level: 'Básico',
                lessonNumber: 'Aula 2',
                lessonTitle: 'Inglês Básico – Para Quem Quer Entrar na Área de TI',
                lessonDescription: 'Aprenda as palavras e expressões mais importantes em inglês para programação.',
                backgroundImage: 'imagem CSS (3).png',
                goals: [
                    'Inglês técnico: termos comuns na programação',
                    'Frases úteis no dia a dia de quem programa',
                    'Lendo e entendendo documentação em inglês',
                    'Praticando com filmes, músicas e apps'
                ],
                 content: [
                    { title: 'Inglês técnico: termos comuns na programação', duration: '8:15' },
                    { title: 'Frases úteis no dia a dia de quem programa', duration: '7:30' }
                ],
                modules: [
                    {
                        number: 1,
                        title: 'Inglês técnico',
                        status: 'in-progress',
                        lessons: [
                            { title: 'Termos comuns na programação', completed: true },
                            { title: 'Frases úteis no dia a dia', completed: true },
                            { title: 'Lendo e entendendo documentação em inglês', completed: false }
                        ]
                    },
                    {
                        number: 2,
                        title: 'Praticando',
                        status: 'in-progress',
                        lessons: [
                            { title: 'Praticando com filmes, músicas e apps', completed: true },
                            { title: 'Como estudar inglês mesmo sem tempo ou dinheiro', completed: true }
                        ]
                    }
                ]
            }
        };

        this.init();
    }

    init() {
        this.renderCourseSelection();
        this.bindEvents();
        this.updateProgress();
    }

    renderCourseSelection() {
        const courseGrid = document.getElementById('course-grid');
        courseGrid.innerHTML = '';

        Object.keys(this.courses).forEach(courseKey => {
            const course = this.courses[courseKey];
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.onclick = () => this.selectCourse(courseKey);

            courseCard.innerHTML = `
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <div class="course-meta">
                    <span><i class="fas fa-clock"></i> ${course.duration}</span>
                    <span><i class="fas fa-user"></i> ${course.students} alunos</span>
                </div>
            `;

            courseGrid.appendChild(courseCard);
        });
    }

    selectCourse(courseKey) {
        this.currentCourse = courseKey;
        const course = this.courses[courseKey];
        
        // Ocultar seleção de cursos
        document.getElementById('course-selection').style.display = 'none';
        
        // Mostrar conteúdo da aula
        const lessonContent = document.getElementById('lesson-content');
        lessonContent.style.display = 'block';
        
        // Renderizar conteúdo da aula
        this.renderLessonContent(course);
        
        // Atualizar progresso do curso a partir do player e sidebar
        this.syncCourseProgress(courseKey);
        this.updateSidebar(this.courses[courseKey]);
        
        // Mostrar botão voltar
        document.getElementById('back-to-courses').style.display = 'flex';
        
        // Atualizar progresso
        this.updateProgress();
    }

    renderLessonContent(course) {
        const lessonContent = document.getElementById('lesson-content');
        
        lessonContent.innerHTML = `
            <div class="lesson-container">
                <!-- Lesson Tags -->
                <div class="lesson-tags">
                    <span class="tag tag-purple">${course.lessonNumber}</span>
                    <span class="tag tag-green">${course.level}</span>
                </div>

                <!-- Lesson Title -->
                <h1 class="lesson-title">${course.lessonTitle}</h1>
                <p class="lesson-description">
                    ${course.lessonDescription}
                </p>

                <!-- Instructor Info -->
                <div class="instructor-info">
                    <div class="instructor-avatar">
                        <img src="${this.getInstructorImage(this.currentCourse, course)}" alt="${course.instructor}" class="instructor-img" onerror="this.onerror=null;this.src='imagem professora.png';">
                    </div>
                    <div class="instructor-details">
                        <h4>${course.instructor}</h4>
                        <p>${course.specialty}</p>
                    </div>
                    <div class="lesson-meta">
                        <span><i class="far fa-clock"></i> ${course.duration}</span>
                        <span><i class="far fa-user"></i> ${course.students}</span>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="robotechAulas.startVideo()">
                        <i class="fas fa-play"></i>
                        Iniciar aula
                    </button>
                    <button class="btn btn-secondary" onclick="robotechAulas.downloadMaterial()">
                        <i class="fas fa-download"></i>
                        Material de Apoio
                    </button>
                </div>

                <!-- Learning Goals -->
                <div class="learning-goals">
                    <h3>O que você vai aprender</h3>
                    <div class="goals-list">
                        ${course.goals.map(goal => `
                            <div class="goal-item">
                                <i class="fas fa-check"></i>
                                <span>${goal}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Lesson Content -->
                <div class="lesson-content">
                    <h3>Conteúdo da Aula</h3>
                    <div class="content-list">
                        ${course.content.map((item, index) => `
                            <div class="content-item">
                                <div class="content-number">${index + 1}</div>
                                <div class="content-info">
                                    <span class="content-title">${item.title}</span>
                                    <span class="content-duration">${item.duration}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        const container = lessonContent.querySelector('.lesson-container');
        if (container) {
            this.setLessonCover(this.currentCourse, course);
        }
        this.initVideoNotesUI(course);
    }

    updateSidebar(course) {
        const moduleList = document.getElementById('module-list');
        moduleList.innerHTML = '';

        course.modules.forEach(module => {
            const moduleItem = document.createElement('div');
            moduleItem.className = `module-item ${module.status}`;

            let lessonsHtml = '';
            if (module.lessons.length > 0) {
                lessonsHtml = `
                    <div class="lesson-list">
                        ${module.lessons.map(lesson => `
                            <div class="lesson-item ${lesson.completed ? 'completed' : ''}">
                                <i class="${lesson.completed ? 'fas fa-check' : 'far fa-square'}"></i>
                                <span>${lesson.title}</span>
                            </div>
                        `).join('')}
                    </div>
                `;
            }

            moduleItem.innerHTML = `
                <div class="module-header">
                    <span class="module-number">${module.number}</span>
                    <span class="module-title">${module.title}</span>
                    <span class="status-badge ${this.statusClass(module.status)}">
                        ${this.getStatusText(module.status)}
                    </span>
                </div>
                ${lessonsHtml}
            `;

            moduleList.appendChild(moduleItem);
        });
    }

    getStatusText(status) {
        switch(status) {
            case 'completed': return 'completo';
            case 'in-progress': return 'Em progresso';
            case 'locked': return 'Bloqueado';
            default: return 'Bloqueado';
        }
    }

    statusClass(status) {
        switch(status) {
            case 'completed': return 'status-complete';
            case 'in-progress': return 'status-progress';
            case 'locked': return 'status-locked';
            default: return 'status-locked';
        }
    }

    updateProgress() {
        if (!this.currentCourse) return;
        
        const course = this.courses[this.currentCourse];
        let totalLessons = 0;
        let completedLessons = 0;

        course.modules.forEach(module => {
            module.lessons.forEach(lesson => {
                totalLessons++;
                if (lesson.completed) completedLessons++;
            });
        });

        const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = `${progressPercentage}%`;
        }

        const progressInfo = document.querySelector('.progress-info');
        if (progressInfo) {
            const currentModule = course.modules.find(m => m.status === 'in-progress') || course.modules[0];
            progressInfo.innerHTML = `
                <span>Módulo ${currentModule.number} de ${course.modules.length}</span>
                <span>${completedLessons}/${totalLessons} aulas</span>
            `;
        }
    }

    startVideo() {
        const courseKey = this.currentCourse;
        if (courseKey) {
            try {
                const payload = this.buildLessonsPayload(courseKey);
                localStorage.setItem('robotech_lessons_current', JSON.stringify(payload));
            } catch (e) {}
            window.location.href = `player.html?course=${encodeURIComponent(courseKey)}&lesson=1`;
        } else {
            window.location.href = 'player.html';
        }
    }

    initVideoNotesUI(course) {
        // Inicializa vídeo
        const loadBtn = document.getElementById('load-video');
        const urlInput = document.getElementById('video-url');
        const player = document.getElementById('youtube-player');

        if (loadBtn && urlInput && player) {
            loadBtn.onclick = () => {
                const url = urlInput.value.trim();
                const id = this.parseYouTubeId(url);
                if (id) {
                    player.src = `https://www.youtube.com/embed/${id}`;
                } else {
                    alert('URL do YouTube inválida. Cole um link como https://www.youtube.com/watch?v=ID');
                }
            };
        }

        // Inicializa anotações
        const notesArea = document.getElementById('notes-text');
        const saveBtn = document.getElementById('save-notes');
        const clearBtn = document.getElementById('clear-notes');
        const status = document.getElementById('notes-status');

        const key = this.getNotesKey();
        if (notesArea && key) {
            const saved = localStorage.getItem(key);
            if (saved !== null) {
                notesArea.value = saved;
                if (status) status.textContent = 'Salvo';
            }

            if (saveBtn) {
                saveBtn.onclick = () => {
                    localStorage.setItem(key, notesArea.value);
                    if (status) status.textContent = 'Salvo';
                };
            }

            if (clearBtn) {
                clearBtn.onclick = () => {
                    notesArea.value = '';
                    localStorage.removeItem(key);
                    if (status) status.textContent = 'Não salvo';
                };
            }

            notesArea.addEventListener('input', () => {
                if (status) status.textContent = 'Não salvo';
            });
        }
    }

    parseYouTubeId(url) {
        // Suporta formatos: youtu.be/ID, youtube.com/watch?v=ID, youtube.com/embed/ID
        if (!url) return '';
        try {
            const u = new URL(url);
            if (u.hostname === 'youtu.be') {
                return u.pathname.slice(1);
            }
            if (u.hostname.includes('youtube.com')) {
                const v = u.searchParams.get('v');
                if (v) return v;
                const parts = u.pathname.split('/');
                const embedIndex = parts.indexOf('embed');
                if (embedIndex !== -1 && parts[embedIndex + 1]) {
                    return parts[embedIndex + 1];
                }
            }
        } catch (e) {
            // Se não for URL válida, tente regex simples
            const m = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{6,})/);
            if (m) return m[1];
        }
        return '';
    }

    buildLessonsPayload(courseKey) {
        const course = this.courses[courseKey];
        const lessons = [];
        // IDs fixos por curso e por aula (título normalizado via trim)
        const FIXED = {
            'css': {
                'O que é CSS?': 'MyPTheKgh6M',
                'Cores,fontes,tamanhos e alinhamentos': '0vjvtaVknRc',
                'Box Model: margin, padding e border': 'a-gci6g4usE',
                'Layouts com Flexbox e Grid': ['Swo_sCLHKlU', 'IpGFoNYJJU8'],
                'Transições, animações e media queries': 'ZMfNFAPlcpo'
            },
            'gamificacao': {
                'O que é Gamificação?': 'gZDh8MSfy-Y',
                'Elementos dos jogos aplicados fora dos jogo': 'QsJeULfyryw',
                'Gamificação em aplicativos, sites e educação': 'nV9Dm1ljrxg',
                'Como criar um sistema simples de pontos e níveis': '26DaeUOijZE',
                'Dicas práticas para usar gamificação nos estudos': 'kUYbO6ZwV7A'
            },
            'inteligencia-artificial': {
                'O que é Inteligência Artificial?': 'HNBtdyMjxKU',
                'Diferença entre IA': 'wFYAV_Wk5bc',
                'Como uma IA "aprende" com dados': '0PrOA2JK6GQ',
                'Exemplos de IA simples': 'VhC_wAsw2-c',
                'Ética, futuro da IA e como começar a estudar': 'C38xlWnkezQ'
            },
            'javascript': {
                'O que é JavaScript': 'IJvVx2HMbNk',
                'Operadores': ['heABQfqmpnA', '4Y87KSByqOY'],
                'Eventos (clique, digitação, etc.)': 'y5xhkvl2Jmc',
                'Manipulando elementos com DOM': 'xoYFoBtev8A',
                'Condições, loops e lógica prática': 'HiIVg3r40f4'
            },
            'ux-design': {
                'O que é UX e qual a sua importância': 'WAi6ixIfdd4',
                'Princípios básicos de usabilidade': 'R-bzA9oV-4w',
                'Criando fluxos e protótipos simples': 'uZ57s5R4-Jc',
                'Melhorar um site/app': 'gJfKGiaOAAI',
                'Ferramentas e como começar na área': '-VPQpTf91OA'
            },
            'cpp': {
                'Introdução ao C++': '3eMSL39TIuE',
                'O que é C++': '3eMSL39TIuE',
                'Tipos de dados': '2ckX4M3ocdQ',
                'Condições': 'DMZTV4w5xL4',
                'Funções e escopo': 'uB3Gm0QrgRw',
                'Arrays, vetores e lógica de programação': 'poDFFYkp6g4'
            },
            'banco-dados': {
                'Para que serve o banco de dados': 'XfO3TRvESBo',
                'Tabelas, colunas, linhas e chaves': 'kJWX5T0k4pU',
                'Comandos básicos': 'lJH-Ovx6KWA',
                'Relacionamentos entre tabelas': '2cMsNn2D70E',
                'Criando um mini banco de dados': 'LU6tvt3jifo'
            },
            'ingles-basico': {
                'Termos comuns na programação': '0i5489W0GvI',
                'Frases úteis no dia a dia': 'C-Mc6SlvrfM',
                'Lendo e entendendo documentação em inglês': '6LrA3jYeYjM',
                'Praticando com filmes, músicas e apps': 'F-n82BW-3kU',
                'Como estudar inglês mesmo sem tempo ou dinheiro': 'luipyUSgMY4'
            },
            'linguagens': {
                'Fundamentos da Programação': 'O6Ml97iNuKk',
                'Quais linguagens de programação existem': 'YL_MI71CGu8',
                'Algoritmos Básicos': 'JaTf3dhx464',
                'Estruturas de Dados': 'EfF1M7myAyY',
                'Bibliotecas e Frameworks': 'kOt_DdAnMbc'
            }
        };

        const map = FIXED[courseKey] || {};

        if (course && Array.isArray(course.modules)) {
            course.modules.forEach((mod, mi) => {
                if (mod && Array.isArray(mod.lessons)) {
                    mod.lessons.forEach((lesson) => {
                        if (lesson && lesson.title) {
                            const normTitle = (lesson.title || '').trim();
                            let entry = map[normTitle];

                            // Ajuste para títulos que tinham espaços no início
                            if (!entry) {
                                const altTitle = normTitle.replace(/^[-–—\s]+/, '');
                                entry = map[altTitle];
                            }

                            const payloadItem = {
                                title: normTitle,
                                module: (mod.title || `Módulo ${mod.number || mi + 1}`)
                            };

                            if (Array.isArray(entry)) {
                                payloadItem.videos = entry;
                            } else if (typeof entry === 'string') {
                                payloadItem.videoId = entry;
                            } else {
                                payloadItem.videoId = '';
                            }

                            lessons.push(payloadItem);
                        }
                    });
                }
            });
        }
        return {
            courseKey,
            courseTitle: course ? course.title : courseKey,
            lessons
        };
    }

    getCourseMaterialUrl(courseKey) {
        // Mapeamento explícito para arquivos reais na pasta pdfs
        const MAP = {
            'css': 'pdfs/pdfsmaterial-de-apoio-css.pdf',
            'banco-dados': 'pdfs/pdfsmaterial-de-apoio-banco-dados.pdf',
            'cpp': 'pdfs/pdfsmaterial-de-apoio-cpp.pdf',
            'gamificacao': 'pdfs/pdfsmaterial-de-apoio-gamificacao.pdf',
            'ingles-basico': 'pdfs/pdfsmaterial-de-apoio-ingles-basico.pdf',
            'inteligencia-artificial': 'pdfs/pdfsmaterial-de-apoio-inteligencia-artificial.pdf',
            'javascript': 'pdfs/pdfsmaterial-de-apoio-javascript.pdf',
            'linguagens': 'pdfs/pdfsmaterial-de-apoio-linguagens.pdf',
            'ux-design': 'pdfs/pdfsmaterial-de-apoio-ux-design.pdf'
        };
        return MAP[courseKey] || `pdfs/pdfsmaterial-de-apoio-${courseKey}.pdf`;
    }

    getInstructorImage(courseKey, course) {
        const c = course || {};
        if (c.instructorImage) return c.instructorImage;
        const key = (courseKey || this.currentCourse || '').toString().trim();
        if (key) return `imgs/${key}.png`;
        const slug = (c.title || '')
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        return slug ? `imgs/${slug}.png` : 'imagem professora.png';
    }

    getCourseBackground(courseKey, course) {
        // Usa imagem específica por curso na pasta covers, nomeada pelo courseKey
        const key = (courseKey || this.currentCourse || '').toString().trim();
        if (key) return `covers/${key}.png`;
        const c = course || {};
        const slug = (c.title || '')
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        return slug ? `covers/${slug}.png` : 'imagem CSS (3).png';
    }

    setLessonCover(courseKey, course) {
        const container = document.querySelector('.lesson-container');
        if (!container) return;
        const key = (courseKey || this.currentCourse || '').toString().trim();
        const c = course || {};
        const slug = (c.title || '')
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        const candidates = [];
        if (key) {
            candidates.push(
                `covers/${key}.png`, `covers/${key}.jpg`, `covers/${key}.jpeg`, `covers/${key}.webp`, `covers/${key}.png.png`
            );
        }
        if (slug) {
            candidates.push(
                `covers/${slug}.png`, `covers/${slug}.jpg`, `covers/${slug}.jpeg`, `covers/${slug}.webp`
            );
        }
        if (key) {
            candidates.push(
                `imgs/${key}.png`, `imgs/${key}.jpg`, `imgs/${key}.jpeg`, `imgs/${key}.webp`
            );
        }
        // Fallback final para manter layout
        candidates.push('imagem CSS (3).png');

        const tryLoad = (i) => {
            if (i >= candidates.length) return;
            const src = candidates[i];
            const img = new Image();
            img.onload = () => container.style.setProperty('--lesson-cover', `url('${src}')`);
            img.onerror = () => tryLoad(i + 1);
            img.src = src;
        };
        tryLoad(0);
    }

    // ===== Progresso dinâmico (sincroniza com o player) =====
    loadPlayerProgress(courseKey) {
        try {
            const raw = localStorage.getItem(`robotech_player_progress_${courseKey}`);
            return raw ? JSON.parse(raw) : { lessonIndex: 0, done: false };
        } catch (_) { return { lessonIndex: 0, done: false }; }
    }

    getFlatLessons(course) {
        const flat = [];
        if (!course || !Array.isArray(course.modules)) return flat;
        course.modules.forEach((mod, mi) => {
            (mod.lessons || []).forEach((lesson, li) => {
                flat.push({ mi, li, title: lesson.title });
            });
        });
        return flat;
    }

    computeModuleStatuses(course) {
        if (!course || !Array.isArray(course.modules)) return;
        let allPrevCompleted = true;
        course.modules.forEach((mod) => {
            const total = (mod.lessons || []).length;
            const comp = (mod.lessons || []).filter(l => l.completed).length;
            if (total === 0) {
                mod.status = allPrevCompleted ? 'in-progress' : 'locked';
            } else if (comp >= total) {
                mod.status = 'completed';
            } else if (allPrevCompleted) {
                mod.status = 'in-progress';
            } else {
                mod.status = 'locked';
            }
            if (!(comp >= total && total > 0)) {
                allPrevCompleted = false;
            }
        });
    }

    syncCourseProgress(courseKey) {
        const course = this.courses[courseKey];
        if (!course) return;
        const flat = this.getFlatLessons(course);
        const pp = this.loadPlayerProgress(courseKey);
        const completeCount = pp.done ? flat.length : Math.max(0, pp.lessonIndex);
        // Marca concluídas pela posição linear
        for (let i = 0; i < flat.length; i++) {
            const { mi, li } = flat[i];
            const done = i < completeCount;
            if (course.modules[mi] && course.modules[mi].lessons[li]) {
                course.modules[mi].lessons[li].completed = !!done;
            }
        }
        // Recalcula status dos módulos
        this.computeModuleStatuses(course);
        // Atualiza barra de progresso
        this.updateProgress();
    }

    getNotesKey() {
        const course = this.currentCourse || 'geral';
        return `robotech_notes_${course}`;
    }

    async downloadMaterial() {
        // Abre o PDF do material de apoio do curso atual
        const courseKey = this.currentCourse;
        if (!courseKey) {
            alert('Selecione um curso para acessar o material de apoio.');
            return;
        }
        const url = this.getCourseMaterialUrl(courseKey);
        const href = encodeURI(url);

        // Tenta baixar como Blob e abrir via blob: URL para evitar páginas em branco
        try {
            const res = await fetch(href, { cache: 'no-store' });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const blob = await res.blob();
            if (!blob || blob.size === 0) throw new Error('Arquivo vazio');
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.target = '_blank';
            a.rel = 'noopener';
            a.type = 'application/pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
            // Revogar URL após algum tempo para liberar memória
            setTimeout(() => URL.revokeObjectURL(blobUrl), 30_000);
            return;
        } catch (_) {
            // Fallback: abrir diretamente o caminho
            const a = document.createElement('a');
            a.href = href;
            a.target = '_blank';
            a.rel = 'noopener';
            a.type = 'application/pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
        }
    }

    backToCourses() {
        try {
            window.location.href = 'aula.html';
            return;
        } catch(_) {}
        // Fallback local se redirecionamento falhar
        this.currentCourse = null;
        const sel = document.getElementById('course-selection');
        const les = document.getElementById('lesson-content');
        const btn = document.getElementById('back-to-courses');
        if (sel) sel.style.display = 'block';
        if (les) les.style.display = 'none';
        if (btn) btn.style.display = 'none';
        this.updateSidebar(this.courses.css);
        this.updateProgress();
    }

    bindEvents() {
        // Chat flutuante
        const floating = document.getElementById('floating-chat');
        if (floating) {
            floating.onclick = () => {
                const modal = document.getElementById('chat-modal');
                if (modal) {
                    const body = modal.querySelector('.modal-body');
                    if (body) {
                        // Construir URL com contexto da aula
                        let chatbotUrl = 'chatbot.html';
                        if (this.currentCourse) {
                            chatbotUrl += `?course=${encodeURIComponent(this.currentCourse)}`;
                            // Adicionar número da aula se disponível
                            const course = this.courses[this.currentCourse];
                            if (course && course.lessonNumber) {
                                const lessonNum = course.lessonNumber.replace('Aula ', '');
                                chatbotUrl += `&lesson=${encodeURIComponent(lessonNum)}`;
                            }
                        }
                        
                        body.innerHTML = `<iframe src="${chatbotUrl}" title="Chatbot" style="width:100%;height:70vh;border:0;border-radius:12px;background:#0f0f23;"></iframe>`;
                    }
                    modal.style.display = 'block';
                }
            };
        }

        // Fechar modais
        document.getElementById('close-chat').onclick = () => {
            document.getElementById('chat-modal').style.display = 'none';
        };

        document.getElementById('close-video').onclick = () => {
            document.getElementById('video-modal').style.display = 'none';
        };

        // Botão voltar
        document.getElementById('back-to-courses').onclick = () => {
            this.backToCourses();
        };

        // Chat input (somente se existir a UI antiga)
        const sendBtn = document.getElementById('send-message');
        if (sendBtn) {
            sendBtn.onclick = () => this.sendChatMessage();
        }
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.onkeypress = (e) => {
                if (e.key === 'Enter') this.sendChatMessage();
            };
        }

        // Fechar modais clicando fora
        window.onclick = (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        };
    }

    async sendChatMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        if (!message) return;

        const chatMessages = document.getElementById('chat-messages');

        // Adicionar mensagem do usuário
        const userMessage = document.createElement('div');
        userMessage.className = 'message user';
        userMessage.innerHTML = `
            <div class="message-content">${message}</div>
        `;
        chatMessages.appendChild(userMessage);

        // Limpar input
        input.value = '';

        // Mostrar indicador de digitação
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message bot';
        typingIndicator.innerHTML = `
            <div class="message-content">Digitando...</div>
        `;
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Enviar para o backend/IA Gemini
        try {
            // Usar configuração do RoboTech
            const apiUrl = window.RoboTechConfig ? window.RoboTechConfig.getApiUrl() : '/chat';
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });
            const data = await response.json();
            chatMessages.removeChild(typingIndicator);

            const botMessage = document.createElement('div');
            botMessage.className = 'message bot';
            botMessage.innerHTML = `
                <div class="message-content">${data.reply}</div>
            `;
            chatMessages.appendChild(botMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        } catch (error) {
            chatMessages.removeChild(typingIndicator);
            const botMessage = document.createElement('div');
            botMessage.className = 'message bot';
            botMessage.innerHTML = `
                <div class="message-content">Erro ao conectar com a IA.</div>
            `;
            chatMessages.appendChild(botMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

  
}

// Inicializar quando a página carregar
let robotechAulas;
document.addEventListener('DOMContentLoaded', function() {
    robotechAulas = new RoboTechAulas();
    try {
        const sp = new URLSearchParams(window.location.search);
        const course = sp.get('course');
        if (course) {
            robotechAulas.selectCourse(course);
        } else {
            // Sem parâmetro de curso: usar a tela original de seleção
            window.location.replace('aula.html');
        }
    } catch(_) {}
});



