import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { API_BASE_URL } from '../api.config';

export interface Ticket {
  id?: number;
  ticketNo: string;
  client: string;
  ticketDate: string;
  deliveryDate: string;
  team: string;
  requestedBy: string;
  assignTo: string;
  sprint: string;
  ticketStatus: string;
  description: string;
  owner: string;
  ownerHrs: number;
  developer: string;
  developerHrs: number;
  tester: string;
  testerHrs: number;
}

export interface TicketDto {
  ticketNo: string;
  client: string;
  ticketDate: string;
  deliveryDate: string;
  team: string;
  requestedBy: string;
  assignTo: string;
  sprint: string;
  ticketStatus: string;
  description: string;
  owner: string;
  ownerHrs: number;
  developer: string;
  developerHrs: number;
  tester: string;
  testerHrs: number;
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private api = `${API_BASE_URL}/ticket`;

  constructor(private http: HttpClient) {}

  private mapRow(row: any): Ticket {
    return { ...row, id: row.id };
  }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<any[]>(this.api).pipe(
      map(rows => rows.map(r => this.mapRow(r))),
    );
  }

  addTicket(ticket: TicketDto): Observable<Ticket> {
    return this.http.post<any>(this.api, ticket).pipe(
      map(r => this.mapRow(r)),
    );
  }

  updateTicket(ticketNo: string, ticket: Ticket): Observable<Ticket> {
    const id = ticket.id;
    return this.http.patch<any>(`${this.api}/${id}`, ticket).pipe(
      map(r => this.mapRow(r)),
    );
  }

  deleteTicket(ticketNo: string): Observable<boolean> {
    return this.getTickets().pipe(
      switchMap(list => {
        const found = list.find(t => t.ticketNo === ticketNo);
        if (!found) {
          throw new Error('Ticket not found');
        }
        return this.http.delete<void>(`${this.api}/${found.id}`).pipe(
          map(() => true),
        );
      }),
    );
  }
}
