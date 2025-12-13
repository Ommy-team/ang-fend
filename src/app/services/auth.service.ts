import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface SignUpRequest {
  email: string;
  fullName: string;
  password: string;
  phone?: string;
  role?: 'user' | 'admin';
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken?: string;
  refreshToken?: string;
  user?: any;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly BASE_URL = 'http://localhost:3000/auth'; // 👈 Update if backend URL changes

  constructor(private http: HttpClient) {}

  /** 🔹 User Registration */
  signUp(data: SignUpRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.BASE_URL}/register`, data).pipe(
      map((res) => res),
      catchError(this.handleError)
    );
  }

  /** 🔹 User Login */
  signIn(data: SignInRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.BASE_URL}/login`, data).pipe(
      map((res) => res),
      catchError(this.handleError)
    );
  }

  /** 🔹 Logout */
  signOut(): Observable<any> {
    return this.http.post(`${this.BASE_URL}/logout`, {}).pipe(
      map((res) => res),
      catchError(this.handleError)
    );
  }

  /** 🔹 Save tokens locally (optional helper) */
  saveTokens(tokens: { accessToken?: string; refreshToken?: string }) {
    if (tokens.accessToken) localStorage.setItem('accessToken', tokens.accessToken);
    if (tokens.refreshToken) localStorage.setItem('refreshToken', tokens.refreshToken);
  }

  /** 🔹 Clear tokens (on logout) */
  clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  /** 🔹 Get stored access token */
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  /** 🔹 Handle all HTTP errors */
  private handleError(error: HttpErrorResponse) {
    let message = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      message = `Client error: ${error.error.message}`;
    } else if (error.error?.message) {
      message = error.error.message;
    } else {
      message = `Server error: ${error.status} ${error.statusText}`;
    }

    console.error('AuthService error:', message);
    return throwError(() => new Error(message));
  }
}
