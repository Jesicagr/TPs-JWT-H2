import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container text-center mt-5">
      <div class="jumbotron bg-dark text-white p-5 rounded">
        <h1 class="display-4">¡Bienvenido!</h1>
        <p class="lead">Explora los mejores productos en un solo lugar.</p>
        <hr class="my-4 bg-light">
        <p>Puedes armar tu carrito de forma pública y loguearte para finalizar la compra.</p>
        <a class="btn btn-primary btn-lg" routerLink="/catalogo" role="button">Ver Catálogo</a>
      </div>
    </div>
  `
})
export class HomeComponent {}