$(document).ready(function() {
    const alimentos = [
    {
        "id": 0,
        "nombre": "Café Americano",
        "descripcion": "Café negro tradicional americano.",
        "foto": "https://www.lavazza.us/-/media/lavazza/images/magazine/news/how-to-make-an-americano/coffee-shop-americano-desk.jpg",
        "precio": 25.00,
        "categoria": "Bebidas"
    },
    {
        "id": 0,
        "nombre": "Jugo de Naranja",
        "descripcion": "Jugo natural exprimido de naranjas frescas.",
        "foto": "https://www.thespruceeats.com/thmb/XJ4X5Q26oQ2i6rfN1bXYG0OsheE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/fresh-squeezed-orange-juice-recipe-2097424-hero-01-3e92cd106df64492bc07c7e2a8fe5b95.jpg",
        "precio": 20.00,
        "categoria": "Bebidas"
    },
    {
        "id": 0,
        "nombre": "Limonada",
        "descripcion": "Refrescante limonada casera.",
        "foto": "https://www.acouplecooks.com/wp-content/uploads/2021/06/How-to-Make-Lemonade-003.jpg",
        "precio": 18.00,
        "categoria": "Bebidas"
    },
    {
        "id": 0,
        "nombre": "Smoothie de Frutas",
        "descripcion": "Batido de frutas variadas con yogurt.",
        "foto": "https://downshiftology.com/wp-content/uploads/2021/02/Strawberry-Banana-Smoothie-5.jpg",
        "precio": 30.00,
        "categoria": "Bebidas"
    },
    {
        "id": 0,
        "nombre": "Té Verde",
        "descripcion": "Infusión de té verde con limón y hierbas.",
        "foto": "https://www.verywellfit.com/thmb/UlMkXbOHR2s8yODlMi6cD4rQXtw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1350052435-669f511348f34ae1aa134c9aa659f4c6.jpg",
        "precio": 22.00,
        "categoria": "Bebidas"
    },
    {
        "id": 0,
        "nombre": "Chocolate Caliente",
        "descripcion": "Chocolate caliente tradicional mexicano.",
        "foto": "https://www.isabeleats.com/wp-content/uploads/2018/11/mexican-hot-chocolate-1-650x975.jpg",
        "precio": 25.00,
        "categoria": "Bebidas"
    },
    {
        "id": 0,
        "nombre": "Jamaica",
        "descripcion": "Agua tradicional mexicana de Jamaica.",
        "foto": "https://mexicanfoodjournal.com/wp-content/uploads/2016/04/Agua-de-Jamaica-Served.jpg",
        "precio": 20.00,
        "categoria": "Bebidas"
    },
    {
        "id": 0,
        "nombre": "Horchata",
        "descripcion": "Agua tradicional mexicana de horchata.",
        "foto": "https://cookieandkate.com/images/2015/09/horchata-recipe-1.jpg",
        "precio": 18.00,
        "categoria": "Bebidas"
    },
    {
        "id": 0,
        "nombre": "Agua de Frutas",
        "descripcion": "Agua de varias frutas (fresa, plátano, melón).",
        "foto": "https://www.isabeleats.com/wp-content/uploads/2022/06/agua-fresca-de-sandia-recipe-7.jpg",
        "precio": 30.00,
        "categoria": "Bebidas"
    },
    {
        "id": 0,
        "nombre": "Agua de Mango",
        "descripcion": "Agua de mango.",
        "foto": "https://www.thespruceeats.com/thmb/cv9dOLQfWXO54xDEZZZT5mVhZZs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/aguadeaguacate-58add74d3df78c345b3d4a22.jpg",
        "precio": 22.00,
        "categoria": "Bebidas"
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