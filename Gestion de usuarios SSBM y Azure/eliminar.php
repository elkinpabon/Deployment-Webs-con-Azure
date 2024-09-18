<?php
require 'db.php';

// Verificar que se ha recibido un ID para eliminar
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];

    // Preparar la eliminación
    $sql = "DELETE FROM Clientes WHERE id = :id";
    $stmt = $conn->prepare($sql);

    // Ejecutar la consulta
    if ($stmt->execute([':id' => $id])) {
        echo "Cliente eliminado exitosamente";
    } else {
        echo "Error al eliminar cliente";
    }
}
header('Location: index.php');
