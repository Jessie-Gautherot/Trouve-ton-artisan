import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ArtisanService } from '../artisan.service';
import { SearchService } from '../search.service';
import { FilterArtisansPipe } from '../filter-artisan.pipe';
import { ArtisanWithSlugAndNumberNote } from '../artisan.model';
import { ArtisanCardComponent } from '../artisan-card/artisan-card.component'; // ← AJOUT

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
    this.artisanService.getArtisans().subscribe(artisans => {
      this.artisans = artisans;
    });

    this.searchService.filters$.subscribe(filters => {
      this.searchFilters = filters;
    });
  }
}


