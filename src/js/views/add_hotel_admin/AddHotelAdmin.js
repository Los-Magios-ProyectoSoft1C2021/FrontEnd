import AbstractView from "../AbstractView";

import view from "./add_hotel_admin.html";

export default class extends AbstractView{
    async getHtml(){
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "hotel_admin";

        return divElement;
    }
}