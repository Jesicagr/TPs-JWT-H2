import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AppValidators } from '../../core/validators/app.validators';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  registroForm: FormGroup;
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  constructor() {
    this.registroForm = this.fb.group({
      username: [
        '', 
        [Validators.required, Validators.minLength(4)], 
        [AppValidators.uniqueValue(this.http, 'http://localhost:8081/auth/check-username')] 
      ],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get usernameControl() {
    return this.registroForm.get('username');
  }

  registrar() {
    if (this.registroForm.valid) {
      console.log('Enviando al backend:', this.registroForm.value);
      alert('¡Usuario registrado con éxito!');
    }
  }
}