import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { LoginService } from '../../services/login/login.service';
import { UiService } from '../../services/ui/ui.service';
import { constantes } from '../../helpers/constantes';
import { IResponse, IDialogData } from '../../helpers/interfaces';
import { optDialog } from '../../helpers/enums';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  public username = new FormControl('')
  public password = new FormControl('')

  constructor(
    private loginService: LoginService,
    private route: Router,
    private storage: StorageService,
    private ui: UiService,
  ) { }

  private guardarDatosLocales(token: string) {
    this.storage.set(constantes.token, token);
  }
  
  public async login(): Promise<void> {
    if (!this.username || !this.password) return;
    const load = this.ui.loading();
    const x = await this.loginService.login(this.username.value?.trim(), this.password.value?.trim())
    x.subscribe(
      (data: any) => {
        // const token = data.headers.get('xauth');
        load.close();
        const resp: IResponse = data.body;
        console.log('resp.token >>:', resp.token);
        
        this.guardarDatosLocales(resp.token);
        this.route.navigate(["/home"])
      },
      (data: any) => {
        console.log('data err>>:', data);
        load.close();
        const obj: IDialogData = {
          mensaje: "Usuario o Contraseña incorrectos",
          titulo: "Error al iniciar sesión",
          opt: optDialog.error
        }
        this.ui.openDialog(obj);
      }
    )
  }
}
