document.getElementById('repairForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const device = document.getElementById('device').value;
    const problem = document.getElementById('problem').value;
    console.log(`Demande de réparation pour: ${device}, Problème: ${problem}`);
    // Ici, vous pouvez ajouter une logique pour envoyer les données à un serveur ou les traiter localement.
});
