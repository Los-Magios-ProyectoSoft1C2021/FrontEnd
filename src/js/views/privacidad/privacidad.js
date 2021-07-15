import AbstractView from "../AbstractView";
import view from "./privacidad.html";

export default class Privacidad extends AbstractView{
    
    menu;

    async getHtml(){
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "privacidad";

        return divElement;
    }
}