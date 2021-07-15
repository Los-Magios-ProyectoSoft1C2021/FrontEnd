import AbstractView from "../AbstractView";
import view from "./mision.html";

export default class Mision extends AbstractView{
    
    menu;

    async getHtml(){
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "mision";

        return divElement;
    }
}