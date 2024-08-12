$(document).ready(function() {
    const alimentos = [
        {
            "id": 1,
            "nombre": "Tacos al Pastor",
            "descripcion": "Tacos de cerdo adobado con piña y cilantro.",
            "foto": "../Imagenes/Tacos  al pastor.jpg",
            "precio": 35.00,
            "categoria": "Platillos",
            "estado": "activo"
        },
        {
            "id": 2,
            "nombre": "Enchiladas Verdes",
            "descripcion": "Tortillas rellenas de pollo con salsa verde y queso.",
            "foto": "../Imagenes/Enchiladas verdes.jpg",
            "precio": 40.00,
            "categoria": "Platillos",
            "estado": "activo"
        },
        {
            "id": 3,
            "nombre": "Chiles en Nogada",
            "descripcion": "Chiles poblanos rellenos de picadillo con salsa de nuez.",
            "foto": "../Imagenes/chiles en nogada.jpeg",
            "precio": 55.00,
            "categoria": "Platillos",
            "estado": "activo"
        },
        {
            "id": 4,
            "nombre": "Tamal de Elote",
            "descripcion": "Tamal hecho de elote tierno con crema.",
            "foto": "../Imagenes/tamal de elote.jpg",
            "precio": 25.00,
            "categoria": "Postres",
            "estado": "activo"
        },
        {
            "id": 5,
            "nombre": "Tostada de Tinga",
            "descripcion": "Tostada con pollo deshebrado en salsa de tomate.",
            "foto": "../Imagenes/Tostadas de tinga.jpg",
            "precio": 30.00,
            "categoria": "Platillos",
            "estado": "activo"
        },
        {
            "id": 6,
            "nombre": "Quesadilla de Flor de Calabaza",
            "descripcion": "Tortilla rellena de flor de calabaza y queso.",
            "foto": "../Imagenes/Quesadilla de flor de calabaza.jpg",
            "precio": 20.00,
            "categoria": "Platillos",
            "estado": "activo"
        },
        {
            "id": 7,
            "nombre": "Sopa de Tortilla",
            "descripcion": "Sopa de tomate con tiras de tortilla frita.",
            "foto": "../Imagenes/Sopa de tortilla.jpg",
            "precio": 85.00,
            "categoria": "Platillos",
            "estado": "activo"
        },
        {
            "id": 8,
            "nombre": "Pozole Rojo",
            "descripcion": "Sopa de maíz con carne de cerdo en caldo de chile rojo.",
            "foto": "../Imagenes/Pozole rojo.jpg",
            "precio": 45.00,
            "categoria": "Platillos",
            "estado": "activo"
        },
        {
            "id": 9,
            "nombre": "Ceviche de Camarón",
            "descripcion": "Camarones cocidos en jugo de limón con cebolla, cilantro y tomate.",
            "foto": "../Imagenes/Ceviche con camaron.jpg",
            "precio": 50.00,
            "categoria": "Platillos",
            "estado": "activo"
        },
        {
            "id": 10,
            "nombre": "Pastel de Chocolate",
            "descripcion": "Delicioso pastel de chocolate con cobertura de ganache.",
            "foto": "../Imagenes/Pastel de chocolate.jpg",
            "precio": 40.00,
            "categoria": "Postres",
            "estado": "activo"
        }
    ];

    function cargarTabla(mostrarDesactivados = false) {
        const $registros = $('#registros');
        $registros.empty();
        alimentos.forEach(alimento => {
            if ((mostrarDesactivados && alimento.estado === "desactivo") || (!mostrarDesactivados && alimento.estado === "activo")) {
                $registros.append(`
                    <tr>
                        <td>${alimento.id}</td>
                        <td>${alimento.nombre}</td>
                        <td>${alimento.descripcion}</td>
                        <td><img src="${alimento.foto}" alt="${alimento.nombre}" width="100"></td>
                        <td>${alimento.precio.toFixed(2)}</td>
                        <td>${alimento.categoria}</td>
                        <td>${alimento.estado}</td>
                        <td>
                            <button class="btn btn-warning btn-sm btn-modificar" data-id="${alimento.id}">Modificar</button>
                            <button class="btn btn-danger btn-sm btn-eliminar" data-id="${alimento.id}">Eliminar</button>
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
            id: alimentos.length + 1,
            nombre: $('#foodName').val(),
            descripcion: $('#foodDescription').val(),
            foto: $('#foodPhoto').val(),
            precio: parseFloat($('#foodPrice').val()),
            categoria: $('#foodCategory').val(),
            estado: "activo"
        };
        alimentos.push(nuevoAlimento);
        cargarTabla($('#switchEstado').prop('checked'));
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
        $('#modifyFoodEstado').val(alimento.estado);
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
        alimento.estado = $('#modifyFoodEstado').val();
        cargarTabla($('#switchEstado').prop('checked'));
        $('#form-modificar').modal('hide');
    });

    $('#registros').on('click', '.btn-eliminar', function() {
        const id = $(this).data('id');
        $('#modal-mensaje').text('¿Está seguro que desea desactivar el alimento con ID ' + id + '?');
        $('#modal-eliminar').modal('show');
        $('#modal-eliminar').data('id', id);
    });

    window.confirmarEliminacion = function() {
        const id = $('#modal-eliminar').data('id');
        const alimento = alimentos.find(a => a.id === id);
        if (alimento) {
            alimento.estado = "desactivo";
            cargarTabla($('#switchEstado').prop('checked'));
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

    $('#switchEstado').on('change', function() {
        const mostrarDesactivados = $(this).prop('checked');
        cargarTabla(mostrarDesactivados);
        if (mostrarDesactivados) {
            $(this).next('label').text('Mostrar Activos');
        } else {
            $(this).next('label').text('Mostrar Desactivados');
        }
    });
});
