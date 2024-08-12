  $(document).ready(function() {
    const empleados = [
        {
            "id": 1,
            "empleado": "Juan ",
            "apellido_paterno": "Perez",
            "apellido_materno": "Ramirez",
            "numero_telefono": "(555) 123-4567",
            "direccion": "Av. Paseo de los Insurgentes 101, Colonia Insurgentes, León, GTO, México",
            "password": "H2rY8Bv4k1T9",
            "sucursal": "Sucursal Centro"
        },
        {
            "id": 2,
            "empleado": "María",
            "apellido_paterno": "Garcia",
            "apellido_materno": "Vásquez",
            "numero_telefono": "(555) 234-5678",
            "direccion": "Calle Madero 55, Centro Histórico, León, GTO, México",
            "password": "P5jQ3Wf6x8L0",
            "sucursal": "Sucursal Norte"
        },
        {
            "id": 3,
            "empleado": "Carlos ",
            "apellido_paterno": "Sánchez ",
            "apellido_materno": " Morales",
            "numero_telefono": "(555) 345-6789",
            "direccion": "Blvd. Adolfo López Mateos 1234, Colonia Providencia, León, GTO, México",
            "password": "D3sF7Jk9z6X2",
            "sucursal": "Sucursal Sur"
        },
        {
            "id": 4,
            "empleado": "Ana ",
            "apellido_paterno": "López",
            "apellido_materno": "Ramos",
            "numero_telefono": "(555) 456-7890",
            "direccion": "Calle 5 de Febrero 678, Colonia San Pedro, León, GTO, México",
            "password": "M8vQ2Rj5k7B1",
            "sucursal": "Sucursal Este"
        },
        {
            "id": 5,
            "empleado": "Luis ",
            "apellido_paterno": "Martínez",
            "apellido_materno": "Castro",
            "numero_telefono": "(555) 567-8901",
            "direccion": "Av. Juan Alonso de Torres 22, Colonia San Miguel, León, GTO, México",
            "password": "B2fG9Nw8r6T3",
            "sucursal": "Sucursal Oeste"
        },
        {
            "id": 6,
            "empleado": "Laura ",
            "apellido_paterno": "Torres ",
            "apellido_materno": "Cruz",
            "numero_telefono": "(555) 678-9012",
            "direccion": "Calle Zaragoza 432, Colonia San Felipe, León, GTO, México",
            "password": "C6dF3Xk9z5Y1",
            "sucursal": "Sucursal Central"
        },
        {
            "id": 7,
            "empleado": "Pedro ",
            "apellido_paterno": "Ruiz ",
            "apellido_materno": "Salazar",
            "numero_telefono": "(555) 789-0123",
            "direccion": "Blvd. Campo Verde 89, Colonia Campo Verde, León, GTO, México",
            "password": "V1rK8Zs3f5L7",
            "sucursal": "Sucursal Sur"
        },
        {
            "id": 8,
            "empleado": "Carmen ",
            "apellido_paterno": "Ortiz",
            "apellido_materno": " Gutiérrez",
            "numero_telefono": "(555) 890-1234",
    "       direccion": "Calle Juárez 890, Colonia El Tepetate, León, GTO, México",
            "password": "X9tH4Qv7j8R2",
            "sucursal": "Sucursal Norte"
        },
        {
            "id": 9,
            "empleado": "Miguel ",
            "apellido_paterno": "",
            "apellido_materno": "Ramírez",
            "numero_telefono": "(555) 901-2345",
            "direccion": "Av. Olímpica 456, Colonia El Coecillo, León, GTO, México",
            "password": "T5hN2Jv4k8L3",
            "sucursal": "Sucursal Este"
        },
        {
            "id": 10,
            "empleado": "Patricia ",
            "apellido_paterno": "Fernández",
            "apellido_materno": "Pardo",
            "numero_telefono": "(555) 012-3456",
            "direccion": "Calle Nuevo León 201, Colonia León I, León, GTO, México",
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
                <td>${empleado.apellido_paterno}</td>
                <td>${empleado.apellido_materno}</td>
                <td>${empleado.numero_telefono}</td>
                <td>${empleado.direccion}</td>
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

    function generarContrasena(nombreUsuario, sucursal) {
        const fechaActual = new Date().toLocaleDateString();
        const letrasMayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
        const numeros = '0123456789';
        const caracteresEspeciales = '!@#$%^&*()-_=+[]{}|;:,.<>?/';

        const todosCaracteres = letrasMayusculas + letrasMinusculas + numeros + caracteresEspeciales;

        function obtenerCaracterAleatorio(cadena) {
            return cadena.charAt(Math.floor(Math.random() * cadena.length));
        }

        let contrasena = '';

        contrasena += nombreUsuario.charAt(0).toUpperCase();

        const dia = new Date(fechaActual).getDate();
        contrasena += dia;

        contrasena += sucursal.charAt(0).toLowerCase();

        while (contrasena.length < 12) {
            contrasena += obtenerCaracterAleatorio(todosCaracteres);
        }

        contrasena = contrasena.substring(0, 12);

        // Verificación de reglas
        function validarContrasena(contrasena) {
            const tieneMayuscula = /[A-Z]/.test(contrasena);
            const tieneMinuscula = /[a-z]/.test(contrasena);
            const tieneNumero = /\d/.test(contrasena);
            const tieneEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(contrasena);
            return tieneMayuscula && tieneMinuscula && tieneNumero && tieneEspecial;
        }

        while (!validarContrasena(contrasena)) {
            contrasena = generarContrasena(nombreUsuario, sucursal); // Regenera si no cumple con las reglas
        }

        return contrasena;
    }

    function limpiarFormulario() {
        $('#FoodId').val("");
        $('#foodName').val("");
        $('#appNameP').val("");
        $('#appNameM').val("");
        $('#noTelName').val("");
        $('#dirName').val("");
        $('#foodDescription').val("");
        $('#FoodPhoto').val("");
        $('#foodSucursal').prop('selectedIndex', 0);
    }

    $('#addFoodForm').on('submit', function(event) {
        event.preventDefault();
        let password = $('#foodDescription').val();
        if(password.length == 0) {
            password = generarContrasena($('#foodName').val(), $('#foodSucursal option:selected').text());
        } else {
            // Validar la contraseña ingresada
            function validarContrasena(contrasena) {
                const tieneMayuscula = /[A-Z]/.test(contrasena);
                const tieneMinuscula = /[a-z]/.test(contrasena);
                const tieneNumero = /\d/.test(contrasena);
                const tieneEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(contrasena);
                return tieneMayuscula && tieneMinuscula && tieneNumero && tieneEspecial;
            }

            if (!validarContrasena(password)) {
                alert('La contraseña ingresada no cumple con los requisitos.');
                return;
            }
        }

        const nuevoEmpleado = {
            id: empleados.length + 1,
            empleado: $('#foodName').val(),
            apellido_paterno: $('#appNameP').val(),
            apellido_materno: $('#appNameM').val(),
            numero_telefono: $('#noTelName').val(),
            direccion: $('#dirName').val(),
            password: password,
            sucursal: $('#foodSucursal option:selected').text()

        };
        empleados.push(nuevoEmpleado);
        cargarTabla();
        $('#form-agregar').modal('hide');
        limpiarFormulario();
    });

    $('#registros').on('click', '.btn-modificar', function() {

        limpiarFormulario();
        const id = $(this).data('id');
        const empleado = empleados.find(e => e.id === id);
        $('#modifyFoodId').val(empleado.id);
        $('#modifyFoodName').val(empleado.empleado);
        $('#modifyappNameP').val(empleado.apellido_paterno);
        $('#modifyappNameM').val(empleado.apellido_materno);
        $('#modifynoTelName').val(empleado.numero_telefono);
        $('#modifydirName').val(empleado.direccion); 
        $('#modifyFoodDescription').val(empleado.password);
        $('#modifyFoodPhoto').val(empleado.sucursal);
        $('#form-modificar').modal('show');
    });

    $('#modifyFoodForm').on('submit', function(event) {
        event.preventDefault();
        const id = parseInt($('#modifyFoodId').val(), 10);
        const empleado = empleados.find(e => e.id === id);
        empleado.empleado = $('#modifyFoodName').val();
        empleado.apeliido_paterno = $('#modifyappNameP').val();
        empleado.apellido_materno = $('#modifyappNameM').val();
        empleado.numero_telefono = $('#modifynoTelName').val();
        empleado.direccion = $('#modifydirName').val();
        empleado.password = $('#modifyFoodDescription').val();
        empleado.sucursal = $('#modifyFoodSucursal option:selected').text();
        cargarTabla();
        $('#form-modificar').modal('hide');
        limpiarFormulario();
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