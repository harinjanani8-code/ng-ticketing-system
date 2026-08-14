import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CountryService, CountryRow } from '../../services/country.service';

@Component({
  selector: 'app-country-master-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './country-master-list.component.html',
  styleUrl: './country-master-list.component.scss'
})
export class CountryMasterListComponent implements OnInit {

  searchText = '';

  countries: CountryRow[] = [];

  constructor(
    private router: Router,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.getCountries();
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

  filteredCountries(): CountryRow[] {

    return this.countries.filter(country =>

      country.countryCode.toLowerCase().includes(this.searchText.toLowerCase()) ||

      country.countryName.toLowerCase().includes(this.searchText.toLowerCase())

    );

  }

  openAdd(): void {
    this.router.navigate(['/country-master-entry']);
  }

  openView(country: CountryRow): void {

    this.router.navigate(
      ['/country-master-entry'],
      {
        state: {
          country: country
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