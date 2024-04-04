document.addEventListener('DOMContentLoaded', function() {
    var lock; // Variable pour l'instance de PatternLock, initialisée à undefined

    // Assurez-vous que le script patternlock.min.js est chargé avant ce script.
    // Initialisation de i18next avec i18next-http-backend
    i18next.use(i18nextHttpBackend).init({
        lng: localStorage.getItem('preferredLanguage') || 'fr',
        backend: {
            loadPath: '/locales/{{lng}}.json'
        },
        fallbackLng: 'en'
    }, function(err, t) {
        if (err) {
            console.error('Erreur lors du chargement des traductions:', err);
            return;
        }
        updateContent();
    });

    function updateContent() {
        document.querySelectorAll('[data-i18n]').forEach(function(el) {
            const key = el.getAttribute('data-i18n');
            const translation = i18next.t(key);
            if (el.getAttribute('placeholder')) {
                el.setAttribute('placeholder', translation);
            } else {
                el.textContent = translation;
            }
        });

        const languageSelector = document.getElementById('languageSelector');
        if (languageSelector) {
            languageSelector.value = i18next.language;
        }
    }

    const unlockTypeElement = document.getElementById('unlockType');
    if (unlockTypeElement) {
        unlockTypeElement.addEventListener('change', function() {
            var unlockType = this.value;
            var pinCode = document.getElementById('pinCode');
            var patternContainer = document.getElementById('patternContainer');

            if (unlockType === 'pin') {
                pinCode.style.display = 'block';
                patternContainer.style.display = 'none';
                if (lock) {
                    lock.destroy();
                    lock = null; // S'assurer de détruire l'instance précédente
                }
            } else if (unlockType === 'pattern') {
                pinCode.style.display = 'none';
                patternContainer.style.display = 'block';
                if (!lock && document.getElementById('lock')) {
                    // S'assurer que l'élément #lock est présent
                    lock = new PatternLock("#lock", {
                        onDraw: function(pattern) {
                            console.log("Pattern completed: ", pattern);
                        }
                    });
                }
            }
        });
    }

    const repairFormElement = document.getElementById('repairForm');
    if (repairFormElement) {
        repairFormElement.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log("Formulaire soumis.");
        });
    }

    const estimatedPriceElement = document.getElementById('estimatedPrice');
    if (estimatedPriceElement) {
        estimatedPriceElement.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]+/g, '');
        });
    }

    const languageSelectorElement = document.getElementById('languageSelector');
    if (languageSelectorElement) {
        languageSelectorElement.addEventListener('change', function(e) {
            var newLang = e.target.value;
            i18next.changeLanguage(newLang, function(err, t) {
                if (err) {
                    console.error('Erreur lors du changement de langue:', err);
                    return;
                }
                updateContent();
                localStorage.setItem('preferredLanguage', newLang);
            });
        });
    }
});
