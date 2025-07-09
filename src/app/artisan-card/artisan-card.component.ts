import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ArtisanWithSlugAndNumberNote } from '../artisan.model';

@Component({
  selector: 'app-artisan-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './artisan-card.component.html',
  styleUrls: ['./artisan-card.component.scss']
})
export class ArtisanCardComponent {
  @Input() artisan!: ArtisanWithSlugAndNumberNote;

  constructor(private router: Router) {}

  navigateToDetails(): void {
    this.router.navigate(['/artisans', this.artisan.slug]);
  }

  get starIcons(): string[] {
    const icons: string[] = [];
    const full = Math.floor(this.artisan.note);
    const fraction = this.artisan.note - full;

    for (let i = 0; i < full; i++) icons.push('bi-star-fill');
    if (fraction >= 0.25 && fraction < 0.75) icons.push('bi-star-half');
    else if (fraction >= 0.75) icons.push('bi-star-fill');
    while (icons.length < 5) icons.push('bi-star');

    return icons;
  }
}
