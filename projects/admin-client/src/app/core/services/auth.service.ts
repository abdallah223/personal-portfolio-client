import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { LoginPayload, AuthResponse } from 'shared';
import { environment } from '../../../environments/environment';

const TOKEN_KEY = environment.tokenKey;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _token: string | null = localStorage.getItem(TOKEN_KEY);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  isLoggedIn(): boolean {
    if (!this._token) return false;
    try {
      const base64 = this._token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  login(payload: LoginPayload) {
    return this.http.post<AuthResponse>(`${environment.apiAuthUrl}/login`, payload).pipe(
      tap((res) => {
        localStorage.setItem(TOKEN_KEY, res.accessToken);
        this._token = res.accessToken;
      }),
    );
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    this._token = null;
    this.router.navigate(['/login']);
  }
}
