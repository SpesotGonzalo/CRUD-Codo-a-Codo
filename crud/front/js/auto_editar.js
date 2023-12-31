// 1: Recuperamos los datos URL y los mostramos en los input
//console.log(location.search);

let argsUrl = location.search.substring(1).split('&');
console.log(argsUrl);

let data = [];
for(let i = 0; i < argsUrl.length; i++){
    data[i] = argsUrl[i].split('=');
}
console.log(data);

document.getElementById('id').value = decodeURIComponent(data[0][1]);
document.getElementById('marca').value = decodeURIComponent(data[1][1]);
document.getElementById('modelo').value = decodeURIComponent(data[2][1]);
document.getElementById('imagen').value = decodeURIComponent(data[3][1]);
document.getElementById('precio').value = decodeURIComponent(data[4][1]);
document.getElementById('stock').value = decodeURIComponent(data[5][1]);

document.getElementById('color').value = decodeURIComponent(data[6][1]);

// 2: Actualizar los datos
function modificar() {
    let id = document.getElementById('id').value;
    let mar = document.getElementById('marca').value;
    let mod = document.getElementById('modelo').value;
    let i = document.getElementById('imagen').value;
    let p = document.getElementById('precio').value;
    let s = document.getElementById('stock').value;
    let c = document.getElementById('color').value;
  
    let auto = {
      marca: mar,
      modelo: mod,
      imagen: i,
      precio: p,
      stock: s,  
      color: c
    };
  
    let url = `https://gonzalospesotcc.pythonanywhere.com/autos/${id}`; // Include the specific ID in the URL
    let options = {
      body: JSON.stringify(auto),
      method: 'PUT', // Use PUT or PATCH for updating an object
      headers: { 'Content-Type': 'application/json' }
    };
  
    fetch(url, options)
      .then(function () {
        alert('El auto fue editado exitosamente');
        window.location.href = './autos.html';
      })
      .catch((err) => {
        alert('No pudo modificarse el auto');
        console.error(err);
      });
  }