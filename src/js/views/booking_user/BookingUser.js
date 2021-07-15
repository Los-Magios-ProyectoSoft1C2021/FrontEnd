import { navigateTo } from "../../routes";
import { getReservasUser, putReserva } from "../../services/MicroservicioReservas";
import { ISODateToDDMMYYY } from "../../utils/DateFormatConvert";
import AbstractView from "../AbstractView";

const template = require("./booking_user.handlebars");

export default class extends AbstractView {
    containerModalBaja;
    containerConfirmarBaja;
    containerCancelEvents;

    modalBajaReserva;
    msjBajaReserva;

    btnConfirmarBaja;
    txtHotelConfirmarBaja;
    txtHabitacionConfirmarBaja;
    txtFechaEntradaConfirmarBaja;
    txtFechaSalidaConfirmarBaja;

    reservas;

    constructor(params) {
        super(params);
    }

    async getHtml() {
        const view = await this.loadReservas();

        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "booking_user";

        return divElement;
    }

    async loadReservas() {
        this.reservas = await getReservasUser();

        const view = template({
            reservas: this.reservas
        });

        return view;
    }

    async executeViewScript() {
        this.initElements();

        this.initButtonsDarDeBaja();
    }

    initElements() {
        this.modalBajaReserva = document.querySelector("#modal-baja-reserva");
        this.msjBajaReserva = document.querySelector("#msj-baja-reserva");

        this.containerConfirmarBaja = document.querySelector("#container-confirmar-baja");
        this.containerModalBaja = document.querySelector("#container-modal-baja");
        this.containerCancelEvents = document.querySelector("#cancel-events");

        this.txtHotelConfirmarBaja = document.querySelector("#hotel");
        this.txtHabitacionConfirmarBaja = document.querySelector("#habitacion");
        this.txtFechaEntradaConfirmarBaja = document.querySelector("#fecha-entrada");
        this.txtFechaSalidaConfirmarBaja = document.querySelector("#fecha-salida");
    }

    initButtonsDarDeBaja() {
        let buttons = document.querySelectorAll(".btn-baja");
        buttons.forEach((element) => {
            element.addEventListener("click", async (e) => {
                console.log("click");

                let reserva = this.reservas.find(element => element.reservaId == e.target.getAttribute("hotel-id"));

                this.showConfirmComanda(reserva);
            });
        });
    }

    showConfirmComanda(reserva) {
        this.txtHotelConfirmarBaja.innerHTML = reserva.hotel;
        this.txtHabitacionConfirmarBaja.innerHTML = `${reserva.habitacionNombre} (${reserva.habitacionTipo})`;
        this.txtFechaEntradaConfirmarBaja.innerHTML = ISODateToDDMMYYY(reserva.fechaInicio);
        this.txtFechaSalidaConfirmarBaja.innerHTML = ISODateToDDMMYYY(reserva.fechaFin);

        this.containerCancelEvents.classList.remove("hidden");
        this.containerConfirmarBaja.classList.remove("hidden");

        let btnConfirmarBaja = document.querySelector("#btn-confirmar-baja");
        btnConfirmarBaja.addEventListener("click", async (e) => {
            let response = await putReserva({
                reservaId: reserva.reservaId,
                estadoReservaId: 3
            });
            console.log(response);

            this.containerCancelEvents.classList.add("hidden");
            this.containerConfirmarBaja.classList.add("hidden");

            if (response.ok) {
                this.msjBajaReserva.innerHTML = `Se ha dado de baja la reserva del hotel ${reserva.hotel}`;
            } else {
                this.msjBajaReserva.innerHTML = `Ha ocurrido un error al intentar dar de baja la reserva`;
            }

            this.modalBajaReserva.classList.remove("hidden");
            setTimeout(() => this.modalBajaReserva.classList.add("hidden"), 2500);

            const view = await this.loadReservas();
            let container = document.querySelector("#booking_user");
            container.innerHTML = view;
            this.executeViewScript();
        });

        let btnCancelarBaja = document.querySelector("#btn-cancelar-baja");
        btnCancelarBaja.addEventListener("click", async (e) => {
            this.containerCancelEvents.classList.add("hidden");
            this.containerConfirmarBaja.classList.add("hidden");
        })
    }
}