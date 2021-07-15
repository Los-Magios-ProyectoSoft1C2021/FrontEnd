
import { postFoto, postHabitacionByHotelId, postHotel } from "../../services/MicroservicioHotel";
import AbstractView from "../AbstractView";

import view from "./add_hotel_admin.html";

export default class extends AbstractView{
    modalCargarHotel;
    msjCargarHotel;

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
    btnAddHotel;

    numHabitacionIndividual;
    numHabitacionMatrimonial;
    numHabitacionSuite;

    txtFoto;

    constructor(params) {
        super(params);
    }

    async getHtml(){
        let divElement = document.createElement("div");
        divElement.innerHTML = view;
        divElement.id = "hotel_admin";

        return divElement;
    }

    executeViewScript(){
        this.initElements();
        this.initBtnAddHotel();

    }
    
    initElements(){
        this.modalCargarHotel = document.querySelector('#modal-carga-hotel-admin');
        this.msjCargarHotel = document.querySelector('#msj-carga-hotel-admin')

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

        this.numHabitacionIndividual= document.querySelector('#habitacion-individual');
        this.numHabitacionMatrimonial = document.querySelector('#habitacion-matrimonial');
        this.numHabitacionSuite = document.querySelector('#habitacion-suite');

        this.txtFoto = document.querySelector('#foto-hotel');

        this.btnAddHotel = document.querySelector('#btn-add-hotel')

        
    }

    initBtnAddHotel(){
        this.btnAddHotel.addEventListener("click", async (e) => {
            
            this.btnAddHotel.disabled = true;

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
            

            let fotoHotel = this.txtFoto.value;
            let fotoDescripcion = "--";

            let valIndividual= this.numHabitacionIndividual.value;
            let individual = "Individual";

            let valMatrimonial = this.numHabitacionMatrimonial.value;
            let matrimonial = "Matrimonial";

            let valSuite = this.numHabitacionSuite.value;
            let suite  ="Suite";

            let response = await postHotel({
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

            let json = await response.json();

            for(let i = 1; i<=valMatrimonial; i++ ) {
                let responseHabitacion = await postHabitacionByHotelId({
                    hotelId: json.hotelId,
                    nombre:matrimonial + i,
                    categoriaId: 2
                })
            }
            for(let i = 1; i<=valIndividual; i++ ) {
                let responseHabitacion = await postHabitacionByHotelId({
                    hotelId: json.hotelId,
                    nombre:individual + i,
                    categoriaId: 1
                })
            }
            for(let i = 1; i<=valSuite; i++ ) {
                let responseHabitacion = await postHabitacionByHotelId({
                    hotelId: json.hotelId,
                    nombre:suite + i,
                    categoriaId: 3
                })
            }

            let requestFoto = await postFoto ({
                hotelId: json.hotelId,
                imagenUrl: fotoHotel,
                descripcion: fotoDescripcion
            })
            
            this.btnAddHotel.disabled = false;

            if (response.ok) {
                this.msjCargarHotel.innerHTML = `Se ha cargado el hotel correctamente `;
            } else {
                this.msjCargarHotel.innerHTML = `Ha ocurrido un error al intentar modificar el hotel`;
            }

            console.log(response);
            
            this.modalCargarHotel.classList.remove("hidden");
            setTimeout(() => this.modalCargarHotel.classList.add("hidden"), 2500);
        })
    }
}