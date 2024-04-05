document.addEventListener('DOMContentLoaded', function() {
    var lock = null; // Instance of PatternLock

    document.getElementById('unlockType').addEventListener('change', function() {
        var unlockType = this.value;
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
                lock = new PatternLock('#lock', { // Initialize on SVG element directly
                    onPattern: function(pattern) {
                        // Optionally update a hidden field with the drawn pattern
                        console.log(pattern);
                    }
                });
            }
        }
    });

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
        // Add logic here to send the information to the server or process it locally.
    });
});
