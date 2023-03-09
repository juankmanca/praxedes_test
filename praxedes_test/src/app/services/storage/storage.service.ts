import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  set(key: string, value: string){
    localStorage.setItem(key, value);
  }

  get(key: string): string {
    let value = localStorage.getItem(key);
    return value || ''
  }

  limpiarStorage(): void {
    localStorage.clear()
  }
}
