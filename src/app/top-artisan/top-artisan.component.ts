import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ArtisanService} from '../artisan.service';
import { ArtisanWithSlugAndNumberNote } from '../artisan.model';


@Component({
  selector: 'app-top-artisan',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './top-artisan.component.html',
  styleUrls: ['./top-artisan.component.scss']
})
export class TopArtisanComponent implements OnInit {
  topArtisans: ArtisanWithSlugAndNumberNote[] = [];

  constructor(private artisanService: ArtisanService) {}

  ngOnInit(): void {
    this.artisanService.getArtisans().subscribe({
      next: artisans => {
        this.topArtisans = artisans
          .filter(a => a.top)
          .sort((a, b) => b.note - a.note) 
          .slice(0, 3);
      },
      error: err => {
        console.error('Erreur lors du chargement des artisans :', err);
        this.topArtisans = [];
      }
    });
  }

  getFullStars(note: number): number[] {
    return Array(Math.floor(note)).fill(0);
  }

  hasHalfStar(note: number): boolean {
    return note % 1 >= 0.5;
  }

  getEmptyStars(note: number): number[] {
    return Array(5 - Math.ceil(note)).fill(0);
  }
}
