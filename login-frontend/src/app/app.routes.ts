import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { CatalogoComponent } from './features/catalogo/catalogo.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },       // Página de bienvenida
  { path: 'catalogo', component: CatalogoComponent }, // El catálogo público
  { path: 'login', component: LoginComponent },       // Formulario de acceso
  { path: '', redirectTo: '/home', pathMatch: 'full' } // Por defecto al Home
];