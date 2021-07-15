import jwtDecode from "jwt-decode";
import { navigateTo } from "../../routes";
import { getUsuarioInfo } from "../../services/MicroservicioUsuario";
import { deleteToken, getToken } from "../../services/token";
import MenuLogin from "../menu_login/MenuLogin";

const template = require("./menu_user.handlebars");

export default class MenuUsuario {
    menu;
    btnSalir;

    constructor() {
        this.menu = document.getElementById("menu-user");
    }

    async init() {
        const token = getToken();
        const jwt = jwtDecode(token);

        let userData = await getUsuarioInfo();
        if (userData != null) {
            const view = template({
                nombre: userData.nombre,
                apellido: userData.apellido,
                correo: userData.correo,
                isAdmin: jwt.Rol == "Admin"
            });

            this.menu.innerHTML = view;

            this.initButtonSalir();
        }
    }

    initButtonSalir() {
        this.btnSalir = document.querySelector("#btn-salir");
        this.btnSalir.addEventListener("click", (e) => {
            deleteToken();

            navigateTo();
            new MenuLogin().init();
        });
    }
}