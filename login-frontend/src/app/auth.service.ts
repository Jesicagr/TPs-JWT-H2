import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth/login';

  // Ahora el servicio también inyecta el Router para poder redirigir
  constructor(private http: HttpClient, private router: Router) { }

  // 1. El puente hacia el backend
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(this.apiUrl, body);
  }

  // 2. Guarda el token (persistencia)
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // 3. Recupera el token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // 4. Verifica si hay alguien logueado (devuelve true o false)
  isLoggedIn(): boolean {
    return !!this.getToken(); 
  }

  // 5. El botón de pánico que limpia todo
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}