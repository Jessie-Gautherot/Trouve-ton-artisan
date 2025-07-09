import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ArtisanService } from '../artisan.service';
import { ArtisanWithSlugAndNumberNote } from '../artisan.model';
import { ArtisanCardComponent } from '../artisan-card/artisan-card.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule, NgFor, ArtisanCardComponent],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category = '';
  artisans: ArtisanWithSlugAndNumberNote[] = [];
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private artisanService: ArtisanService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoryParam = params.get('category');
      if (!categoryParam) {
        this.error = 'Catégorie non spécifiée.';
        this.loading = false;
        return;
      }
      this.category = categoryParam;
      this.loadArtisansByCategory();
    });
  }

  private loadArtisansByCategory(): void {
    this.loading = true;
    this.artisanService.getArtisansByCategory(this.category).subscribe({
      next: (artisans) => {
        this.artisans = artisans;
        this.loading = false;
        if (this.artisans.length === 0) {
          this.error = `Aucun artisan trouvé pour la catégorie "${this.category}".`;
        } else {
          this.error = '';
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des artisans:', err);
        this.error = 'Une erreur est survenue lors du chargement des artisans.';
        this.loading = false;
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
