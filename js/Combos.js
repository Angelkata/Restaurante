$(document).ready(function() {
    let mostrarInactivos = false;

    const combos = [
    {
        "id": 1,
        "nombre": "Combo Tacos y Bebida",
        "precio": 50.00,
        "descripcion": "Incluye 3 Tacos al Pastor y una bebida de tu elección.",
        "foto": "../ImagenCombo/Screenshot 2024-08-12 013652.png",
        "Alimento": "rapida",
        "Bebida": "almuerzo",
        "activo": true
    },
    {
        "id": 2,
        "nombre": "Combo Enchiladas y Café",
        "precio": 65.00,
        "descripcion": "Enchiladas Verdes acompañadas de un Café Americano.",
        "foto": "../ImagenCombo/Screenshot 2024-08-12 013644.png",
        "Alimento": "tradicional",
        "Bebida": "cena",
        "activo": true
    },
    {
        "id": 3,
        "nombre": "Combo Chiles en Nogada y Horchata",
        "precio": 75.00,
        "descripcion": "Chiles en Nogada con una bebida de Horchata.",
        "foto": "../ImagenCombo/Screenshot 2024-08-12 013638.png",
        "Alimento": "festiva",
        "Bebida": "cena",
        "activo": true
    },
    {
        "id": 4,
        "nombre": "Combo Tamal y Jugo",
        "precio": 45.00,
        "descripcion": "Tamal de Elote con un Jugo de Naranja.",
        "foto": "../ImagenCombo/Screenshot 2024-08-12 013632.png",
        "Alimento": "rapida",
        "Bebida": "desayuno",
        "activo": true
    },
    {
        "id": 5,
        "nombre": "Combo Tostada y Smoothie",
        "precio": 55.00,
        "descripcion": "Tostada de Tinga con un Smoothie de Frutas.",
        "foto": "../ImagenCombo/Screenshot 2024-08-12 013627.png",
        "Alimento": "rapida",
        "Bebida": "almuerzo",
        "activo": true
    },
    {
        "id": 6,
        "nombre": "Combo Quesadilla y Té Verde",
        "precio": 42.00,
        "descripcion": "Quesadilla de Flor de Calabaza y una bebida de Té Verde.",
        "foto": "../ImagenCombo/Screenshot 2024-08-12 013621.png",
        "Alimento": "vegetariana",
        "Bebida": "almuerzo",
        "activo": true
    },
    {
        "id": 7,
        "nombre": "Combo Sopa y Chocolate Caliente",
        "precio": 85.00,
        "descripcion": "Sopa de Tortilla y un Chocolate Caliente.",
        "foto": "../ImagenCombo/Screenshot 2024-08-12 013615.png",
        "Alimento": "caliente",
        "Bebida": "cena",
        "activo": true
    },
    {
        "id": 8,
        "nombre": "Combo Pozole y Agua de Frutas",
        "precio": 75.00,
        "descripcion": "Pozole Rojo acompañado de un Agua de Frutas.",
        "foto": "../ImagenCombo/Screenshot 2024-08-12 013604.png",
        "Alimento": "tradicional",
        "Bebida": "cena",
        "activo": true
    },
    {
        "id": 9,
        "nombre": "Combo Ceviche y Agua de Mango",
        "precio": 70.00,
        "descripcion": "Ceviche de Camarón y Agua de Mango.",
        "foto": "../ImagenCombo/Screenshot 2024-08-12 013552.png",
        "Alimento": "fria",
        "Bebida": "almuerzo",
        "activo": true
    },
    {
        "id": 10,
        "nombre": "Combo Pastel y Café",
        "precio": 60.00,
        "descripcion": "Pastel de Chocolate con Café Americano.",
        "foto": "../ImagenCombo/Screenshot 2024-08-12 013644.png",
        "Alimento": "postre",
        "Bebida": "cena",
        "activo": true
    }
    ];

    function cargarTabla() {
        const $registros = $('#registros');
        $registros.empty();
        combos.forEach(combo => {
            if (combo.activo || mostrarInactivos) {
                $registros.append(`
<tr class="${combo.activo ? '' : 'table-secondary'}">
<td>${combo.id}</td>
<td>${combo.nombre}</td>
<td>${combo.descripcion}</td>
<td><img src="${combo.foto}" alt="${combo.nombre}" width="100"></td>
<td>${combo.precio.toFixed(2)}</td>
<td>${combo.Alimento}</td>
<td>${combo.Bebida}</td>
<td>
<button class="btn btn-warning btn-sm btn-modificar" data-id="${combo.id}" ${combo.activo ? '' : 'disabled'}>Modificar</button>
<button class="btn btn-danger btn-sm btn-eliminar" data-id="${combo.id}">${combo.activo ? 'Eliminar' : 'Reactivar'}</button>
</td>
</tr>
                `);
            }
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
            Alimento: $('#foodCategory2').val(),
            Bebida: $('#foodCategory').val(),
            activo: true
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
        $('#modifyFoodCategory2').val(alimento.Alimento);
        $('#modifyFoodCategory').val(alimento.Bebida);
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
        alimento.Alimento = $('#modifyFoodCategory2').val();
        alimento.Bebida = $('#modifyFoodCategory').val();
        cargarTabla();
        $('#form-modificar').modal('hide');
    });

    $('#registros').on('click', '.btn-eliminar', function() {
        const id = $(this).data('id');
        const combo = combos.find(a => a.id === id);
        if (combo.activo) {
            combo.activo = false;
            $('#modal-mensaje').text('El combo ha sido marcado como inactivo.');
        } else {
            combo.activo = true;
            $('#modal-mensaje').text('El combo ha sido reactivado.');
        }
        cargarTabla();
        $('#modal-eliminar').modal('hide');
    });

    $('#toggleActivos').on('click', function() {
        mostrarInactivos = !mostrarInactivos;
        cargarTabla();
        $(this).text(mostrarInactivos ? 'Mostrar Activos' : 'Mostrar Inactivos');
    });

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
