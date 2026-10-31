class MacLiquidPortfolio {
    constructor() {
        this.currentSection = 'inicio';
        this.windowEl = document.getElementById('macWindow');
        this.reopenBanner = document.getElementById('reopenBanner');
        this.modalEl = document.getElementById('projectModal');

        this.projectsData = {
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
            concesionario: {
                title: 'Concesionario de Vehículos',
                category: 'Laravel · Gestión',
                img: './assets/img/concesionario.png',
                desc: 'Sistema integral de gestión de un concesionario de vehículos que abarca control de catálogo, inventario en stock, fichas de automóviles y operaciones de venta.',
                techs: ['Laravel', 'PHP', 'Bootstrap', 'JavaScript', 'Git', 'GitHub', 'MySQL'],
                url: 'https://github.com/zmartinl/Concesionario'
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
            },
            tresEnRaya: {
                title: '3 en raya',
                category: 'Java · Swing',
                img: './assets/img/3enraya.jpg',
                desc: 'Implementación del clásico juego estratégico desarrollado en Java con interfaz gráfica Java Swing y arquitectura orientada a objetos.',
                techs: ['Java', 'Swing', 'POO'],
                url: 'https://github.com/zmartinl/3EnRaya'
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
                if (this.reopenBanner) this.reopenBanner.classList.add('is-visible');
            });
        }

        if (minBtn) {
            minBtn.addEventListener('click', () => {
                this.windowEl.classList.add('is-minimized');
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
        if (!isInitial && sectionKey === this.currentSection) return;
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

        if (window.history && window.history.replaceState) {
            window.history.replaceState(null, '', `#${sectionKey}`);
        }

        const contentEl = document.querySelector('.mac-window-content');
        if (contentEl) contentEl.scrollTop = 0;
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
            repoLinkEl.href = data.url;
            repoLinkEl.target = '_blank';
            repoLinkEl.rel = 'noopener noreferrer';
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
