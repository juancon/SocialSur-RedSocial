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
	public urlRecogerAmigos: string;
	public usuario: Usuario;
	//variables referentes a los amigos
	public amigos: Array<Usuario> = new Array();
	public amigoActivo: Usuario = null;
	//variables referentes a los mensajes
	public mensaje: string = "";
	//ventana modal
	public ventanaModal: any = null;
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
		setInterval(this.obtenerAmigos.bind(this), 20000);
		//inicializamos la variuable amigoActivo para que no de problemas
		this.amigoActivo = new Usuario(0, "", "", "", "", "", "", "", "", 0, 0)
	}

	ngOnInit() {
	}

	public obtenerAmigos(): void {
		//llamamos a la funcion para obetener amigos
		this.amigos = this._operacionesAmigos.obtenerAmigos(this.amigos);
	}

	public asignarVentanaModal(ev): void {
		if (this.ventanaModal == null) {
			this.ventanaModal = ev.target;
		}
	}

	//recogemos el usuario sobre el que queremos realizar la accion
	public recogerAmigoAccion(amigo: Usuario): void {
		this.amigoActivo = amigo;
	}
	//funcion paera enviar el mensaje
	public enviar(): void {
		//comprobamos que el mensaje no este vacio
		if (this.mensaje.trim() != "") {
			this._mensajes.enviarMensaje(this.usuario.getId(), this.amigoActivo.getId(), this.mensaje);
			this.cerrarModal();

		} else {
			$("#mensaje").addClass("parpadear");
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
		this.obtenerAmigos();
	}

	public redirigir(apodo: string) {
		let url = "/usuario?apodo=" + apodo;
		window.location.href = url;
	}

	public hayAmigos(): boolean {
		if (this.amigos.length == 0) {
			return false;
		}
		return true;
	}
}
