import html from "./index.html";
import css from "./styles.css";
import regeneratorRuntime from "regenerator-runtime";

import UniversalRouter from "universal-router";
import { routes } from "./js/routes";

const router = new UniversalRouter(routes);

const navigateTo = async (url) => {
    if (url != null) history.pushState(null, null, url);

    let pathname = window.location.pathname;

    // get the class and create the view
    let viewClass = await router.resolve({ pathname: pathname });
    let view = new viewClass();

    // change the content of the page
    let content = document.querySelector("#app");
    content.innerHTML = "";
    content.appendChild(await view.getHtml());

    // execute the scripts for this view
    await view.executeViewScript();
};

window.addEventListener("popstate", navigateTo);

window.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    navigateTo();
});
