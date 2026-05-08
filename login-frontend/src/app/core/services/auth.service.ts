import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtResponseDTO } from '../../data/dtos/auth.dto';
import { SesionUsuario } from '../../domain/models/auth.model';
import { AuthAdapter } from '../../data/adapters/auth.adapter';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/auth/login';

  constructor(private http: HttpClient, private router: Router) { }

login(credentials: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/login`, {
    username: credentials.username,
    password: credentials.password
  });
}

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
}