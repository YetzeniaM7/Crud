//Realizado por: Yetzenia Mendoza
//Fecha: 16/07/2023

// Se selecciona el formulario y la tabla del DOM
const form = document.querySelector('#form');
const table = document.querySelector('#table tbody');

// Se obtienen las entradas guardadas en el almacenamiento local o inicializa un arreglo vacío si no hay entradas guardadas
let entries = JSON.parse(localStorage.getItem('entries')) || [];

// Función para guardar una entrada desde el Button Guardar
const saveEntry = (e) => {
    e.preventDefault(); 
    const date = document.querySelector('#Dia').value; // Se obtiene la fecha 
    const note = document.querySelector('#Note').value; // Se obtiene la nota
    const entry = { date, note }; // Se crea un objeto con la fecha y la nota
    entries.push(entry); // Se agrega la entrada al arreglo de entradas
    localStorage.setItem('entries', JSON.stringify(entries)); // Se guardan las entradas en el almacenamiento local
    form.reset(); //Se resetea el formulario
    showEntries(); // Se llama la funcion para mostrar los datos en la tabla
}

// Función para mostrar las entradas en la tabla
const showEntries = () => {
    table.innerHTML = ''; // Se limpia el contenido de la tabla
    entries.forEach((entry, index) => { // Se recorre el arreglo de entradas
        table.innerHTML += `
            <tr>
                <td>${entry.date}</td>
                <td>${entry.note}</td>
                <td><button class="edit" onclick="editEntry(${index})" ><i class="fas fa-pencil-alt"></i>
                </button>
                <button class="edit" onclick="deleteEntry(${index})"><i class="fas fa-trash"></i>
                </button></td>
            </tr>
        `;
    });
}

// Función para editar una entrada
const editEntry = (index) => {
    document.querySelector('#Dia').value = entries[index].date; 
    document.querySelector('#Note').value = entries[index].note; 
    form.onsubmit = (e) => { // Se cambia la función que se ejecuta al enviar el formulario
        e.preventDefault();
        entries[index].date = document.querySelector('#Dia').value; // Se edita la fecha de la entrada con el valor ingresado por el usuario
        entries[index].note = document.querySelector('#Note').value; // Se edita la nota de la entrada con el valor ingresado por el usuario
        localStorage.setItem('entries', JSON.stringify(entries));
        form.reset(); 
        form.onsubmit = saveEntry; 
        showEntries(); // Se muestran las entradas en la tabla
    }
}

// Función para eliminar una entrada
const deleteEntry = (index) => {
    entries.splice(index, 1); // Se elimina la entrada del arreglo de entradas
    localStorage.setItem('entries', JSON.stringify(entries)); // Se guardan las entradas en el almacenamiento local
    showEntries(); // Se muentran las entradas en la tabla
}

form.onsubmit = saveEntry; // Se asigna la función saveEntry como manejador del evento submit del formulario
showEntries(); // Se muestran las entradas en la tabla al cargar la página

