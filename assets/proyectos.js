class ProjectsShowcase {
    constructor() {
        this.cards = document.querySelectorAll('[data-project-url]');
        this.filterButtons = document.querySelectorAll('[data-filter]');

        this.bindProjectCards();
        this.bindFilters();
    }

    bindProjectCards() {
        this.cards.forEach((card) => {
            card.addEventListener('click', (event) => {
                const clickedAnchor = event.target.closest('a');
                const projectUrl = card.getAttribute('data-project-url');

                if (!clickedAnchor && projectUrl) {
                    window.open(projectUrl, '_blank', 'noopener,noreferrer');
                }
            });
        });
    }

    bindFilters() {
        this.filterButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const selectedCategory = button.getAttribute('data-filter');

                this.filterButtons.forEach((btn) => {
                    btn.classList.toggle('glass-pill-btn--active', btn === button);
                });

                this.cards.forEach((card) => {
                    const cardCategory = card.getAttribute('data-category');
                    const shouldShow = selectedCategory === 'all' || cardCategory === selectedCategory;
                    card.classList.toggle('album-card--hidden', !shouldShow);
                });
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProjectsShowcase();
});
