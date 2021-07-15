
import { postFoto, postHabitacionByHotelId, postHotel } from "../../services/MicroservicioHotel";
import AbstractView from "../AbstractView";

import view from "./add_hotel_admin.html";

export default class extends AbstractView{
    
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
    /*
    validationBtn(){

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


        var val=0;

        if(this.txtNombreHotel == ""){
            val ++;
        }
        if(this.txtProvincia == ""){
            val ++;
        }
        if(this.txtCiudad == ""){
            val ++;
        }
        if(this.txtDireccion == ""){
            val ++;
        }
        if(this.txtNumero == ""){
            val ++;
        }
        if(this.txtCodigoPostal == ""){
            val ++;
        }
        if(this.txtLongitud == ""){
            val ++;
        }
        if(this.txtLatitud == ""){
            val ++;
        }
        if(this.telTelefono == ""){
            val ++;
        }
        if(this.numEstrellas == ""){
            val ++;
        }
        if(this.txtObvservacionesDireccion == ""){
            val ++;
        }
        if(this.txtCorreo == ""){
            val ++;
        }
        if(val == 0){
            document.getElementById('btn-add-hotel').disabled = false;
        }
        else {
            document.getElementById('btn-add-hotel').disabled = false;
        }
    }

    enableBtn(){
        document.querySelector('#txt-nombre-hotel').addEventListener("keyup",this.validationBtn);
        document.querySelector('#txt-provincia').addEventListener("keyup",this.validationBtn);
        document.querySelector('#txt-ciudad').addEventListener("keyup",this.validationBtn);
        document.querySelector('#txt-direccion').addEventListener("keyup",this.validationBtn);
        document.querySelector('#txt-direccion-numero').addEventListener("keyup",this.validationBtn);
        document.querySelector('#txt-codigo-postal').addEventListener("keyup",this.validationBtn);
        document.querySelector('#txt-longitud').addEventListener("keyup",this.validationBtn);
        document.querySelector('#txt-latitud').addEventListener("keyup",this.validationBtn);
        document.querySelector('#num-estrellas').addEventListener("change",this.validationBtn);
        document.querySelector('#tel-telefono').addEventListener("keyup",this.validationBtn);
        document.querySelector('#txt-obvservaciones-direccion').addEventListener("keyup",this.validationBtn);
        document.querySelector('#txt-email').addEventListener("keyup",this.validationBtn);
    }
    */
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

        this.numHabitacionIndividual= document.querySelector('#habitacion-individual');
        this.numHabitacionMatrimonial = document.querySelector('#habitacion-matrimonial');
        this.numHabitacionSuite = document.querySelector('#habitacion-suite');

        this.txtFoto = document.querySelector('#foto-hotel');

        this.btnAddHotel = document.querySelector('#btn-add-hotel')

        
    }

    initBtnAddHotel(){
        this.btnAddHotel.addEventListener("click", async (e) => {
            
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
            
            
            console.log(response);
            alert("Se ah añadido el nuevo hotel")
        })
    }
}