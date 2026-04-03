import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // Inyectamos el servicio para poder pedirle el token
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Si tenemos un token guardado, "atajamos" la petición
  if (token) {
    // Las peticiones son inmutables, así que la clonamos y le pegamos la cabecera de Autorización
    const peticionClonada = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(peticionClonada); // Dejamos que la petición siga su viaje hacia el backend
  }

  // Si no hay token (por ejemplo, cuando recién nos estamos logueando), pasa normal
  return next(req);
};