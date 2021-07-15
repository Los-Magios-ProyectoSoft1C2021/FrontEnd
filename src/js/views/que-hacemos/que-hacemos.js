import AbstractView from "../AbstractView";
import view from "./que-hacemos.html";

export default class QueHacemos extends AbstractView{
    
    menu;

    async getHtml(){
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "que-hacemos";

        return divElement;
    }
}