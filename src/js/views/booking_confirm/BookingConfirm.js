import { navigateTo } from "../../routes";
import { getHotelDetailsById } from "../../services/MicroservicioHotel";
import { postReserva } from "../../services/MicroservicioReservas";
import { convertIdToCategory } from "../../utils/CategoryConvert";
import { ISODateToDDMMYYY } from "../../utils/DateFormatConvert";
import AbstractView from "../AbstractView";

const template = require("./booking_confirm.handlebars");

const btnState = {
    RESERVAR: "reservar",
    IR_RESERVAS: "exito",
    VOLVER: "fallo"
}

export default class extends AbstractView {
    hotelId;
    fechaEntrada;
    fechaSalida;
    tipoHabitacion;

    btnConfirmar;
    divEstadoReserva;
    txtEstadoReserva;

    estadoBtnReserva = btnState.RESERVAR;

    constructor(params) {
        super(params);

        if ("hotelId" in params)
            this.hotelId = params.hotelId;

        if ("fechaEntrada" in params)
            this.fechaEntrada = params.fechaEntrada;

        if ("fechaSalida" in params)
            this.fechaSalida = params.fechaSalida;

        if ("tipoHabitacion" in params)
            this.tipoHabitacion = params.tipoHabitacion;
    }

    async getHtml() {
        let hotel = await getHotelDetailsById(this.hotelId);

        console.log(convertIdToCategory(this.tipoHabitacion));

        let view = template({
            hotel: hotel,
            fechaEntrada: ISODateToDDMMYYY(this.fechaEntrada),
            fechaSalida: ISODateToDDMMYYY(this.fechaSalida),
            tipoHabitacion: convertIdToCategory(this.tipoHabitacion),
        });

        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "booking-confirm";

        return divElement;
    }

    async executeViewScript() {
        this.initElements();
        this.initBtnConfirmar();
    }

    initElements() {
        this.btnConfirmar = document.querySelector("#btn-confirmar-reserva");
        this.divEstadoReserva = document.querySelector("#estado-reserva");
        this.txtEstadoReserva = document.querySelector("#txt-estado-reserva");
    }

    initBtnConfirmar() {
        this.btnConfirmar.addEventListener("click", async (e) => {
            console.log(this.estadoBtnReserva);

            if (this.estadoBtnReserva == btnState.RESERVAR) {
                this.btnConfirmar.disabled = true;
                this.btnConfirmar.innerHTML = "PROCESANDO";

                let result = await postReserva({
                    hotelId: this.hotelId,
                    tipoHabitacionId: this.tipoHabitacion,
                    fechaInicio: this.fechaEntrada,
                    fechaFin: this.fechaSalida
                });

                this.divEstadoReserva.classList.toggle("hidden");

                if (result.ok) {
                    this.btnConfirmar.disabled = false;
                    this.btnConfirmar.classList.remove("bg-green-500");
                    this.btnConfirmar.classList.remove("hover:bg-green-600");
                    this.btnConfirmar.classList.add("bg-indigo-600");
                    this.btnConfirmar.classList.add("hover:bg-indigo-700");

                    this.btnConfirmar.innerHTML = "IR A MIS RESERVAS";

                    this.txtEstadoReserva.innerHTML = "¡La reserva ha sido exitosa!";

                    this.estadoBtnReserva = btnState.IR_RESERVAS;
                } else {
                    this.txtEstadoReserva.innerHTML = "El hotel ya no tiene habitaciones de esa categoría disponibles";

                    this.btnConfirmar.disabled = false;
                    this.btnConfirmar.classList.remove("bg-green-500");
                    this.btnConfirmar.classList.remove("hover:bg-green-600");
                    this.btnConfirmar.classList.add("bg-red-600");
                    this.btnConfirmar.classList.add("hover:bg-red-700");

                    this.btnConfirmar.innerHTML = "VOLVER";

                    this.estadoBtnReserva = btnState.VOLVER;
                }
            } else if (this.estadoBtnReserva == btnState.VOLVER) {
                history.back();
                setTimeout(() => navigateTo(), 100);
            } else {
                console.log("yendo a reservas");
                history.pushState(undefined, undefined, "/usuario/reservas");
                setTimeout(() => navigateTo(), 100);
            }
        });
    }
}