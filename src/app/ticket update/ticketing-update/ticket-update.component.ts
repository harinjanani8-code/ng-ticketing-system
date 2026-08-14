
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  TicketUpdateService,
  TicketUpdate
} from '../../services/ticket-update.service';

@Component({
  selector: 'app-ticket-update',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './ticket-update.component.html',
  styleUrl: './ticket-update.component.scss'
})
export class TicketUpdateComponent implements OnInit {

  sidebarOpen = false;

  mode: 'list' | 'add' | 'edit' = 'list';

  searchText = '';

  errorMessage = '';

  updates: TicketUpdate[] = [];

  selectedUpdate: TicketUpdate = this.initializeForm();

  updateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ticketUpdateService: TicketUpdateService
  ) {}

  ngOnInit(): void {

    this.updateForm = this.fb.group({

      ticketNo: [''],

      updateStatus: [
        'Open',
        Validators.required
      ],

      assignTo: [
        '',
        Validators.required
      ],

      assignedOn: [
        '',
        Validators.required
      ],

      hours: [
        0,
        Validators.required
      ],

      comments: [
        '',
        Validators.required
      ]

    });

    console.log('Ticket Update Loaded');

    this.getUpdates();
  }

  getUpdates(): void {

    this.ticketUpdateService.getUpdates().subscribe({

      next: (response: TicketUpdate[]) => {

        this.updates = response;

      },

      error: (error: any) => {

        console.log(error);

      }

    });
  }

  initializeForm(): TicketUpdate {

    return {

      ticketNo:
        'TKT-' +
        String(this.updates.length + 1).padStart(3, '0'),

      updateStatus: 'Open',

      assignTo: '',

      assignedOn: '',

      hours: 0,

      comments: ''

    };
  }

  toggleSidebar(): void {

    this.sidebarOpen = !this.sidebarOpen;

  }

  closeSidebar(): void {

    this.sidebarOpen = false;

  }

  openAdd(): void {

    this.selectedUpdate = this.initializeForm();

    this.updateForm.reset({

      ticketNo: this.selectedUpdate.ticketNo,

      updateStatus: 'Open',

      assignTo: '',

      assignedOn: '',

      hours: 0,

      comments: ''

    });

    this.errorMessage = '';

    this.mode = 'add';

  }

  openView(update: TicketUpdate): void {

    this.selectedUpdate = { ...update };

    this.updateForm.patchValue(update);

    this.errorMessage = '';

    this.mode = 'edit';

  }

  backToList(): void {

    this.selectedUpdate = this.initializeForm();

    this.updateForm.reset();

    this.errorMessage = '';

    this.mode = 'list';

  }

  saveUpdate(): void {

    console.log(this.updateForm.value);

    console.log(
      this.updateForm.get('assignTo')?.value
    );

    console.log(this.updateForm.valid);

    if (this.updateForm.invalid) {

      this.updateForm.markAllAsTouched();

      alert('Please fill all required fields');

      return;
    }

    const updateData: TicketUpdate = {

      ...this.selectedUpdate,

      ...this.updateForm.value

    };

    if (this.mode === 'add') {

      this.ticketUpdateService.addUpdate(updateData).subscribe({

        next: () => {

          alert('Ticket Update Added Successfully');

          this.getUpdates();

          this.mode = 'list';

        },

        error: (error: any) => {

          console.log(error);

        }

      });

    } else {

      this.ticketUpdateService.updateTicket(

        this.selectedUpdate.ticketNo,

        updateData

      ).subscribe({

        next: () => {

          alert('Ticket Update Updated Successfully');

          this.getUpdates();

          this.mode = 'list';

        },

        error: (error: any) => {

          console.log(error);

        }

      });

    }

  }

  deleteUpdate(id: string | undefined): void {

    if (id === undefined) {
      return;
    }

    if (!confirm('Are you sure you want to delete this ticket update?')) {
      return;
    }

    this.ticketUpdateService.deleteUpdate(id).subscribe({

      next: () => {

        alert('Ticket Update Deleted Successfully');

        this.getUpdates();

      },

      error: (error: any) => {

        console.log(error);

        alert(
          error?.error?.message ||
          error?.message ||
          'Failed to delete ticket update'
        );

      }

    });

  }

  filteredUpdates(): TicketUpdate[] {

    if (!this.searchText.trim()) {

      return this.updates;

    }

    return this.updates.filter(update =>

      update.ticketNo
        .toLowerCase()
        .includes(this.searchText.toLowerCase())

      ||

      update.assignTo
        .toLowerCase()
        .includes(this.searchText.toLowerCase())

      ||

      update.updateStatus
        .toLowerCase()
        .includes(this.searchText.toLowerCase())

    );

  }

  Report(): void {

    window.print();

  }

  goBackToLogin(): void {

    this.closeSidebar();

    this.router.navigate(['/user-master-login']);

  }

}