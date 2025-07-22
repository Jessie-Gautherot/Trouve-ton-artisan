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
  // Liste des options disponibles dans les menus déroulants
  allNames: string[] = [];
  allSpecialties: string[] = [];
  allLocations: string[] = [];

  constructor(
    private searchService: SearchService, 
    private artisanService: ArtisanService, 
    private router: Router 
  ) {}
  ngOnInit(): void {
    // Charge tous les artisans pour extraire les options uniques à afficher dans les <select>.
    this.artisanService.getArtisans().subscribe(artisans => {
      this.allNames = [...new Set(artisans.map(a => a.name))];
      this.allSpecialties = [...new Set(artisans.map(a => a.specialty))];
      this.allLocations = [...new Set(artisans.map(a => a.location))];
    });
  }
  
  // Mise à jour des filtres dans SearchService à la soumission
  onFilterChange(): void {
    this.searchService.updateFilters({
      name: this.name,
      specialty: this.specialty,
      location: this.location
    });
    
    this.router.navigate(['/resultats']); 
  }
}
