import { MICROSERVICIO_USUARIO } from "./MicroservicioConsts";
import { getToken, saveToken } from "./token";

const getUsuarios = async () => {
    const token = getToken();

    if (token == null)
        return;

    const url = `${MICROSERVICIO_USUARIO}api/usuario`;
    let response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors",
        cache: "default"
    });

    return await response.json();
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
    imagen = "/img/user.png"
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
            dni: parseInt(dni),
            correo: correo,
            telefono: telefono,
            nacionalidad: nacionalidad,
            imagen: imagen
        }),
        mode: "cors",
        cache: "default"
    });

    let json = await response.json();

    if ('token' in json)
        saveToken(json.token);

    return json;
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

    let json = await response.json();

    if ('token' in json)
        saveToken(json.token);

    return json;
};

const getUsuarioInfo = async () => {
    const token = getToken();

    if (token == null)
        return;

    const url = `${MICROSERVICIO_USUARIO}api/usuario/id`;
    let response = await fetch(url, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        mode: "cors",
        cache: "default"
    });

    return await response.json();
}

export { getUsuarios, registerUser, loginUser, getUsuarioInfo }