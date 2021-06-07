import AbstractView from "../AbstractView.js";
import view from "./home.html";

import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";

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
    }
}