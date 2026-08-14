import { Component } from '@angular/core';

@Component({
  selector: 'app-client-master-entry',
  standalone: true,
  imports: [],
  templateUrl: './client-master-entry.component.html',
  styleUrl: './client-master-entry.component.scss'
})
export class ClientMasterEntryComponent {

}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService, ClientRow } from '../../services/client.service';

@Component({
  selector: 'app-client-master-entry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-master-entry.component.html',
  styleUrl: './client-master-entry.component.scss'
})
export class ClientMasterEntryComponent {

  mode: 'add' | 'edit' = 'add';

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

  errorMessage = '';

  constructor(
    private router: Router,
    private clientService: ClientService
  ) {

    const nav = this.router.getCurrentNavigation();

    if (nav?.extras.state) {

      this.selectedClient = {
        ...(nav.extras.state['client'] as ClientRow)
      };

      this.mode = nav.extras.state['mode'];

    }

  }

  initializeForm(): ClientRow {

    return {
      id: 'CLT-' + String(Date.now()).slice(-3),
      clientName: '',
      clientCode: '',
      country: '',
      email: '',
      status: 'Active'
    };

  }

  backToList(): void {
    this.router.navigate(['/client-master-list']);
  }

  isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  hasSpecialChars(text: string): boolean {
    return !/^[A-Za-z0-9 ]*$/.test(text);
  }

  saveClient(): void {

    this.errorMessage = '';

    if (!this.selectedClient.clientName.trim()) {
      this.errorMessage = 'Client Name is required';
      return;
    }

    if (this.selectedClient.clientName.length > 100) {
      this.errorMessage = 'Maximum 100 characters allowed';
      return;
    }

    if (this.hasSpecialChars(this.selectedClient.clientName)) {
      this.errorMessage = 'Special characters are not allowed';
      return;
    }

    if (!this.selectedClient.clientCode.trim()) {
      this.errorMessage = 'Client Code is required';
      return;
    }

    if (this.selectedClient.clientCode.length > 5) {
      this.errorMessage = 'Client Code maximum 5 characters';
      return;
    }

    if (!this.selectedClient.country) {
      this.errorMessage = 'Select Country';
      return;
    }

    if (
      !this.selectedClient.email ||
      !this.isValidEmail(this.selectedClient.email)
    ) {
      this.errorMessage = 'Enter valid Email';
      return;
    }

    if (this.mode === 'add') {

      this.clientService
        .addClient({ ...this.selectedClient })
        .subscribe({

          next: () => {
            alert('Client Added Successfully');
            this.router.navigate(['/client-master-list']);
          },

          error: (error: any) => {
            console.log(error);
          }

        });

    } else {

      this.clientService
        .updateClient(
          this.selectedClient.id,
          { ...this.selectedClient }
        )
        .subscribe({

          next: () => {
            alert('Client Updated Successfully');
            this.router.navigate(['/client-master-list']);
          },

          error: (error: any) => {
            console.log(error);
          }

        });

    }

  }

}