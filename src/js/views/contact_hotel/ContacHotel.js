import { postContacto } from "../../services/MicroservicioReservas";
import AbstractView from "../AbstractView";

import view from "./contact_hotel.html";

export default class extends AbstractView{

    modalContacto;
    msjContacto;

    txtNombre;
    txtCorreo;
    txtMotivo;
    txtMensaje;

    btnSend;

    async getHtml(){
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "contact_hotel";

        return divElement;
    }

    executeViewScript(){
        this.initElements();
        this.initBtnSend();

    }

    initElements(){
        this.modalContacto = document.querySelector('#modal-carga-send');
        this.msjContacto = document.querySelector('#msj-carga-send')

        this.txtNombre = document.querySelector('#txt-nombre-contacto');
        this.txtCorreo = document.querySelector('#txt-email-contacto');
        this.txtMotivo = document.querySelector('#txt-motivo');
        this.txtMensaje = document.querySelector('#txt-mensaje');
        
        this.btnSend = document.querySelector('#btn-submit-contacto');
    }

    initBtnSend(){

        this.btnSend.addEventListener("click", async (e) => {
            console.log("click");

            this.btnSend.disabled = true;

            let nombreC = this.txtNombre.value;
            let correoC = this.txtCorreo.value;
            let motivoC = this.txtMotivo.value;
            let mensajeC = this.txtMensaje.value;
            
            console.log(nombreC);

            let response = await postContacto({
                nombre: nombreC,
                correo: correoC,
                motivo: motivoC,
                mensaje: mensajeC,
            })

            this.btnSend.disabled = false;
            
            if (response.ok) {
                this.msjContacto.innerHTML = `Se envió su formulaio correctamente `;
            } else {
                this.msjContacto.innerHTML = `Ha ocurrido un error al intentar enviar su formulario`;
            }

            console.log(response);

            this.modalContacto.classList.remove("hidden");
            setTimeout(() => this.modalContacto.classList.add("hidden"), 2500);

        })
    }
}