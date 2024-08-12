$(document).ready(function() {
    const bebidas = [
        {
            "id": 1,
            "nombre": "Café Americano",
            "descripcion": "Café negro tradicional americano.",
            "foto": "../Imagenes/Cafe americano.jpg",
            "precio": 25.00,
            "categoria": "Bebidas",
            "estado": "activo"
        },
        {
            "id": 2,
            "nombre": "Jugo de Naranja",
            "descripcion": "Jugo natural exprimido de naranjas frescas.",
            "foto": "../Imagenes/Juego de naranja.jpg",
            "precio": 20.00,
            "categoria": "Bebidas",
            "estado": "activo"
        },
        {
            "id": 3,
            "nombre": "Limonada",
            "descripcion": "Refrescante limonada casera.",
            "foto": "../Imagenes/Limonada.jpg",
            "precio": 18.00,
            "categoria": "Bebidas",
            "estado": "activo"
        },
        {
            "id": 4,
            "nombre": "Smoothie de Frutas",
            "descripcion": "Batido de frutas variadas con yogurt.",
            "foto": "../Imagenes/Smoothie de frutas.jpg",
            "precio": 30.00,
            "categoria": "Bebidas",
            "estado": "activo"
        },
        {
            "id": 5,
            "nombre": "Té Verde",
            "descripcion": "Infusión de té verde con limón y hierbas.",
            "foto": "../Imagenes/Te verde.jpg",
            "precio": 22.00,
            "categoria": "Bebidas",
            "estado": "activo"
        },
        {
            "id": 6,
            "nombre": "Chocolate Caliente",
            "descripcion": "Chocolate caliente tradicional mexicano.",
            "foto": "../Imagenes/Chocolate caliente.jpg",
            "precio": 25.00,
            "categoria": "Bebidas",
            "estado": "activo"
        },
        {
            "id": 7,
            "nombre": "Jamaica",
            "descripcion": "Agua tradicional mexicana de Jamaica.",
            "foto": "../Imagenes/Jamaica.jpg",
            "precio": 20.00,
            "categoria": "Bebidas",
            "estado": "activo"
        },
        {
            "id": 8,
            "nombre": "Horchata",
            "descripcion": "Agua tradicional mexicana de horchata.",
            "foto": "../Imagenes/Horchata.jpg",
            "precio": 18.00,
            "categoria": "Bebidas",
            "estado": "activo"
        },
        {
            "id": 9,
            "nombre": "Agua de Frutas",
            "descripcion": "Agua de varias frutas (fresa, plátano, melón).",
            "foto": "../Imagenes/Agua de frutas.jpg",
            "precio": 30.00,
            "categoria": "Bebidas",
            "estado": "activo"
        },
        {
            "id": 10,
            "nombre": "Agua de Mango",
            "descripcion": "Agua de mango.",
            "foto": "../Imagenes/Agua de mango.jpg",
            "precio": 22.00,
            "categoria": "Bebidas",
            "estado": "activo"
        }
    ];

    function cargarTabla(mostrarDesactivados = false) {
        const $registros = $('#registros');
        $registros.empty();
        bebidas.forEach(bebida => {
            if ((mostrarDesactivados && bebida.estado === "desactivo") || (!mostrarDesactivados && bebida.estado === "activo")) {
                $registros.append(`
                    <tr>
                        <td>${bebida.id}</td>
                        <td>${bebida.nombre}</td>
                        <td>${bebida.descripcion}</td>
                        <td><img src="${bebida.foto}" alt="${bebida.nombre}" width="100"></td>
                        <td>${bebida.precio.toFixed(2)}</td>
                        <td>${bebida.categoria}</td>
                        <td>${bebida.estado}</td>
                        <td>
                            <button class="btn btn-warning btn-sm btn-modificar" data-id="${bebida.id}">Modificar</button>
                            <button class="btn btn-danger btn-sm btn-eliminar" data-id="${bebida.id}">Eliminar</button>
                        </td>
                    </tr>
                `);
            }
        });
    }

    cargarTabla();

    $('#addFoodForm').on('submit', function(event) {
        event.preventDefault();
        const nuevaBebida = {
            id: bebidas.length + 1,
            nombre: $('#foodName').val(),
            descripcion: $('#foodDescription').val(),
            foto: $('#foodPhoto').val(),
            precio: parseFloat($('#foodPrice').val()),
            categoria: $('#foodCategory').val(),
            estado: "activo"
        };
        bebidas.push(nuevaBebida);
        cargarTabla($('#switchEstado').prop('checked'));
        $('#form-agregar').modal('hide');
    });

    $('#registros').on('click', '.btn-modificar', function() {
        const id = $(this).data('id');
        const bebida = bebidas.find(b => b.id === id);
        $('#modifyFoodId').val(bebida.id);
        $('#modifyFoodName').val(bebida.nombre);
        $('#modifyFoodDescription').val(bebida.descripcion);
        $('#modifyFoodPhoto').val(bebida.foto);
        $('#modifyFoodPrice').val(bebida.precio);
        $('#modifyFoodCategory').val(bebida.categoria);
        $('#modifyFoodEstado').val(bebida.estado);
        $('#form-modificar').modal('show');
    });

    $('#modifyFoodForm').on('submit', function(event) {
        event.preventDefault();
        const id = parseInt($('#modifyFoodId').val(), 10);
        const bebida = bebidas.find(b => b.id === id);
        bebida.nombre = $('#modifyFoodName').val();
        bebida.descripcion = $('#modifyFoodDescription').val();
        bebida.foto = $('#modifyFoodPhoto').val();
        bebida.precio = parseFloat($('#modifyFoodPrice').val());
        bebida.categoria = $('#modifyFoodCategory').val();
        bebida.estado = $('#modifyFoodEstado').val();
        cargarTabla($('#switchEstado').prop('checked'));
        $('#form-modificar').modal('hide');
    });

    $('#registros').on('click', '.btn-eliminar', function() {
        const id = $(this).data('id');
        $('#modal-mensaje').text('¿Está seguro que desea desactivar la bebida con ID ' + id + '?');
        $('#modal-eliminar').modal('show');
        $('#modal-eliminar').data('id', id);
    });

    window.confirmarEliminacion = function() {
        const id = $('#modal-eliminar').data('id');
        const bebida = bebidas.find(b => b.id === id);
        if (bebida) {
            bebida.estado = "desactivo";
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
