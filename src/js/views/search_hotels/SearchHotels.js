import AbstractView from "../AbstractView";

import view from "./search_hotels.html";
import "./styles.css";

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

    async executeViewScript() { };
}