import { Component, OnInit } from '@angular/core';
//servicio que contiene las urls
import { UrlsService } from '../services/urls.service'
//servicio para redirigir
import { RefrescarService } from '../services/refrescar.service'
//importamos la clase usuario
import { Usuario } from '../Usuario/usuario';
//servivioc que me indica el usuario en local
import { RecogerUsuarioLocalService } from '../services/recoger-usuario-local.service';
//importar servicio con las funciones de los amigos
import { OperacioneAmigosService } from '../services/operacione-amigos.service';
//importar servicio que continene las funciones de los mensajes
import { MensajesService } from '../services/mensajes.service';
import { } from 'jquery';


@Component({
	selector: 'app-amigos',
	templateUrl: './amigos.component.html',
	styleUrls: ['./amigos.component.css']
})
export class AmigosComponent implements OnInit {
	// variable que almacena la url del fichero PHP
	public urlRecogerAmigos: string;
	// variable que almacena el usaurio
	public usuario: Usuario;
	//variables referentes a los amigos
	public amigos: Array<Usuario> = new Array();
	public amigoActivo: Usuario = null;
	public hayAmigos:boolean = false;
	//variables referentes a los mensajes
	public mensaje: string = "";
	constructor(
		public _urls: UrlsService,
		public _redirigir: RefrescarService,
		public _recogerUsuario: RecogerUsuarioLocalService,
		public _operacionesAmigos: OperacioneAmigosService,
		public _mensajes: MensajesService
	) {
		this.usuario = this._recogerUsuario.getUsuario();
		//obtenemos los amigos cada 20segundo
		this.obtenerAmigos();
		//setInterval(this.obtenerAmigos.bind(this), 1000);
		//inicializamos la variuable amigoActivo para que no de problemas
		this.amigoActivo = new Usuario(0, "", "", "", "", "", "", "", "", 0, 0)
	}

	ngOnInit() {
	}
	// funcion para obtener a los amigos
	public obtenerAmigos(): void {
		//llamamos a la funcion para obetener amigos
		this.amigos = this._operacionesAmigos.obtenerAmigos2(this.amigos);
		setTimeout(this.comprobarAmigos.bind(this),200)
	}

	//recogemos el usuario sobre el que queremos realizar la accion
	public recogerAmigoAccion(amigo: Usuario): void {
		this.amigoActivo = amigo;
	}
	//funcion paera enviar el mensaje
	public enviar(): void {
		//comprobamos que el mensaje no este vacio
		if (this.mensaje.trim() != "") {
			//si no esta vacio lo enviamos
			this._mensajes.enviarMensaje(this.usuario.getId(), this.amigoActivo.getId(), this.mensaje);
			// cerramos la ventana modal
			this.cerrarModal();
		} else {
			// si esta vacio informamos al usuario remarcando el borde en rojo
			$("#mensaje").addClass("parpadear");
			// a los 5 segundos paramos de remarcarlo
			setTimeout(function () {
				$("#mensaje").removeClass("parpadear");
			}, 5000)
		}
	}
	//funcion para cerrar la ventana modal
	public cerrarModal(): void {
		//recorremos la ventana modal y la cerramos
		//usar esta linea puede dar error ya que modal no es una funcion jquery si no una del propio
		//componente que esta recogiendo con @ts-ignore se puede hacer que tipe script ignore este error
		//@ts-ignore
		$('#enviarmensaje').modal('hide');
		//reinicamos sus variables
		this.mensaje = "";
	}

	//funcion par aborrar amigo
	public borrarAmigo(): void {
		//borramos el amigo
		this._operacionesAmigos.borrarAmigo(this.usuario.getId(), this.amigoActivo.getId())
		//eliminamos al amigo del array y recargarmos el arry de amigos
		for (var i = 0; i < this.amigos.length; i++) {
			if (this.amigos[i].getId() == this.amigoActivo.getId()) {
				this.amigos.splice(i, 1);
			}
		}
		//llamamos a la funicon para obtener los amigos
		this.obtenerAmigos();
	}
	// funcion para redirigir al usuario
	public redirigir(apodo: string) {
		let url = "/usuario?apodo=" + apodo;
		window.location.href = url;
	}
	//funcion que comprueba si hay amigos
	public comprobarAmigos(): void {
		if (this.amigos.length == 0) {
			this. hayAmigos = false;
		}else{
			this. hayAmigos = true;
		}
	}
}
