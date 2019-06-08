'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">socialsur-pi documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-e6e0611f8fccca7fa4d0930cea2108b2"' : 'data-target="#xs-components-links-module-AppModule-e6e0611f8fccca7fa4d0930cea2108b2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-e6e0611f8fccca7fa4d0930cea2108b2"' :
                                            'id="xs-components-links-module-AppModule-e6e0611f8fccca7fa4d0930cea2108b2"' }>
                                            <li class="link">
                                                <a href="components/AdministracionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdministracionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AmigosComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AmigosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BarraNavegacionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BarraNavegacionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BuscarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BuscarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChatComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChatComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfirmarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConfirmarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContenidoUsuarioComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContenidoUsuarioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InformacionUsuarioComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InformacionUsuarioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MensajesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MensajesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NovedadesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NovedadesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OtrosusuariosComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OtrosusuariosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PeticionesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PeticionesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegistroComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegistroComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Archivo.html" data-type="entity-link">Archivo</a>
                            </li>
                            <li class="link">
                                <a href="classes/Comentario.html" data-type="entity-link">Comentario</a>
                            </li>
                            <li class="link">
                                <a href="classes/Denuncias.html" data-type="entity-link">Denuncias</a>
                            </li>
                            <li class="link">
                                <a href="classes/Estado.html" data-type="entity-link">Estado</a>
                            </li>
                            <li class="link">
                                <a href="classes/Mensaje.html" data-type="entity-link">Mensaje</a>
                            </li>
                            <li class="link">
                                <a href="classes/Peticion.html" data-type="entity-link">Peticion</a>
                            </li>
                            <li class="link">
                                <a href="classes/Usuario.html" data-type="entity-link">Usuario</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BorrarArchivoService.html" data-type="entity-link">BorrarArchivoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BuscarUsuarioService.html" data-type="entity-link">BuscarUsuarioService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CambiarPasswordService.html" data-type="entity-link">CambiarPasswordService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CerrarSesionService.html" data-type="entity-link">CerrarSesionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ComentariosService.html" data-type="entity-link">ComentariosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CrearUsuarioService.html" data-type="entity-link">CrearUsuarioService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmailConfirmacionService.html" data-type="entity-link">EmailConfirmacionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MensajesService.html" data-type="entity-link">MensajesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OperacioneAmigosService.html" data-type="entity-link">OperacioneAmigosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OperacionesDenunciasService.html" data-type="entity-link">OperacionesDenunciasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OperacionesFechasService.html" data-type="entity-link">OperacionesFechasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OperacionesMeGustasService.html" data-type="entity-link">OperacionesMeGustasService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OperacionesPeticionesService.html" data-type="entity-link">OperacionesPeticionesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OperacionesUsuariosService.html" data-type="entity-link">OperacionesUsuariosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RecogerUsuarioLocalService.html" data-type="entity-link">RecogerUsuarioLocalService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RefrescarService.html" data-type="entity-link">RefrescarService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubirArchivoService.html" data-type="entity-link">SubirArchivoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UrlsService.html" data-type="entity-link">UrlsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});