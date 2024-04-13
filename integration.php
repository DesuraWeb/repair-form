<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion Google et Création de Spreadsheet</title>
    <script src="https://accounts.google.com/gsi/client" async defer></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> <!-- Including jQuery for AJAX requests -->
</head>
<body>
<div id="buttonDiv"></div>

<script>
    function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        // Send the ID token to your Node.js server
        $.ajax({
            url: 'https://repairform.app/oauth', // Change this URL to where your Node.js server is listening
            method: 'POST',
            data: {
                token: response.credential
            },
            success: function(data) {
                console.log('Server response:', data);
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
    }

    window.onload = function() {
        google.accounts.id.initialize({
            client_id: '452088252354-oogifa80c0js1qlo7nj1vv8d9ffclmn3.apps.googleusercontent.com',
            callback: handleCredentialResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }  // customization attributes
        );

        google.accounts.id.prompt(); // Display the One Tap dialog
    }
</script>
</body>
</html>
