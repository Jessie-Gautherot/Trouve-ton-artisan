import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArtisanResultComponent } from './artisan-result/artisan-result.component';
import { CategoryComponent } from './category/category.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Accueil' },
  { path: 'resultats', component: ArtisanResultComponent, title: 'Résultats des artisans' },
  { path: 'artisans/:category', component: CategoryComponent, title: 'Artisans par catégorie' },
  {
    path: 'fiche-artisan/:slug',
    loadComponent: () =>
      import('./fiche-artisan/fiche-artisan.component').then(m => m.FicheArtisanComponent),
    title: 'Fiche artisan'
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }  // Route 404 redirige vers accueil
];
