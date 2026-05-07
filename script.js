window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();

        if(rect.top < window.innerHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0px)';
        }
    });
});

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {

    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');

});

/* Zatvaranje menija kada klikneš link */

document.querySelectorAll('.nav-links a').forEach(link => {

    link.addEventListener('click', () => {

        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');

    });

});