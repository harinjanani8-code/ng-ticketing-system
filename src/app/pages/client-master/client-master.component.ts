import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { ClientService, ClientRow } from '../../services/client.service';

@Component({
  selector: 'app-client-master',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-master.component.html',
  styleUrl: './client-master.component.scss'
})
export class ClientMasterComponent implements OnInit {

  mode: 'list' | 'edit' | 'add' = 'list';

  searchText = '';

  clientForm!: FormGroup;

  countries: string[] = [
    'India',
    'USA',
    'UK',
    'Australia',
    'Singapore',
    'UAE'
  ];

  clients: ClientRow[] = [];

  selectedClient: ClientRow = this.initializeForm();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {

    this.clientForm = this.fb.group({
      clientName: ['', Validators.required],
      clientCode: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', Validators.required],
      status: ['Active', Validators.required]
    });

    console.log('Client Master Loaded');

    this.getClients();
  }

  saveClient(): void {

    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      alert("Please fill all required fields");
      return;
    }

    const payload = this.clientForm.value;

    const request = this.mode === 'edit' && this.selectedClient?.id
      ? this.clientService.updateClient(this.selectedClient.id, payload)
      : this.clientService.addClient(payload);

    request.subscribe({
      next: () => {
        alert("Client Saved Successfully");
        this.getClients();
        this.backToList();
      },
      error: (error: any) => {
        console.log(error);
        alert(error?.error?.message || error?.message || "Failed to save client");
      }
    });

  }

  getClients(): void {

    this.clientService.getClients().subscribe({

      next: (response: ClientRow[]) => {

        this.clients = response;

      },

      error: (error: any) => {

        console.log(error);

      }

    });

  }

  deleteClient(id: string): void {

    if (!confirm("Are you sure you want to delete this client?")) {
      return;
    }

    this.clientService.deleteClient(id).subscribe({
      next: () => {
        this.getClients();
        alert("Client Deleted Successfully");
      },
      error: (error: any) => {
        console.log(error);
        alert(error?.error?.message || error?.message || "Failed to delete client");
      }
    });

  }

  initializeForm(): ClientRow {

    return {

      id: 'CLT-' + String(this.clients.length + 1).padStart(3, '0'),

      clientName: '',

      clientCode: '',

      country: '',

      email: '',

      status: 'Active'

    };

  }

  openAdd(): void {

    this.selectedClient = this.initializeForm();

    this.clientForm.reset({

      clientName: '',

      clientCode: '',

      country: '',

      email: '',

      status: 'Active'

    });

    this.mode = 'add';

  }

  openView(client: ClientRow): void {

    this.selectedClient = { ...client };

    this.clientForm.patchValue({

      clientName: client.clientName,

      clientCode: client.clientCode,

      country: client.country,

      email: client.email,

      status: client.status

    });

    this.mode = 'edit';

  }

  backToList(): void {

    this.mode = 'list';

  }

  filteredClients(): ClientRow[] {

    return this.clients.filter(client =>

      client.clientName.toLowerCase().includes(this.searchText.toLowerCase()) ||

      client.clientCode.toLowerCase().includes(this.searchText.toLowerCase()) ||

      client.country.toLowerCase().includes(this.searchText.toLowerCase()) ||

      client.email.toLowerCase().includes(this.searchText.toLowerCase())

    );

  }

  Report(): void {

    window.print();

  }

  goBackToUserMaster(): void {

    this.router.navigate(['/user-master-login']);

  }

}