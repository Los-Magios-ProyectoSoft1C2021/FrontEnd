import AbstractView from "../AbstractView";

import view from "./login_usuario.html";

export default class extends AbstractView{
    async getHtml(){
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "login_usuario";

        return divElement;
    }
}