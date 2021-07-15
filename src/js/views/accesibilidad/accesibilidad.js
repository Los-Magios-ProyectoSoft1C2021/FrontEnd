import AbstractView from "../AbstractView";
import view from "./accesibilidad.html";

export default class Accesibilidad extends AbstractView{
    
    menu;

    async getHtml(){
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "accesibilidad";

        return divElement;
    }
}