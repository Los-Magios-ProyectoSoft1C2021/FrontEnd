import html from "./index.html";
import css from "./styles.css";
import "regenerator-runtime/runtime";

import UniversalRouter from "universal-router";
import { routes } from "./js/routes";
import queryString from 'query-string';

const router = new UniversalRouter(routes);

const navigateTo = async (url) => {
    if (url != null) history.pushState(null, null, url);

    let pathname = window.location.pathname;

    // get the class and create the view
    let viewClass = await router.resolve({
        pathname: location.pathname,
        query: queryString.parse(location.search),
        hash: location.hash
    });
    let view = new viewClass();

    // change the content of the page
    let content = document.querySelector("#app");
    content.innerHTML = "";
    content.appendChild(await view.getHtml());

    // execute the scripts for this view
    await view.executeViewScript();
};

window.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    navigateTo();
});

window.addEventListener("popstate", () => { navigateTo(null) })