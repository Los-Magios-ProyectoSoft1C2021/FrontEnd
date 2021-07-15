import { MICROSERVICIO_RESERVAS } from "./MicroservicioConsts";
import { getToken } from "./token";

const postReserva = async ({
    hotelId,
    tipoHabitacionId,
    fechaInicio,
    fechaFin
}) => {
    const token = getToken();

    if (token == null)
        return;

    const url = `${MICROSERVICIO_RESERVAS}api/reserva`;
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            hotelId: parseInt(hotelId),
            tipoHabitacionId: parseInt(tipoHabitacionId),
            fechaInicio: fechaInicio,
            fechaFin: fechaFin
        }),
        mode: "cors",
        cache: "default"
    });

    return response;
};

const putReserva = async ({
    reservaId,
    estadoReservaId
}) => {
    const token = getToken();

    if (token == null)
        return;

    const url = `${MICROSERVICIO_RESERVAS}api/reserva/${reservaId}`;
    let response = await fetch(url, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            estadoReservaId: estadoReservaId
        }),
        mode: "cors",
        cache: "default"
    });

    return response;
}

const getReservas = async () => {
    const token = getToken();

    if (token == null)
        return;

    const url = `${MICROSERVICIO_RESERVAS}api/reserva`;
    let response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        mode: "cors",
        cache: "default"
    });

    return response.json();
};

const postContacto = async ({
    nombre,
    correo,
    motivo,
    mensaje
}) => {
    

    const url = `${MICROSERVICIO_RESERVAS}api/contacto`;
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            
        },
        body: JSON.stringify({
            nombre: nombre,
            correo: correo,
            motivo: motivo,
            mensaje: mensaje
        }),
        mode: "cors",
        cache: "default"
    });

    return response;
};

const getReservasUser = async () => {
    const token = getToken();

    if (token == null)
        return;

    const url = `${MICROSERVICIO_RESERVAS}api/reserva/usuario`;
    let response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        mode: "cors",
        cache: "default"
    });

    return response.json();
};

export { postReserva, putReserva, getReservasUser, getReservas, postContacto }