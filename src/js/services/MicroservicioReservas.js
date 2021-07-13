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
            hotelId: hotelId,
            tipoHabitacionId: tipoHabitacionId,
            fechaInicio: fechaInicio,
            fechaFin: fechaFin
        }),
        mode: "cors",
        cache: "default"
    });

    return response.ok;
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

export { postReserva, getReservasUser }