import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CaptchaComponent } from './captcha/captcha.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CaptchaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-ticketing-system';
  studName: string = "john";
  num1: number = 1;
}


