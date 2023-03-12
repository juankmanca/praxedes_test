import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public page = 1;

  constructor(
    private route: Router,
    private storage: StorageService,
  ) { }

  public cambiarTab(page: number): void {
    this.page = page;
  }

  public cerrarSesion(): void {
    this.storage.limpiarStorage();
    this.route.navigate(['auth/login'])
  }

}