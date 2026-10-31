window.addEventListener('load', () => {
    const tresEnRaya = document.getElementById('tresEnRaya');
    const bizum = document.getElementById('bizum');
    const reservaLibros = document.getElementById('reservaLibros');
    const guards = document.getElementById('guardsEVG');
    const concesionario = document.getElementById('concesionario');
    const taskManager = document.getElementById('taskManager');
    const menuBtn = document.getElementById('menu-btn');
    const nav = document.querySelector('header nav');

    if (tresEnRaya) {
        tresEnRaya.addEventListener('click', () => {
            window.open('https://github.com/zmartinl/3EnRaya', '_blank', 'noopener,noreferrer');
        });
    }

    if (bizum) {
        bizum.addEventListener('click', () => {
            window.open('https://github.com/zmartinl/Bizum', '_blank', 'noopener,noreferrer');
        });
    }

    if (guards) {
        guards.addEventListener('click', () => {
            window.open('https://github.com/jcarrozadev/tfc_evg', '_blank', 'noopener,noreferrer');
        });
    }

    if (reservaLibros) {
        reservaLibros.addEventListener('click', () => {
            window.open('https://github.com/zmartinl/ZeusReservaLibros', '_blank', 'noopener,noreferrer');
        });
    }

    if (concesionario) {
        concesionario.addEventListener('click', () => {
            window.open('https://github.com/zmartinl/Concesionario', '_blank', 'noopener,noreferrer');
        });
    }

    if (taskManager) {
        taskManager.addEventListener('click', () => {
            window.open('https://github.com/zmartinl/TaskManager', '_blank', 'noopener,noreferrer');
        });
    }

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('activo');
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('activo');
            });
        });
    }
});
