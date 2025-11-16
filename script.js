
const botonAgregar = document.getElementById('idAgregarTarea');
const contenedor = document.getElementById('contenedor-filas');

let contadorFila = 1;

botonAgregar.addEventListener('click', () => {

    const nuevaFila = document.createElement('div');
    nuevaFila.classList.add('fila');

    nuevaFila.innerHTML = 
    `
        <div>${contadorFila}</div>
        <input type="text" class="desc-fila">
        <input type="text" class="nota-fila">
        <input type="checkbox" class="check-lista" id="idCheck">
        <div>
            <img width="24" height="24" src="https://img.icons8.com/material/24/FA5252/trash--v1.png" class="icono-basurero" alt="trash--v1"/>
        </div>
    `;

    contadorFila++;

    contenedor.appendChild(nuevaFila);

    // funcionalidades al marcar el checkbox en la lista
    const checkbox = nuevaFila.querySelector('.check-lista');
    const mensajeeCheck = document.getElementById('mensajeCheck');

    const fila = nuevaFila;

    let timeOutMensaje;
    checkbox.addEventListener('change', () => {
    
    clearTimeout(timeOutMensaje);

    if(checkbox.checked) {

        mensajeeCheck.style.display = 'block';
        timeOutMensaje = setTimeout(() => {
            mensajeeCheck.style.display = 'none';
        }, 1000);

        // cuando se complete una tarea dejar el texto tachado
        fila.classList.add('contenedor-filas-t');

    } else {
        mensajeeCheck.style.display = 'none';
        fila.classList.remove('contenedor-filas-t');
    }

});

    contenedor.style.display = 'grid';

    const iconoBasurero = nuevaFila.querySelector('.icono-basurero');
    iconoBasurero.addEventListener('click', () => {
        nuevaFila.remove();
        renumerarFilas();
    });

});

function renumerarFilas() {

    const filass = contenedor.querySelectorAll('.fila');

    filass.forEach((fila, index) => {
        fila.children[0].textContent = index+1;
    });
    contadorFila = filass.length + 1;

};