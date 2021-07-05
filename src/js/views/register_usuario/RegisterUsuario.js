import AbstractView from "../AbstractView";

import view from "./register_usuario.html";

export default class extends AbstractView{
    async getHtml(){
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "register_usuario";

        return divElement;
    }
}