// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const host = 'localhost:2727'

export const environment = {
  production: false,

  iniciarSesion: 'https://pruebas.midasoft.co:5443/Apis_DLLO/Security/api/SEG',
  registrarUsuario: 'https://pruebas.midasoft.co:5443/Apis_DLLO/Seleccion/api/SOL/RegistroInicialSolicitante'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
