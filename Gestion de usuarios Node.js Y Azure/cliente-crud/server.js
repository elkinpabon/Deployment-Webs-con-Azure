const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const path = require('path');  // Importa el módulo path

const app = express();
const port = 3000;

// Configuración de conexión a SQL Server
const config = {
  user: 'adminsql',
  password: 'Conesql777',
  server: 'servidorcone.database.windows.net',
  database: 'USUARIOS',
  options: {
    encrypt: true // Usar cifrado para conexiones a Azure
  }
};

// Middleware para analizar cuerpos JSON
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public'))); // Asegúrate de servir los archivos estáticos

// Ruta para obtener la página principal (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Sirve el archivo index.html
});

// Conectar a la base de datos
const poolPromise = sql.connect(config);

// CRUD para Clientes
app.get('/clientes', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Clientes');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send('Error en la consulta de clientes');
  }
});

app.post('/clientes', async (req, res) => {
  const { nombre, apellido, cedula, correo } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('nombre', sql.NVarChar, nombre)
      .input('apellido', sql.NVarChar, apellido)
      .input('cedula', sql.NVarChar, cedula)
      .input('correo', sql.NVarChar, correo)
      .query('INSERT INTO Clientes (nombre, apellido, cedula, correo) VALUES (@nombre, @apellido, @cedula, @correo)');
    res.status(201).send('Cliente agregado');
  } catch (err) {
    res.status(500).send('Error al agregar cliente');
  }
});

app.put('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, cedula, correo } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .input('nombre', sql.NVarChar, nombre)
      .input('apellido', sql.NVarChar, apellido)
      .input('cedula', sql.NVarChar, cedula)
      .input('correo', sql.NVarChar, correo)
      .query('UPDATE Clientes SET nombre = @nombre, apellido = @apellido, cedula = @cedula, correo = @correo WHERE id = @id');
    res.send('Cliente actualizado');
  } catch (err) {
    res.status(500).send('Error al actualizar cliente');
  }
});

app.delete('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Clientes WHERE id = @id');
    res.send('Cliente eliminado');
  } catch (err) {
    res.status(500).send('Error al eliminar cliente');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

app.get('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Clientes WHERE id = @id');
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).send('Error al obtener el cliente');
  }
});
