document.addEventListener('DOMContentLoaded', function() {
    var lock = null;

    function updateUnlockDisplay() {
        var unlockTypeElement = document.getElementById('unlockType');
        var pinCodeElement = document.getElementById('pinCode');
        var patternContainerElement = document.getElementById('patternContainer');

        if (unlockTypeElement && pinCodeElement && patternContainerElement) {
            var unlockType = unlockTypeElement.value;

            if (unlockType === 'pin') {
                pinCodeElement.style.display = 'block';
                patternContainerElement.style.display = 'none';
                if (lock && typeof lock.destroy === 'function') {
                    lock.destroy();
                    lock = null;
                }
            } else if (unlockType === 'pattern') {
                pinCodeElement.style.display = 'none';
                patternContainerElement.style.display = 'block';
                if (!lock) {
                    lock = new PatternLock('#lock', {
                        onPattern: function(pattern) {
                            localStorage.setItem('patternUnlockCode', pattern);
                            console.log(pattern);
                        }
                    });
                }
            }
        }
    }

    if (document.getElementById('unlockType')) {
        updateUnlockDisplay();
        document.getElementById('unlockType').addEventListener('change', updateUnlockDisplay);
    }

    var formElement = document.getElementById('repairForm');
    if (formElement) {
        formElement.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = {
                fullname: document.getElementById('fullname').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                unlockType: document.getElementById('unlockType').value,
                pinCode: document.getElementById('pinCode').value,
                model: document.getElementById('model').value,
                repairType: document.getElementById('repairType').value,
                estimatedPrice: document.getElementById('estimatedPrice').value,
                unlockCode: localStorage.getItem('patternUnlockCode') || document.getElementById('pinCode').value
            };

            localStorage.setItem('repairFormData', JSON.stringify(formData));
            window.location.href = 'accept-repair.html';
        });
    }
});

    // Gestion de la popup d'informations uniquement si elle existe
    var infoPopupElement = document.getElementById('infoPopup');
    if (infoPopupElement) {
        function openPopup() {
            infoPopupElement.style.display = 'flex';
        }

        function closePopup() {
            infoPopupElement.style.display = 'none';
        }

        // Supposons que vos boutons pour ouvrir/fermer la popup aient des ID ou des gestionnaires d'événements spécifiques
    }

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('../sw.js').then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, err => {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
  