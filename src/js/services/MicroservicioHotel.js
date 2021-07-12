import { MICROSERVICIO_HOTEL } from "./MicroservicioConsts"

const getHotelesByPage = async ({
    ciudad,
    estrellas,
    categoria,
    fechaInicio,
    fechaFin,
    page
}) => {
    let params = new URLSearchParams();

    if (ciudad != null && ciudad.length > 0)
        params.append("ciudad", ciudad);

    if (estrellas != null && estrellas > 0)
        params.append("estrellas", estrellas);

    if (categoria != null)
        params.append("categoria", categoria)

    if (fechaInicio != null)
        params.append("fechaInicio", fechaInicio);

    if (fechaFin != null)
        params.append("fechaFin", fechaFin);

    if (page != null)
        params.append("page", page);

    const url = `${MICROSERVICIO_HOTEL}api/hotel?${params.toString()}`;
    console.log(`url: ${url}`);

    let response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors",
        cache: "default"
    });

    return response.json();
};

const getHotelDetailsById = async (hotelId) => {
    const url = `${MICROSERVICIO_HOTEL}api/hotel/${hotelId}`;
    console.log(`url: ${url}`);

    let response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors",
        cache: "default"
    })

    return response.json();
};

const getDestinos = async (query) => {
    const url = `${MICROSERVICIO_HOTEL}api/busqueda?q=${query}`;
    console.log(`url: ${url}`);

    let response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors",
        cache: "default"
    });

    return response.json();
};

const postHotel = async ({
    nombre,
    longitud,
    latitud,
    provincia,
    ciudad,
    direccion,
    direccionNum,
    direccionObservaciones,
    codigoPostal,
    estrellas,
    telefono,
    correo
}) => {
    const url = `${MICROSERVICIO_HOTEL}api/hotel`;
    console.log(`url: ${url}`);

    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombre,
            longitud: longitud,
            latitud: latitud,
            provincia: provincia,
            ciudad: ciudad,
            direccion: direccion,
            direccionNum: direccionNum,
            direccionObservaciones: direccionObservaciones,
            codigoPostal: codigoPostal,
            estrellas: estrellas,
            telefono: telefono,
            correo: correo
        }),
        mode: "cors",
        cache: "default"
    });

    return response.ok;
};

const putHotel = async ({
    nombre,
    longitud,
    latitud,
    provincia,
    ciudad,
    direccion,
    direccionNum,
    direccionObservaciones,
    codigoPostal,
    estrellas,
    telefono,
    correo
}) => {
    const url = `${MICROSERVICIO_HOTEL}api/hotel`;
    console.log(`url: ${url}`);

    let response = await fetch(url, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombre,
            longitud: longitud,
            latitud: latitud,
            provincia: provincia,
            ciudad: ciudad,
            direccion: direccion,
            direccionNum: direccionNum,
            direccionObservaciones: direccionObservaciones,
            codigoPostal: codigoPostal,
            estrellas: estrellas,
            telefono: telefono,
            correo: correo
        }),
        mode: "cors",
        cache: "default"
    });

    return response.ok;
};

const getHabitacionesByHotelId = async (hotelId) => {
    const url = `${MICROSERVICIO_HOTEL}api/hotel/${hotelId}/habitacion`;
    console.log(`url: ${url}`);

    let response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors",
        cache: "default"
    });

    return response.json();
};

const postHabitacionByHotelId = async ({ hotelId, nombre, categoriaId }) => {
    const url = `${MICROSERVICIO_HOTEL}api/hotel/${hotelId}/habitacion`;
    console.log(`url: ${url}`);

    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombre,
            categoriaid: categoriaId
        }),
        mode: "cors",
        cache: "default"
    });

    return response.ok;
};

const getHabitacionesByHotelIdAndCategoria = async ({ hotelId, categoriaId }) => {
    const url = `${MICROSERVICIO_HOTEL}api/hotel/${hotelId}/habitacion?categoria=${categoriaId}`;
    console.log(`url: ${url}`);

    let response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors",
        cache: "default"
    })

    return response.json();
};

const getCategorias = async () => {
    const url = `${MICROSERVICIO_HOTEL}api/hotel/categorias`;
    console.log(`url: ${url}`);

    let response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors",
        cache: "default"
    })

    return response.json();
};

const postFoto = async ({ hotelId, imagenUrl, descripcion }) => {
    const url = `${MICROSERVICIO_HOTEL}api/hotel/${hotelId}/fotos`;
    console.log(`url: ${url}`);

    let response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            imagenUrl: imagenUrl,
            descripcion: descripcion
        }),
        mode: "cors",
        cache: "default"
    })

    return response.json();
}

export { getHotelesByPage, getHotelDetailsById, getDestinos, postHotel, putHotel, getHabitacionesByHotelId, postHabitacionByHotelId, getHabitacionesByHotelIdAndCategoria, getCategorias, postFoto }