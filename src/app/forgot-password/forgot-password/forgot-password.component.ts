import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  email: string = '';
  isLoading: boolean = false;
  message: string = '';
  isError: boolean = false;

  constructor(private router: Router) {}

  async onSendResetLink(): Promise<void> {
    if (!this.email || !this.email.trim()) {
      this.message = 'Please enter your email address.';
      this.isError = true;
      return;
    }

    this.isLoading = true;
    this.message = '';

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, this.email);
      this.message = 'Password reset link sent successfully. Please check your email.';
      this.isError = false;
    } catch (err: any) {
      console.error(err);
      this.message = err.message || 'Could not send reset email.';
      this.isError = true;
    } finally {
      this.isLoading = false;
    }
  }

  onCancel(): void {
    this.router.navigate(['/login']);
  }
}