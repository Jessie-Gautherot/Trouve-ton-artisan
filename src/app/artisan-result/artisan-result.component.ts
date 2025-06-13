import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ArtisanService } from '../artisan.service';
import { Artisan } from '../artisan.model';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-artisan-result',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './artisan-result.component.html',
  styleUrls: ['./artisan-result.component.scss']
})
export class ArtisanResultComponent implements OnInit {
  artisans: (Artisan & { slug: string })[] = [];
  searchFilters = { name: '', specialty: '', location: '' };

  constructor(
    private searchService: SearchService,
    private artisanService: ArtisanService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchService.filters$.subscribe(filters => {
      this.searchFilters = filters;
      this.artisanService.getFilteredArtisans(filters).subscribe(result => {
        this.artisans = result;
      });
    });
  }

  getStarArray(note: string): boolean[] {
    const rating = Math.round(parseFloat(note));
    return Array.from({ length: 5 }, (_, i) => i < rating);
  }
}

