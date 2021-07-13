
import view from "./menu_login.html";

export default class MenuLogin {
    menu;

    constructor() {
        this.menu = document.querySelector("#menu-user");
    }

    init() {
        this.menu.innerHTML = view;
    }
}