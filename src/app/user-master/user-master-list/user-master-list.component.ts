import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

interface UserRow {
  id: string;
  username: string;
  email: string;
  team: string;
  status: 'Active' | 'Suspend';
  password?: string;
}

@Component({
  selector: 'app-user-master-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user-master-login.component.html',
  styleUrl: './user-master-login.component.scss',
})
export class UserMasterLoginComponent {
  sidebarOpen = false;
  mode: 'list' | 'edit' | 'add' = 'list';

  users: UserRow[] = [
    { id: 'USR-001', username: 'harini', email: 'harini@blufin.com', team: 'Development', status: 'Active' },
    { id: 'USR-002', username: 'arjun.k', email: 'arjun.k@blufin.com', team: 'Testing', status: 'Active' },
    { id: 'USR-003', username: 'priya.s', email: 'priya.s@blufin.com', team: 'Support', status: 'Suspend' },
  ];

  selectedUser: UserRow = this.emptyUser();
  showPassword = false;

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  emptyUser(): UserRow {
    return {
      id: 'USR-' + String(this.users.length + 1).padStart(3, '0'),
      username: '',
      email: '',
      team: '',
      status: 'Active',
      password: ''
    };
  }

  openAdd(): void {
    this.selectedUser = this.emptyUser();
    this.showPassword = false;
    this.mode = 'add';
  }

  openView(user: UserRow): void {
    this.selectedUser = { ...user, password: '' };
    this.showPassword = false;
    this.mode = 'edit';
  }

  backToList(): void {
    this.mode = 'list';
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  saveUser(): void {
    if (this.mode === 'add') {
      this.users.push({ ...this.selectedUser });
    } else {
      const index = this.users.findIndex(u => u.id === this.selectedUser.id);
      if (index > -1) {
        this.users[index] = { ...this.selectedUser };
      }
    }
    this.mode = 'list';
  }
}