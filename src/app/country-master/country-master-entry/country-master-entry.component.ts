import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryService, CountryRow } from '../../services/country.service';

@Component({
  selector: 'app-country-master-entry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './country-master-entry.component.html',
  styleUrl: './country-master-entry.component.scss'
})
export class CountryMasterEntryComponent {

  mode: 'add' | 'edit' = 'add';

  errorMessage = '';

  countries: CountryRow[] = [];

  selectedCountry: CountryRow = this.initializeForm();

  constructor(
    private router: Router,
    private countryService: CountryService
  ) {

    const data = history.state.country;

    if (data) {
      this.selectedCountry = { ...data };
      this.mode = 'edit';
    }

  }

  initializeForm(): CountryRow {

    return {
      id: '',
      countryCode: '',
      countryName: '',
      status: 'Active'
    };

  }

  hasSpecialChars(text: string): boolean {

    const regex = /^[A-Za-z ]*$/;

    return !regex.test(text);

  }

  saveCountry(): void {

    this.errorMessage = '';

    if (!this.selectedCountry.countryCode) {
      this.errorMessage = 'Country Code is required';
      return;
    }

    if (this.selectedCountry.countryCode.length > 2) {
      this.errorMessage = 'Country Code maximum 2 characters';
      return;
    }

    if (!this.selectedCountry.countryName) {
      this.errorMessage = 'Country Name is required';
      return;
    }

    if (this.selectedCountry.countryName.length > 100) {
      this.errorMessage = 'Country Name maximum 100 characters';
      return;
    }

    if (this.hasSpecialChars(this.selectedCountry.countryName)) {
      this.errorMessage = 'Country Name should not contain special characters';
      return;
    }

    if (this.mode === 'add') {

      this.countryService.addCountry(
        { ...this.selectedCountry }
      ).subscribe({

        next: () => {

          alert('Country Added Successfully');

          this.router.navigate(['/country-master-list']);

        },

        error: (error: any) => {

          console.log(error);

        }

      });

    } else {

      this.countryService.updateCountry(

        this.selectedCountry.id,

        { ...this.selectedCountry }

      ).subscribe({

        next: () => {

          alert('Country Updated Successfully');

          this.router.navigate(['/country-master-list']);

        },

        error: (error: any) => {

          console.log(error);

        }

      });

    }

  }

  backToList(): void {

    this.router.navigate(['/country-master-list']);

  }

}