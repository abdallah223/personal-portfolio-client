import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  email = '';
  password = '';
  loading = false;
  error = '';

  submit() {
    if (!this.email || !this.password) {
      this.error = 'Email and password are required.';
      return;
    }
    this.loading = true;
    this.error = '';

    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigate(['/projects']),
      error: () => {
        this.error = 'Invalid email or password.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
