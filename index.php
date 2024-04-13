<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tableau de bord</title>
    <script src="js/splash.js"></script>
</head>
<body>
<div id="splash-screen" class="splash-screen">
        <img src="assets/images/icon-192x192.png" alt="Logo" id="logo">
        <div class="loading-dot">...</div>
    </div>

    <div class="container hidden" id="main-content">
        <?php include 'partials/header.php'; ?>
        
        <main>
            <h1>Tableau de bord</h1>
            <p>Veuillez sélectionner une catégorie pour votre demande</p>
            <div class="options">
                <a href="create-repair.php" class="option active">
                    <img src="assets/images/svg/icon.svg" alt="Formulaire de Prise en Charge" width="40" height="40"/>
                    Formulaire de Prise en Charge
                </a>
                <a href="#" class="option">
                    <img src="assets/images/svg/icon2.svg" alt="Modifier Dossier" />
                    Modifier Dossier
                </a>
                <a href="integration.php" class="option">
                    <img src="assets/images/svg/icon2.svg" alt="Intégrations" />
                    Intégrations
                </a>
                <a href="settings.php" class="option">
                    <img src="assets/images/svg/icon2.svg" alt="Paramètres" />
                    Paramètres
                </a>
            </div>
        </main>
        <?php include 'partials/footer.php'; ?>

        <footer id="cookieConsent">
            <p>En utilisant ce service, vous acceptez les <a href="https://desura.fr/mentions-legales" target="_blank">Mentions légales</a> et la <a href="https://desura.fr/politique-de-confidentialite" target="_blank">Politique de confidentialité</a>.</p>
            <button class="start-button" onclick="acceptCookies()">Accepter</button>
        </footer>
        
    </div>
    <script>
        if (typeof navigator.serviceWorker !== 'undefined') {
          navigator.serviceWorker.register('sw.js')
        }
    </script>
    <script src="js/cookie.js"></script>
</body>
</html>
