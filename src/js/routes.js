import UniversalRouter from "universal-router";
import queryString from "query-string";

import DetailsHotels from "./views/details_hotel/DetailsHotels.js";
import Home from "./views/home/Home.js";
import SearchHotels from "./views/search_hotels/SearchHotels.js";
import LoginUsuario from "./views/login_usuario/LoginUsuario.js";
import RegisterUsuario from "./views/register_usuario/RegisterUsuario.js";
import BookingUser from "./views/booking_user/BookingUser.js";
import BookingConfirm from "./views/booking_confirm/BookingConfirm.js";
import AddHotelAdmin from "./views/add_hotel_admin/AddHotelAdmin.js";
import LoginAdmin from "./views/login_admin/LoginAdmin.js";
import ListHotelAdmin from "./views/list_hotel_admin/ListHotelAdmin.js";
import ModifyHotelAdmin from "./views/modify_hotel_admin/ModifyHotelAdmin.js";
import BookingAdmin from "./views/booking_admin/BookingAdmin.js";
import BookingUserList from "./views/booking_user_list/BookingUserList.js";
import QueHacemos from "./views/que-hacemos/que-hacemos.js";
import Objetivos from "./views/objetivos/objetivos.js";
import Mision from "./views/mision/mision.js";
import Valores from "./views/valores/valores.js";
import Accesibilidad from "./views/accesibilidad/accesibilidad.js";
import TerminosCondiciones from "./views/terminos-condiciones/terminos-condiciones.js";
import Privacidad from "./views/privacidad/privacidad.js";
import Cookies from "./views/cookies/cookies.js";

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
            console.log(`query:`);
            console.log(context.query)
            return new SearchHotels(context.query);
        },
    },
    {
        path: "/hotel/:id",
        action: async (context) => {
            console.log(context.params.id);
            return new DetailsHotels(context.params);
        },
    },
    {
        path: "/login",
        action: async () => {
            return new LoginUsuario();
        },
    },
    {
        path: "/registrarse",
        action: async () => {
            return new RegisterUsuario();
        },
    },
    {
        path: "/usuario/reservas",
        action: async () => {
            return new BookingUser();
        },
    },
    {
        path: "/usuario/reservas-list",
        action: async () => {
            return new BookingUserList();
        },
    },
    {
        path: "/reserva/confirmar",
        action: async (context) => {
            return new BookingConfirm(context.query);
        },
    },
    {
        path: "/admin/add-hotel",
        action: async () => {
            return new AddHotelAdmin();
        },
    },
    {
        path: "/admin/login",
        action: async () => {
            return new LoginAdmin();
        },
    },
    {
        path: "/admin/modify-hotel/:id",
        action: async (context) => {
            return new ModifyHotelAdmin(context.params);
        },
    },
    {
        path: "/admin/list-hotel",
        action: async (context) => {
            return new ListHotelAdmin(context.query);
        },
    },
    {
        path: "/admin/reservas",
        action: async () => {
            return new BookingAdmin();
        },
    },
    {
        path: "/que-hacemos",
        action: async () => {
            return new QueHacemos();
        }
    },
    {
        path: "/objetivos",
        action: async () => {
            return new Objetivos();
        }
    },
    {
        path: "/mision",
        action: async () => {
            return new Mision();
        }
    },
    {
        path: "/valores",
        action: async () => {
            return new Valores();
        }
    },
    {
        path: "/accesibilidad",
        action: async () => {
            return new Accesibilidad();
        }
    },
    {
        path: "/terminos-condiciones",
        action: async () => {
            return new TerminosCondiciones();
        }
    },
    {
        path: "/privacidad",
        action: async () => {
            return new Privacidad();
        }
    },
    {
        path: "/cookies",
        action: async () => {
            return new Cookies();
        }
    },
];

const router = new UniversalRouter(routes);

const navigateTo = async () => {
    // get the class and create the view
    let view = await router.resolve({
        pathname: location.pathname,
        query: queryString.parse(location.search)
    });

    // change the content of the page
    let content = document.querySelector("#app");
    content.innerHTML = "";
    content.appendChild(await view.getHtml());

    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 250);

    // execute the scripts for this view
    view.executeViewScript();
}

export { navigateTo };
