import AbstractView from "../AbstractView";

import view from "./details_hotels.html";

import Splide from "@splidejs/splide";
import { Datepicker } from 'vanillajs-datepicker'
import L, { marker } from "leaflet";
import leafletmap from "leaflet-map";
import { getHotelDetailsById } from "../../services/MicroservicioHotel";
import { getRol } from "../../services/token";
import { convertCategoryToId } from "../../utils/CategoryConvert";
import { navigateTo } from "../../routes";

const template = require("./details_hotel.handlebars");

const datePickerConfig = (date) => {
    return {
        autohide: "true",
        format: "dd/mm/yyyy",
        orientation: "bottom auto",
        minDate: date
    }
};

export default class extends AbstractView {
    hotelId;

    container;

    fsDatepìcker;
    feDatepicker;
    selectorTipoHabitacion;
    btnReservar;

    txtValidarFechaEntrada;
    txtValidarFechaSalida;

    constructor(params) {
        super(params);

        if ('id' in params)
            this.hotelId = params.id;
    }

    async getHtml() {
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "details_hotel";

        return divElement;
    }

    async executeViewScript() {
        let result = await getHotelDetailsById(this.hotelId);

        const rol = getRol();
        if (rol == "Admin")
            result.isAdmin = true;
        else if (rol == "Usuario")
            result.isUsuario = true;
        else
            result.notLogged = true;

        let view = template(result);
        this.container = document.querySelector("#details_hotel");
        this.container.innerHTML = view;

        if (result.isUsuario) {
            this.initElements();
            this.initBtnReservar();
        }

        this.initMap({ nombre: result.nombre, latitud: result.latitud, longitud: result.longitud });
        this.initCarrusel();
    }

    initElements() {
        let fechaEntrada = document.querySelector("#fecha-entrada");
        let fechaSalida = document.querySelector("#fecha-salida");

        this.feDatepicker = new Datepicker(fechaEntrada, datePickerConfig(new Date()));
        this.fsDatepìcker = new Datepicker(fechaSalida, datePickerConfig(new Date()));

        this.selectorTipoHabitacion = document.querySelector("#tipo-habitacion");
        this.btnReservar = document.querySelector("#btn-reservar");

        this.txtValidarFechaEntrada = document.querySelector("#validar-fecha-entrada");
        this.txtValidarFechaSalida = document.querySelector("#validar-fecha-salida");
    }

    initBtnReservar() {
        this.btnReservar.addEventListener("click", (e) => {
            let fechaEntrada = this.feDatepicker.getDate("yyyy-mm-dd");
            let fechaSalida = this.fsDatepìcker.getDate("yyyy-mm-dd");
            let tipoHabitacion = convertCategoryToId(this.selectorTipoHabitacion.value);

            let valid = true;

            if (fechaEntrada == undefined) {
                this.txtValidarFechaEntrada.classList.remove("hidden");
                valid = false;
            } else {
                this.txtValidarFechaEntrada.classList.add("hidden");
            }

            if (fechaSalida == undefined) {
                this.txtValidarFechaSalida.classList.remove("hidden");
                valid = false;
            } else {
                this.txtValidarFechaSalida.classList.add("hidden");
            }

            if (!valid)
                return;

            let urlParams = new URLSearchParams();
            urlParams.append("hotelId", this.hotelId);
            urlParams.append("fechaEntrada", fechaEntrada);
            urlParams.append("fechaSalida", fechaSalida);
            urlParams.append("tipoHabitacion", tipoHabitacion);

            let path = `/reserva/confirmar?${urlParams.toString()}`;
            history.pushState(undefined, undefined, path);
            navigateTo();
        });
    }

    initMap({ nombre, latitud, longitud }) {
        L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.4.0/images';

        const map = L.map('map-template').setView([latitud, longitud], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
            .addTo(map);

        L.marker([latitud, longitud]).addTo(map)
            .bindPopup(nombre)
            .openPopup();
    }

    initCarrusel() {
        let secondarySlider = new Splide('.secondary-slider', {
            rewind: true,
            fixedWidth: 200,
            fixedHeight: 135,
            isNavigation: true,
            gap: "0em",
            focus: 'center',
            pagination: false,
            cover: true,
            breakpoints: {
                '600': {
                    fixedWidth: 66,
                    fixedHeight: 40,
                }
            }
        }).mount();

        // Create the main slider.
        let primarySlider = new Splide('.primary-slider', {
            type: 'fade',
            heightRatio: 0.5,
            pagination: false,
            arrows: false,
            cover: true,
        });

        // Set the thumbnails slider as a sync target and then call mount.
        primarySlider.sync(secondarySlider).mount();
    }
}
