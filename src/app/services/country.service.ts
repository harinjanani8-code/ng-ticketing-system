import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../api.config';

export interface CountryRow {
  id: string;
  countryCode: string;
  countryName: string;
  status: 'Active' | 'Suspend';
}

export interface CountryDto {
  countryCode: string;
  countryName: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private api = `${API_BASE_URL}/country`;

  constructor(private http: HttpClient) {}

  private mapRow(row: any): CountryRow {
    return {
      id: String(row.id),
      countryCode: row.countryCode,
      countryName: row.countryName,
      status: row.status,
    };
  }

  getCountries(): Observable<CountryRow[]> {
    return this.http.get<any[]>(this.api).pipe(
      map(rows => rows.map(r => this.mapRow(r))),
    );
  }

  addCountry(country: CountryDto): Observable<CountryRow> {
    return this.http.post<any>(this.api, country).pipe(
      map(r => this.mapRow(r)),
    );
  }

  updateCountry(id: string, country: CountryDto): Observable<CountryRow> {
    return this.http.patch<any>(`${this.api}/${Number(id)}`, country).pipe(
      map(r => this.mapRow(r)),
    );
  }

  deleteCountry(id: string): Observable<boolean> {
    return this.http.delete<void>(`${this.api}/${Number(id)}`).pipe(
      map(() => true),
    );
  }
}
