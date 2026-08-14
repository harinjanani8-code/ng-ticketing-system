import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CountryService, CountryRow } from '../../services/country.service';

@Component({
  selector: 'app-country-master',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './country-master.component.html',
  styleUrl: './country-master.component.scss'
})
export class CountryMasterComponent implements OnInit {

  mode: 'list' | 'edit' | 'add' = 'list';

  searchText = '';

  countries: CountryRow[] = [];

  selectedCountry: CountryRow = this.initializeForm();

  errorMessage = '';

  countryForm !: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {

    this.countryForm = this.fb.group({

      countryName: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
        ]
      ],

      countryCode: [
        '',
        [
          Validators.required,
          Validators.maxLength(8),
        ]
      ],

      status: ['Active', Validators.required]

    });

    console.log('Country Master Loaded');

    this.getCountries();

  }

  saveCountry(): void {

    if (this.countryForm.invalid) {
      this.countryForm.markAllAsTouched();
      alert("Please fill all required fields");
      return;
    }

    const payload = this.countryForm.value;

    const request = this.mode === 'edit' && this.selectedCountry?.id
      ? this.countryService.updateCountry(this.selectedCountry.id, payload)
      : this.countryService.addCountry(payload);

    request.subscribe({
      next: () => {
        alert("Country Saved Successfully");
        this.getCountries();
        this.backToList();
      },
      error: (error: any) => {
        console.log(error);
        alert(error?.error?.message || error?.message || "Failed to save country");
      }
    });

  }

  getCountries(): void {

    this.countryService.getCountries().subscribe({

      next: (response: CountryRow[]) => {
        this.countries = response;
      },

      error: (error: any) => {
        console.log(error);
      }

    });

  }

  deleteCountry(id: string): void {

    if (!confirm("Are you sure you want to delete this country?")) {
      return;
    }

    this.countryService.deleteCountry(id).subscribe({
      next: () => {
        this.getCountries();
        alert("Country Deleted Successfully");
      },
      error: (error: any) => {
        console.log(error);
        alert(error?.error?.message || error?.message || "Failed to delete country");
      }
    });

  }

  initializeForm(): CountryRow {
    return {
      id: 'CNT-' + String(this.countries.length + 1).padStart(3, '0'),
      countryCode: '',
      countryName: '',
      status: 'Active'
    };
  }

  openAdd() {
    this.selectedCountry = this.initializeForm();
    this.countryForm.reset({
      countryName: '',
      countryCode: '',
      status: 'Active'
    });
    this.errorMessage = '';
    this.mode = 'add';
  }

  openView(country: CountryRow) {
    this.selectedCountry = { ...country };
    this.countryForm.patchValue({
      countryName: country.countryName,
      countryCode: country.countryCode,
      status: country.status
    });
    this.errorMessage = '';
    this.mode = 'edit';
  }

  backToList(): void {

    this.selectedCountry = this.initializeForm();

    this.errorMessage = '';

    this.mode = 'list';

  }

  hasSpecialChars(text: string): boolean {
    const regex = /^[A-Za-z ]*$/;
    return !regex.test(text);
  }

  filteredCountries(): CountryRow[] {
    return this.countries.filter(country =>
      country.countryCode.toLowerCase().includes(this.searchText.toLowerCase()) ||
      country.countryName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  Report(): void {
    window.print();
  }

  goBackToUserMaster(): void {
    this.router.navigate(['/user-master-login']);
  }

}