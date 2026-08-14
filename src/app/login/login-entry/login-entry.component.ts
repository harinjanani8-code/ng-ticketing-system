import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-entry',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login-entry.component.html',
  styleUrl: './login-entry.component.scss',
})
export class LoginEntryComponent implements OnInit {

  showPassword = false;

  captchaSvg: SafeHtml = '';
  captchaId = '';
  captchaLoading = false;

  loginLoading = false;

  // Forgot Password
  showPopup = false;
  popupTitle = '';
  popupText = '';
  email = '';
  resetLoading = false;

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit(): void {
    this.reloadCaptcha();
  }

  reloadCaptcha(): void {
    this.captchaLoading = true;
    this.captchaSvg = '';
    this.captchaId = '';

    this.authService.getCaptcha().subscribe({
      next: (result) => {
        this.captchaId = result.id;
        this.captchaSvg = this.sanitizer.bypassSecurityTrustHtml(result.svg);
        this.captchaLoading = false;
      },

      error: (err) => {
        console.error('Captcha API Error:', err);

        this.captchaLoading = false;

        alert(
          'Unable to load captcha. Please check that the backend is running.'
        );
      }
    });
  }

  onLogin(
    loginId: string,
    password: string,
    captchaValue: string
  ): void {

    if (this.loginForm.invalid) {
      alert('Please enter Login and Password');
      return;
    }

    if (!this.captchaId) {
      alert('Please wait for the captcha to load');
      return;
    }

    this.loginLoading = true;

    this.authService
      .login(
        loginId,
        password,
        this.captchaId,
        captchaValue.toUpperCase()
      )
      .subscribe({

        next: (res) => {
          this.loginLoading = false;
          this.router.navigate(['/user-master-login']);
        },

        error: (err) => {
          this.loginLoading = false;

          const msg =
            err?.error?.message ||
            err?.message ||
            'Login failed';

          alert(msg);

          this.reloadCaptcha();
        }
      });
  }

  openForgotPassword(event: Event): void {
    event.preventDefault();

    this.showPopup = true;
    this.email = '';
    this.popupTitle = '';
    this.popupText = '';
  }

  closePopup(): void {
    this.showPopup = false;
  }

  async sendResetEmail(): Promise<void> {

    if (!this.email.trim()) {
      this.popupTitle = 'Error';
      this.popupText = 'Please enter your email address.';
      return;
    }

    this.resetLoading = true;

    try {

      const auth = getAuth();

      await sendPasswordResetEmail(
        auth,
        this.email
      );

      this.popupTitle = 'Success';
      this.popupText =
        'Password reset link sent successfully.';

    } catch (err: any) {

      this.popupTitle = 'Error';
      this.popupText = err.message;

    } finally {

      this.resetLoading = false;
    }
  }

  doLogin(): void {

    if (this.loginForm.invalid) {
      alert('Please enter correct credentials');
      return;
    }

    const login =
      this.loginForm.get('login')?.value;

    const password =
      this.loginForm.get('password')?.value;

    const captchaInput =
      document.querySelector<HTMLInputElement>(
        '#captchaInput'
      );

    const captchaValue =
      captchaInput?.value || '';

    this.onLogin(
      login,
      password,
      captchaValue
    );
  }
}