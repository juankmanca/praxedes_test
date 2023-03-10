import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { constantes } from '../helpers/constantes';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard {

  constructor(
    private router: Router,
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const tk = localStorage.getItem(constantes.token);
    if(tk) return true;
    window.alert("Por favor inicie sesión para acceder a esta ruta!")
    this.router.navigate(['/login'])
    return false
  }
  
}
