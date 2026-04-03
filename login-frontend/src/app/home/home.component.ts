import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  // Inyectamos el servicio para poder usar su función de salir
  constructor(private authService: AuthService) {}

  cerrarSesion() {
    this.authService.logout();
  }
}