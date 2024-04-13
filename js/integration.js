function handleCredentialResponse(response) {
    const credential = response.credential;
    sessionStorage.setItem('userToken', credential); // Stockez le jeton dans sessionStorage
    console.log('Access Token:', credential);
}

// Écouteur d'événement pour le bouton d'activation de l'intégration
document.getElementById('activateIntegration').addEventListener('click', function() {
    const token = sessionStorage.getItem('userToken');
    if (token) {
        // Fonction pour créer un spreadsheet
        createSpreadsheet(token);
    } else {
        console.error("Token d'authentification manquant.");
    }
});

// Fonction pour créer le spreadsheet
function createSpreadsheet(token) {
    const requestData = {
        properties: {
            title: 'repairform'
        },
        sheets: [{
            properties: {
                title: 'Feuille 1'
            },
            gridProperties: {
                rowCount: 1,
                columnCount: 6
            },
            headerValues: ['Nom', 'Email', 'Numero', 'Modele', 'Type de réparation', 'Prix estimé']
        }]
    };

    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('Content-Type', 'application/json');

    const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestData)
    };

    const url = 'https://sheets.googleapis.com/v4/spreadsheets';

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la création du spreadsheet');
            }
            return response.json();
        })
        .then(data => {
            console.log('Spreadsheet créé avec succès:', data);
            document.getElementById('integrationStatus').textContent = 'Activé';
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    if (isLoggedIn) {
        document.getElementById('integrationStatus').textContent = "Connecté";
        document.getElementById('activateIntegration').style.display = 'block';
    } else {
        document.getElementById('integrationStatus').textContent = "Non Connecté";
        document.getElementById('activateIntegration').style.display = 'none';
    }
});
