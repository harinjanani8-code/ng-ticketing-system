import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../api.config';

export interface ClientRow {
  id: string;
  clientName: string;
  clientCode: string;
  country: string;
  email: string;
  status: 'Active' | 'Suspend';
}

export interface ClientDto {
  clientName: string;
  clientCode: string;
  country: string;
  email: string;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class ClientService {

  private api = `${API_BASE_URL}/client`;

  constructor(private http: HttpClient) {}

  private mapRow(row: any): ClientRow {
    return {
      id: String(row.id),
      clientName: row.clientName,
      clientCode: row.clientCode,
      country: row.country,
      email: row.email,
      status: row.status,
    };
  }

  getClients(): Observable<ClientRow[]> {
    return this.http.get<any[]>(this.api).pipe(
      map(rows => rows.map(r => this.mapRow(r))),
    );
  }

  addClient(client: ClientDto): Observable<ClientRow> {
    return this.http.post<any>(this.api, client).pipe(
      map(r => this.mapRow(r)),
    );
  }

  updateClient(id: string, client: ClientDto): Observable<ClientRow> {
    return this.http.patch<any>(`${this.api}/${Number(id)}`, client).pipe(
      map(r => this.mapRow(r)),
    );
  }

  deleteClient(id: string): Observable<boolean> {
    return this.http.delete<void>(`${this.api}/${Number(id)}`).pipe(
      map(() => true),
    );
  }
}
