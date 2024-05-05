import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Verifica si el usuario está autenticado
    if (localStorage.getItem('userId')) {
      return true; // Permite la navegación
    } else {
      // Si no está autenticado, redirige al login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
