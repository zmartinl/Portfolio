window.addEventListener('load', () => {
    const tresEnRaya = document.getElementById('tresEnRaya');
    const bizum = document.getElementById('bizum');
    const reservaLibros = document.getElementById('reservaLibros');
    const guards = document.getElementById('guardsEVG');
    const concesionario = document.getElementById('concesionario');
    const taskManager = document.getElementById('taskManager');
    const menuBtn = document.getElementById('menu-btn');
    const nav = document.querySelector('header nav');


    tresEnRaya.addEventListener('click', () => {
        window.location.href = 'https://github.com/zmartinl/3EnRaya';
    });

    bizum.addEventListener('click', () => {
        window.location.href = 'https://github.com/zmartinl/Bizum';
    });

    guards.addEventListener('click', () => {
        window.location.href = 'https://github.com/jcarrozadev/tfc_evg';
    });

    reservaLibros.addEventListener('click', () => {
        window.location.href = 'https://github.com/zmartinl/ZeusReservaLibros';
    });

    concesionario.addEventListener('click', () => {
        window.location.href = 'https://github.com/zmartinl/Concesionario';
    });

    taskManager.addEventListener('click', () => {
        window.location.href = 'https://github.com/zmartinl/TaskManager';
    });

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            console.log('Menu button clicked');
            
            nav.classList.toggle('activo');
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('activo');
            });
        });
    }
});