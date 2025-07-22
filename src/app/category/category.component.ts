import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ArtisanService } from '../artisan.service';
import { ArtisanWithSlugAndNumberNote } from '../artisan.model';
import { ArtisanCardComponent } from '../artisan-card/artisan-card.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule, NgFor, ArtisanCardComponent],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  category = '';
  artisans: ArtisanWithSlugAndNumberNote[] = [];
  loading = true;
  error = '';

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private artisanService: ArtisanService,
  ) {}
   // Abonnement aux changements d'URL pour charger les artisans de la catégorie sélectionnée
  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
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
  // Charge les artisans correspondants à la catégorie actuelle
  private loadArtisansByCategory(): void {
    this.loading = true;
    this.artisanService.getArtisansByCategory(this.category).subscribe({
      next: (artisans) => {
        this.artisans = artisans;
        this.loading = false;
        this.error = artisans.length === 0 ? `Aucun artisan trouvé pour la catégorie "${this.category}".` : '';
      },
      error: () => {
        this.error = 'Une erreur est survenue lors du chargement des artisans.';
        this.loading = false;
      }
    });
  }
  // Nettoyage de l'abonnement lors de la destruction du composant 
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

