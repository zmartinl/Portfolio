window.addEventListener('load', () => {
    const tresEnRaya = document.getElementById('tresEnRaya');
    const bizum = document.getElementById('bizum');
    const reservaLibros = document.getElementById('reservaLibros');
    const guards = document.getElementById('guardsEVG');

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
});