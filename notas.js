// Recuperar la nota seleccionada del localStorage
const notaSeleccionada = JSON.parse(localStorage.getItem('notaSeleccionada'));

// Si no hay nota seleccionada, redirigimos a la página principal
if (!notaSeleccionada) {
    window.location.href = 'index.html';
}

// Seleccionamos los elementos donde se mostrarán los detalles de la nota
const tituloNota = document.getElementById('nota-titulo');
const textoNota = document.getElementById('nota-texto');
const fechaNota = document.getElementById('nota-fecha');
const btnRegresar = document.getElementById('btn-regresar');

// Mostrar los detalles de la nota
tituloNota.textContent = notaSeleccionada.titulo;
textoNota.textContent = notaSeleccionada.texto;
fechaNota.textContent = notaSeleccionada.fecha;

// Manejar el clic del botón "Regresar"
btnRegresar.addEventListener('click', () => {
    window.location.href = 'index.html'; // Regresar a la página principal
});
