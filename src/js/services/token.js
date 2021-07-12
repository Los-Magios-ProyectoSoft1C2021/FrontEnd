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

export { saveToken, getToken, deleteToken }