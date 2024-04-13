<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prise en charge complète</title>
    <link rel="stylesheet" href="assets/css/style.css"> <!-- Assurez-vous que le chemin est correct -->
</head>
<body>
    <div class="container">
    <?php include 'partials/header.php'; ?>

        <main>
            <div id="repairSummary" class="summary">
                <p>Nom: <span id="completeName"></span></p>
                <p>Email: <span id="completeEmail"></span></p>
                <p>Numéro de téléphone: <span id="completePhone"></span></p>
                <p>Modèle du téléphone: <span id="completeModel"></span></p>
                <p>Type de réparation: <span id="completeRepairType"></span></p>
                <p>Tarif prévisionnel: <span id="completeEstimatedPrice"></span></p>
                <p>Information de déverrouillage : <span id="completeUnlockInfo"></span></p>
                <canvas id="patternCanvas" width="200" height="200" style="border:1px solid #000;"></canvas>
                <div id="signaturePad" class="signature-pad"></div> <!-- La signature sera affichée ici -->
            </div>
            <button id="printButton" class="start-button" onclick="window.print();">Imprimer</button>
        </main>
        <?php include 'partials/footer.php'; ?>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const repairData = JSON.parse(localStorage.getItem('repairFormData'));
            const patternCode = localStorage.getItem('patternUnlockCode');
            const signatureImage = localStorage.getItem('signatureImage'); // Assurez-vous que c'est la clé correcte

            if (repairData) {
                document.getElementById('completeName').textContent = repairData.fullname;
                document.getElementById('completeEmail').textContent = repairData.email;
                document.getElementById('completePhone').textContent = repairData.phone;
                document.getElementById('completeModel').textContent = repairData.model;
                document.getElementById('completeRepairType').textContent = mapRepairType(repairData.repairType);
                document.getElementById('completeEstimatedPrice').textContent = repairData.estimatedPrice + ' €';

                let unlockDisplay = repairData.unlockType === 'pin' ? 'Code PIN: ' + repairData.pinCode : 'Schéma défini';
                document.getElementById('completeUnlockInfo').textContent = unlockDisplay;
            }

            if (patternCode) {
                drawPattern(patternCode);
            }

            if (signatureImage) {
                const img = new Image();
                img.src = signatureImage;
                document.getElementById('signaturePad').appendChild(img);
            }
        });

        function drawPattern(pattern) {
            const canvas = document.getElementById('patternCanvas');
            if (!canvas.getContext) return; // Canvas not supported
            const ctx = canvas.getContext('2d');

            // Clear canvas before drawing
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Assuming the pattern lock is a 3x3 grid
            const gridSize = 3;
            const cellSize = canvas.width / gridSize;
            let previousX, previousY;

            pattern.split('').forEach((digit, index) => {
                const x = ((digit - 1) % gridSize) * cellSize + cellSize / 2;
                const y = Math.floor((digit - 1) / gridSize) * cellSize + cellSize / 2;

                if (index === 0) {
                    ctx.beginPath();
                    ctx.arc(x, y, cellSize / 8, 0, 2 * Math.PI);
                    ctx.fillStyle = 'green';
                    ctx.fill();
                } else {
                    ctx.beginPath();
                    ctx.moveTo(previousX, previousY);
                    ctx.lineTo(x, y);
                    ctx.strokeStyle = '#000';
                    ctx.lineWidth = 2;
                    ctx.stroke();

                    // Draw arrow at the end of the line
                    drawArrow(ctx, previousX, previousY, x, y);
                }

                if (index === pattern.length - 1) {
                    ctx.beginPath();
                    ctx.arc(x, y, cellSize / 8, 0, 2 * Math.PI);
                    ctx.fillStyle = 'red';
                    ctx.fill();
                }

                previousX = x;
                previousY = y;
            });
        }

        function drawArrow(ctx, fromx, fromy, tox, toy) {
            var headlen = 10; // length of head in pixels
            var dx = tox - fromx;
            var dy = toy - fromy;
            var angle = Math.atan2(dy, dx);
            ctx.moveTo(fromx, fromy);
            ctx.lineTo(tox, toy);
            ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
            ctx.moveTo(tox, toy);
            ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
            ctx.stroke();
        }

        function mapRepairType(repairType) {
            const types = {
                "screen": "Écran",
                "battery": "Batterie",
                "charging_connector": "Connecteur de charge",
                "earpiece": "Écouteur",
                "loudspeaker": "Haut-parleur",
                "vibrator": "Vibreur",
                "rear_glass": "Vitre Arrière",
                "chassis": "Châssis",
                "bluetooth_wifi": "Bluetooth / Wifi",
                "front_camera": "Appareil Photo Avant",
                "rear_camera": "Appareil Photo Arrière",
            };
            return types[repairType] || "Type inconnu";
        }
    </script>
</body>
</html>
