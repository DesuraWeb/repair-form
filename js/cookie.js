function acceptCookies() {
    // Cache la bannière de consentement des cookies
    var consentFooter = document.getElementById('cookieConsent');
    consentFooter.style.display = 'none';

    // Sauvegarde la préférence de l'utilisateur dans localStorage
    localStorage.setItem('cookieConsent', 'accepted');
}

// Vérifie si l'utilisateur a déjà accepté les cookies
document.addEventListener('DOMContentLoaded', function() {
    if(localStorage.getItem('cookieConsent') === 'accepted') {
        var consentFooter = document.getElementById('cookieConsent');
        consentFooter.style.display = 'none';
    }
});
