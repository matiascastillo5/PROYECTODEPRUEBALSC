document.addEventListener('DOMContentLoaded', function () {
    // --- Lógica del reproductor de audio ---
    const audio = document.getElementById('audio');
    const playlist = document.getElementById('playlist');
    const tracks = playlist.getElementsByTagName('li');
    let currentTrack = 0;

    function loadTrack(index) {
        const track = tracks[index];
        audio.src = track.getAttribute('data-src');
        audio.play();
        highlightTrack(index);
    }

    function highlightTrack(index) {
        Array.from(tracks).forEach((track, i) => {
            if (i === index) {
                track.classList.add('active');
            } else {
                track.classList.remove('active');
            }
        });
    }

    loadTrack(currentTrack);

    Array.from(tracks).forEach((track, index) => {
        track.addEventListener('click', () => {
            currentTrack = index;
            loadTrack(index);
        });
    });

    audio.addEventListener('ended', () => {
        currentTrack = (currentTrack + 1) % tracks.length;
        loadTrack(currentTrack);
    });

    // --- Lógica del catálogo y carrito ---
    const productos = [
        { id: 1, nombre: 'TYPE BEAT JERE KLEIN - MATEO ON THE BEATS 2024', precio: 15000 },
        { id: 2, nombre: 'TYPE BEAT JOSSIE - BIGCVYU 2024', precio: 15000 },
        { id: 3, nombre: 'TYPE BEAT CRIS MJ - FLOYY MENOR 2024', precio: 15000 }
    ];

    const carrito = [];
    const productosContainer = document.getElementById('productos');
    const carritoBody = document.getElementById('carrito-body');
    const totalElement = document.getElementById('total');

    productosContainer.innerHTML = ''; // Asegura que no haya duplicados

    productos.forEach(producto => {
        const col = document.createElement('div');
        col.classList.add('col-md-4', 'mb-3');
        col.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio.toFixed(1)}</p>
                    <button class="btn btn-primary" data-id="${producto.id}">Agregar al Carrito</button>
                </div>
            </div>
        `;
        productosContainer.appendChild(col);
    });

    productosContainer.addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            const id = parseInt(e.target.getAttribute('data-id'));
            const producto = productos.find(p => p.id === id);
            agregarAlCarrito(producto);
        }
    });

    function agregarAlCarrito(producto) {
        // Verificar si el producto ya está en el carrito
        const item = carrito.find(p => p.id === producto.id);
        if (item) {
            // Si el producto ya está en el carrito, no se agrega de nuevo
            alert('Este producto ya está en el carrito y es de calidad exclusiva.');
            return; // Salir de la función para evitar agregar duplicados
        } else {
            // Si no está en el carrito, se agrega con cantidad 1
            carrito.push({ ...producto, cantidad: 1 });
        }
        actualizarCarrito();
    }
    

    function actualizarCarrito() {
        carritoBody.innerHTML = '';
        let total = 0;

        carrito.forEach(producto => {
            const row = document.createElement('tr');
            const subtotal = producto.precio * producto.cantidad;
            total += subtotal;

            row.innerHTML = `
                <td>${producto.nombre}</td>
                <td>$${producto.precio.toFixed(1)}</td>
                <td>${producto.cantidad}</td>
                <td>$${subtotal.toFixed(1)}</td>
                <td><button class="btn btn-danger btn-sm" data-id="${producto.id}">Eliminar</button></td>
            `;

            carritoBody.appendChild(row);
        });

        totalElement.textContent = total.toFixed(1);
    }

    carritoBody.addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            const id = parseInt(e.target.getAttribute('data-id'));
            const index = carrito.findIndex(p => p.id === id);
            if (index !== -1) carrito.splice(index, 1);
            actualizarCarrito();
        }
    });

    document.getElementById('compra-form').addEventListener('submit', e => {
        e.preventDefault();
        alert('¡Compra realizada con éxito!');
        carrito.length = 0;
        actualizarCarrito();
        e.target.reset();
    });
});