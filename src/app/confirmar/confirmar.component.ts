import { EmailConfirmacionService } from './../services/email-confirmacion.service';
import { RecogerUsuarioLocalService } from './../services/recoger-usuario-local.service';
import { Usuario } from './../Usuario/usuario';
import { Component, OnInit,  Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.css']
})
export class ConfirmarComponent implements OnInit {
  private usuario:Usuario;
  @Output() ocultar:EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private _recogerUsuario:RecogerUsuarioLocalService,
    private _emailConfirmacion: EmailConfirmacionService
  ) {
    this.usuario = this._recogerUsuario.getUsuario();
  }

  ngOnInit() {
  }

  private enviarEmail():void{
    this._emailConfirmacion.enviarEmail(this.usuario.getEmai(),this.usuario.getNombre()+" "+this.usuario.getApellido(),this.usuario.getApodo())
    this.ocultar.emit(false);
  }

  private cerrar():void{
    this.ocultar.emit(true);
  }
}
