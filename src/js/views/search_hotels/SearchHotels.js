import AbstractView from "../AbstractView";

import view from "./search_hotels.html";

import { Datepicker } from 'vanillajs-datepicker'
import { param } from "jquery";

const template = require('./hotel_list_item.handlebars');
const url = "https://localhost:44309/api/hotel/"

const updateDestinos = async (e) => {
    let busquedaDestino = document.querySelector("#destino");
    let text = busquedaDestino.value;


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
            console.log(option);

            let optionElement = document.createElement("option");
            optionElement.value = option;

            datalist.appendChild(optionElement);
        });
    }
}

const getPage = async (ciudad, estrellas, pageNumber) => {
    let params = new URLSearchParams();

    if (ciudad != null && ciudad.length > 0)
        params.append("ciudad", ciudad);

    if (estrellas !== undefined && estrellas > 0)
        params.append("estrellas", estrellas);

    if (pageNumber !== undefined && pageNumber > 0)
        params.append("page", pageNumber);
    else
        params.append("page", 1);

    let url = `https://localhost:44309/api/hotel/?${params.toString()}`;
    console.log(url);

    let response = await fetch(url, {
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
    hotelsList;

    currentDestino;
    currentTipo;
    currentFechaEntrada;
    currentFechaSalida;
    currentEstrellas;

    currentPage;

    constructor(params) {
        super(params);
        console.log(params);

        if ('destino' in params)
            this.currentDestino = params.destino;

        if ('entrada' in params)
            this.currentFechaEntrada = params.entrada;

        if ('salida' in params)
            this.currentFechaSalida = params.salida;

        if ('tipo' in params)
            this.currentTipo = params.tipo;

        if ('estrellas' in params)
            this.currentEstrellas = params.estrellas;

        if ('page' in params)
            this.currentPage = params.page;

        this.setTitle("Booking UNAJ");

        document.body.addEventListener("click", (e) => {
            if (e.target.matches("[page-link]")) {
                e.preventDefault();
                history.pushState(undefined, undefined, e.target.href);

                this.clearHotelsContent();
                this.currentPage = e.target.text.trim();
                this.setHotelsContent(this.currentPage);
            }
        });
    }

    async getHtml() {
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "search_hotels";

        return divElement;
    }

    async executeViewScript() {
        this.initDatePickers();
        this.initDestinoInputText();

        this.setHotelsContent(this.currentPage);
    }

    initDatePickers() {
        let datePickerStart = new Date()
        let datePickerEnd = datePickerStart.setDate(datePickerStart.getDate() + 1);

        let fechaEntrada = document.querySelector("#fecha_entrada");
        this.feDatepicker = new Datepicker(fechaEntrada, datePickerConfig(datePickerStart));

        let fechaSalida = document.querySelector("#fecha_salida");
        this.fsDatepicker = new Datepicker(fechaSalida, datePickerConfig(datePickerEnd));
    }

    initDestinoInputText() {
        this.destinoInputText = document.querySelector("#destino");
        this.destinoInputText.addEventListener("input", updateDestinos);
    }

    async setHotelsContent(pageNumber) {
        let result = await getPage(this.currentDestino, this.currentEstrellas, pageNumber);
        const htmlHotels = template({
            city: this.currentDestino,
            hotels: result.data,
            currentPage: result.currentPage,
            pageCount: result.pageCount,
            navPages: this.getNavPages(result.currentPage, result.pageCount),
        });

        this.hotelsList = document.getElementById("list_hotels");
        this.hotelsList.innerHTML = htmlHotels;
    }

    clearHotelsContent() {
        this.hotelsList.innerHTML = "";

        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    getNavPages(currentPage, pageCount) {
        let navPages = [];

        let i = currentPage - 1;
        if (currentPage == pageCount)
            i = currentPage - 2;

        while (navPages.length < 4) {
            let page = i;
            i += 1;

            if (page <= 0) continue;

            const params = new URLSearchParams();
            params.append("page", page);

            if (this.currentDestino !== undefined && this.currentDestino.length > 0)
                params.append("destino", this.currentDestino);

            if (this.currentFechaEntrada != null)
                params.append("entrada", this.currentFechaEntrada);

            if (this.currentFechaSalida != null)
                params.append("salida", this.currentFechaSalida);

            let url = `/buscar/?${params.toString()}`

            if (navPages.length == 0) {
                navPages.push({
                    url: url,
                    page: "<",
                })
            }

            navPages.push({
                url: url,
                page: page,
            })

            if (navPages.length == 4 || page == pageCount) {
                navPages.push({
                    url: url,
                    page: ">",
                })
            }
        }

        return navPages;
    }
};