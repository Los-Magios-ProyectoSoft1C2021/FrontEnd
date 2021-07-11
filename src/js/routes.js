import UniversalRouter from "universal-router";
import DetailsHotels from "./views/details_hotel/DetailsHotels.js";

import Home from "./views/home/Home.js";
import SearchHotels from "./views/search_hotels/SearchHotels.js";
import LoginUsuario from "./views/login_usuario/LoginUsuario.js";
import RegisterUsuario from "./views/register_usuario/RegisterUsuario.js";
import BookingUser from "./views/booking_user/BookingUser.js";
import BookingConfirm from "./views/bookin_confirm/BookingConfirm.js";
import AddHotelAdmin from "./views/add_hotel_admin/AddHotelAdmin.js";
import LoginAdmin from "./views/login_admin/LoginAdmin.js";


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
        path: "/booking_user",
        action: async () => {
            return new BookingUser();
        },
    },
    {
        path: "/booking_confirm",
        action: async () => {
            return new BookingConfirm();
        },
    },
    {
        path: "/add_hotel_admin",
        action: async () => {
            return new AddHotelAdmin();
        },
    },
    {
        path: "/login_admin",
        action: async () => {
            return new LoginAdmin();
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
