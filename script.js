
const botonAgregar = document.getElementById('idAgregarTarea');
const contenedor = document.getElementById('contenedor-filas');

let contadorFila = 1;

cargarDesdeLocal();

botonAgregar.addEventListener('click', () => {
    crearFila({
        numero: contadorFila,
        descripcion: '',
        nota: '',
        completado: false
    });
    contadorFila++;
    guardarEnLocal();
});

function crearFila(item) {

    const nuevaFila = document.createElement('div');
    nuevaFila.classList.add('fila');

    nuevaFila.innerHTML = `
        <div>${item.numero}</div>
        <input type="text" class="desc-fila" value="${item.descripcion}">
        <input type="text" class="nota-fila" value="${item.nota}">
        <input type="checkbox" class="check-lista" ${item.completado ? 'checked' : ''}>
        <div>
            <img width="24" height="24" src="https://img.icons8.com/material/24/FA5252/trash--v1.png" class="icono-basurero" alt="trash--v1"/>
        </div>
    `;

    const inputDescripcion = nuevaFila.querySelector('.desc-fila');
    const inputNota = nuevaFila.querySelector('.nota-fila');

    [inputDescripcion, inputNota].forEach(input => {
        input.addEventListener('input', () => {
            guardarEnLocal();
        });
    });

    const checkbox = nuevaFila.querySelector('.check-lista');
    const mensajeeCheck = document.getElementById('mensajeCheck');

    if (checkbox.checked) nuevaFila.classList.add('contenedor-filas-t');

    // Evento checkbox
    checkbox.addEventListener('change', () => {
        nuevaFila.classList.toggle('contenedor-filas-t');
        if(checkbox.checked){
            mensajeeCheck.style.display = 'block';
            setTimeout(()=> mensajeeCheck.style.display='none',1000);
        }
        guardarEnLocal();
    });

    // Evento borrar
    const iconoBasurero = nuevaFila.querySelector('.icono-basurero');
    iconoBasurero.addEventListener('click', () => {
        nuevaFila.remove();
        renumerarFilas();
        guardarEnLocal();
    });

    contenedor.appendChild(nuevaFila);
    contenedor.style.display = 'grid';
}

function guardarEnLocal() {
    const filas = [];
    const filass = contenedor.querySelectorAll('.fila');
    filass.forEach(fila => {
        filas.push({
            numero: fila.children[0].textContent,
            descripcion: fila.querySelector('.desc-fila').value,
            nota: fila.querySelector('.nota-fila').value,
            completado: fila.querySelector('.check-lista').checked
        });
    });
    localStorage.setItem('tareas', JSON.stringify(filas));
}

function cargarDesdeLocal() {
    const data = JSON.parse(localStorage.getItem('tareas')) || [];
    data.forEach(item => {
        crearFila(item);
        contadorFila = Math.max(contadorFila, parseInt(item.numero) + 1);
    });
}

function renumerarFilas() {
    const filass = contenedor.querySelectorAll('.fila');
    filass.forEach((fila,index) => fila.children[0].textContent = index+1);
    contadorFila = filass.length + 1;
}