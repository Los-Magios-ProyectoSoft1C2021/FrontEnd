import UniversalRouter from "universal-router";

import Home from "./views/home/Home.js";
import SearchHotels from "./views/search_hotels/SearchHotels.js";

const routes = [
    {
        path: "/",
        action: async () => Home,
    },
    {
        path: "/buscar",
        action: async () => SearchHotels,
    },
    {
        path: "/que-hacemos",
        action: () => "que-hacemos",
    },
    {
        path: "/objetivos",
        action: () => "objetivos",
    },
    {
        path: "/mision",
        action: () => "mision",
    },
    {
        path: "/valores",
        action: () => "valores",
    },
    {
        path: "/accesibilidad",
        action: () => "accesibilidad",
    },
    {
        path: "/terminos-condiciones",
        action: () => "terminos-condiciones",
    },
    {
        path: "/privacidad",
        action: () => "privacidad",
    },
    {
        path: "/cookies",
        action: () => "cookies",
    },
];

export { routes };
