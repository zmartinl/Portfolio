class PortfolioUI {
    constructor() {
        this.menuBtn = document.querySelector('[data-menu-toggle]');
        this.nav = document.querySelector('[data-nav]');
        this.initMenu();
    }

    initMenu() {
        if (this.menuBtn && this.nav) {
            this.menuBtn.addEventListener('click', () => {
                this.nav.classList.toggle('header__nav--open');
            });

            this.nav.querySelectorAll('a').forEach((link) => {
                link.addEventListener('click', () => {
                    this.nav.classList.remove('header__nav--open');
                });
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PortfolioUI();
});
