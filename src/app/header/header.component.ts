import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../search.service'; // adapte le chemin si besoin

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  name = '';
  specialty = '';
  location = '';

  constructor(private searchService: SearchService) {}

  onFilterChange(): void {
    this.searchService.updateFilters({
      name: this.name,
      specialty: this.specialty,
      location: this.location,
    });
  }
}


