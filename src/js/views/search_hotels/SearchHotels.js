import AbstractView from "../AbstractView";

import view from "./search_hotels.html";
const template = require('./hotel_list_item.handlebars');

import { getHotelesByPage, getDestinos } from "../../services/MicroservicioHotel";

import { Datepicker } from 'vanillajs-datepicker'

import { navigateTo } from "../../routes";
import { convertTextToDestino } from "../../utils/ConvertTextToDestino";
import { convertCategoryToId } from "../../utils/CategoryConvert";

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
    tipoHabitacionSelector;
    estrellasSelector;
    searchButton;

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
        this.initTipoHabitacionSelector();
        this.initEstrellasSelector();
        this.initSearchButton();

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
        this.destinoInputText.addEventListener("input", async () => {
            let text = this.destinoInputText.value;

            const destinosList = document.querySelector("#destinos_list");
            destinosList.innerHTML = "";

            if (text.length > 3) {
                let result = await getDestinos(text);

                const list = JSON.parse(JSON.stringify(result));
                list.forEach(element => {
                    let ciudad = element['ciudad'];
                    let provincia = element['provincia'];

                    let option = `${ciudad}, ${provincia}`;
                    console.log(option);

                    let optionElement = document.createElement("option");
                    optionElement.value = option;

                    destinosList.appendChild(optionElement);
                });
            }
        });
    }

    initTipoHabitacionSelector() {
        this.tipoHabitacionSelector = document.querySelector("#tipo_habitacion");
    }

    initEstrellasSelector() {
        this.estrellasSelector = document.querySelector("#estrellas");
    }

    initSearchButton() {
        this.searchButton = document.querySelector("#search");
        console.log(this.searchButton);

        this.searchButton.addEventListener("click", (e) => {
            console.log("clicked");

            let destino = this.destinoInputText.value;
            destino = convertTextToDestino(destino);

            let dateStart = this.feDatepicker.getDate("yyyy-mm-dd");
            let dateEnd = this.fsDatepicker.getDate("yyyy-mm-dd");
            let tipoHabitacion = convertCategoryToId(this.tipoHabitacionSelector.value);
            let estrellas = this.estrellasSelector.value;

            const params = new URLSearchParams();

            if (destino != null && destino.length > 0)
                params.append("destino", destino);

            if (dateStart != null)
                params.append("entrada", dateStart);

            if (dateEnd != null)
                params.append("salida", dateEnd);

            if (tipoHabitacion != null)
                params.append("tipo", tipoHabitacion);

            if (estrellas != null)
                params.append("estrellas", estrellas);

            const path = "/buscar?" + params.toString();

            console.log(path);


            history.pushState(undefined, undefined, path);
            navigateTo();
        });
    }

    async setHotelsContent(pageNumber) {
        let result = await getHotelesByPage({
            ciudad: this.currentDestino,
            fechaInicio: this.currentFechaEntrada,
            fechaFin: this.currentFechaSalida,
            estrellas: this.currentEstrellas,
            categoria: this.currentTipo,
            page: pageNumber
        });

        console.log(result);

        const htmlHotels = template({
            city: this.currentDestino,
            hotels: result.data,
            currentPage: result.currentPage,
            pageCount: result.pageCount,
            navPages: this.getNavPages(result.currentPage, result.pageCount),
        });

        this.hotelsList = document.getElementById("list_hotels");
        this.hotelsList.innerHTML = htmlHotels;

        let cardsHoteles = document.querySelectorAll(".card-hotel-item");

        cardsHoteles.forEach(element => {
            element.addEventListener("click", (e) => {
                const hotelId = e.target.closest(".card-hotel-item").getAttribute("hotel-id");
                console.log(hotelId);

                history.pushState(undefined, undefined, `/hotel/${hotelId}`);
                navigateTo(location.pathname);
            });
        })

        let navPages = document.querySelectorAll(".nav-hotels-list");

        navPages.forEach(element => {
            element.addEventListener("click", (e) => {
                e.preventDefault();
                history.pushState(undefined, undefined, e.target.href);

                this.clearHotelsContent();
                this.currentPage = e.target.getAttribute("page-link");
                this.setHotelsContent(this.currentPage);
            })
        })
    }

    clearHotelsContent() {
        this.hotelsList.innerHTML = "";

        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    getNavPages(currentPage, pageCount) {
        let navPages = [];

        const params = new URLSearchParams();

        if (this.currentDestino !== undefined && this.currentDestino.length > 0)
            params.append("destino", this.currentDestino);

        if (this.currentFechaEntrada != null)
            params.append("entrada", this.currentFechaEntrada);

        if (this.currentFechaSalida != null)
            params.append("salida", this.currentFechaSalida);

        if (currentPage > 1) {
            params.delete("page");
            params.append("page", currentPage - 1);

            navPages.push({
                text: "< Anterior",
                url: `/buscar/?${params.toString()}`,
                page: currentPage - 1,
            });
        }

        params.delete("page");
        params.append("page", currentPage);

        navPages.push({
            text: currentPage,
            url: `/buscar/?${params.toString()}`,
            page: currentPage,
        })

        if (currentPage < pageCount) {
            params.delete("page");
            params.append("page", currentPage + 1);

            navPages.push({
                text: "Siguiente >",
                url: `/buscar/?${params.toString()}`,
                page: currentPage + 1,
            });
        }

        return navPages;
    }
};