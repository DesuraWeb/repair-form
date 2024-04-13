document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const splash = document.getElementById('splash-screen');
        const mainContent = document.getElementById('main-content');

        splash.style.opacity = 0;
        splash.style.transition = 'opacity 0.5s ease-out';

        setTimeout(() => {
            splash.style.display = 'none';
            mainContent.classList.remove('hidden');
        }, 500);
    }, 2000);  // Durée de l'affichage du splash screen
});
