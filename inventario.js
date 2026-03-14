//Se agrega el producto al inventario, se obtiene el nombre y la cantidad desde el formulario
//Si la tarea ya existe, se agrega una nueva cantidad a la actual, si no eciste, se crea un nuevo registro
function agregarProducto() {
    const nombre = document.getElementById("producto").value.trim();
    const cantidad = document.getElementById("cantidad").value.trim();
    
//Se valida que los campos obligatorios no estén vacíos
    if (nombre === "" || cantidad === "") return;
    
//Obtener el inventario guardado o inicializar uno vaçio
    let inventario = JSON.parse(localStorage.getItem("inventario")) || [];
    const index = inventario.findIndex(item => item.nombre.toLowerCase() === nombre.toLowerCase());

    if (index !== -1) {
        //Si existe, se aumenta la cantidad en 1
        inventario[index].cantidad += parseInt(cantidad);
    } else {
        //Si no existe se agrega una nueva tarea
        inventario.push({ nombre, cantidad: parseInt(cantidad) });
    }
//Guardar el inventario axtualizado en localStorage
    localStorage.setItem("inventario", JSON.stringify(inventario));
    
    //Limpiar los campos del formulario
    document.getElementById("producto").value = "";
    document.getElementById("cantidad").value = "";
    mostrarInventario();
}
//Aquí se muestra en pantalla todos los productos almacenados en el inventario, se recorre la lista de todo lo que esta guardado
function mostrarInventario() {
    const inventario = JSON.parse(localStorage.getItem("inventario")) || [];
    const tabla = document.getElementById("tablaInventario");
  //Limpiar la tabla antes de vfolver a llenarla
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
//Aquí se guardan los cambios realizados en la cantidad de un producto
function guardarCambios(index) {
    const inventario = JSON.parse(localStorage.getItem("inventario")) || [];
    const nuevaCantidad = parseInt(document.getElementById(`cantidad-${index}`).value);

    //Valida que la cantidad ingresada sea correcta
    if (!isNaN(nuevaCantidad) && nuevaCantidad >= 0) {
        inventario[index].cantidad = nuevaCantidad;
        //Guarda los cambios en el LocalStorage
        localStorage.setItem("inventario", JSON.stringify(inventario));
        //Actualiza la tabla visual
        mostrarInventario();
    }
}

function eliminarProducto(index) {
    let inventario = JSON.parse(localStorage.getItem("inventario")) || [];
    //Elimina el producto seleecionado
    inventario.splice(index, 1);
    //Guarda la lista actualizada
    localStorage.setItem("inventario", JSON.stringify(inventario));
//Refresca la tala    
    mostrarInventario();
}

window.onload = mostrarInventario;
