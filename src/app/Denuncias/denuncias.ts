import { Archivo } from './../Archivo/archivo';
import { Usuario } from '../Usuario/usuario';

export class Denuncias {
    private idusuario:number;
    private usuario:Usuario;
    private idelemento:number;
    private elemento:Archivo;
    private idautor:number;
    private autor:Usuario;
    private numdenuncias:number;
    private fecha:string;

    constructor(
        idusuario:number,
        usuario:Usuario,
        idelemento:number,
        elemento:Archivo,
        idautor:number,
        autor:Usuario,
        fecha:string,
    ){
        this.idusuario = idusuario;
        this.usuario = usuario;
        this.idelemento = idelemento;
        this.elemento = elemento;
        this.idautor = idautor;
        this.autor = autor;
        this.fecha = fecha;
    }

    // SETTERS AND GETTERS

    public setIdusuario(idusuario:number):void{
        this.idusuario = idusuario;
    }
    public setUsuario(usuario:Usuario):void{
        this.usuario = usuario;
    }
    public setIdelemento(idelemento:number):void{
        this.idelemento = idelemento;
    }
    public setElemento(elemento:Archivo):void{
        this.elemento = elemento;
    }
    public setIdautor(idautor:number):void{
        this.idautor = idautor;
    }
    public setAutor(autor:Usuario):void{
        this.autor = autor;
    }
    public setFecha(fecha:string):void{
        this.fecha = fecha;
    }
    public setNumdenuncias(numdenuncias:number):void{
        this.numdenuncias = numdenuncias;
    }
    
    public getIdusuario():number{
        return this.idusuario;
    }
    public getUsuario():Usuario{
        return this.usuario;
    }
    public getIdelemento():number{
        return this.idelemento;
    }
    public getElemento():Archivo{
        return this.elemento;
    }
    public getIdautor():number{
        return this.idautor;
    }
    public getAutor():Usuario{
        return this.autor;
    }
    public getFecha():string{
        return this.fecha;
    }
    public getNumdenuncias():number{
        return this.numdenuncias;
    }

}
