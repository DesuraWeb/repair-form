<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RepairForm.app</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="manifest" href="manifest.json">
    <link href="https://fonts.googleapis.com/css?family=Comfortaa&display=swap" rel="stylesheet">
    <script src="js/jquery.js" charset="utf-8"></script>
    <!-- Autres balises meta ou liens CSS/JS -->
</head>
<body>
<header class="app-header">
            <img src="assets/images/svg/logo.svg" alt="Logo" class="app-logo"/>
            <button id="qrScanButton" onclick="startQRScan()">
                <img src="assets/images/svg/qr-scan-icon.svg" alt="Scan QR code" class="qr-scan-icon" />
            </button>
        </header>
