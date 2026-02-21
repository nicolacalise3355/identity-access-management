import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import { LOGIN_REDIRECT_URI } from '../../../../global_config';
import { SessionService } from '../../service/session.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: 'login.component.html'
})
export default class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private sessionService = inject(SessionService)
  
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          
          //TODO: Enable
          //this.sessionService.saveSession(response);

          this.isLoading.set(false);
          this.router.navigate([LOGIN_REDIRECT_URI]);
        },
        error: (err) => {
          console.error('Errore login:', err);
          this.isLoading.set(false);
          
          if (err.status === 401) {
            this.errorMessage.set('Credenziali non valide. Riprova.');
          } else {
            this.errorMessage.set('Si è verificato un errore di connessione.');
          }
        }
      });
    }
  }
}
