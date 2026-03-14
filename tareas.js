//Agrefa una tarea nueva al sistema, obtiene los datos ingresados por el usuario desde el formulario
//Valida que los campos obligatorios no esten vacios, crea el objeto de tarea y lo almacena
function agregarTarea() {
    const nombre = document.getElementById("nombreTarea").value.trim();
    const descripcion = document.getElementById("descripcionTarea").value.trim();
    const fechaVencimiento = document.getElementById("fechaVencimiento").value;
    const estado = document.getElementById("estadoTarea").value;
    
    //validar que los campos principales tengan información
    if (nombre === "" || descripcion === "" || fechaVencimiento === "") return;

    //Obtener tareas guardadas previamente o inciar una lista vacía
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas.push({ nombre, descripcion, fechaVencimiento, estado });

    //Agregar la nueva tarea al arreglo
    localStorage.setItem("tareas", JSON.stringify(tareas));

    //Limpiar el formulario después del registro
    document.getElementById("nombreTarea").value = "";
    document.getElementById("descripcionTarea").value = "";
    document.getElementById("fechaVencimiento").value = "";
    //Actualizar la tabla visual
    mostrarTareas();
}

//Muestra todas las tareas almacenadas en localStorage dentro de la tabla HTML.
//Recorre la lista de tareas y genera dinámicamente una fila por cada tarea, también crea los controles necesarioa para cambiar el estado o eliminarla
function mostrarTareas() {
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    const tabla = document.getElementById("tablaTareas");

    //Limpiar el contenido actual de la tabla para eviar dúplicados.
    tabla.innerHTML = "";

    tareas.forEach((tarea, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${tarea.nombre}</td>
            <td>${tarea.descripcion}</td>
            <td>${tarea.fechaVencimiento}</td>
            <td>
                <select onchange="actualizarEstado(${index}, this.value)">
                    <option value="pendiente" ${tarea.estado === 'pendiente' ? 'selected' : ''}>Pendiente</option>
                    <option value="en_progreso" ${tarea.estado === 'en_progreso' ? 'selected' : ''}>En Progreso</option>
                    <option value="completada" ${tarea.estado === 'completada' ? 'selected' : ''}>Completada</option>
                </select>
            </td>
            <td>
                <button onclick="eliminarTarea(${index})" style="background-color:#dc3545;color:white;">Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

//Actualiza el estado de una tarea especifica
function actualizarEstado(index, nuevoEstado) {
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas[index].estado = nuevoEstado;
    localStorage.setItem("tareas", JSON.stringify(tareas));
    mostrarTareas();
}

function eliminarTarea(index) {
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    
    //Cambiar el estado de la tarea seleccionada
    tareas.splice(index, 1);

    //Guarda el cambio realizado
    localStorage.setItem("tareas", JSON.stringify(tareas));

    //recargar la tabla para reflejar el cambio
    mostrarTareas();
}

window.onload = mostrarTareas;


