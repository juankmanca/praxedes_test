import { optDialog } from './enums';
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

export interface IAPIResult {
  info: IInfo,
  results: IEpisode[]
}

export interface IInfo {
  count: number,
  next: string,
  pages: number,
  prev: string
}

export interface IEpisode {
  air_date: string
  characters: string[],
  created: string
  episode: string,
  id: number,
  name: string
  url: string
}
