import UniversalRouter from "universal-router";
import DetailsHotels from "./views/details_hotel/DetailsHotels.js";

import Home from "./views/home/Home.js";
import SearchHotels from "./views/search_hotels/SearchHotels.js";
import LoginUsuario from "./views/login_usuario/LoginUsuario.js";
import RegisterUsuario from "./views/register_usuario/RegisterUsuario.js";


const routes = [
    {
        path: "/",
        action: async (context) => {
            return new Home(context.query);
        },
    },
    {
        path: "/buscar",
        action: async (context) => {
            console.log(context.query);
            return new SearchHotels(context.query);
        },
    },
    {
        path: "/hotel",
        action: async () => {
            return new DetailsHotels();
        },
    },
    {
        path: "/login",
        action: async () => {
            return new LoginUsuario();
        },
    },
    {
        path: "/register",
        action: async () => {
            return new RegisterUsuario();
        },
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
