import html from "./index.html";
import css from "./styles.css";
import "regenerator-runtime/runtime";

import { navigateTo } from "./js/routes";
import { getToken } from "./js/services/token";

import MenuLogin from "./js/views/menu_login/MenuLogin";
import MenuUsuario from "./js/views/menu_user/MenuUsuario";

window.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();

            console.log("data-link")
            history.pushState(undefined, undefined, e.target.href)
            navigateTo();
        }
    });

    navigateTo();
});

window.addEventListener("popstate", (e) => {
    console.log("popstate");
    navigateTo();
})

window.addEventListener("hashchange", (e) => {
    console.log(`location changed: ${location.pathname}`);
    navigateTo();
});


const elemMenuUser = document.querySelector("#menu-user");
const token = getToken();

if (token == null) {
    new MenuLogin().init();
} else {
    new MenuUsuario().init();
}