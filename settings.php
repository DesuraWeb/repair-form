<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Paramètres</title>
    <script src="https://accounts.google.com/gsi/client" async defer></script>
    <script defer src="js/integration.js"></script>
</head>
<body>
    <div class="container">
        <?php include 'partials/header.php'; ?>

        <main>
            <h1>Paramètres</h1>
            <p>Personnalisez votre expérience.</p>
            <div class="settings">
                <section>
                    <h2>Préférences</h2>
                    <div class="setting-option">
                        <label for="theme">Thème :</label>
                        <select id="theme" name="theme">
                            <option value="light">Clair</option>
                            <option value="dark">Sombre</option>
                        </select>
                    </div>
                    <div class="setting-option">
                        <label for="notifications">Notifications :</label>
                        <input type="checkbox" id="notifications" name="notifications"> Activer
                    </div>
                </section>
            </div>
            <div class="settings-section">
                <label for="languageSelector">Choisir la langue :</label>
                <select id="languageSelector">
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="es">Español</option>
                </select>
            </div>
            <!-- Bouton de connexion Google Identity Services -->
            <div id="g_id_onload"
                 data-client_id="452088252354-oogifa80c0js1qlo7nj1vv8d9ffclmn3.apps.googleusercontent.com"
                 data-auto_select="true"
                 data-auto_prompt="false"
                 data-scope="https://www.googleapis.com/auth/spreadsheets"
                 data-callback="handleCredentialResponse"> 
            </div>
            <div class="g_id_signin"
                 data-type="standard"
                 data-shape="rectangular"
                 data-theme="outline"
                 data-text="sign_in_with"
                 data-size="large"
                 data-logo_alignment="center"></div>
                 <div class="container">
                    <header class="app-header">
                        <h1>Intégration Google Sheets</h1>
                    </header>
                    <main>
                        <div id="status">
                            <p>État de l'intégration : <span id="integrationStatus">Non activé</span></p>
                        </div>
                        <button id="activateIntegration">Activer l'intégration</button>
                    </main>
                </div>
            <button type="button" id="saveSettings">Sauvegarder les paramètres</button>
            <a href="index.php" class="back-to-dashboard">Retour au tableau de bord</a>
        </main>
        <?php include 'partials/footer.php'; ?>
    </div>
    <script src="js/gsi.js"></script>
    <script src="js/integration.js"></script>
</body>
</html>
