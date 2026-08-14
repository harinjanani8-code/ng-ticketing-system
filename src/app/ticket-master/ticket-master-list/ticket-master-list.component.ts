import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TicketMasterService, Ticket } from '../services/ticket-master.service';

@Component({
  selector: 'app-ticket-master-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ticket-master-list.component.html',
  styleUrl: './ticket-master-list.component.scss'
})
export class TicketMasterListComponent implements OnInit {

  searchText = '';

  tickets: Ticket[] = [];

  constructor(
    private router: Router,
    private ticketService: TicketMasterService
  ) {}

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets(): void {

    this.ticketService.getTickets().subscribe({

      next: (response: Ticket[]) => {
        this.tickets = response;
      },

      error: (error: any) => {
        console.log(error);
      }

    });

  }

  filteredTickets(): Ticket[] {

    if (!this.searchText.trim()) {
      return this.tickets;
    }

    return this.tickets.filter(ticket =>

      ticket.ticketNo.toLowerCase().includes(this.searchText.toLowerCase()) ||

      ticket.sprint.toLowerCase().includes(this.searchText.toLowerCase()) ||

      ticket.team.toLowerCase().includes(this.searchText.toLowerCase()) ||

      ticket.assignTo.toLowerCase().includes(this.searchText.toLowerCase())

    );

  }

  openView(ticket: Ticket): void {

    this.router.navigate(
      ['/ticket-master-entry'],
      {
        state: {
          ticket: ticket
        }
      }
    );

  }

  Report(): void {
    window.print();
  }

  goBackToUserMaster(): void {
    this.router.navigate(['/user-master-login']);
  }

}
