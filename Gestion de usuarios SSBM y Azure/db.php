<?php
$serverName = "servidorcone.database.windows.net";
$database = "USUARIOS";
$username = "adminsql";
$password = "Conesql777";

try {
    $conn = new PDO("sqlsrv:server=$serverName;Database=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}
?>
