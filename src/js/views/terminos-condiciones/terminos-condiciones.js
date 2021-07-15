import AbstractView from "../AbstractView";
import view from "./terminos-condiciones.html";

export default class TerminosCondiciones extends AbstractView{
    
    menu;

    async getHtml(){
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "terminos-condiciones";

        return divElement;
    }
}