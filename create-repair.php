<!DOCTYPE html>
<html lang="fr">
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Vider le localStorage à chaque chargement de la page
            localStorage.removeItem('repairFormData');
        });
        </script>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Créer un dossier de réparation</title>
    <link rel="stylesheet" href="assets/css/patternlock.min.css">
</head>
<!-- Popup Structure -->
<div id="infoPopup" class="popup-container" style="display: none;">
    <div class="popup">
        <h2><img src="assets/images/svg/create-repair/warning.svg" alt="Info" class="popup-icon"> Infos utiles</h2>
        <p>Pour le moment, sans intégrations ajoutées, la seule fonctionnalité disponible sera d'imprimer la prise en charge.</p>
        <p>Consultez les <a href="integrations.php">intégrations</a> possibles pour ajouter des fonctionnalités.</p>
        <p>Il est important de configurer la page <a href="settings.php">paramètres</a> avant d'envoyer un formulaire pour assurer le bon paramétrage de l'application.</p>
        <p>Fonctionnalités prochainement disponibles :</p>
        <ul>
            <li>Exportation vers Google Drive</li>
            <li>Envoi par mail</li>
            <li>Intégration Qualirepar</li>
        </ul>
        <button onclick="closePopup()">Fermer</button>
    </div>
</div>
<body>
    <div class="container">
        <?php include 'partials/header.php'; ?>

        <main>
            <h1>Prise en charge</h1>
            <p>Veuillez remplir tous les champs pour soumettre un dossier</p>
            <form id="repairForm">
                <div class="input-container">
                    <img src="assets/images/svg/create-repair/contact.svg" alt="Infos" class="input-icon">
                    <input type="text" id="fullname" name="fullname" placeholder="Nom / Prénom" required>
                </div>
                <div class="input-container">
                    <img src="assets/images/svg/create-repair/mail.svg" alt="Email" class="input-icon">
                <input type="email" id="email" name="email" placeholder="Email" required>
                </div>
                <div class="input-container">
                    <img src="assets/images/svg/create-repair/call.svg" alt="Tel" class="input-icon">
                <input type="tel" id="phone" name="phone" placeholder="Numéro de téléphone" required>
                </div>

                <form id="repairForm">
                    <div class="input-container">
                        <img src="assets/images/svg/create-repair/lock.svg" alt="" class="input-icon">
                        <select id="unlockType" name="unlockType" class="styled-select" required>
                    <option value="pin">Code PIN</option>
                    <option value="pattern">Schéma</option>
                </select>
            </div>
            
            <div class="input-container">
                <img src="assets/images/svg/create-repair/code.svg" alt="verrouillage" class="input-icon">
                <input type="text" id="pinCode" name="pinCode" placeholder="Code de déverrouillage" style="display:none;" inputmode="numeric" pattern="\d*" title="Uniquement des chiffres.">
            </div>

                <div id="patternContainer" style="display:none;">
                    <svg class="patternlock" id="lock" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="250" height="250">
                        <g class="lock-actives"></g>
                        <g class="lock-lines"></g>
                        <g class="lock-dots">
                            <circle cx="20" cy="20" r="2"/>
                            <circle cx="50" cy="20" r="2"/>
                            <circle cx="80" cy="20" r="2"/>
                            <circle cx="20" cy="50" r="2"/>
                            <circle cx="50" cy="50" r="2"/>
                            <circle cx="80" cy="50" r="2"/>
                            <circle cx="20" cy="80" r="2"/>
                            <circle cx="50" cy="80" r="2"/>
                            <circle cx="80" cy="80" r="2"/>
                        </g>
                    </svg>
                </div>

                <input type="hidden" id="unlockPattern" name="unlockPattern">
                
                <div class="input-container">
                    <img src="assets/images/svg/create-repair/list.svg" alt="Modele" class="input-icon">
                    <input type="text" id="model" name="model" placeholder="Modèle du téléphone" required autocomplete="off">
                </div>                

                <div class="input-container">
                    <img src="assets/images/svg/create-repair/add.svg" alt="" class="input-icon">
                <select id="repairType" name="repairType" class="styled-select" required>
                    <option value="">Type de réparation</option>
                    <option value="screen">Écran</option>
                    <option value="battery">Batterie</option>
                    <option value="charging_connector">Connecteur de charge</option>
                    <option value="earpiece">Écouteur</option>
                    <option value="loudspeaker">Haut-parleur</option>
                    <option value="vibrator">Vibreur</option>
                    <option value="rear_glass">Vitre Arrière</option>
                    <option value="chassis">Chassis</option>
                    <option value="bluetooth_wifi">Bluetooth / Wifi</option>
                    <option value="front_camera">Appareil Photo Avant</option>
                    <option value="rear_camera">Appareil Photo Arrière</option>
                </select>
                </div>
                <div class="input-container">
                    <img src="assets/images/svg/create-repair/cost.svg" alt="prix" class="input-icon">
                    <input type="text" id="estimatedPrice" name="estimatedPrice" placeholder="Tarif prévisionnel" inputmode="numeric" pattern="\d*" title="Uniquement des chiffres.">
                </div>
                <button type="submit" class="submit-button">Continuer</button>
            </form>
            <a href="index.php" class="back-to-dashboard">Retour au tableau de bord</a>
        </main>
        <?php include 'partials/footer.php'; ?>
    </div>
        <script src="js/patternlock.min.js"></script>
</body>
</html>
