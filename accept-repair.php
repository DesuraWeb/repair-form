<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Acceptation de la réparation</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/signature_pad/1.5.3/signature_pad.min.js"></script>
</head>
<body>
    <div class="container">
        <?php include 'partials/header.php'; ?>

        <main>
            <h1>Récapitulatif</h1>
            <div class="summary">
                <p>Nom : <span id="summaryName"></span></p>
                <p>Email : <span id="summaryEmail"></span></p>
                <p>Numéro de téléphone : <span id="summaryPhone"></span></p>
                <p>Modèle du téléphone : <span id="summaryModel"></span></p>
                <p>Type de réparation : <span id="summaryRepairType"></span></p>
                <p>Tarif prévisionnel : <span id="summaryEstimatedPrice"></span></p>
                <div id="disclaimer">
                    <p>En acceptant cette réparation, je décharge l’entreprise STUFF 2.0, de toute responsabilité pour tout dommage ou perte de données causé à mon smartphone durant la procédure de réparation.<br><br>
                    Je comprends que les réparations peuvent comporter des risques et j’accepte de les prendre en compte en confiant mon appareil à l’entreprise.</p>
                </div>
                <h4>Signature</h4>
                <div class="signature-container">
                    <div id="signature-pad" class="signature-pad">
                        <canvas id="signature-canvas"></canvas>
                        <button type="button" id="clear">
                            <img src="assets/images/svg/create-repair/clean.svg" alt="Effacer" style="width: 20px; height: 20px; vertical-align: middle;">
                        </button>
                    </div>
                </div>             
                <button id="validateButton" class="start-button">Valider</button>
            </div>
        </main>
        <?php include 'partials/footer.php'; ?>
    </div>

    <script src="js/retrieveData.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var canvas = document.getElementById('signature-canvas');
            var signaturePad = new SignaturePad(canvas);
    
            // Bouton pour effacer la signature
            document.getElementById('clear').addEventListener('click', function () {
                signaturePad.clear();
            });
    
            document.getElementById('validateButton').addEventListener('click', function() {
                if (!signaturePad.isEmpty()) {
                    var signatureData = signaturePad.toDataURL('image/png');
                    localStorage.setItem('signatureImage', signatureData);
                    // Redirection ou autre logique ici après la sauvegarde
                    window.location.href = 'complete.php';
                } else {
                    alert('Veuillez fournir une signature avant de valider.');
                }
            });
        });
    </script>
</body>
</html>
