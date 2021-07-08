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
        this.ButtonChangeConfirm1();
        this.ButtonChangeRechaz1();
        
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

    async ButtonChangeConfirm1() {
        // grab all the things
        const doubleConfirm = document.querySelector(".double-confirm3");
        const doubleConfirmInner = document.querySelector(".double-confirm-inner3");

        // add event listeners
        doubleConfirm.addEventListener("click", () => {
        doubleConfirmInner.classList.add("-translate-x-full");
        });
    }

    async ButtonChangeRechaz1() {
        // grab all the things
        const doubleConfirm = document.querySelector(".double-confirm4");
        const doubleConfirmInner = document.querySelector(".double-confirm-inner4");

        // add event listeners
        doubleConfirm.addEventListener("click", () => {
        doubleConfirmInner.classList.add("-translate-x-full");
        });
    }
}