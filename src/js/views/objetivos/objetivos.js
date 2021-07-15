import AbstractView from "../AbstractView";
import view from "./objetivos.html";

export default class Objetivos extends AbstractView{
    
    menu;

    async getHtml(){
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "objetivos";

        return divElement;
    }
}