import AbstractView from "../AbstractView";

import view from "./list_hotel_admin.html";

export default class extends AbstractView{
    async getHtml(){
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "list_hotel_admin";

        return divElement;
    }
}