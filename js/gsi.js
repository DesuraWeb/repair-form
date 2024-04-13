function handleCredentialResponse(response) {
    // Extrait le token d'accès (et non un ID token)
    const accessToken = response.credential; // Assurez-vous d'utiliser la propriété correcte pour extraire le token d'accès

    // Stocke le token d'accès dans sessionStorage pour une utilisation entre les pages
    sessionStorage.setItem('userToken', accessToken);
    
    // Indique que l'utilisateur est connecté
    sessionStorage.setItem('isLoggedIn', true);

    // Redirige vers integration.php ou un autre traitement
    window.location.href = "/integration.php";
}