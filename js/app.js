document.addEventListener('DOMContentLoaded', function() {
    var lock = null; // Instance of PatternLock

    // Fonction pour mettre à jour l'affichage en fonction du type de déverrouillage sélectionné
    function updateUnlockDisplay() {
        var unlockType = document.getElementById('unlockType').value;
        var pinCode = document.getElementById('pinCode');
        var patternContainer = document.getElementById('patternContainer');

        if (unlockType === 'pin') {
            pinCode.style.display = 'block';
            patternContainer.style.display = 'none';
            if (lock && lock.destroy) {
                lock.destroy();
                lock = null;
            }
        } else if (unlockType === 'pattern') {
            pinCode.style.display = 'none';
            patternContainer.style.display = 'block';
            if (!lock) {
                lock = new PatternLock('#lock', {
                    onPattern: function(pattern) {
                        console.log(pattern); // Optionally update a hidden field with the drawn pattern
                    }
                });
            }
        }
    }

    // Initialiser l'affichage des champs lors du chargement de la page
    updateUnlockDisplay();

    // Écouter les changements sur le menu déroulant 'unlockType'
    document.getElementById('unlockType').addEventListener('change', updateUnlockDisplay);

    document.getElementById('repairForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        let unlockCode = '';

        if (document.getElementById('unlockType').value === 'pattern' && lock) {
            unlockCode = lock.getPattern();
        } else {
            unlockCode = document.getElementById('pinCode').value;
        }

        console.log(`Dossier pour ${fullname}, Email: ${email}, Code: ${unlockCode}`);
        // Ici, ajoutez la logique pour envoyer les informations au serveur ou les traiter localement.
    });
});

// Gestion de la popup d'informations
function openPopup() {
    document.getElementById('infoPopup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('infoPopup').style.display = 'none';
}