const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'votre_utilisateur',
    password: 'votre_mot_de_passe',
    database: 'nom_de_votre_base'
});

connection.connect();

app.post('/api/create-folder', (req, res) => {
    const { clientName, clientEmail, clientPhone, unlockCode, deviceModel, repairRate } = req.body;
    connection.query(
        'INSERT INTO Dossiers (clientName, clientEmail, clientPhone, unlockCode, deviceModel, repairRate) VALUES (?, ?, ?, ?, ?, ?)',
        [clientName, clientEmail, clientPhone, unlockCode, deviceModel, repairRate],
        (error, results) => {
            if (error) {
                return res.status(500).json({ message: "Erreur lors de l'insertion du dossier." });
            }
            res.status(200).json({ message: 'Dossier créé avec succès.', dossierId: results.insertId });
        }
    );
});

app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});
