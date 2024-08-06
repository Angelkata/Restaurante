$(document).ready(function() {
    const empleados = [
        {
            "id": 1,
            "empleado": "Juan Pérez",
            "password": "H2rY8Bv4k1T9",
            "sucursal": "Sucursal Centro"
        },
        {
            "id": 2,
            "empleado": "María García",
            "password": "P5jQ3Wf6x8L0",
            "sucursal": "Sucursal Norte"
        },
        {
            "id": 3,
            "empleado": "Carlos Sánchez",
            "password": "D3sF7Jk9z6X2",
            "sucursal": "Sucursal Sur"
        },
        {
            "id": 4,
            "empleado": "Ana López",
            "password": "M8vQ2Rj5k7B1",
            "sucursal": "Sucursal Este"
        },
        {
            "id": 5,
            "empleado": "Luis Martínez",
            "password": "B2fG9Nw8r6T3",
            "sucursal": "Sucursal Oeste"
        },
        {
            "id": 6,
            "empleado": "Laura Torres",
            "password": "C6dF3Xk9z5Y1",
            "sucursal": "Sucursal Central"
        },
        {
            "id": 7,
            "empleado": "Pedro Ruiz",
            "password": "V1rK8Zs3f5L7",
            "sucursal": "Sucursal Sur"
        },
        {
            "id": 8,
            "empleado": "Carmen Ortiz",
            "password": "X9tH4Qv7j8R2",
            "sucursal": "Sucursal Norte"
        },
        {
            "id": 9,
            "empleado": "Miguel Ramírez",
            "password": "T5hN2Jv4k8L3",
            "sucursal": "Sucursal Este"
        },
        {
            "id": 10,
            "empleado": "Patricia Fernández",
            "password": "Z4mG8Fj6b1N2",
            "sucursal": "Sucursal Oeste"
        }
    ];
 
    function cargarTabla() {
        const $registros = $('#registros');
        $registros.empty();
        empleados.forEach(empleado => {
            $registros.append(`
<tr>
<td>${empleado.id}</td>
<td>${empleado.empleado}</td>
<td>${empleado.password}</td>
<td>${empleado.sucursal}</td>
<td>
<button class="btn btn-warning btn-sm btn-modificar" data-id="${empleado.id}">Modificar</button>
<button class="btn btn-danger btn-sm btn-eliminar" data-id="${empleado.id}">Eliminar</button>
</td>
</tr>
            `);
        });
    }
 
    cargarTabla();
 
    $('#addFoodForm').on('submit', function(event) {
        event.preventDefault();
        const nuevoEmpleado = {
            id: empleados.length + 1,
            empleado: $('#foodName').val(),
            password: $('#foodDescription').val(),
            sucursal: $('#foodPhoto').val()
        };
        empleados.push(nuevoEmpleado);
        cargarTabla();
        $('#form-agregar').modal('hide');
    });
 
    $('#registros').on('click', '.btn-modificar', function() {
        const id = $(this).data('id');
        const empleado = empleados.find(e => e.id === id);
        $('#modifyFoodId').val(empleado.id);
        $('#modifyFoodName').val(empleado.empleado);
        $('#modifyFoodDescription').val(empleado.password);
        $('#modifyFoodPhoto').val(empleado.sucursal);
        $('#form-modificar').modal('show');
    });
 
    $('#modifyFoodForm').on('submit', function(event) {
        event.preventDefault();
        const id = parseInt($('#modifyFoodId').val(), 10);
        const empleado = empleados.find(e => e.id === id);
        empleado.empleado = $('#modifyFoodName').val();
        empleado.password = $('#modifyFoodDescription').val();
        empleado.sucursal = $('#modifyFoodPhoto').val();
        cargarTabla();
        $('#form-modificar').modal('hide');
    });
 
    $('#registros').on('click', '.btn-eliminar', function() {
        const id = $(this).data('id');
        $('#modal-mensaje').text('¿Está seguro que desea eliminar el empleado con ID ' + id + '?');
        $('#modal-eliminar').modal('show');
        $('#modal-eliminar').data('id', id);
    });
 
    window.confirmarEliminacion = function() {
        const id = $('#modal-eliminar').data('id');
        const index = empleados.findIndex(e => e.id === id);
        if (index > -1) {
            empleados.splice(index, 1);
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
