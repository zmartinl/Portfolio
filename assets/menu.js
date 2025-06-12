const menuBtn = document.getElementById('menu-btn');
const nav = document.querySelector('header nav');

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