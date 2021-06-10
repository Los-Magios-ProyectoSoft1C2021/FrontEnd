import html from "./index.html";
import css from "./styles.css";
import "regenerator-runtime/runtime";

import UniversalRouter from "universal-router";
import { routes } from "./js/routes";
import queryString from 'query-string';

const router = new UniversalRouter(routes);

const navigateTo = async () => {
    let pathname = window.location.pathname;

    // get the class and create the view
    let view = await router.resolve({
        pathname: location.pathname,
        query: queryString.parse(location.search),
        hash: location.hash
    });

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

            console.log("data-link")
            history.pushState(undefined, undefined, e.target.href)
            navigateTo();
        }
    });

    navigateTo();
});

window.addEventListener("popstate", (e) => {
    e.preventDefault();
    console.log("popstate");
    navigateTo();
})

window.addEventListener("hashchange", (e) => {
    e.preventDefault();
    console.log(`location changed: ${location.pathname}`);
    navigateTo();
});