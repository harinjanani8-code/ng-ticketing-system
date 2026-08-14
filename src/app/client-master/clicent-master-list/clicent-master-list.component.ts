import { Component } from '@angular/core';

@Component({
  selector: 'app-clicent-master-list',
  standalone: true,
  imports: [],
  templateUrl: './clicent-master-list.component.html',
  styleUrl: './clicent-master-list.component.scss'
})
export class ClicentMasterListComponent {

}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService, ClientRow } from '../../services/client.service';

@Component({
  selector: 'app-client-master-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-master-list.component.html',
  styleUrl: './client-master-list.component.scss'
})
export class ClientMasterListComponent implements OnInit {

  searchText = '';

  clients: ClientRow[] = [];

  constructor(
    private router: Router,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    console.log('Client Master List Loaded');
    this.getClients();
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

  filteredClients(): ClientRow[] {

    if (!this.searchText.trim()) {
      return this.clients;
    }

    return this.clients.filter(client =>
      client.clientName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      client.clientCode.toLowerCase().includes(this.searchText.toLowerCase()) ||
      client.country.toLowerCase().includes(this.searchText.toLowerCase()) ||
      client.email.toLowerCase().includes(this.searchText.toLowerCase())
    );

  }

  openAdd(): void {
    this.router.navigate(['/client-master-entry']);
  }

  openView(client: ClientRow): void {
    this.router.navigate(
      ['/client-master-entry'],
      {
        state: {
          client: client,
          mode: 'edit'
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