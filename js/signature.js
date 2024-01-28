// signature.js

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('signature-canvas');
    const signaturePad = new SignaturePad(canvas); // Initialisation de SignaturePad

    // Configurer les options de SignaturePad ici, si nécessaire
    // Exemple : signaturePad.minWidth = 1; signaturePad.maxWidth = 3;
    
    document.getElementById('save-signature').addEventListener('click', () => {
        if (!signaturePad.isEmpty()) {
            // Sauvegarder la signature
            const dataURL = signaturePad.toDataURL();
            // Envoyer `dataURL` au serveur ou le traiter selon les besoins
            console.log(dataURL); // Afficher la DataURL de la signature dans la console (à remplacer par votre propre logique)
        } else {
            // Gérer le cas où la signature est vide
            alert("Veuillez signer avant de sauvegarder.");
        }
    });
});
