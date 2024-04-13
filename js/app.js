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
                unlockPattern: document.getElementById('unlockPattern').value            
            };

            localStorage.setItem('repairFormData', JSON.stringify(formData));
            window.location.href = 'accept-repair.php';
        });
    }
});

// Define functions in the global scope
function openPopup() {
    var infoPopupElement = document.getElementById('infoPopup');
    if (infoPopupElement) {
        infoPopupElement.style.display = 'flex';
    }
}

function closePopup() {
    var infoPopupElement = document.getElementById('infoPopup');
    if (infoPopupElement) {
        infoPopupElement.style.display = 'none';
    }
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, err => {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }

  // Setup event listeners after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', function () {
    var qrScanButton = document.getElementById('qrScanButton');
    if (qrScanButton) {
        qrScanButton.addEventListener('click', openPopup);
    }

    // If there's a close button inside your popup, set up its listener here as well
    // Example:
    // var closeButton = document.getElementById('closeButton');
    // if (closeButton) {
    //     closeButton.addEventListener('click', closePopup);
    // }
});
  