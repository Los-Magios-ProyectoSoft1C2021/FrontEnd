import { navigateTo } from "../../routes";
import { registerUser } from "../../services/MicroservicioUsuario";
import { getToken } from "../../services/token";
import AbstractView from "../AbstractView";
import MenuUsuario from "../menu_user/MenuUsuario";

import view from "./register_usuario.html";

export default class extends AbstractView {
    txtNombreUsuario;
    txtContraseña;
    txtNombre;
    txtApellido;
    txtDNI;
    txtEmail;
    txtTelefono;
    txtNacionalidad;

    btnRegister;

    constructor(params) {
        super(params);

        this.setTitle("Registrarse - Booking UNAJ");

        const token = getToken();
        if (token != null) {
            history.back();
            setTimeout(() => navigateTo(), 100);
        }
    }

    async getHtml() {
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "register_usuario";

        return divElement;
    }

    executeViewScript() {
        this.initElements();

        this.initButtonRegister();
    }

    initElements() {
        this.txtNombreUsuario = document.querySelector("#nombre-usuario");
        this.txtContraseña = document.querySelector("#contraseña");
        this.txtNombre = document.querySelector("#nombre");
        this.txtApellido = document.querySelector("#apellido");
        this.txtDNI = document.querySelector("#dni");
        this.txtEmail = document.querySelector("#email");
        this.txtTelefono = document.querySelector("#telefono");
        this.txtNacionalidad = document.querySelector("#nacionalidad");

        this.btnRegister = document.querySelector("#register")
    }

    initButtonRegister() {
        this.btnRegister.addEventListener("click", async (e) => {
            let nombreUsuario = this.txtNombreUsuario.value;
            let contraseña = this.txtContraseña.value;
            let nombre = this.txtNombre.value;
            let apellido = this.txtApellido.value;
            let dni = this.txtDNI.value;
            let email = this.txtEmail.value;
            let telefono = this.txtTelefono.value;
            let nacionalidad = this.txtTelefono.value;

            this.btnSubmit.disabled = true;
            let result = await registerUser({
                nombre: nombre,
                apellido: apellido,
                nombreUsuario: nombreUsuario,
                contraseña: contraseña,
                dni: dni,
                correo: email,
                telefono: telefono,
                nacionalidad: nacionalidad
            });
            this.btnSubmit.disabled = false;

            if ('token' in result) {
                new MenuUsuario().init();

                history.back();
                setTimeout(() => navigateTo(), 100);
            }
        })
    }
}