import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  // Inyectamos las herramientas que necesitamos
  const authService = inject(AuthService);
  const router = inject(Router);

  // El Guardián pregunta: "¿Tienes el token?"
  if (authService.isLoggedIn()) {
    return true; // ¡Pasa adelante!
  } else {
    // Si no tiene token, lo pateamos de vuelta al login
    router.navigate(['/login']);
    return false; // ¡Acceso denegado!
  }
};