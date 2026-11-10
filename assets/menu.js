class MacLiquidPortfolio {
    constructor() {
        this.currentSection = 'inicio';
        this.windowEl = document.getElementById('macWindow');
        this.reopenBanner = document.getElementById('reopenBanner');
        this.modalEl = document.getElementById('projectModal');

        this.projectsData = {
            minutIA: {
                title: 'MinutIA Suite',
                category: 'Laravel · NativePHP · IA Local',
                img: './assets/img/minutia.png',
                desc: 'Suite de escritorio para transcripción inteligente y minutado automático de grabaciones de audio mediante modelos locales de IA Whisper (100% offline y privado). Cuenta con organización por carpetas, extracción de clips, compatibilidad con múltiples formatos de audio y arquitectura orientada a producto comercial.',
                techs: ['NativePHP', 'Laravel', 'Whisper AI', 'PHP', 'SQLite', 'JavaScript', 'Audio Processing'],
                url: null,
                privateLabel: 'Repositorio Privado · Producto Comercial'
            },
            planosVsdx: {
                title: 'Conversor de Planos Manuales → VSDX',
                category: 'Visión · Full-Stack · Visio',
                img: './assets/img/planos-vsdx.jpg',
                desc: 'Herramienta inteligente que analiza planos hechos a mano mediante un modelo para detectar puntos de red (simples y múltiples), permite calibrar su posición exacta sobre el plano con editor Drag & Drop, zoom y gestión de etiquetas, y genera automáticamente un archivo Microsoft Visio (.vsdx) pasado a limpio.',
                techs: ['Modelo Visión', 'Generación .VSDX', 'JavaScript', 'Drag & Drop', 'Calibración XY', 'Full-Stack'],
                url: null,
                privateLabel: 'Repositorio Privado'
            },
            guardsEVG: {
                title: 'Gestor de Guardias',
                category: 'Laravel · TFG',
                img: './assets/img/guards.png',
                desc: 'Herramienta web completa para organizar, asignar y coordinar guardias de profesores en centros educativos. Incluye gestión de horarios, ausencias, cuadrantes y notificaciones.',
                techs: ['Laravel', 'PHP', 'Bootstrap', 'JavaScript', 'Git', 'GitHub', 'MySQL'],
                url: 'https://github.com/jcarrozadev/tfc_evg'
            },
            taskManager: {
                title: 'TaskManager',
                category: 'Laravel · Full-Stack',
                img: './assets/img/taskManager.png',
                desc: 'Aplicación web orientada a la gestión ágil de tareas y proyectos, con tableros interactivos, estados de avance, prioridades y métricas de progreso.',
                techs: ['Laravel', 'PHP', 'Bootstrap', 'JavaScript', 'Git', 'GitHub', 'MySQL'],
                url: 'https://github.com/zmartinl/TaskManager'
            },
            reservaLibros: {
                title: 'Reserva de Libros',
                category: 'PHP · Base de Datos',
                img: './assets/img/reservaLibros.jpg',
                desc: 'Aplicación para gestionar préstamos, devoluciones, usuarios y catálogo de libros en una biblioteca con base de datos relacional.',
                techs: ['PHP', 'MySQL', 'HTML5', 'CSS3'],
                url: 'https://github.com/zmartinl/ZeusReservaLibros'
            },
            bizum: {
                title: 'Bizum',
                category: 'Java · Base de Datos',
                img: './assets/img/bizum.jpg',
                desc: 'Simulación de pagos móviles inmediatos entre usuarios con autenticación, transferencias en tiempo real, balance de cuenta e historial transaccional.',
                techs: ['Java', 'SQL', 'POO'],
                url: 'https://github.com/zmartinl/Bizum'
            }
        };

        this.sectionLabels = {
            'inicio': 'Inicio',
            'sobre-mi': 'Sobre mí',
            'proyectos': 'Proyectos',
            'habilidades': 'Habilidades',
            'experiencia': 'Experiencia',
            'contacto': 'Contacto'
        };

        this.initTrafficLights();
        this.initDockNavigation();
        this.initProjectFilters();
        this.initQuickLook();
        this.initCopyButtons();
        this.checkInitialHash();
    }

    initTrafficLights() {
        const closeBtn = document.getElementById('btnTrafficClose');
        const minBtn = document.getElementById('btnTrafficMinimize');
        const maxBtn = document.getElementById('btnTrafficMaximize');
        const reopenBtn = document.getElementById('btnReopenWindow');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.windowEl.classList.add('is-closed');
                document.body.classList.add('is-window-hidden');
                if (this.reopenBanner) this.reopenBanner.classList.add('is-visible');
            });
        }

        if (minBtn) {
            minBtn.addEventListener('click', () => {
                this.windowEl.classList.add('is-minimized');
                document.body.classList.add('is-window-hidden');
                if (this.reopenBanner) this.reopenBanner.classList.add('is-visible');
            });
        }

        if (maxBtn) {
            maxBtn.addEventListener('click', () => {
                this.windowEl.classList.toggle('is-maximized');
            });
        }

        if (reopenBtn) {
            reopenBtn.addEventListener('click', () => {
                this.restoreWindow();
            });
        }
    }

    restoreWindow() {
        if (!this.windowEl) return;
        this.windowEl.classList.remove('is-closed');
        this.windowEl.classList.remove('is-minimized');
        document.body.classList.remove('is-window-hidden');
        if (this.reopenBanner) this.reopenBanner.classList.remove('is-visible');
    }

    initDockNavigation() {
        document.querySelectorAll('[data-dock-nav]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const target = btn.getAttribute('data-dock-nav');
                this.goToSection(target);
            });
        });

        document.querySelectorAll('[data-direct-nav]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('data-direct-nav');
                this.goToSection(target);
            });
        });
    }

    goToSection(sectionKey, isInitial = false) {
        const isHidden = this.windowEl && (this.windowEl.classList.contains('is-closed') || this.windowEl.classList.contains('is-minimized'));
        if (!isInitial && !isHidden && sectionKey === this.currentSection) return;
        this.restoreWindow();

        const targetPanel = document.getElementById(`section-${sectionKey}`);
        if (!targetPanel) return;

        this.currentSection = sectionKey;

        document.querySelectorAll('.mac-section-panel').forEach(panel => {
            panel.classList.toggle('is-active', panel.id === `section-${sectionKey}`);
        });

        document.querySelectorAll('[data-dock-nav]').forEach(btn => {
            btn.classList.toggle('is-active', btn.getAttribute('data-dock-nav') === sectionKey);
        });

        const titleEl = document.querySelector('.mac-window__title');
        if (titleEl) {
            const label = this.sectionLabels[sectionKey] || 'Portfolio';
            titleEl.textContent = `Zeus Martín — ${label}`;
        }

        if (window.history && window.history.replaceState) {
            window.history.replaceState(null, '', `#${sectionKey}`);
        }

        const contentEl = document.querySelector('.mac-window-content');
        if (contentEl) contentEl.scrollTop = 0;
        window.scrollTo(0, 0);
    }

    checkInitialHash() {
        const hash = window.location.hash.replace('#', '');
        const valid = ['inicio', 'sobre-mi', 'proyectos', 'habilidades', 'experiencia', 'contacto'];
        if (valid.indexOf(hash) !== -1) {
            this.goToSection(hash, true);
        } else {
            this.goToSection('inicio', true);
        }
    }

    initProjectFilters() {
        const pills = document.querySelectorAll('[data-filter]');
        const cards = document.querySelectorAll('.project-glass-card');

        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                const category = pill.getAttribute('data-filter');

                pills.forEach(p => p.classList.toggle('is-active', p === pill));

                cards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    const isVisible = category === 'all' || cardCategory === category;
                    card.classList.toggle('is-hidden', !isVisible);
                });
            });
        });
    }

    initQuickLook() {
        document.querySelectorAll('[data-quick-look]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const key = btn.getAttribute('data-quick-look');
                this.openModal(key);
            });
        });

        document.querySelectorAll('.project-glass-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('a')) return;
                const key = card.getAttribute('data-project-key');
                if (key) this.openModal(key);
            });
        });

        const closeBtn = document.getElementById('modalCloseBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        if (this.modalEl) {
            this.modalEl.addEventListener('click', (e) => {
                if (e.target === this.modalEl) this.closeModal();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modalEl && this.modalEl.classList.contains('is-open')) {
                this.closeModal();
            }
        });
    }

    openModal(projectKey) {
        const data = this.projectsData[projectKey];
        if (!data || !this.modalEl) return;

        const titleEl = document.getElementById('modalProjectTitle');
        const imgEl = document.getElementById('modalProjectImg');
        const descEl = document.getElementById('modalProjectDesc');
        const techsEl = document.getElementById('modalProjectTechs');
        const repoLinkEl = document.getElementById('modalProjectRepo');

        if (titleEl) titleEl.textContent = `${data.title} — ${data.category}`;
        if (imgEl) {
            imgEl.src = data.img;
            imgEl.alt = data.title;
        }
        if (descEl) descEl.textContent = data.desc;
        if (techsEl) {
            techsEl.innerHTML = '';
            data.techs.forEach(t => {
                const chip = document.createElement('span');
                chip.className = 'crystal-chip';
                chip.textContent = t;
                techsEl.appendChild(chip);
            });
        }
        if (repoLinkEl) {
            if (data.url) {
                repoLinkEl.href = data.url;
                repoLinkEl.target = '_blank';
                repoLinkEl.rel = 'noopener noreferrer';
                repoLinkEl.classList.remove('liquid-glass-btn--private');
                repoLinkEl.removeAttribute('aria-disabled');
                repoLinkEl.innerHTML = '<span>Abrir Repositorio en GitHub</span><i class="fa-solid fa-arrow-up-right-from-square"></i>';
            } else {
                const privateLabel = data.privateLabel || 'Repositorio Privado';
                repoLinkEl.removeAttribute('href');
                repoLinkEl.removeAttribute('target');
                repoLinkEl.removeAttribute('rel');
                repoLinkEl.classList.add('liquid-glass-btn--private');
                repoLinkEl.setAttribute('aria-disabled', 'true');
                repoLinkEl.innerHTML = `<i class="fa-solid fa-lock"></i><span>${privateLabel}</span>`;
            }
        }

        this.modalEl.classList.add('is-open');
    }

    closeModal() {
        if (this.modalEl) this.modalEl.classList.remove('is-open');
    }

    initCopyButtons() {
        document.querySelectorAll('[data-copy-text]').forEach(btn => {
            btn.addEventListener('click', () => {
                const val = btn.getAttribute('data-copy-text');
                if (navigator.clipboard && val) {
                    navigator.clipboard.writeText(val);
                    const originalTitle = btn.getAttribute('title') || '';
                    btn.setAttribute('title', '¡Copiado!');
                    setTimeout(() => {
                        btn.setAttribute('title', originalTitle);
                    }, 2000);
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MacLiquidPortfolio();
});
