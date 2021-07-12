import { MICROSERVICIO_RESERVAS } from "./MicroservicioConsts";

const postReserva = async ({
    hotelId,
    tipoHabitacionId,
    fechaInicio,
    fechaFin
}) => {
    const url = `${MICROSERVICIO_RESERVAS}api/reserva`;
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
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
    const url = `${MICROSERVICIO_RESERVAS}api/reserva/usuario`;
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

export { postReserva, getReservasUser }