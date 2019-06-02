import { Component, OnInit } from '@angular/core';
//importamos la clase con las operacions de las denuncias
import { OperacionesDenunciasService } from './../services/operaciones-denuncias.service';
//importamos la clase denuncias
import { Denuncias } from '../Denuncias/denuncias';
//improtamos la clase archivo
import { Archivo } from '../Archivo/archivo';
//importamos las funciones de las fechas. los usuarios, los comentarios y borrar archivoss
import { OperacionesFechasService } from '../services/operaciones-fechas.service';
import { OperacionesUsuariosService } from '../services/operaciones-usuarios.service';
import { ComentariosService } from '../services/comentarios.service';
import { BorrarArchivoService } from './../services/borrar-archivo.service';
import { Comentario } from '../Comentario/comentario';
import { Usuario } from '../Usuario/usuario';
//servicio para cerrar sesion
import { CerrarSesionService } from '../services/cerrar-sesion.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {
  private denuncias:Array<Denuncias>;
	//Variables que almacena todo el contenido subido por el usuario (fotos,videos,comentarios)
	private contenidoUsuario:Array<Archivo> = new Array();
	//variables para ordenar
	private ordenarPor:string = "nada";
  
  constructor(
		private _cerrarSesion: CerrarSesionService,
    private _operacionesDenuncias: OperacionesDenunciasService,
		private _operacionesFechas: OperacionesFechasService,
		private _operacionesUsuarios: OperacionesUsuariosService,
		private _borrarArchivo: BorrarArchivoService,
		private _comentarios: ComentariosService,
  ) {
		this.obtenerDenuncias();
		setInterval(this.obtenerDenuncias.bind(this),300000)
  }

  ngOnInit() {
	}
	
	private ordenarPorNumero():void{
		//ordenamos por numero de deuncias de manera descendente
		this.denuncias.sort(function (a, b) {
			if (a.getNumdenuncias() > b.getNumdenuncias()) {
				return -1;
			}
			if (a.getNumdenuncias() < b.getNumdenuncias()) {
				return 1;
			}
			// a must be equal to b
			return 0;
		});

		this.ordenarPor = "numero";
	}

	private ordenarPorFecha():void{
		//ordenamos por fecha
		this.denuncias = this._operacionesFechas.ordenarPorFechaDesc(this.denuncias);
		this.ordenarPor = "fecha";
	}

  private obtenerDenuncias():void{
		this.denuncias = this._operacionesDenuncias.getDenuncias();
		//comprobamos si el admin ha ordenado el array para ordenar el array
		if(this.ordenarPor == "numero"){
			this.ordenarPorNumero();
		}else if(this.ordenarPor == "fecha"){
			this.ordenarPorFecha();
		}
	}
	
	//comprobamos si hay denuncias
	private hayDenuncias():boolean{
		if(this.denuncias.length > 0){
			return true;
		}
		return false;
	}

	//comprobar si el archivo es un video
	private comprobarVideo(tipo:string):boolean{
		if(tipo == "video"){
			return true;
		}
		return false;
	}

	//comprobar si el archivo es un foto
	private comprobarFoto(tipo:string):boolean{
		if(tipo == "foto"){
			return true;
		}
		return false;
	}

	//saber si un array esta vacio
	private esVacio(array:Array<any>):boolean{
		if(array.length > 0){
			return false;
		}

		return true;
	}

	private borrarComentario(idcomentario:number,idelemento:number):void{
		//borramos el comentario de la base de datos
		this._comentarios.borrarComentario(idcomentario);
		//lo sacamos del array
		for(var i = 0; i < this.denuncias.length; i++){
			//comprobamos que el lemento sea el mismo
			if(this.denuncias[i].getElemento().getId() == idelemento){
				//recorremos los comentarios de dicho elemento
				for(var j = 0; j < this.denuncias[i].getElemento().getComentarios().length ; j++){
					//comprobamos que sea el ismo comentario
					if(this.denuncias[i].getElemento().getComentarios()[j].getId() == idcomentario){
						//creamos una rraay auxiliar
						let aux = this.denuncias[i].getElemento().getComentarios();
						//eliminamos el comentario
						aux.splice(j,1);

						//cambiamos el array actual por el auxiliar
						this.denuncias[i].getElemento().setComentarios(aux);
						break;
					}
				}
				break;
			}
		}
	}

	private borrarPublicacion(idelemento:number):void{
		//borramos las denuncias de ese lemetno
		this.borrarDenuncias(idelemento);
		//borramos ese elemeto de la base de datos
		this._borrarArchivo.borrarArchivo(idelemento);


	}

	private borrarComentarios(idelemento:number):void{
		this._comentarios.borrarComentarios(idelemento);

		//quitamos los comentarios del array
		for (var i = 0; i < this.denuncias.length;i++){
			if(this.denuncias[i].getElemento().getId() == idelemento){
				this.denuncias[i].getElemento().setComentarios(new Array());
			}
		}
	}

	private borrarDenuncias(idlemento:number):void{
		this._operacionesDenuncias.borrarDenuncias(idlemento);

		//eliminamos el elemento de las denuncias
		for(var i = 0; i < this.denuncias.length; i++ ){
			if(this.denuncias[i].getElemento().getId() == idlemento){
				this.denuncias.splice(i,1);
			}
		}
	}

	private cerrarModal(): void {
    //recorremos la ventana modal y la cerramos
    //usar esta linea puede dar error ya que modal no es una funcion jquery si no una del propio
    //componente que esta recogiendo con @ts-ignore se puede hacer que tipe script ignore este error
    //@ts-ignore
    $('#enviarmensaje').modal('hide');
	}

	//funcion para cerrar sesion
	private cerrarSesion():void{
		//borramos datos de sesion
		this._cerrarSesion.cerrarSesion();
	}
}
