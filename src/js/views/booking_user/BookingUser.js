import AbstractView from "../AbstractView";

import view from "./booking_user.html";

export default class extends AbstractView{
    async getHtml(){
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "booking_user";

        return divElement;
    }
}