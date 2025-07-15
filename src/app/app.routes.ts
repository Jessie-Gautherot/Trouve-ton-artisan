import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArtisanResultComponent } from './artisan-result/artisan-result.component';
import { CategoryComponent } from './category/category.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Accueil',
    data: {
      description: 'Trouvez facilement un artisan de confiance près de chez vous.'
    }
  },
  {
    path: 'resultats',
    component: ArtisanResultComponent,
    title: 'Résultats des artisans',
    data: {
      description: 'Résultats de votre recherche.'
    }
  },
  {
    path: 'artisans/:category',
    component: CategoryComponent,
    title: 'Artisans par catégorie',
    data: {
      description: 'Explorez nos artisans classés par catégories professionnelles.'
    }
  },
  {
    path: 'fiche-artisan/:slug',
    loadComponent: () =>
      import('./fiche-artisan/fiche-artisan.component').then(m => m.FicheArtisanComponent),
    title: 'Fiche artisan',
    data: {
      description: 'Détails et coordonnées complètes de l’artisan sélectionné.'
    }
  },
  {
    path: '**',
    loadComponent: () =>
      import('./page-404/page-404.component').then(m => m.Page404Component),
    title: '404 - Page non trouvée',
    data: {
      description: 'La page que vous recherchez n’existe pas. Retournez à l’accueil.'
    }
  }
];
