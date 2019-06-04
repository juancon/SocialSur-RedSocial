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
  public usuario:Usuario;
  @Output() ocultar:EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    public _recogerUsuario:RecogerUsuarioLocalService,
    public _emailConfirmacion: EmailConfirmacionService
  ) {
    this.usuario = this._recogerUsuario.getUsuario();
  }

  ngOnInit() {
  }

  public enviarEmail():void{
    this._emailConfirmacion.enviarEmail(this.usuario.getEmai(),this.usuario.getNombre()+" "+this.usuario.getApellido(),this.usuario.getApodo())
    this.ocultar.emit(false);
  }

  public cerrar():void{
    this.ocultar.emit(true);
  }
}
