import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OperacionesFechasService {

	constructor() { }

	public ordenarPorFechaDesc(fechas:Array<any>):Array<any>{
		fechas.sort(function(a:any,b:any){
			let fechaA = new Date(a.getFecha());
			let fechaB = new Date(b.getFecha());
			return fechaB.getTime() - fechaA.getTime();
		});

		return fechas;
	}

	//funcion que comprueba si una fecha es de hoy
	public comprobarFechaHoy(fecha:Date):boolean{
		//recogemos la fecha de hoy
		let hoy = new Date();
			//saco la fecha de cada mensaje

		//comprobamos que el dia sea el mismo
		if(hoy.getDate() == fecha.getDate()){
			//comprobamos que el mes sea el mismo
			if(hoy.getMonth() == fecha.getMonth()){
				//comprobamos que el año sea el mismo
				if(hoy.getFullYear() == fecha.getFullYear()){
					// si todo coincide devolvemos verdadero
					return true;
				}
			}
		}
		return false;
	}

	public comprobarFechaAyer(fecha:Date):boolean{
		//recogemos la fecha de hoy
		let hoy = new Date();
			//saco la fecha de cada mensaje

		//comprobamos que el año
		if(hoy.getFullYear() == fecha.getFullYear()){
			//comprobamos que el mes sea el mismo
			if(hoy.getMonth() == fecha.getMonth()){
				//comprobamos que el dia sea el de ayer
				if(hoy.getDate()-1 == fecha.getDate()){
					// si todo coincide devolvemos verdadero
					return true;
				}
			}
		}
		return false;
	}


	public convertirFecha(fecha:string):string{
		//creo la variable que voy a devolver
		let ret;
		// creo una fecha con la fecha que me han dado
		let fechaMensaje = new Date(fecha);
		//compurebo si la fecha es de hoy
		let esHoy = this.comprobarFechaHoy(fechaMensaje);
		let esAyer = this.comprobarFechaAyer(fechaMensaje);
		if(esHoy){
			//si es de hoy muestros solo la hora y el minuto
			let hora = fechaMensaje.getHours()+"";
			let minuto = fechaMensaje.getMinutes()+"";
			// comprobamos que las horas y los minutos sean mayor o menor que 10 ara añadirle o no el 0 al principio 
			if(fechaMensaje.getHours() < 10){
				hora = "0"+hora;
			}
			if(fechaMensaje.getMinutes() < 10){
				minuto = "0"+minuto;
			}
			ret = hora+":"+minuto;
		}else if(esAyer){
			//si es de ayer indico que es de ayer
			ret = "Ayer";
		}else{
			//si no es de hoy ni de ayer muestro el dia, mes y el año
			let dia = fechaMensaje.getDate()+"";
			let mes = (fechaMensaje.getMonth()+1)+"";
			let anio = fechaMensaje.getFullYear()+"";

			//comprobamos que el mes y el dia sean mayor que 10 para añadirle o no el 0 delante
			if(fechaMensaje.getDate() < 10){
				dia = "0"+dia;
			}
			if(fechaMensaje.getMonth()+1 < 10){
				mes = "0"+mes;
			}

			ret = dia+"/"+mes+"/"+anio;

		}
		//debvulevo la variable
		return ret;
	}

	public convertirfechas(datos:Array<string>):Array<string>{
		for( var i = 0; i < datos.length ; i++){
			//saco la fecha de cada dato
			let fechaMensaje = new Date(datos[i]["fecha"]);
			//llamo al servicio que comprueba si una fecha es de hoy
			let esHoy = this.comprobarFechaHoy(fechaMensaje);
			let esAyer = this.comprobarFechaAyer(fechaMensaje);
			if(esHoy){
				//si es de hoy muestros solo la hora y el minuto
				let hora = fechaMensaje.getHours()+"";
				let minuto = fechaMensaje.getMinutes()+"";
				// comprobamos que las horas y los minutos sean mayor o menor que 10 ara añadirle o no el 0 al principio 
				if(fechaMensaje.getHours() < 10){
					hora = "0"+hora;
				}
				if(fechaMensaje.getMinutes() < 10){
					minuto = "0"+minuto;
				}
				datos[i]["fecha"] = hora+":"+minuto;
			}else if(esAyer){
				//si es de ayer indico que es de ayer
				datos[i]["fecha"] = "Ayer";
			}else{
				//si no es de hoy ni de ayer muestro el dia, mes y el año
				let dia = fechaMensaje.getDate()+"";
				let mes = (fechaMensaje.getMonth()+1)+"";
				let anio = fechaMensaje.getFullYear()+"";

				//comprobamos que el mes y el dia sean mayor que 10 para añadirle o no el 0 delante
				if(fechaMensaje.getDate() < 10){
					dia = "0"+dia;
				}
				if(fechaMensaje.getMonth()+1 < 10){
					mes = "0"+mes;
				}
				datos[i]["fecha"] = dia+"/"+mes+"/"+anio;
			}
		}
		//guardo las conversaciones en el array
		return datos;
	}
}
