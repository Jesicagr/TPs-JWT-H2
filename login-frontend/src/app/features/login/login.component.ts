import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { timer, of, Observable } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public loginForm: FormGroup = this.fb.group({
    username: [
      '', 
      [Validators.required, Validators.minLength(3)], 
      [this.userExistsValidator()] // VALIDADOR ASÍNCRONO
    ],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  public errorMessage: string | null = null;

  // Logica del validador
  userExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);

      return timer(500).pipe(
        switchMap(() => this.authService.verificarUsuario(control.value)),
        map(exists => (exists ? null : { userNotFound: true })), 
        catchError(() => of(null)) 
      );
    };
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: any) => this.router.navigate(['/home']),
        error: (err: any) => this.errorMessage = "Credenciales incorrectas"
      });
    }
  }
}