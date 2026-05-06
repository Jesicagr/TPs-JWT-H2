import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (respuesta) => {
        this.authService.saveToken(respuesta.tokenAcceso); 
        this.router.navigate(['/home']);
      },
      
      error: (error) => {
        console.error('Error al iniciar sesión', error);
        alert('Credenciales inválidas.');
      }
    });
  }
}