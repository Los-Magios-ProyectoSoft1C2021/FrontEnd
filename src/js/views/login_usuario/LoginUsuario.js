import { navigateTo } from "../../routes";
import { loginUser } from "../../services/MicroservicioUsuario";
import { getToken } from "../../services/token";
import AbstractView from "../AbstractView";

import MenuUsuario from "../menu_user/MenuUsuario";

import view from "./login_usuario.html";

export default class extends AbstractView {
    txtNombreUsuario;
    txtContraseña;
    btnSubmit;

    constructor(params) {
        super(params);

        this.setTitle("Iniciar sesión - Booking UNAJ");

        const token = getToken();
        if (token != null) {
            history.back();
            setTimeout(() => navigateTo(), 100);
        }
    }

    async getHtml() {
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "login_usuario";

        return divElement;
    }

    executeViewScript() {
        this.initElements();

        this.initBtnSubmit();
    }

    initElements() {
        this.txtNombreUsuario = document.querySelector("#txt-nombre-usuario");
        this.txtContraseña = document.querySelector("#txt-contraseña");
        this.btnSubmit = document.querySelector("#btn-submit");
    }

    initBtnSubmit() {
        this.btnSubmit.addEventListener("click", async (e) => {
            let nombreUsuario = this.txtNombreUsuario.value;
            let contraseña = this.txtContraseña.value;

            this.btnSubmit.disabled = true;
            let result = await loginUser({ nombreUsuario, contraseña });
            this.btnSubmit.disabled = false;

            if ('token' in result) {
                new MenuUsuario().init();

                history.back();
                setTimeout(() => navigateTo(), 100);
            }
        });
    }


}