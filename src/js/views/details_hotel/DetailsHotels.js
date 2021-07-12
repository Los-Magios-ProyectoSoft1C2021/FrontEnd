import AbstractView from "../AbstractView";

import view from "./details_hotels.html";

import Splide from "@splidejs/splide";
import L, { marker } from "leaflet";
import leafletmap from "leaflet-map";
import { getHotelDetailsById } from "../../services/MicroservicioHotel";

const template = require("./details_hotel.handlebars");

export default class extends AbstractView {
    container;

    constructor(params) {
        super(params);
    }

    async getHtml() {
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "details_hotel";

        return divElement;
    }
    async executeViewScript() {
        let result = await getHotelDetailsById(this.params.id);
        console.log(result);

        let view = template(result);
        this.container = document.querySelector("#details_hotel");
        this.container.innerHTML = view;

        this.initMap({ nombre: result.nombre, latitud: result.latitud, longitud: result.longitud });
        this.initCarrusel();
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
