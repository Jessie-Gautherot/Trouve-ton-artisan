import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ArtisanService } from '../artisan.service';
import { Artisan } from '../artisan.model';
import { SearchService } from '../search.service';
import { FilterArtisansPipe } from '../filter-artisan.pipe';

@Component({
  selector: 'app-artisan-result',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, FilterArtisansPipe],
  templateUrl: './artisan-result.component.html',
  styleUrls: ['./artisan-result.component.scss']
})
export class ArtisanResultComponent implements OnInit {
  artisans: (Artisan & { slug: string })[] = [];
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

  getStarArray(note: string): boolean[] {
    const rating = Math.round(parseFloat(note));
    return Array.from({ length: 5 }, (_, i) => i < rating);
  }
}

