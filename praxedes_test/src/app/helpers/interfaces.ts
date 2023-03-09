import {  optDialog } from './enums';
export interface IResponse {
  token: string,
  usuario: IUsuario
}

export interface IUsuario {
  nombre: String,
  apellido: String
  doctoIdent: String,
  email: String,
  clave: String,
  cia: String
}

export interface IDialogData {
  titulo: string,
  mensaje: string,
  input?: boolean,
  opt: optDialog
}

export interface IDataBar {
  name: string,
  value: number
}

export interface ILineChart {
  name: string,
  series: IDataBar[]
}