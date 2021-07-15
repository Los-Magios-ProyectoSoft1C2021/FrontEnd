import AbstractView from "../AbstractView";

import view from "./list_hotel_admin.html";
const template = require('./list_hotel_admin.handlebars');

import { getHotelesByPage } from "../../services/MicroservicioHotel";

import { navigateTo } from "../../routes";

export default class extends AbstractView {

    hotelsList;

    currentPage;

    constructor(params) {
        super(params);
        console.log(params);

        if ('page' in params)
            this.currentPage = params.page;


        this.setTitle("Booking UNAJ");
    }

    async setHotelsContent(pageNumber) {
        let result = await getHotelesByPage({
            page: pageNumber
        });

        console.log(result);

        const htmlHotels = template({
            hotels: result.data,
            currentPage: result.currentPage,
            pageCount: result.pageCount,
            navPages: this.getNavPages(result.currentPage, result.pageCount),
        });

        this.hotelsList = document.getElementById("list_admin_hotel");
        this.hotelsList.innerHTML = htmlHotels;


        let buttonHotelModify = document.querySelectorAll(".modificar-hotel");

        buttonHotelModify.forEach(element => {
            element.addEventListener("click", (e) => {
                const hotelId = e.target.closest(".modificar-hotel").getAttribute("hotel-id");

                history.pushState(undefined, undefined, `/admin/modify-hotel/${hotelId}`);
                navigateTo();
            });
        });

        let buttonsHotelReservas = document.querySelectorAll(".reservas-hotel");

        buttonsHotelReservas.forEach(element => {
            element.addEventListener("click", (e) => {
                const hotelId = e.target.closest(".reservas-hotel").getAttribute("hotel-id");

                history.pushState(undefined, undefined, `/admin/reservas/hotel/${hotelId}`);
                navigateTo();
            })
        })


        let navPages = document.querySelectorAll(".nav-hotels-list-admin");

        navPages.forEach(element => {
            element.addEventListener("click", (e) => {
                e.preventDefault();
                history.pushState(undefined, undefined, e.target.href);

                this.clearHotelsContent();
                this.currentPage = e.target.getAttribute("page-link-admin");
                this.setHotelsContent(this.currentPage);
            })
        })
    }

    clearHotelsContent() {
        this.hotelsList.innerHTML = "";

        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    async getHtml() {
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "list_hotel_admin";

        return divElement;
    }

    async executeViewScript() {
        this.setHotelsContent(this.currentPage);
    }


    getNavPages(currentPage, pageCount) {

        let navPages = [];

        const params = new URLSearchParams();

        if (currentPage > 1) {
            params.delete("page");
            params.append("page", currentPage - 1);

            navPages.push({
                text: "< Anterior",
                url: `/admin/list-hotel?${params.toString()}`,
                page: currentPage - 1,
            });
        }

        params.delete("page");
        params.append("page", currentPage);

        navPages.push({
            text: currentPage,
            url: `/admin/list-hotel?${params.toString()}`,
            page: currentPage,
        })

        if (currentPage < pageCount) {
            params.delete("page");
            params.append("page", currentPage + 1);

            navPages.push({
                text: "Siguiente >",
                url: `/admin/list-hotel??${params.toString()}`,
                page: currentPage + 1,
            });
        }

        return navPages;
    }
}