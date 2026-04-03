import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // <-- Agregamos withInterceptors
import { routes } from './app.routes';
import { jwtInterceptor } from './jwt.interceptor'; // <-- Importamos nuestro filtro

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor])) // <-- Activamos el filtro invisible
  ]
};