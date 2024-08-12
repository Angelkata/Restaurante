$(document).ready(function() {
    let sucursalIdCounter = 11; // Contador de ID inicial
    const sucursales = [
        {
            id: 1,
            nombre: "Sucursal Centro",
            ubicacion: "Av. Principal 123",
            gps: "19.4326,-99.1332",
            logo: "logo1.png",
            url: "http://sucursalcentro.com",
            horarios: "09:00 - 21:00",
            estado: "Activo"
        },
        {
            id: 2,
            nombre: "Sucursal Norte",
            ubicacion: "Calle Norte 456",
            gps: "19.4456,-99.1456",
            logo: "logo2.png",
            url: "http://sucursalnorte.com",
            horarios: "08:00 - 22:00",
            estado: "Activo"
        },
        {
            id: 3,
            nombre: "Sucursal Sur",
            ubicacion: "Av. Sur 789",
            gps: "19.4567,-99.1567",
            logo: "logo3.png",
            url: "http://sucursalsur.com",
            horarios: "10:00 - 20:00",
            estado: "Inactivo"
        },
        {
            id: 4,
            nombre: "Sucursal Este",
            ubicacion: "Calle Este 321",
            gps: "19.4678,-99.1678",
            logo: "logo4.png",
            url: "http://sucursaleste.com",
            horarios: "09:00 - 19:00",
            estado: "Activo"
        },
        {
            id: 5,
            nombre: "Sucursal Oeste",
            ubicacion: "Av. Oeste 654",
            gps: "19.4789,-99.1789",
            logo: "logo5.png",
            url: "http://sucursaloeste.com",
            horarios: "11:00 - 21:00",
            estado: "Activo"
        },
        {
            id: 6,
            nombre: "Sucursal Altavista",
            ubicacion: "Calle Altavista 987",
            gps: "19.4890,-99.1890",
            logo: "logo6.png",
            url: "http://sucursalaltavista.com",
            horarios: "08:00 - 20:00",
            estado: "Inactivo"
        },
        {
            id: 7,
            nombre: "Sucursal Del Valle",
            ubicacion: "Av. Del Valle 1234",
            gps: "19.5001,-99.2001",
            logo: "logo7.png",
            url: "http://sucursaldelvalle.com",
            horarios: "09:00 - 22:00",
            estado: "Activo"
        },
        {
            id: 8,
            nombre: "Sucursal Polanco",
            ubicacion: "Calle Polanco 5678",
            gps: "19.5112,-99.2112",
            logo: "logo8.png",
            url: "http://sucursalpolanco.com",
            horarios: "10:00 - 20:00",
            estado: "Activo"
        },
        {
            id: 9,
            nombre: "Sucursal Condesa",
            ubicacion: "Av. Condesa 8765",
            gps: "19.5223,-99.2223",
            logo: "logo9.png",
            url: "http://sucursalcondesa.com",
            horarios: "11:00 - 21:00",
            estado: "Inactivo"
        },
        {
            id: 10,
            nombre: "Sucursal Roma",
            ubicacion: "Calle Roma 5432",
            gps: "19.5334,-99.2334",
            logo: "logo10.png",
            url: "http://sucursalroma.com",
            horarios: "09:00 - 19:00",
            estado: "Activo"
        }
    ];

    function cargarTabla(mostrarInactivos = false) {
        const $registros = $('#registros');
        $registros.empty();
        sucursales.forEach(sucursal => {
            if (mostrarInactivos && sucursal.estado === "Inactivo") {
                $registros.append(`
                    <tr>
                        <td>${sucursal.nombre}</td>
                        <td>${sucursal.ubicacion}</td>
                        <td>${sucursal.gps}</td>
                        <td><img src="${sucursal.logo}" alt="${sucursal.nombre}" width="50"></td>
                        <td><a href="${sucursal.url}" target="_blank">${sucursal.url}</a></td>
                        <td>${sucursal.horarios}</td>
                        <td>${sucursal.estado}</td>
                        <td>
                            <button class="btn btn-primary btn-modificar" data-id="${sucursal.id}">Modificar</button>
                            <button class="btn btn-danger btn-eliminar" data-id="${sucursal.id}">Eliminar</button>
                        </td>
                    </tr>
                `);
            } else if (!mostrarInactivos && sucursal.estado === "Activo") {
                $registros.append(`
                    <tr>
                        <td>${sucursal.nombre}</td>
                        <td>${sucursal.ubicacion}</td>
                        <td>${sucursal.gps}</td>
                        <td><img src="${sucursal.logo}" alt="${sucursal.nombre}" width="50"></td>
                        <td><a href="${sucursal.url}" target="_blank">${sucursal.url}</a></td>
                        <td>${sucursal.horarios}</td>
                        <td>${sucursal.estado}</td>
                        <td>
                            <button class="btn btn-primary btn-modificar" data-id="${sucursal.id}">Modificar</button>
                            <button class="btn btn-danger btn-eliminar" data-id="${sucursal.id}">Eliminar</button>
                        </td>
                    </tr>
                `);
            }
        });
    }

    $('#addSucursalForm').on('submit', function(event) {
        event.preventDefault();

        const nuevaSucursal = {
            id: sucursalIdCounter++,
            nombre: $('#sucursalNombre').val(),
            ubicacion: $('#sucursalUbicacion').val(),
            gps: $('#sucursalGPS').val(),
            logo: $('#sucursalLogotipo').val(),
            url: $('#sucursalURL').val(),
            horarios: $('#sucursalHorarios').val(),
            estado: "Activo"
        };
        sucursales.push(nuevaSucursal);
        cargarTabla($('#switchEstado').prop('checked'));
        $('#form-agregar').modal('hide');
        $('#addSucursalForm')[0].reset();
    });

    $('#registros').on('click', '.btn-modificar', function() {
        const id = $(this).data('id');
        const sucursal = sucursales.find(s => s.id === id);
        $('#modifySucursalId').val(sucursal.id);
        $('#modifySucursalNombre').val(sucursal.nombre);
        $('#modifySucursalUbicacion').val(sucursal.ubicacion);
        $('#modifySucursalGPS').val(sucursal.gps);
        $('#modifySucursalLogotipo').val(sucursal.logo);
        $('#modifySucursalURL').val(sucursal.url);
        $('#modifySucursalHorarios').val(sucursal.horarios);
        $('#modifySucursalEstado').val(sucursal.estado);
        $('#form-modificar').modal('show');
    });

    $('#modifySucursalForm').on('submit', function(event) {
        event.preventDefault();
        const id = parseInt($('#modifySucursalId').val(), 10);
        const sucursal = sucursales.find(s => s.id === id);
        sucursal.nombre = $('#modifySucursalNombre').val();
        sucursal.ubicacion = $('#modifySucursalUbicacion').val();
        sucursal.gps = $('#modifySucursalGPS').val();
        sucursal.logo = $('#modifySucursalLogotipo').val();
        sucursal.url = $('#modifySucursalURL').val();
        sucursal.horarios = $('#modifySucursalHorarios').val();
        sucursal.estado = $('#modifySucursalEstado').val();
        cargarTabla($('#switchEstado').prop('checked'));
        $('#form-modificar').modal('hide');
    });

    $('#registros').on('click', '.btn-eliminar', function() {
        const id = $(this).data('id');
        $('#modal-mensaje').text('¿Está seguro que desea desactivar la sucursal con ID ' + id + '?');
        $('#modal-eliminar').modal('show');
        $('#modal-eliminar').data('id', id);
    });

    window.confirmarEliminacion = function() {
        const id = $('#modal-eliminar').data('id');
        const sucursal = sucursales.find(s => s.id === id);
        if (sucursal) {
            sucursal.estado = "Inactivo";
            cargarTabla($('#switchEstado').prop('checked'));
        }
        $('#modal-eliminar').modal('hide');
    };

    $('#searchInput').on('keyup', function() {
        const query = $(this).val().toLowerCase();
        $('#registros tr').each(function() {
            const nombre = $(this).find('td').eq(0).text().toLowerCase();
            $(this).toggle(nombre.includes(query));
        });
    });

    $('#printResults').on('click', function() {
        window.print();
    });

    $('#switchEstado').on('change', function() {
        cargarTabla($(this).prop('checked'));
    });

    cargarTabla();
});
