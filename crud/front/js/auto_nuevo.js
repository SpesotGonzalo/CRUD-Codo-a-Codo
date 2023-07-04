function guardar(){
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
        color : c
    };

    let url = 'https://gonzalospesotcc.pythonanywhere.com/autos'
    let options = {
        body: JSON.stringify(auto),
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    }

    fetch(url, options)
    .then(function(){
        alert("Automovil agregado exitosamente");
        window.location.href = './autos.html'
    })
    .catch(error => {
        alert('No pudo agregarse el auto');
        console.error(error);
    })
}