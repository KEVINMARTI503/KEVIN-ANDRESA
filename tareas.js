function agregarTarea() {
    const nombre = document.getElementById("nombreTarea").value.trim();
    const descripcion = document.getElementById("descripcionTarea").value.trim();
    const fechaVencimiento = document.getElementById("fechaVencimiento").value;
    const estado = document.getElementById("estadoTarea").value;

    if (nombre === "" || descripcion === "" || fechaVencimiento === "") return;

    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas.push({ nombre, descripcion, fechaVencimiento, estado });

    localStorage.setItem("tareas", JSON.stringify(tareas));
    document.getElementById("nombreTarea").value = "";
    document.getElementById("descripcionTarea").value = "";
    document.getElementById("fechaVencimiento").value = "";
    mostrarTareas();
}

function mostrarTareas() {
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    const tabla = document.getElementById("tablaTareas");
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

function actualizarEstado(index, nuevoEstado) {
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas[index].estado = nuevoEstado;
    localStorage.setItem("tareas", JSON.stringify(tareas));
    mostrarTareas();
}

function eliminarTarea(index) {
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas.splice(index, 1);
    localStorage.setItem("tareas", JSON.stringify(tareas));
    mostrarTareas();
}

window.onload = mostrarTareas;


