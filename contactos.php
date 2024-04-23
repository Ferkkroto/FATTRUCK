<?php
session_start();

// Recibir y sanitizar datos del formulario
$nombre = htmlspecialchars($_POST['nombre']);
$correo = filter_var($_POST['correo'], FILTER_SANITIZE_EMAIL);
$telefono = htmlspecialchars($_POST['telefono']);
$compania = htmlspecialchars($_POST['compania']);
$mensaje = htmlspecialchars($_POST['mensaje']);

// Validar los datos
if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    // Si el correo no es válido, redirigir a la página de error
    header('Location: error.html');
    exit;
}

// Estructurar el correo
$to = "fmontiel599@gmail.com";
$subject = "FATTRUK";
$body = "Nombre: $nombre\nCorreo electrónico: $correo\nTeléfono: $telefono\nCompañía: $compania\nMensaje:\n$mensaje";
$headers = "From: webmaster@fattruck.com\r\n";

// Intentar enviar el correo
if (mail($to, $subject, $body, $headers)) {
    // Si el correo se envía correctamente, establecer una variable de sesión y redirigir a la página de agradecimiento
    $_SESSION['formularioEnviado'] = true;
    header('Location: gracias.php');
    exit;
} else {
    // Si falla el envío del correo, redirigir a la página de error
    header('Location: error.html');
    exit;
}
