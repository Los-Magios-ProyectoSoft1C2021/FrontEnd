import AbstractView from "../AbstractView";
import view from "./valores.html";

export default class Valores extends AbstractView{
    
    menu;

    async getHtml(){
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "valores";

        return divElement;
    }
}