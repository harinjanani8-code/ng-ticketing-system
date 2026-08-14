import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TicketMasterService, Ticket } from '../services/ticket-master.service';

@Component({
  selector: 'app-ticket-master-entry',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ticket-master-entry.component.html',
  styleUrl: './ticket-master-entry.component.scss'
})
export class TicketMasterEntryComponent implements OnInit {

  isEdit = false;

  errorMessage = '';

  clients = [
    'Acme Corp',
    'ABC Pvt Ltd',
    'Infosys',
    'TCS'
  ];

  teams = [
    'Development',
    'Testing',
    'Support'
  ];

  selectedTicket: Ticket = this.initializeForm();

  constructor(
    private router: Router,
    private ticketService: TicketMasterService
  ) {}

  ngOnInit(): void {

    const data = history.state.ticket;

    if (data) {
      this.selectedTicket = { ...data };
      this.isEdit = true;
    }

  }

  initializeForm(): Ticket {

    return {
      ticketNo: 'TKT-001',
      client: '',
      ticketDate: '',
      deliveryDate: '',
      team: '',
      requestedBy: '',
      assignTo: '',
      sprint: '',
      ticketStatus: 'Open',
      description: '',
      owner: '',
      ownerHrs: 0,
      developer: '',
      developerHrs: 0,
      tester: '',
      testerHrs: 0
    };

  }

  saveTicket(): void {

    this.errorMessage = '';

    if (!this.selectedTicket.client) {
      this.errorMessage = 'Client is required';
      return;
    }

    if (!this.selectedTicket.team) {
      this.errorMessage = 'Team is required';
      return;
    }

    if (!this.selectedTicket.ticketDate) {
      this.errorMessage = 'Ticket Date is required';
      return;
    }

    if (!this.selectedTicket.assignTo) {
      this.errorMessage = 'Assign To is required';
      return;
    }

    if (this.isEdit) {

      this.ticketService.updateTicket(
        this.selectedTicket.ticketNo,
        { ...this.selectedTicket }

      ).subscribe({

        next: () => {

          alert('Ticket Updated Successfully');

          this.router.navigate(['/ticket-master-list']);

        },

        error: (error: any) => {

          console.log(error);

        }

      });

    } else {

      this.ticketService.addTicket(
        { ...this.selectedTicket }

      ).subscribe({

        next: () => {

          alert('Ticket Added Successfully');

          this.router.navigate(['/ticket-master-list']);

        },

        error: (error: any) => {

          console.log(error);

        }

      });

    }

  }

  backToList(): void {

    this.router.navigate(['/ticket-master-list']);

  }

}