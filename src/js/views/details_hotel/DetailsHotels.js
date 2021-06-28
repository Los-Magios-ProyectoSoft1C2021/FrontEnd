import AbstractView from "../AbstractView";

import view from "./details_hotels.html";

export default class extends AbstractView{
    async getHtml(){
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "details_hotels";

        return divElement;
    }
}