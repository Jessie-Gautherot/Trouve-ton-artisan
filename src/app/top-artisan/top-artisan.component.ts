import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { ArtisanService } from '../artisan.service';
import { ArtisanWithSlugAndNumberNote } from '../artisan.model';
import { ArtisanCardComponent } from '../artisan-card/artisan-card.component'; 

@Component({
  selector: 'app-top-artisan',
  standalone: true,
  imports: [CommonModule, NgFor, RouterModule, ArtisanCardComponent],
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
}
