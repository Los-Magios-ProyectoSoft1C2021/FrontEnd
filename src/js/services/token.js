import jwtDecode from "jwt-decode";

const LOCATION_KEY = "TOKEN";

const saveToken = (token) => {
    localStorage.setItem(LOCATION_KEY, token);
};

const getToken = () => {
    return localStorage.getItem(LOCATION_KEY);
};

const deleteToken = () => {
    localStorage.removeItem(LOCATION_KEY);
};

const getRol = () => {
    const token = getToken();

    if (token == null)
        return null;

    const jwt = jwtDecode(token);
    return jwt.Rol;
}

export { saveToken, getToken, deleteToken, getRol }