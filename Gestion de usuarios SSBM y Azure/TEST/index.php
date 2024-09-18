<?php
require 'db.php';

// Obtener la lista de clientes
$query = $conn->query("SELECT * FROM Clientes");
$clientes = $query->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestión de Clientes</title>
    <!-- Enlace a Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <!-- Enlace al archivo CSS externo -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h2>Agregar Cliente</h2>
        <form action="agregar.php" method="POST" class="form">
            <div class="form-group">
                <label for="nombre">Nombre:</label>
                <input type="text" name="nombre" id="nombre" required>
            </div>

            <div class="form-group">
                <label for="apellido">Apellido:</label>
                <input type="text" name="apellido" id="apellido" required>
            </div>

            <div class="form-group">
                <label for="cedula">Cédula:</label>
                <input type="text" name="cedula" id="cedula" required>
            </div>

            <div class="form-group">
                <label for="correo">Correo:</label>
                <input type="email" name="correo" id="correo" required>
            </div>

            <input type="submit" value="Agregar Cliente" class="btn btn-primary">
        </form>

        <h2>Lista de Clientes</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Cédula</th>
                    <th>Correo</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($clientes as $cliente): ?>
                <tr>
                    <td><?php echo htmlspecialchars($cliente['nombre']); ?></td>
                    <td><?php echo htmlspecialchars($cliente['apellido']); ?></td>
                    <td><?php echo htmlspecialchars($cliente['cedula']); ?></td>
                    <td><?php echo htmlspecialchars($cliente['correo']); ?></td>
                    <td>
                        <form action="eliminar.php" method="POST">
                            <input type="hidden" name="id" value="<?php echo htmlspecialchars($cliente['id']); ?>">
                            <input type="submit" value="Eliminar" class="btn btn-danger">
                        </form>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</body>
</html>
