import { MICROSERVICIO_USUARIO } from "./MicroservicioConsts";
import { saveToken } from "./token";

const getUsuarios = async () => {
    const url = `${MICROSERVICIO_USUARIO}api/usuario`;
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

const registerUser = async ({
    nombre,
    apellido,
    nombreUsuario,
    contraseña,
    dni,
    correo,
    telefono,
    nacionalidad,
    imagen
}) => {
    const url = `${MICROSERVICIO_USUARIO}api/usuario`;
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            rolId: 1,
            nombre: nombre,
            apellido: apellido,
            nombreUsuario: nombreUsuario,
            contraseña: contraseña,
            dni: dni,
            correo: correo,
            telefono: telefono,
            nacionalidad: nacionalidad,
            imagen: imagen
        }),
        mode: "cors",
        cache: "default"
    });

    return response.json();
};

const loginUser = async ({ nombreUsuario, contraseña }) => {
    const url = `${MICROSERVICIO_USUARIO}api/usuario/login`;
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombreUsuario: nombreUsuario,
            contraseña: contraseña
        }),
        mode: "cors",
        cache: "default"
    });

    let json = response.json;

    if ('token' in json)
        saveToken(json.token);

    return json;
};

export { getUsuarios, registerUser, loginUser }