import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../api.config';

export interface TeamRow {
  id: string;
  teamName: string;
  teamCode: string;
  status: 'Active' | 'Suspend';
}

export interface TeamDto {
  teamName: string;
  teamCode: string;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class TeamService {

  private api = `${API_BASE_URL}/team`;

  constructor(private http: HttpClient) {}

  private mapRow(row: any): TeamRow {
    return {
      id: String(row.id),
      teamName: row.teamName,
      teamCode: row.teamCode,
      status: row.status,
    };
  }

  getTeams(): Observable<TeamRow[]> {
    return this.http.get<any[]>(this.api).pipe(
      map(rows => rows.map(r => this.mapRow(r))),
    );
  }

  addTeam(team: TeamDto): Observable<TeamRow> {
    return this.http.post<any>(this.api, team).pipe(
      map(r => this.mapRow(r)),
    );
  }

  updateTeam(id: string, team: TeamDto): Observable<TeamRow> {
    return this.http.patch<any>(`${this.api}/${Number(id)}`, team).pipe(
      map(r => this.mapRow(r)),
    );
  }

  deleteTeam(id: string): Observable<boolean> {
    return this.http.delete<void>(`${this.api}/${Number(id)}`).pipe(
      map(() => true),
    );
  }
}
