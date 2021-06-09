import AbstractView from "../AbstractView.js";
import view from "./home.html";

import { Datepicker } from 'vanillajs-datepicker'
import Splide from "@splidejs/splide";
import { data } from "autoprefixer";

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

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Booking UNAJ");
    }

    async getHtml() {
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "home";

        return divElement;
    }

    async executeViewScript() {
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

        let fechaEntrada = document.querySelector("#fecha_entrada");
        let feDatepicker = new Datepicker(fechaEntrada, {
            orientation: "bottom auto",
            minDate: new Date()
        });

        let fechaSalida = document.querySelector("#fecha_salida");
        let fsDatepicker = new Datepicker(fechaSalida, {
            orientation: "bottom auto",
            minDate: new Date()
        });

        let busquedaDestino = document.querySelector("#destino");
        busquedaDestino.addEventListener("input", updateDestinos);
    }
}