window.addEventListener('load', () => {
    const tresEnRaya = document.getElementById('tresEnRaya');
    const bizum = document.getElementById('bizum');

    tresEnRaya.addEventListener('click', () => {
        window.location.href = 'https://github.com/zmartinl/3EnRaya';
    });

    bizum.addEventListener('click', () => {
        window.location.href = 'https://github.com/zmartinl/Bizum';
    });
});