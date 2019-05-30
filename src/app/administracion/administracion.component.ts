import { Component, OnInit } from '@angular/core';
//importamos la clase con las operacions de las denuncias
import { OperacionesDenunciasService } from './../services/operaciones-denuncias.service';
//importamos la clase denuncias
import { Denuncias } from '../Denuncias/denuncias';
import { Archivo } from '../Archivo/archivo';
import { OperacionesFechasService } from '../services/operaciones-fechas.service';
import { OperacionesUsuariosService } from '../services/operaciones-usuarios.service';
import { ComentariosService } from '../services/comentarios.service';
import { Comentario } from '../Comentario/comentario';
import { Usuario } from '../Usuario/usuario';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {
  private denuncias:Array<Denuncias>;
	//Variables que almacena todo el contenido subido por el usuario (fotos,videos,comentarios)
	private contenidoUsuario:Array<Archivo> = new Array();
  
  constructor(
    private _operacionesDenuncias: OperacionesDenunciasService,
		private _operacionesFechas: OperacionesFechasService,
		private _operacionesUsuarios: OperacionesUsuariosService,
		private _comentarios: ComentariosService,
  ) {
    this.obtenerDenuncias();
  }

  ngOnInit() {
  }

  private obtenerDenuncias():void{
    this.denuncias = this._operacionesDenuncias.getDenuncias();
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

	private cerrarModal(): void {
    //recorremos la ventana modal y la cerramos
    //usar esta linea puede dar error ya que modal no es una funcion jquery si no una del propio
    //componente que esta recogiendo con @ts-ignore se puede hacer que tipe script ignore este error
    //@ts-ignore
    $('#enviarmensaje').modal('hide');
	}
}
