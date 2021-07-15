import AbstractView from "../AbstractView";
import view from "./cookies.html";

export default class Cookies extends AbstractView{
    
    menu;

    async getHtml(){
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "cookies";

        return divElement;
    }
}