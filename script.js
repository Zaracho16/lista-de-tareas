
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
        <input type="checkbox" class="check-lista">
        <div>
            <img width="24" height="24" src="https://img.icons8.com/material/24/FA5252/trash--v1.png" class="icono-basurero" alt="trash--v1"/>
        </div> 
    `;

    contadorFila++;

    contenedor.appendChild(nuevaFila);

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