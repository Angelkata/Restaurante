$(document).ready(function() {
    const alimentos = [
    {
        "id": 1,
        "nombre": "Tacos al Pastor",
        "descripcion": "Tacos de cerdo adobado con piña y cilantro.",
        "foto": "https://www.mexicoenmicocina.com/wp-content/uploads/2020/05/Tacos-al-pastor.jpg",
        "precio": 35.00,
        "categoria": "Platillos"
    },
    {
        "id": 2,
        "nombre": "Enchiladas Verdes",
        "descripcion": "Tortillas rellenas de pollo con salsa verde y queso.",
        "foto": "../Imagenes/Enchiladasverdes.jpg",
        "precio": 40.00,
        "categoria": "Platillos"
    },
    {
        "id": 3,
        "nombre": "Chiles en Nogada",
        "descripcion": "Chiles poblanos rellenos de picadillo con salsa de nuez.",
        "foto": "https://www.mexicoenmicocina.com/wp-content/uploads/2021/08/Chiles-en-nogada.jpg",
        "precio": 55.00,
        "categoria": "Platillos"
    },
    {
        "id": 4,
        "nombre": "Tamal de Elote",
        "descripcion": "Tamal hecho de elote tierno con crema.",
        "foto": "https://www.mexicoenmicocina.com/wp-content/uploads/2020/10/Tamales-de-elote.jpg",
        "precio": 25.00,
        "categoria": "Postres"
    },
    {
        "id": 5,
        "nombre": "Tostada de Tinga",
        "descripcion": "Tostada con pollo deshebrado en salsa de tomate.",
        "foto": "https://www.mexicoenmicocina.com/wp-content/uploads/2022/02/Tinga-de-pollo.jpg",
        "precio": 30.00,
        "categoria": "Platillos"
    },
    {
        "id": 6,
        "nombre": "Quesadilla de Flor de Calabaza",
        "descripcion": "Tortilla rellena de flor de calabaza y queso.",
        "foto": "https://www.mexicoenmicocina.com/wp-content/uploads/2021/08/quesadillas-flor-de-calabaza.jpg",
        "precio": 20.00,
        "categoria": "Platillos"
    },
    {
        "id": 7,
        "nombre": "Sopa de Tortilla",
        "descripcion": "Sopa de tomate con tiras de tortilla frita.",
        "foto": "https://www.mexicoenmicocina.com/wp-content/uploads/2020/10/Sopa-de-tortilla.jpg",
        "precio": 85.00,
        "categoria": "Platillos"
    },
    {
        "id": 8,
        "nombre": "Pozole Rojo",
        "descripcion": "Sopa de maíz con carne de cerdo en caldo de chile rojo.",
        "foto": "https://www.mexicoenmicocina.com/wp-content/uploads/2020/09/Pozole-rojo.jpg",
        "precio": 45.00,
        "categoria": "Platillos"
    },
    {
        "id": 9,
        "nombre": "Ceviche de Camarón",
        "descripcion": "Camarones cocidos en jugo de limón con cebolla, cilantro y tomate.",
        "foto": "https://www.mexicoenmicocina.com/wp-content/uploads/2022/08/Ceviche-de-camaron.jpg",
        "precio": 50.00,
        "categoria": "Platillos"
    },
    {
        "id": 10,
        "nombre": "Pastel de Chocolate",
        "descripcion": "Delicioso pastel de chocolate con cobertura de ganache.",
        "foto": "https://www.mexicoenmicocina.com/wp-content/uploads/2021/10/Pastel-de-chocolate.jpg",
        "precio": 40.00,
        "categoria": "Postres"
    }
];

 
    function cargarTabla() {
        const $registros = $('#registros');
        $registros.empty();
        alimentos.forEach(alimento => {
            $registros.append(`
<tr>
<td>${alimento.id}</td>
<td>${alimento.nombre}</td>
<td>${alimento.descripcion}</td>
<td><img src="${alimento.foto}" alt="${alimento.nombre}" width="100"></td>
<td>${alimento.precio.toFixed(2)}</td>
<td>${alimento.categoria}</td>
<td>
<button class="btn btn-warning btn-sm btn-modificar" data-id="${alimento.id}">Modificar</button>
<button class="btn btn-danger btn-sm btn-eliminar" data-id="${alimento.id}">Eliminar</button>
</td>
</tr>
            `);
        });
    }
 
    cargarTabla();
 
    $('#addFoodForm').on('submit', function(event) {
        event.preventDefault();
        const nuevoAlimento = {
            id: alimentos.length + 1,
            nombre: $('#foodName').val(),
            descripcion: $('#foodDescription').val(),
            foto: $('#foodPhoto').val(),
            precio: parseFloat($('#foodPrice').val()),
            categoria: $('#foodCategory').val()
        };
        alimentos.push(nuevoAlimento);
        cargarTabla();
        $('#form-agregar').modal('hide');
    });
 
    $('#registros').on('click', '.btn-modificar', function() {
        const id = $(this).data('id');
        const alimento = alimentos.find(a => a.id === id);
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
        const alimento = alimentos.find(a => a.id === id);
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
        const index = alimentos.findIndex(a => a.id === id);
        if (index > -1) {
            alimentos.splice(index, 1);
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