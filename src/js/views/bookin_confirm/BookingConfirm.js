import AbstractView from "../AbstractView";

import view from "./booking_confirm.html";

export default class extends AbstractView{

    async getHtml(){
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "booking_confirm";

        return divElement;
    }

    async executeViewScript() {

        this.ButtonChangeConfirm();
        this.ButtonChangeRechaz();
    }

    async ButtonChangeConfirm() {
        // grab all the things
        const doubleConfirm = document.querySelector(".double-confirm");
        const doubleConfirmInner = document.querySelector(".double-confirm-inner");

        // add event listeners
        doubleConfirm.addEventListener("click", () => {
        doubleConfirmInner.classList.add("-translate-x-full");
        });
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