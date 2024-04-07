document.addEventListener('DOMContentLoaded', function() {
    const formData = JSON.parse(localStorage.getItem('repairFormData'));
    if (formData) {
        document.getElementById('summaryName').textContent = formData.fullname;
        document.getElementById('summaryEmail').textContent = formData.email;
        document.getElementById('summaryPhone').textContent = formData.phone; // Assurez-vous que cet ID existe.
        document.getElementById('summaryModel').textContent = formData.model;
        document.getElementById('summaryRepairType').textContent = formData.repairType;
        document.getElementById('summaryEstimatedPrice').textContent = formData.estimatedPrice + ' €';
    }
    document.getElementById('validateButton').addEventListener('click', function() {
        console.log('Réparation validée');
    });
});