import AbstractView from "../AbstractView";

import view from "./booking_admin.html";

export default class extends AbstractView{
    async getHtml(){
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "booking_admin";

        return divElement;
    }
    async executeViewScript() {

        this.ButtonChangeRechaz();
    }

    

    async ButtonChangeRechaz() {
        // grab all the things
        const doubleConfirm = document.querySelector(".double-confirm1");
        const doubleConfirmInner = document.querySelector(".double-confirm-inner1");

        // add event listeners
        doubleConfirm.addEventListener("click", () => {
        doubleConfirmInner.classList.add("-translate-x-full");
        });
    }
}