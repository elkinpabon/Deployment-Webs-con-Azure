document.addEventListener('DOMContentLoaded', () => {
  const clienteForm = document.getElementById('clienteForm');
  const clientesTableBody = document.querySelector('#clientesTable tbody');
  const clienteIdInput = document.getElementById('clienteId');
  const nombreInput = document.getElementById('nombre');
  const apellidoInput = document.getElementById('apellido');
  const cedulaInput = document.getElementById('cedula');
  const correoInput = document.getElementById('correo');

  // Función para cargar los clientes desde la base de datos y mostrarlos en la tabla
  async function fetchClientes() {
    const response = await fetch('/clientes');
    const clientes = await response.json();
    clientesTableBody.innerHTML = '';  // Limpiar la tabla antes de agregar nuevas filas

    clientes.forEach(cliente => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${cliente.nombre}</td>
        <td>${cliente.apellido}</td>
        <td>${cliente.cedula}</td>
        <td>${cliente.correo}</td>
        <td>
          <button class="btn-editar" data-id="${cliente.id}">Editar</button>
          <button class="btn-eliminar" data-id="${cliente.id}">Eliminar</button>
        </td>
      `;
      clientesTableBody.appendChild(row);
    });

    // Agregar el evento "click" a todos los botones "Eliminar"
    document.querySelectorAll('.btn-eliminar').forEach(button => {
      button.addEventListener('click', async function () {
        const clienteId = this.getAttribute('data-id');
        await deleteCliente(clienteId);
      });
    });

    // Agregar el evento "click" a todos los botones "Editar"
    document.querySelectorAll('.btn-editar').forEach(button => {
      button.addEventListener('click', async function () {
        const clienteId = this.getAttribute('data-id');
        const cliente = await getCliente(clienteId);
        llenarFormulario(cliente); // Llenar el formulario con los datos del cliente
      });
    });
  }

  // Función para obtener un cliente por ID
  async function getCliente(id) {
    const response = await fetch(`/clientes/${id}`);
    return await response.json();
  }

  // Llenar el formulario con los datos del cliente para editar
  function llenarFormulario(cliente) {
    clienteIdInput.value = cliente.id;
    nombreInput.value = cliente.nombre;
    apellidoInput.value = cliente.apellido;
    cedulaInput.value = cliente.cedula;
    correoInput.value = cliente.correo;
  }

  // Guardar o actualizar un cliente
  async function saveCliente(event) {
    event.preventDefault();  // Evitar que el formulario recargue la página
    const id = clienteIdInput.value;
    const nombre = nombreInput.value;
    const apellido = apellidoInput.value;
    const cedula = cedulaInput.value;
    const correo = correoInput.value;

    const clienteData = { nombre, apellido, cedula, correo }; // Datos del cliente

    try {
      if (id) {
        // Si hay un id, actualizamos el cliente existente
        await fetch(`/clientes/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(clienteData)
        });
      } else {
        // Si no hay id, creamos un nuevo cliente
        await fetch('/clientes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(clienteData)
        });
      }

      // Limpiar formulario después de guardar
      clienteIdInput.value = '';
      clienteForm.reset();
      fetchClientes(); // Volver a cargar la lista de clientes
    } catch (error) {
      console.error('Error al guardar el cliente:', error);
    }
  }

  // Eliminar un cliente
  async function deleteCliente(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      try {
        await fetch(`/clientes/${id}`, { method: 'DELETE' });
        fetchClientes(); // Volver a cargar la lista de clientes después de eliminar
      } catch (error) {
        console.error('Error al eliminar el cliente:', error);
      }
    }
  }

  clienteForm.addEventListener('submit', saveCliente);
  fetchClientes(); // Cargar clientes al iniciar la página
});
