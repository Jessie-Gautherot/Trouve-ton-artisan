// Composant responsable de l'affichage des résultats de recherche à partir des filtres
// Il utilise les filtres du SearchService et applique un filtrage via la pipe `filterArtisans`
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ArtisanService } from '../artisan.service';
import { SearchService } from '../search.service';
import { FilterArtisansPipe } from '../filter-artisan.pipe';
import { ArtisanWithSlugAndNumberNote } from '../artisan.model';
import { ArtisanCardComponent } from '../artisan-card/artisan-card.component'; 

@Component({
  selector: 'app-artisan-result',
  standalone: true,
  imports: [CommonModule,RouterModule,HttpClientModule,FilterArtisansPipe,ArtisanCardComponent ],
  templateUrl: './artisan-result.component.html',
  styleUrls: ['./artisan-result.component.scss']
})
export class ArtisanResultComponent implements OnInit {
  artisans: ArtisanWithSlugAndNumberNote[] = [];
  searchFilters = { name: '', specialty: '', location: '' };

  constructor(
    private searchService: SearchService,
    private artisanService: ArtisanService
  ) {}

  ngOnInit(): void {
    // Récupération initiale de la liste complète des artisans
    this.artisanService.getArtisans().subscribe(artisans => {
      this.artisans = artisans;
    });
    // Abonnement aux filtres de recherche émis par le SearchService
    this.searchService.filters$.subscribe(filters => {
      this.searchFilters = filters;
    });
  }
}


