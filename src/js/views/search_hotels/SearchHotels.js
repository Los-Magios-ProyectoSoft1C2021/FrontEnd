import AbstractView from "../AbstractView";

import view from "./search_hotels.html";

import { Datepicker } from 'vanillajs-datepicker'

const template = require('./hotel_list_item.handlebars');
const url = "https://localhost:44309/api/hotel/"

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

const getPage = async () => {
    let response = await fetch("https://localhost:44309/api/hotel/?page=1", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
    });

    let json = await response.json();
    return json;
}

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Booking UNAJ");
    }

    async getHtml() {
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "search_hotels";

        return divElement;
    }

    async executeViewScript() {

        var date = new Date()
        var date1 = date.setDate(date.getDate() + 1);
        let fechaEntrada = document.querySelector("#fecha_entrada");
        let feDatepicker = new Datepicker(fechaEntrada, {
            orientation: "bottom auto",
            minDate: new Date()
        });

        let fechaSalida = document.querySelector("#fecha_salida");
        let fsDatepicker = new Datepicker(fechaSalida, {
            orientation: "bottom auto",
            minDate: date1
        });


        let result = await getPage();
        const hotels = result['data'];
        const htmlHotels = template({ hotel: hotels });

        let elem = document.getElementById("list_hotels");
        elem.innerHTML = htmlHotels;

        let busquedaDestino = document.querySelector("#destino");
        busquedaDestino.addEventListener("input", updateDestinos);
    }
}

/*
Handlebars.registerHelper("calculateStar", function (estrellas) {
    var cantEstrellas = estrellas;
    return cantEstrellas;
})
let estrellas = [1, 2, 3, 4, 5];

*/