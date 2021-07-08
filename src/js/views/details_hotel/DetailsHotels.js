import AbstractView from "../AbstractView";

import view from "./details_hotels.html";

import Splide from "@splidejs/splide";
import L, { marker } from "leaflet";
import leafletmap from "leaflet-map";

export default class extends AbstractView{
    async getHtml(){
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "details_hotels";

        return divElement;
    }
    async executeViewScript() {

        this.initCarrusel();
        this.initMap();
        
    }

    initMap(){
        L.Icon.Default.imagePath= 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.4.0/images';

        const map = L.map('map-template').setView([51.505, -0.09], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
        .addTo(map);
        
        L.marker([51.505, -0.09]).addTo(map)
            .bindPopup('Hotel Park')
            .openPopup();
    }

    initCarrusel(){

        var secondarySlider = new Splide( '.secondary-slider', {
                rewind      : true,
                fixedWidth  : 200,
                fixedHeight : 135,
                isNavigation: true,
                gap         : "0em",
                focus       : 'center',
                pagination  : false,
                cover       : true,
                breakpoints : {
                    '600': {
                        fixedWidth  : 66,
                        fixedHeight : 40,
                    }
                }
            } ).mount();
            
            // Create the main slider.
            var primarySlider = new Splide( '.primary-slider', {
                type       : 'fade',
                heightRatio: 0.5,
                pagination : false,
                arrows     : false,
                cover      : true,
            } );
            
            // Set the thumbnails slider as a sync target and then call mount.
            primarySlider.sync( secondarySlider ).mount();
        }
}
