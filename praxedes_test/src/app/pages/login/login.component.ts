import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { LoginService } from '../../services/login/login.service';
import { UiService } from '../../services/ui/ui.service';
import { constantes } from '../../helpers/constantes';
import { Response } from 'src/app/helpers/clases';
import { IResponse, IUsuario } from '../../helpers/interfaces';
import { mensajes } from '../../helpers/mensajes';
import { optDialog } from '../../helpers/enums';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = new FormControl('')
  password = new FormControl('')
  recuperar = false;
  frmRegister!: FormGroup;

  constructor(
    private loginService: LoginService,
    private route: Router,
    private storage: StorageService,
    private ui: UiService,
    private frmGroup: FormBuilder
  ) { }

  ngOnInit(): void {
    this.construirFormulario();
  }

  //username: juankmanca@gmail.com  
  //clave: juan123
  //token de registro: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEwMDcyMjIwMTUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3VzZXJkYXRhIjoie1wiQ29tcGFuaWFcIjpcIjEwXCIsXCJGZWNoYUV4cGlyYVwiOm51bGwsXCJHcnVwb1wiOm51bGwsXCJOb21icmVcIjpcImp1YW4gb2NhbXBvXCIsXCJVc3VhcmlvXCI6XCIxMDA3MjIyMDE1XCIsXCJQYXNzd29yZFwiOlwianVhbjEyM1wiLFwiSWRlbnRpZmljYWNpb25cIjpcIjEwMDcyMjIwMTVcIixcIlJvbFwiOjAsXCJFbWFpbFwiOlwianVhbmttYW5jYUBnbWFpbC5jb21cIixcIklkVGVyY2Vyb1wiOm51bGwsXCJNV2ViUFwiOm51bGwsXCJDaWFVc3JcIjpcIjEwXCIsXCJJbmROaXZlbFNHVVwiOm51bGx9IiwibmJmIjoxNjc4Mzk2OTQwLCJleHAiOjE2NzgzOTgxNDAsImlhdCI6MTY3ODM5Njk0MH0.xnkVECMbg3nj7QMIEE5RLekDKWJcY5DKR0Ht27cjMDI"

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

  async login(): Promise<void> {
    if (!this.username || !this.password) return;
    const load = this.ui.loading();
    const x = await this.loginService.login(this.username.value?.trim(), this.password.value?.trim())
    x.subscribe(
      (data: any) => {
        // const token = data.headers.get('xauth');
        console.log('data >>:', data);
        
        load.close();
        const resp: IResponse = data.body;
       
      },
      (data: any) => {

        console.log('data err>>:', data);
        
        load.close();
        const resp: IResponse = data.error;
        const obj = Response.transformarObjecto(resp);
        this.ui.openDialog(obj);
      }
    )
  }

  private guardarDatosLocales(_idUsuario: string, username: string, token: string, perfil: string, permisos: any[]) {
    this.storage.set(constantes.userId, _idUsuario);
    this.storage.set(constantes.username, username);
    this.storage.set(constantes.token, token);
    this.storage.set(constantes.perfil, perfil);
    this.storage.set(constantes.permisos, JSON.stringify(permisos));
  }

  public recuperarPassword(): void {
    this.recuperar = !this.recuperar
  }

  public async registrarUsuario(): Promise<void> {
    console.log('this.frmRegister.valid >>:', this.frmRegister.valid);
    console.log('this.frmRegister.valid >>:', this.frmRegister);
    
    if (!this.frmRegister.valid) return;
    const load = this.ui.loading();
    const body = this.construirBody();
    const promise = await this.loginService.registrarUsuario(body);
    promise.subscribe(
      (data: any) => {
        console.log('data >>:', data);
        
        load.close();
        this.ui.openDialog(Response.transformarObjecto(data));
        if (data.completada) this.recuperar = true;
      },
      (data: any) => {
        console.log('data error >>:', data);
        
        load.close();
        const resp: IResponse = data.error;
        const obj = Response.transformarObjecto(resp);
        this.ui.openDialog(obj);
      }
    )
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

  private validarClavesIguales(): boolean {
    if (this.frmRegister.controls['pass1'].value != this.frmRegister.controls['pass2'].value) {
      this.ui.openDialog(
        {
          mensaje: mensajes.recuperarClave.error,
          opt: optDialog.error,
          titulo: mensajes.recuperarClave.titulo
        }
      );
      return false;
    } else {
      return true;
    }
  }
}
