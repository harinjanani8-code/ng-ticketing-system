import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../api.config';

export interface UserRow {
  id: string;
  username: string;
  email: string;
  team: string;
  status: string;
  password: string;
}

export interface UserDto {
  username: string;
  email: string;
  team: string;
  status: string;
  password?: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {

  private api = `${API_BASE_URL}/user`;

  constructor(private http: HttpClient) {}

  private mapRow(row: any): UserRow {
    return {
      id: String(row.id),
      username: row.username,
      email: row.email,
      team: row.team,
      status: row.status,
      password: '',
    };
  }

  getUsers(): Observable<UserRow[]> {
    return this.http.get<any[]>(this.api).pipe(
      map(rows => rows.map(r => this.mapRow(r))),
    );
  }

  addUser(user: UserDto): Observable<UserRow> {
    return this.http.post<any>(this.api, user).pipe(
      map(r => this.mapRow(r)),
    );
  }

  updateUser(id: string, user: UserDto): Observable<UserRow> {
    return this.http.patch<any>(`${this.api}/${Number(id)}`, user).pipe(
      map(r => this.mapRow(r)),
    );
  }

  deleteUser(id: string): Observable<boolean> {
    return this.http.delete<void>(`${this.api}/${Number(id)}`).pipe(
      map(() => true),
    );
  }
}
