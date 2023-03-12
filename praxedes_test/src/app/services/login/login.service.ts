import { Injectable } from '@angular/core';
import { GeneralService } from '../general/general.service';
import { environment } from '../../../environments/environment';
import { http } from 'src/app/helpers/enums';
import { Observable } from 'rxjs';
import { constantes } from '../../helpers/constantes';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private generalService: GeneralService
  ) { }

  login(username: any, password: any): Promise<Observable<any>> {
    const body = {
      password,
      companyId: '10',
      username,
      desdeMs: true,
    }
    return this.generalService.sendRequest(environment.iniciarSesion, body, false, http.post, true)
  }

  registrarUsuario(body: any): Promise<Observable<any>> {
    return this.generalService.sendRequest(`${environment.registrarUsuario}`, body, false, http.post)
  }
}
