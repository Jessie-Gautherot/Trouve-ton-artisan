import { Component, Input } from '@angular/core';
import { ArtisanWithSlugAndNumberNote } from '../artisan.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fiche-artisan',
  templateUrl: './fiche-artisan.component.html',
  styleUrls: ['./fiche-artisan.component.scss'],
  standalone: true,
  imports: [CommonModule],  
})
export class FicheArtisanComponent {
  @Input() artisan!: ArtisanWithSlugAndNumberNote;

  // Affiche les étoiles pleines (★)
  get fullStars(): number[] {
    return Array(Math.floor(this.artisan.note)).fill(0);
  }

  // Affiche une demi-étoile (½★) si la note a une décimale ≥ 0.5
  get halfStar(): boolean {
    return this.artisan.note % 1 >= 0.5;
  }

  // Complète avec des étoiles vides (☆) jusqu’à 5
  get emptyStars(): number[] {
    const totalStars = 5;
    return Array(totalStars - Math.ceil(this.artisan.note)).fill(0);
  }
}
