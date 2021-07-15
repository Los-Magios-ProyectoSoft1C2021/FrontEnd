import { navigateTo } from "../../routes";
import { getReservasByHotelId, getReservasUser, putReserva } from "../../services/MicroservicioReservas";
import { ISODateToDDMMYYY } from "../../utils/DateFormatConvert";
import AbstractView from "../AbstractView";

import view from "./booking_hotel.html"
const template = require("./booking_hotel.handlebars");

export default class extends AbstractView {
    hotelId;

    containerReservas;
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

        if ('id' in params)
            this.hotelId = params.id;
    }

    async getHtml() {
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "booking_hotel";

        return divElement;
    }

    async loadReservas() {
        console.log(this.hotelId);
        this.reservas = await getReservasByHotelId(this.hotelId);
        console.log(this.reservas);

        const htmlTemplate = template({
            reservas: this.reservas
        });

        this.containerReservas.innerHTML = htmlTemplate;
    }

    async executeViewScript() {
        this.containerReservas = document.querySelector("#container-reservas");
        await this.loadReservas();
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

                let reserva = this.reservas.find(element => element.reservaId == e.target.getAttribute("reserva-id"));

                this.showConfirmComanda(reserva);
            });
        });
    }

    showConfirmComanda(reserva) {
        this.txtHotelConfirmarBaja.innerHTML = reserva.hotel;
        this.txtHabitacionConfirmarBaja.innerHTML = `${reserva.habitacionNombre} (${reserva.habitacionTipo})`;
        this.txtFechaEntradaConfirmarBaja.innerHTML = ISODateToDDMMYYY(reserva.fechaInicio);
        this.txtFechaSalidaConfirmarBaja.innerHTML = ISODateToDDMMYYY(reserva.fechaFin);

        console.log(this.containerConfirmarBaja);
        console.log(this.containerCancelEvents);

        this.containerCancelEvents.classList.remove("hidden");
        this.containerConfirmarBaja.classList.remove("hidden");

        let btnConfirmarBaja = document.querySelector("#btn-confirmar-baja");
        btnConfirmarBaja.addEventListener("click", async (e) => {
            btnConfirmarBaja.disabled = true;
            let response = await putReserva({
                reservaId: reserva.reservaId,
                estadoReservaId: 3
            });
            btnConfirmarBaja.disabled = false;

            this.containerCancelEvents.classList.add("hidden");
            this.containerConfirmarBaja.classList.add("hidden");

            if (response.ok) {
                this.msjBajaReserva.innerHTML = `Se ha dado de baja la reserva del hotel ${reserva.hotel}`;
            } else {
                this.msjBajaReserva.innerHTML = `Ha ocurrido un error al intentar dar de baja la reserva`;
            }

            this.modalBajaReserva.classList.remove("hidden");
            setTimeout(() => this.modalBajaReserva.classList.add("hidden"), 2500);

            this.executeViewScript();
        });

        let btnCancelarBaja = document.querySelector("#btn-cancelar-baja");
        btnCancelarBaja.addEventListener("click", async (e) => {
            this.containerCancelEvents.classList.add("hidden");
            this.containerConfirmarBaja.classList.add("hidden");
        });
    }
}