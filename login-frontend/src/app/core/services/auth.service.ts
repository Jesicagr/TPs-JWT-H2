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
  private apiUrl = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<SesionUsuario> {
    const body = { username, password };
    
    return this.http.post<JwtResponseDTO>(this.apiUrl, body).pipe(
      map(respuestaCruda => AuthAdapter.fromJson(respuestaCruda))
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); 
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}