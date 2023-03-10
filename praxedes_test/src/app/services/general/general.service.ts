import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { constantes } from '../../helpers/constantes';
import { http } from 'src/app/helpers/enums';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  //#region Constructor

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) { }

  //#endregion

  //#region Methods

  async sendRequest(url: string, body: any, withToken: boolean, method: http, isLogin = false): Promise<any> {
    const objHeader: any = {
      'Content-Type': 'application/json'
    };

    // Obtenemos el token
    let token = '';
    if (withToken) {
      token = await this.storageService.get(constantes.token);
      objHeader.xAuth = token;
    }

    const headers = new HttpHeaders(objHeader);
    const obj: any = {
      headers
    };

    if (isLogin) {
      obj.observe = 'response';
    }

    if (method === 'post') {

      return this.http
        .post(url, body, obj)
    }

    if (method === 'get') {

      return this.http
        .get(url, obj)
    }

    if (method === 'patch') {

      return this.http
        .patch(url, body, obj)
    }
  }

  //#endregion
}
