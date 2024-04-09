<?php
session_start();

// Prevenir caché
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// Verificar si se accedió a esta página después de enviar el formulario
if (!isset($_SESSION['formularioEnviado'])) {
    // Si no, redirigir al formulario de contacto
    header('Location: contacto.html');
    exit;
}

// Opcional: Deshacer la variable de sesión para prevenir el acceso directo futuro a esta página
unset($_SESSION['formularioEnviado']);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gracias por contactarnos</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #1a1a1a; /* Un negro no tan fuerte */
        }
        .thanks-message {
            text-align: center;
            padding: 40px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 20px;
        }
        h1 {
            font-family:'Chakra Petch', sans-serif;
            color: #333;
            font-size: 24px;
        }
        p {
            font-family:'Chakra Petch', sans-serif;
            color: #666;
            font-size: 16px;
        }
        .action-button {
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 16px;
            color: white;
            background-color: #D8000C; /* Color rojo para el botón */
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease; /* Suaviza la transición del color */
        }
        .action-button:hover {
            background-color: #ff3333; /* Un rojo más claro para el hover */
        }

    </style>
</head>
<body>
    <div class="thanks-message">
        <h1>¡Gracias por contactarnos!</h1>
        <p>Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.</p>
        <!-- Botón para que el usuario inicie la redirección -->
        <button class="action-button" onclick="redirectToHome();">Volver al inicio</button>
    </div>
    <script>
        function redirectToHome() {
            // Reemplazar el estado actual en el historial y redirigir
            history.replaceState(null, '', 'index.html');
            window.location = "index.html";
        }
    </script>
</body>
</html>
