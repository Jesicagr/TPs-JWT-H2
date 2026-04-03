import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service'; // <-- Traemos al mensajero
import { Router } from '@angular/router'; // <-- Traemos el "GPS" para cambiar de pantalla

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    // Usamos el mensajero para enviar los datos al backend
    this.authService.login(this.username, this.password).subscribe({
      next: (respuesta: any) => {
        // Si sale bien (Status 200 OK):
        console.log('¡Éxito! El servidor respondió:', respuesta);
        
        
        this.authService.saveToken(respuesta.token);
        
        // 2. Viajamos a la pantalla protegida "Home"
        this.router.navigate(['/home']);
      },
      error: (error) => {
        // Si sale mal (ej. contraseña incorrecta):
        console.error('Error al iniciar sesión', error);
        alert('Credenciales inválidas.');
      }
    });
  }
}