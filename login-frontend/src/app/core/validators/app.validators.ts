import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, timer, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

export class AppValidators {
  static uniqueValue(http: HttpClient, endpoint: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);

      // Debounce Time
      return timer(500).pipe(
        // Cancela peticiones anteriores si el usuario escribe muy rápido
        switchMap(() => http.get<boolean>(`${endpoint}?username=${control.value}`)),
        
        // Transforma la respuesta del backend en un error de formulario o válido
        map(existe => (existe ? { valueAlreadyExists: true } : null)),
        
        // Si el servidor falla, no bloqueamos el formulario
        catchError(() => of(null)) 
      );
    };
  }
}