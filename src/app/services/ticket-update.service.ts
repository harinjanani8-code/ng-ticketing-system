import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { API_BASE_URL } from '../api.config';

export interface TicketUpdate {
  id?: number;
  ticketNo: string;
  updateStatus: string;
  assignTo: string;
  assignedOn: string;
  hours: number;
  comments: string;
}

export interface TicketUpdateDto {
  ticketNo: string;
  updateStatus: string;
  assignTo: string;
  assignedOn: string;
  hours: number;
  comments: string;
}

@Injectable({
  providedIn: 'root'
})
export class TicketUpdateService {

  private api = `${API_BASE_URL}/ticket-update`;

  constructor(private http: HttpClient) {}

  private mapRow(row: any): TicketUpdate {
    return { ...row, id: row.id };
  }

  getUpdates(): Observable<TicketUpdate[]> {
    return this.http.get<any[]>(this.api).pipe(
      map(rows => rows.map(r => this.mapRow(r))),
    );
  }

  addUpdate(update: TicketUpdateDto): Observable<TicketUpdate> {
    return this.http.post<any>(this.api, update).pipe(
      map(r => this.mapRow(r)),
    );
  }

  updateTicket(ticketNo: string, update: TicketUpdate): Observable<TicketUpdate> {
    const id = update.id;
    return this.http.patch<any>(`${this.api}/${id}`, update).pipe(
      map(r => this.mapRow(r)),
    );
  }

  deleteUpdate(ticketNo: string): Observable<boolean> {
    return this.getUpdates().pipe(
      switchMap(list => {
        const found = list.find(u => u.ticketNo === ticketNo);
        if (!found) {
          throw new Error('Ticket update not found');
        }
        return this.http.delete<void>(`${this.api}/${found.id}`).pipe(
          map(() => true),
        );
      }),
    );
  }
}
