import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  TicketService,
  Ticket
} from '../../services/ticketing-system.service';

@Component({
  selector: 'app-ticketing-system',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ticketing-system.component.html',
  styleUrl: './ticketing-system.component.scss'
})
export class TicketingSystemComponent implements OnInit {

  mode: 'list' | 'add' | 'edit' = 'list';

  searchText = '';

  errorMessage = '';

  ticketForm!: FormGroup;

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

  tickets: Ticket[] = [];

  selectedTicket: Ticket = this.emptyTicket();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {

    this.ticketForm = this.fb.group({

      ticketNo: ['', Validators.required],

      client: ['', Validators.required],

      ticketDate: ['', Validators.required],

      deliveryDate: ['', Validators.required],

      team: ['', Validators.required],

      assignTo: ['', Validators.required],

      requestedBy: ['', Validators.required],

      sprint: ['', Validators.required],

      description: ['', Validators.required],

      owner: ['', Validators.required],

      ownerHrs: ['', Validators.required],

      developer: ['', Validators.required],

      developerHrs: ['', Validators.required],

      tester: ['', Validators.required],

      testerHrs: ['', Validators.required],

      ticketStatus: ['Open', Validators.required]

    });

    console.log('Ticket System Loaded');

    this.getTickets();
  }

  saveTicket(): void {

    if (this.ticketForm.invalid) {

      this.ticketForm.markAllAsTouched();

      alert('Please fill all required fields');

      return;
    }

    const payload = this.ticketForm.value;

    const request =
      this.mode === 'edit' && this.selectedTicket?.ticketNo
        ? this.ticketService.updateTicket(
            this.selectedTicket.ticketNo,
            payload
          )
        : this.ticketService.addTicket(payload);

    request.subscribe({

      next: () => {

        alert('Ticket Saved Successfully');

        this.getTickets();

        this.backToList();
      },

      error: (error: any) => {

        console.log(error);

        alert(
          error?.error?.message ||
          error?.message ||
          'Failed to save ticket'
        );
      }

    });
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

  deleteTicket(ticketNo: string): void {

    if (!confirm('Are you sure you want to delete this ticket?')) {
      return;
    }

    this.ticketService.deleteTicket(ticketNo).subscribe({

      next: () => {

        this.getTickets();

        alert('Ticket Deleted Successfully');

      },

      error: (error: any) => {

        console.log(error);

        alert(
          error?.error?.message ||
          error?.message ||
          'Failed to delete ticket'
        );

      }

    });
  }

  emptyTicket(): Ticket {

    return {

      ticketNo:
        'TKT-' +
        String(this.tickets.length + 1).padStart(3, '0'),

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

  openAdd(): void {

    this.selectedTicket = this.emptyTicket();

    this.ticketForm.reset({

      ticketNo: this.selectedTicket.ticketNo,

      client: '',

      ticketDate: '',

      deliveryDate: '',

      team: '',

      assignTo: '',

      requestedBy: '',

      sprint: '',

      description: '',

      owner: '',

      ownerHrs: 0,

      developer: '',

      developerHrs: 0,

      tester: '',

      testerHrs: 0,

      ticketStatus: 'Open'

    });

    this.mode = 'add';
  }

  openView(ticket: Ticket): void {

    this.selectedTicket = { ...ticket };

    this.ticketForm.patchValue(ticket);

    this.mode = 'edit';
  }

  backToList(): void {

    this.mode = 'list';
  }

  filteredTickets(): Ticket[] {

    return this.tickets.filter(ticket =>

      ticket.ticketNo
        .toLowerCase()
        .includes(this.searchText.toLowerCase()) ||

      ticket.sprint
        .toLowerCase()
        .includes(this.searchText.toLowerCase()) ||

      ticket.team
        .toLowerCase()
        .includes(this.searchText.toLowerCase()) ||

      ticket.assignTo
        .toLowerCase()
        .includes(this.searchText.toLowerCase())

    );
  }

  Report(): void {

    window.print();
  }

  goBackToUserMaster(): void {

    this.router.navigate(['/user-master-login']);
  }

}