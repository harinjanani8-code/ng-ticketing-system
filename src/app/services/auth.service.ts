import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { API_BASE_URL } from '../api.config';

export interface CaptchaResult {
  id: string;
  svg: string;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    id: number;
    username: string;
    email: string;
    team: string;
    status: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = `${API_BASE_URL}/auth`;
  private tokenKey = 'blufin_token';

  constructor(private http: HttpClient) {}

  getCaptcha(): Observable<CaptchaResult> {
    return this.http.get<CaptchaResult>(`${this.api}/captcha`);
  }

  login(login: string, password: string, captchaId: string, captchaCode: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.api}/login`, {
      login,
      password,
      captchaId,
      captchaCode,
    }).pipe(
      tap(res => this.setToken(res.accessToken)),
    );
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.clearToken();
  }
}