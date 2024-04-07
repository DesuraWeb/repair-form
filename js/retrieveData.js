document.addEventListener('DOMContentLoaded', function() {
    const formData = JSON.parse(localStorage.getItem('repairFormData'));
    if (formData) {
        document.getElementById('summaryName').textContent = formData.fullname;
        document.getElementById('summaryEmail').textContent = formData.email;
        document.getElementById('summaryPhone').textContent = formData.phone;
        document.getElementById('summaryModel').textContent = formData.model;
        document.getElementById('summaryRepairType').textContent = mapRepairType(formData.repairType);
        document.getElementById('summaryEstimatedPrice').textContent = formData.estimatedPrice + ' €';
    }

    document.getElementById('validateButton').addEventListener('click', function() {
        console.log('Réparation validée');
    });

    function mapRepairType(repairType) {
        const types = {
            "screen": "Écran",
            "battery": "Batterie",
            "charging_connector": "Connecteur de charge",
            "earpiece": "Écouteur",
            "loudspeaker": "Haut-parleur",
            "vibrator": "Vibreur",
            "rear_glass": "Vitre Arrière",
            "chassis": "Chassis",
            "bluetooth_wifi": "Bluetooth / Wifi",
            "front_camera": "Appareil Photo Avant",
            "rear_camera": "Appareil Photo Arrière"
        };
        return types[repairType] || "Type inconnu";
    }
});
