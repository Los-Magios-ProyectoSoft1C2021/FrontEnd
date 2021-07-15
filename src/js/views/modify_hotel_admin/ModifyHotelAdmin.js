import AbstractView from "../AbstractView";

import view from "./modify_hotel_admin.html";

import { getHotelDetailsById, putHotel } from "../../services/MicroservicioHotel";

const template = require("./modify_hotel_admin.handlebars");

export default class extends AbstractView{
    //Hotel var
    idHotel;
    txtNombreHotel;
    txtProvincia;
    txtCiudad;
    txtDireccion;
    txtNumero;
    txtCodigoPostal;
    txtLongitud;
    txtLatitud;
    numEstrellas;
    telTelefono;
    txtObvservacionesDireccion;
    txtCorreo;
    btnModifyHotel;


    container;


    constructor(params) {
        super(params);
    }

    async getHtml(){
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "modify_hotel_admin";

        return divElement;
    }

    async executeViewScript() {
        let result = await getHotelDetailsById(this.params.id);
        console.log(result);

        let view = template(result);
        this.container = document.querySelector("#modify_hotel_admin");
        this.container.innerHTML = view;
        this.initElements();
        this.initBtnModifyHotel();

    }

    initElements(){
        this.txtNombreHotel = document.querySelector('#txt-nombre-hotel');
        this.txtProvincia = document.querySelector('#txt-provincia');
        this.txtCiudad = document.querySelector('#txt-ciudad');
        this.txtDireccion = document.querySelector('#txt-direccion');
        this.txtNumero = document.querySelector('#txt-direccion-numero');
        this.txtCodigoPostal = document.querySelector('#txt-codigo-postal');
        this.txtLongitud = document.querySelector('#txt-longitud');
        this.txtLatitud = document.querySelector('#txt-latitud');
        this.numEstrellas = document.querySelector('#num-estrellas');
        this.telTelefono = document.querySelector('#tel-telefono');
        this.txtObvservacionesDireccion = document.querySelector('#txt-obvservaciones-direccion');
        this.txtCorreo = document.querySelector('#txt-email');


        this.btnModifyHotel = document.querySelector('#btn-add-hotel')

    }

    initBtnModifyHotel(){

        this.btnModifyHotel.addEventListener("click", async (e) => {
            
            let nombre = this.txtNombreHotel.value;
            let longitud = this.txtLongitud.value;
            let latitud = this.txtLatitud.value;
            let provincia = this.txtProvincia.value;
            let ciudad = this.txtCiudad.value;
            let direccion = this.txtDireccion.value;
            let direccionNum = this.txtNumero.value;
            let direccionObservaciones = this.txtObvservacionesDireccion.value;
            let codigoPostal = this.txtCodigoPostal.value;
            let estrellas = this.numEstrellas.value;
            let telefono = this.telTelefono.value;
            let correo = this.txtCorreo.value;
            let idHotel = this.params.id;


            let response = await putHotel({
                hotelId:idHotel,
                nombre:nombre,
                longitud:longitud,
                latitud:latitud,
                provincia:provincia,
                ciudad:ciudad,
                direccion:direccion,
                direccionNum:direccionNum,
                direccionObservaciones:direccionObservaciones,
                codigoPostal:codigoPostal,
                estrellas:estrellas,
                telefono:telefono,
                correo:correo,
            });

            console.log(response);
            alert("Se ah modificado el hotel")
        })
    }
}
