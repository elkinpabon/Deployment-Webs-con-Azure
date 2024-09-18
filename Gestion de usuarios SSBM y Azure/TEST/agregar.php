<?php
require 'db.php';

// Verificar que se envió el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $cedula = $_POST['cedula'];
    $correo = $_POST['correo'];

    // Preparar la inserción
    $sql = "INSERT INTO Clientes (nombre, apellido, cedula, correo) VALUES (:nombre, :apellido, :cedula, :correo)";
    $stmt = $conn->prepare($sql);

    // Ejecutar la consulta con los datos del formulario
    if ($stmt->execute([':nombre' => $nombre, ':apellido' => $apellido, ':cedula' => $cedula, ':correo' => $correo])) {
        echo "Cliente agregado exitosamente";
    } else {
        echo "Error al agregar cliente";
    }
}
header('Location: index.php');
