import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { LoginService } from '../../services/login/login.service';
import { UiService } from '../../services/ui/ui.service';
import { constantes } from '../../helpers/constantes';
import { Response } from 'src/app/helpers/clases';
import { IResponse, IUsuario, IResponseError, IDialogData } from '../../helpers/interfaces';
import { optDialog } from 'src/app/helpers/enums';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public frmRegister!: FormGroup;

  constructor(
    private frmGroup: FormBuilder,
    private storage: StorageService,
    private loginService: LoginService,
    private route: Router,
    private ui: UiService,
  ) {
  }

  ngOnInit(): void {
    this.construirFormulario();
  }

  private construirFormulario(): void {
    this.frmRegister = this.frmGroup.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      id: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      cia: ['10']
    })
  }

  private guardarDatosLocales(token: string) {
    this.storage.set(constantes.token, token);
  }

  private construirBody(): IUsuario {
    return {
      nombre: this.frmRegister.controls['name'].value,
      apellido: this.frmRegister.controls['lastName'].value,
      email: this.frmRegister.controls['email'].value,
      doctoIdent: this.frmRegister.controls['id'].value,
      clave: this.frmRegister.controls['password'].value,
      cia: this.frmRegister.controls['cia'].value
    }
  }

  public async registrarUsuario(): Promise<void> {
    if (!this.frmRegister.valid) return;
    const load = this.ui.loading();
    const body = this.construirBody();
    const promise = await (await this.loginService.registrarUsuario(body))
    promise.subscribe(
      (data: IResponse) => {
        load.close();
        this.guardarDatosLocales(data.token);
        this.route.navigate(["/home"])
      },
      (data: any) => {
        load.close();
        const err: IResponseError = data.error;
        const resp: IDialogData = {
          titulo: "Error",
          mensaje: err.Message,
          opt: optDialog.error
        }
        this.ui.openDialog(resp);
      }
    )
  }
}
