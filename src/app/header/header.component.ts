import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchService } from '../search.service';
import { ArtisanService } from '../artisan.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name = '';
  specialty = '';
  location = '';

  allNames: string[] = [];
  allSpecialties: string[] = [];
  allLocations: string[] = [];

  constructor(
    private searchService: SearchService,
    private artisanService: ArtisanService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.artisanService.getArtisans().subscribe(artisans => {
      this.allNames = [...new Set(artisans.map(a => a.name))];
      this.allSpecialties = [...new Set(artisans.map(a => a.specialty))];
      this.allLocations = [...new Set(artisans.map(a => a.location))];
    });
  }

  onFilterChange(): void {
    this.searchService.updateFilters({
      name: this.name,
      specialty: this.specialty,
      location: this.location
    });

    this.router.navigate(['/resultats']); // déclenche la redirection
  }
}
