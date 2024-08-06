$(document).ready(function() {
    const combos = [
        {
        "id": 1,
        "nombre": "Combo Tacos y Bebida",
        "precio": 50.00,
        "descripcion": "Incluye 3 Tacos al Pastor y una bebida de tu elección.",
        "comida": [1],
        "bebidas": [1]
    },
    {
        "id": 2,
        "nombre": "Combo Enchiladas y Café",
        "precio": 65.00,
        "descripcion": "Enchiladas Verdes acompañadas de un Café Americano.",
        "comida": [2],
        "bebidas": [0]
    },
    {
        "id": 3,
        "nombre": "Combo Chiles en Nogada y Horchata",
        "precio": 75.00,
        "descripcion": "Chiles en Nogada con una bebida de Horchata.",
        "comida": [3],
        "bebidas": [8]
    },
    {
        "id": 4,
        "nombre": "Combo Tamal y Jugo",
        "precio": 45.00,
        "descripcion": "Tamal de Elote con un Jugo de Naranja.",
        "comida": [4],
        "bebidas": [1]
    },
    {
        "id": 5,
        "nombre": "Combo Tostada y Smoothie",
        "precio": 55.00,
        "descripcion": "Tostada de Tinga con un Smoothie de Frutas.",
        "comida": [5],
        "bebidas": [3]
    },
    {
        "id": 6,
        "nombre": "Combo Quesadilla y Té Verde",
        "precio": 42.00,
        "descripcion": "Quesadilla de Flor de Calabaza y una bebida de Té Verde.",
        "comida": [6],
        "bebidas": [4]
    },
    {
        "id": 7,
        "nombre": "Combo Sopa y Chocolate Caliente",
        "precio": 85.00,
        "descripcion": "Sopa de Tortilla y un Chocolate Caliente.",
        "comida": [7],
        "bebidas": [5]
    },
    {
        "id": 8,
        "nombre": "Combo Pozole y Agua de Frutas",
        "precio": 75.00,
        "descripcion": "Pozole Rojo acompañado de un Agua de Frutas.",
        "comida": [8],
        "bebidas": [9]
    },
    {
        "id": 9,
        "nombre": "Combo Ceviche y Agua de Mango",
        "precio": 70.00,
        "descripcion": "Ceviche de Camarón y Agua de Mango.",
        "comida": [9],
        "bebidas": [10]
    },
    {
        "id": 10,
        "nombre": "Combo Pastel y Café",
        "precio": 60.00,
        "descripcion": "Pastel de Chocolate con Café Americano.",
        "comida": [10],
        "bebidas": [0]
    }
    ];
 
    function cargarTabla() {
        const $registros = $('#registros');
        $registros.empty();
        combos.forEach(combo => {
            $registros.append(`
<tr>
<td>${combo.id}</td>
<td>${combo.nombre}</td>
<td>${combo.descripcion}</td>
<td><img src="${combo.foto}" alt="${combo.nombre}" width="100"></td>
<td>${combo.precio.toFixed(2)}</td>
<td>${combo.categoria}</td>
<td>
<button class="btn btn-warning btn-sm btn-modificar" data-id="${combo.id}">Modificar</button>
<button class="btn btn-danger btn-sm btn-eliminar" data-id="${combo.id}">Eliminar</button>
</td>
</tr>
            `);
        });
    }
 
    cargarTabla();
 
    $('#addFoodForm').on('submit', function(event) {
        event.preventDefault();
        const nuevoAlimento = {
            id: combos.length + 1,
            nombre: $('#foodName').val(),
            descripcion: $('#foodDescription').val(),
            foto: $('#foodPhoto').val(),
            precio: parseFloat($('#foodPrice').val()),
            categoria: $('#foodCategory').val()
        };
        combos.push(nuevoAlimento);
        cargarTabla();
        $('#form-agregar').modal('hide');
    });
 
    $('#registros').on('click', '.btn-modificar', function() {
        const id = $(this).data('id');
        const alimento = combos.find(a => a.id === id);
        $('#modifyFoodId').val(alimento.id);
        $('#modifyFoodName').val(alimento.nombre);
        $('#modifyFoodDescription').val(alimento.descripcion);
        $('#modifyFoodPhoto').val(alimento.foto);
        $('#modifyFoodPrice').val(alimento.precio);
        $('#modifyFoodCategory').val(alimento.categoria);
        $('#form-modificar').modal('show');
    });
 
    $('#modifyFoodForm').on('submit', function(event) {
        event.preventDefault();
        const id = parseInt($('#modifyFoodId').val(), 10);
        const alimento = combos.find(a => a.id === id);
        alimento.nombre = $('#modifyFoodName').val();
        alimento.descripcion = $('#modifyFoodDescription').val();
        alimento.foto = $('#modifyFoodPhoto').val();
        alimento.precio = parseFloat($('#modifyFoodPrice').val());
        alimento.categoria = $('#modifyFoodCategory').val();
        cargarTabla();
        $('#form-modificar').modal('hide');
    });
 
    $('#registros').on('click', '.btn-eliminar', function() {
        const id = $(this).data('id');
        $('#modal-mensaje').text('¿Está seguro que desea eliminar el alimento con ID ' + id + '?');
        $('#modal-eliminar').modal('show');
        $('#modal-eliminar').data('id', id);
    });
 
    window.confirmarEliminacion = function() {
        const id = $('#modal-eliminar').data('id');
        const index = combos.findIndex(a => a.id === id);
        if (index > -1) {
            combos.splice(index, 1);
            cargarTabla();
        }
        $('#modal-eliminar').modal('hide');
    };
 
    $('#searchInput').on('keyup', function() {
        const query = $(this).val().toLowerCase();
        $('#registros tr').each(function() {
            const nombre = $(this).find('td').eq(1).text().toLowerCase();
            $(this).toggle(nombre.includes(query));
        });
    });
 
    $('#printResults').on('click', function() {
        window.print();
    });
});