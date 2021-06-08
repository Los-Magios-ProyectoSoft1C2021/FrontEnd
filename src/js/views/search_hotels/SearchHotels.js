import AbstractView from "../AbstractView";

import view from "./search_hotels.html";
import "./styles.css";

const $ = require('jquery');
import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';

import { Datepicker } from 'vanillajs-datepicker'


export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Booking UNAJ");
    }

    async getHtml() {
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "search_hotels";

        return divElement;
    }

    async executeViewScript() {
        let myInput = document.getElementById("date_begin");
        console.log(myInput);
        let fp = flatpickr(myInput, {});
    };
}