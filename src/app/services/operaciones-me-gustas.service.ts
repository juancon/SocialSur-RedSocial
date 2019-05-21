import { Injectable } from '@angular/core';
//Importamos el modulo http al servicio
import {Http, Response, Headers} from "@angular/http";
//Importamos la funcion map
import { map } from 'rxjs/operators';
//importamos el servicio que contiene las urls
import {UrlsService} from './urls.service';
//Importamos la clase archivo
import { Archivo } from '../Archivo/archivo';
//Importamos la clase estado
import { Estado } from '../Estado/estado';

@Injectable({
  providedIn: 'root'
})
export class OperacionesMeGustasService {
	//variables referentes a las url de los ficheros php
	private urlMegustas:string;
	//variables que devolvemos en las funciones
	private contenidoUsuario:Array<Archivo>;

	constructor(
		private _http: Http,
		private _urls: UrlsService
	) {
		this.urlMegustas = this._urls.getUrl("megustas");
	}

	//funcion para obtener los megustas
	public obtenerMegustas(arrayContenido:Array<Archivo>):Array<Archivo>{
		//convertimos el array del servicio al array que se nos pasa
		this.contenidoUsuario = arrayContenido;
		//recorremos el array que se nos pasa
		for (var i = 0; i < arrayContenido.length; i++){
			//preguntamos el tipo de contenido que es
				this.obtenerMegustasConsulta(arrayContenido[i].getId());
		}
		//devolvemos el array
		return this.contenidoUsuario;
	}

	//obtener los megustas de las fotos y los videos
	private obtenerMegustasConsulta(idElemento:number):void{	
		//variable que pasaremos al fichero php
		var parametros = {
			idelemento : idElemento,
			accion : "obtenermegustas"
		}
		//funcion http.post para enviar los datos
		let num = this._http.post(this.urlMegustas, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para poder obtener los datos que ha devuelto php
		num.subscribe(
			result => {
				//recogemos solo la respuesta del PHP y la pasamos a una variable
				let datos = result;
				//llamamos a la funcion que cambia los megusta de los contenidos
				this.cambiarNumMegusta(datos["nummegustas"],datos["idelemento"]);
			}
		);
	}

	//funcion para cambiar el numero de megustas de las fotos, los videos y los estadsos
	private cambiarNumMegusta(megustas:number,idelemento:number):void{
		//recorremos el array
		for(var i = 0; i < this.contenidoUsuario.length;i++){
			//preguntamos si el id del contenido y el tipo coinciden
			if(this.contenidoUsuario[i].getId() == idelemento){
				//si coinciden los cambiamos
				//preguntamos si el numero de megusta es 0 o mas
				if(megustas >= 0){
					//actualizamos los gustas con los megustan que vengas
					this.contenidoUsuario[i].setMegustas(megustas);
					//sumamos uno al numero de megustas actual
				}else if(megustas == -1){
					//si es -1 sumamos uno a los megustas actuales
					this.contenidoUsuario[i].setMegustas(this.contenidoUsuario[i].getMegustas()+1);
					this.contenidoUsuario[i].setRutamegustas("../../assets/iconos/like-1.svg");
				}else if(megustas == -2){
					//si es -2 restamos uno a los megustas actuales
					this.contenidoUsuario[i].setMegustas(this.contenidoUsuario[i].getMegustas()-1);
					this.contenidoUsuario[i].setRutamegustas("../../assets/iconos/like-3.svg");
				}
			}
		}
	}

	//funcion para dar megusta
	public darMegusta(idusuario:number,idElemento:number,arrayContenido:Array<Archivo>):Array<Archivo>{
		//convertimos el array del servicio al array que se nos pasa
		this.contenidoUsuario = arrayContenido;
		//variable que pasaremos al fichero php
		var parametros = {
			idusuario : idusuario,
			idelemento : idElemento,
			accion : "darmegusta"
		}
		//funcion http.post para enviar los datos
		let num = this._http.post(this.urlMegustas, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para poder obtener los datos que ha devuelto php
		num.subscribe(
			result => {
				//recogemos solo la respuesta del PHP y la pasamos a una variable
				let datos = result;
				//si el reultado de dar es uno
				if(datos["dar"] == 1){
					//llamamos a la funcion que actualiza los megusta pasandole -1 para que sume
					this.cambiarNumMegusta(-1,idElemento)
				}else if(datos["quitar"] == 1){
					//si qiutar es 1
					//llamamos a la funcion que actualiza los megusta pasandole -2 para que reste
					this.cambiarNumMegusta(-2,idElemento)
				}
			}
		);
		//devolvemos el array con los campos de megusta actualizados
		return this.contenidoUsuario;
	}

	//actualizar la ruta del icono del megusta
	public actualizarRuta(arrayContenido:Array<Archivo>):Array<Archivo>{
		//convertimos el array del servicio al array que se nos pasa
		this.contenidoUsuario = arrayContenido;
		//recorremos el array que se nos pasa
		for (var i = 0; i < arrayContenido.length; i++){
			//llamamos a la funcion que comprueba si se ha dada megusta al archivo o no
			this.comprobarMegusta(arrayContenido[i].getIdusuario(),arrayContenido[i].getId());
		}
		return this.contenidoUsuario;
	}
	//funcion que compureba si se ha dado megusta
	public comprobarMegusta(idusuario:number,idelemento:number):void{
		//variable que pasaremos al fichero php
		var parametros = {
			idusuario : idusuario,
			idelemento : idelemento,
			accion : "comprobarmegusta"
		}
		//funcion http.post para enviar los datos
		let num = this._http.post(this.urlMegustas, JSON.stringify(parametros)).pipe(map(res => res.json()));
		//llamamos a la funcion subscribe para poder obtener los datos que ha devuelto php
		num.subscribe(
			result => {
				//recogemos solo la respuesta del PHP y la pasamos a una variable
				let datos = result;
				//llamamos a la funcion que cambia la ruta
				this.cambiarComprobar(datos['comprobar'],idelemento);
			}
		);
	}
	//funcion que cambia la ruta del icono del megusta del contenido
	private cambiarComprobar(respuesta:number,idelemento:number):void{
		//recorremos el array
		for (var i = 0; i < this.contenidoUsuario.length; i++){
			//comprobamos que el id del elemento del array se igual al elemento que se ha recibido por parametro
			if(this.contenidoUsuario[i].getId() == idelemento){
				//dependiento de la la respuesta del fichero de ficheroponemos una ruta u otra
				if(respuesta == 1){
					this.contenidoUsuario[i].setRutamegustas("../../assets/iconos/like-1.svg");
				}else{
					this.contenidoUsuario[i].setRutamegustas("../../assets/iconos/like-3.svg");
				}
			}
		}
	}

}
