import AbstractView from "../AbstractView.js";
import view from "./home.html";

import { Datepicker } from 'vanillajs-datepicker'
import Splide from "@splidejs/splide";
import { data } from "autoprefixer";

import { navigateTo } from "../../routes.js";
import { convertCategoryToId } from "../../utils/ConvertCategoryToId";
import { convertTextToDestino } from "../../utils/ConvertTextToDestino";

const updateDestinos = async (e) => {
    let busquedaDestino = document.querySelector("#destino");
    let text = busquedaDestino.value;

    console.log(text);

    if (text.length < 3) {
        return;
    } else {
        let response = await fetch(`https://localhost:44309/api/busqueda?q=${text}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
        });

        let json = await response.json();
        const datalist = document.querySelector("#destinos_list");
        datalist.innerHTML = "";

        const list = JSON.parse(JSON.stringify(json));
        list.forEach(element => {
            let ciudad = element['ciudad'];
            let provincia = element['provincia'];

            let option = `${ciudad}, ${provincia}`;

            let optionElement = document.createElement("option");
            optionElement.value = option;

            datalist.appendChild(optionElement);
        });
    }
}

const datePickerConfig = (date) => {
    return {
        autohide: "true",
        format: "dd/mm/yyyy",
        orientation: "bottom auto",
        minDate: date
    }
};

export default class extends AbstractView {
    destinoInputText;
    feDatepicker;
    fsDatepicker;
    tipoHabitacionSelector;

    constructor(params) {
        super(params);
        this.setTitle("Booking UNAJ");
    }

    async getHtml() {
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "home_container";

        return divElement;
    }

    async executeViewScript() {
        this.initTipoHabitacionSelector();
        this.initDestinoInputText();
        this.initCarrousel();
        this.initDataPickers();
        this.initSearchButton();
    }

    initTipoHabitacionSelector() {
        this.tipoHabitacionSelector = document.querySelector("#tipo_habitacion");
    }

    initDestinoInputText() {
        this.destinoInputText = document.querySelector("#destino");
        this.destinoInputText.addEventListener("input", updateDestinos);
    }

    initCarrousel() {
        new Splide(".splide", {
            type: 'loop',
            pagination: false,
            gap: "2em",
            perMove: 1,
            perPage: 4,
            breakpoints: {
                1024: {
                    perPage: 3,
                },
                768: {
                    perPage: 2,
                },
                640: {
                    perPage: 1,
                },
            },
        }).mount();
    }

    initDataPickers() {
        let fechaEntrada = document.querySelector("#fecha_entrada");
        this.feDatepicker = new Datepicker(fechaEntrada, datePickerConfig(new Date()));

        let fechaSalida = document.querySelector("#fecha_salida");
        this.fsDatepicker = new Datepicker(fechaSalida, datePickerConfig(new Date()));
    }

    initSearchButton() {
        let searchButton = document.getElementById("search");
        searchButton.addEventListener("click", (e) => {
            console.log("clicked");

            let destino = this.destinoInputText.value;
            destino = convertTextToDestino(destino);

            let dateStart = this.feDatepicker.getDate("yyyy-mm-dd");
            let dateEnd = this.fsDatepicker.getDate("yyyy-mm-dd");
            let tipoHabitacion = convertCategoryToId(this.tipoHabitacionSelector.value);

            const params = new URLSearchParams();

            if (destino != null && destino.length > 0)
                params.append("destino", destino);

            if (dateStart != null)
                params.append("entrada", dateStart);

            if (dateEnd != null)
                params.append("salida", dateEnd);

            if (tipoHabitacion != null)
                params.append("tipo", tipoHabitacion);

            const path = "/buscar?" + params.toString();
            console.log(path);

            //window.location.href = path;
            //location.hash = "";
            history.pushState(undefined, undefined, path);
            navigateTo(location.pathname);
        })
    }
}