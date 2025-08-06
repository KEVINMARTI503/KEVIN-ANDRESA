function agregarProducto() {
    const nombre = document.getElementById("producto").value.trim();
    const cantidad = document.getElementById("cantidad").value.trim();

    if (nombre === "" || cantidad === "") return;

    let inventario = JSON.parse(localStorage.getItem("inventario")) || [];
    const index = inventario.findIndex(item => item.nombre.toLowerCase() === nombre.toLowerCase());

    if (index !== -1) {
        inventario[index].cantidad += parseInt(cantidad);
    } else {
        inventario.push({ nombre, cantidad: parseInt(cantidad) });
    }

    localStorage.setItem("inventario", JSON.stringify(inventario));
    document.getElementById("producto").value = "";
    document.getElementById("cantidad").value = "";
    mostrarInventario();
}

function mostrarInventario() {
    const inventario = JSON.parse(localStorage.getItem("inventario")) || [];
    const tabla = document.getElementById("tablaInventario");
    tabla.innerHTML = "";

    inventario.forEach((item, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${item.nombre}</td>
            <td><input type="number" value="${item.cantidad}" id="cantidad-${index}" style="width:60px;"></td>
            <td>
                <button onclick="guardarCambios(${index})">Guardar</button>
                <button onclick="eliminarProducto(${index})" style="background-color:#dc3545;color:white;">Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

function guardarCambios(index) {
    const inventario = JSON.parse(localStorage.getItem("inventario")) || [];
    const nuevaCantidad = parseInt(document.getElementById(`cantidad-${index}`).value);

    if (!isNaN(nuevaCantidad) && nuevaCantidad >= 0) {
        inventario[index].cantidad = nuevaCantidad;
        localStorage.setItem("inventario", JSON.stringify(inventario));
        mostrarInventario();
    }
}

function eliminarProducto(index) {
    let inventario = JSON.parse(localStorage.getItem("inventario")) || [];
    inventario.splice(index, 1);
    localStorage.setItem("inventario", JSON.stringify(inventario));
    mostrarInventario();
}

window.onload = mostrarInventario;
