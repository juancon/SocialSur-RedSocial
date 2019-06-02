import { Injectable } from '@angular/core';
//servicio que contiene las urls
import { UrlsService } from '../services/urls.service'
//Importamos el modulo http al servicio
import {Http, Response, Headers} from "@angular/http";
//Importamos la funcion map
import { map } from 'rxjs/operators';
//importamos la clase peticion
import {Peticion} from '../PeticionesAmistad/peticion-amistad';
//servivioc que me indica el usuario en local
import { RecogerUsuarioLocalService } from '../services/recoger-usuario-local.service';

@Injectable({
  providedIn: 'root'
})
export class OperacionesPeticionesService {
  //direccion del archivo php
  private urlPeticiones:string;

  private peticiones:Array<Peticion>;
  constructor(
    private _urls: UrlsService,
		private _http: Http
  ) {
    this.urlPeticiones = this._urls.getUrl("peticiones");
  }
  
  //funcion para obtener peticiones
  public obtenerPeticiones(idusuario:number,arrayPeticiones:Array<Peticion>):Array<Peticion>{
    this.peticiones = arrayPeticiones;
    let parametros = {
      idusuario : idusuario,
      accion : "obtenerpeticiones"
    }

    //funcion http.post para enviar los datos
		let obtener = this._http.post(this.urlPeticiones, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para poder obtener los datos que ha devuelto php
		obtener.subscribe(
			result => {
				//recogemos solo la respuesta del PHP y la pasamos a una variable
				let datos = result;
				//llamamos a la funcion que ñade los mensajes al array principal
				this.addPeticiones(datos);
			}
		);

    return this.peticiones;
  }

  private addPeticiones(datos:Array<string>):void {
    //comprobamos quye el array recibido sea diferente al almacenado
    if(this.peticiones.length != datos.length){
      //recorremos los mensajes recibidos
      for (var i = 0; i <  datos.length; i++){
        //creamos u objeto mensaje en el array por cada mensaje recibido
        this.peticiones[i] = new Peticion(
            datos[i]["idusuariofrom"],
            datos[i]["idusuarioto"],
            datos[i]["mensaje"],
            datos[i]["otroUsuario"],
            datos[i]["fecha"]
        );
      }
    }
  }

  public responder(idusuariofrom:number,idusuarioto:number,respuesta:string):void{
    let parametros = {
      idusuariofrom : idusuariofrom,
      idusuarioto : idusuarioto,
      respuesta : respuesta,
      accion : "responderpeticion"
    }

    //funcion http.post para enviar los datos
		let responder = this._http.post(this.urlPeticiones, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para pque la operacion se realize correctamente
		responder.subscribe(result => {});
  }


  public enviarSolicitud(idusuario:number,idusuarioto:number,mensaje:string){
		let parametros = {
			idusuario : idusuario,
			idusuarioto : idusuarioto,
			mensaje : mensaje,
			accion : "enviarsolicitud"
    }
		//funcion http.post para enviar los datos
		let enviar = this._http.post(this.urlPeticiones, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para completar la llamada a PHP
		enviar.subscribe(
      result => {
			}
		);
  }
}
