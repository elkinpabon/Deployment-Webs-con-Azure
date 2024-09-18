<?php
// Datos de conexión a SQL Server
$serverName = "servidorcone.database.windows.net";
$database = "USUARIOS";
$username = "adminsql";
$password = "Conesql777";

// Crear la conexión
try {
    $conn = new PDO("sqlsrv:server=$serverName;Database=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}
?>
