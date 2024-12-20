// Seleccionamos los elementos del DOM
const tituloNotaInput = document.getElementById('titulo-nota');
const textoNotaInput = document.getElementById('texto-nota');
const btnGuardarNota = document.getElementById('agg-nota');
const listaNotas = document.getElementById('lista-notas');
const buscadorInput = document.getElementById('buscador-input');

// Inicializamos un array para almacenar las notas
let notas = JSON.parse(localStorage.getItem('notas')) || [];

// Función para guardar una nueva nota
function guardarNota() {
    const titulo = tituloNotaInput.value.trim();
    const texto = textoNotaInput.value.trim();

    // Validación para asegurarse de que no estén vacíos
    if (titulo === '' || texto === '') {
        alert('Por favor, ingrese un título y una nota.');
        return;
    }

    // Crear un objeto de la nueva nota
    const nuevaNota = {
        titulo,
        texto,
        fecha: new Date().toLocaleDateString()
    };

    // Añadir la nueva nota al array
    notas.push(nuevaNota);

    // Guardar el array actualizado en localStorage
    localStorage.setItem('notas', JSON.stringify(notas));

    // Limpiar los campos de entrada
    tituloNotaInput.value = '';
    textoNotaInput.value = '';

    // Actualizar la lista de notas en la página
    mostrarNotas(notas);
}

// Función para mostrar las notas
function mostrarNotas(notasParaMostrar) {
    listaNotas.innerHTML = '<h3>Notas agregadas</h3>';

    // Si no hay notas, mostrar un mensaje
    if (notasParaMostrar.length === 0) {
        listaNotas.innerHTML += '<p>No hay notas guardadas.</p>';
        return;
    }

    // Recorrer las notas y agregar cada una a la lista
    notasParaMostrar.forEach((nota, index) => {
        const notaDiv = document.createElement('div');
        notaDiv.classList.add('nota');  // Aplica la clase 'nota' para estilo

        // Truncar el título y texto si exceden los 100 caracteres
        const tituloTruncado = truncarTexto(nota.titulo, 20);
        const textoTruncado = truncarTexto(nota.texto, 30);

        // Establecer el contenido de la nota con los textos truncados
        notaDiv.innerHTML = `
            <div>
            <a href="notas.html"><h4 class="nota-titulo" data-index="${index}">${tituloTruncado} - <small>${nota.fecha}</small></h4>
            <p>${textoTruncado}</p></a>
            </div>
            <button class="eliminar" data-index="${index}">Eliminar</button>
        
        `;

        // Agregar la nueva nota a la lista de notas
        listaNotas.appendChild(notaDiv);
    });
}

// Función para truncar el texto a un número máximo de caracteres
function truncarTexto(texto, maxLength) {
    if (texto.length > maxLength) {
        return texto.slice(0, maxLength) + '...';
    }
    return texto;
}

// Función para eliminar una nota
function eliminarNota(index) {
    // Eliminar la nota del array
    notas.splice(index, 1);

    // Actualizar localStorage
    localStorage.setItem('notas', JSON.stringify(notas));

    // Volver a mostrar las notas
    mostrarNotas(notas);
}

// Manejar el clic del botón "Guardar Nota"
btnGuardarNota.addEventListener('click', (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del botón
    guardarNota();
});

// Manejar la eliminación de notas
listaNotas.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('eliminar')) {
        const index = e.target.getAttribute('data-index');
        eliminarNota(index);
    }

    // Manejar el clic en una nota para redirigir a notas.html
    if (e.target && e.target.classList.contains('nota-titulo')) {
        const index = e.target.getAttribute('data-index');
        // Guardamos la nota seleccionada en localStorage
        localStorage.setItem('notaSeleccionada', JSON.stringify(notas[index]));
        // Redirigimos a notas.html
        window.location.href = 'notas.html';
    }
});

// Filtrar las notas por búsqueda
buscadorInput.addEventListener('input', () => {
    const searchQuery = buscadorInput.value.toLowerCase();

    // Filtrar las notas que coincidan con el término de búsqueda
    const notasFiltradas = notas.filter(nota => {
        return nota.titulo.toLowerCase().includes(searchQuery) ||
               nota.texto.toLowerCase().includes(searchQuery); // Buscar dentro del texto
    });

    // Mostrar las notas filtradas
    mostrarNotas(notasFiltradas);
});

// Mostrar las notas cuando la página cargue
mostrarNotas(notas);
