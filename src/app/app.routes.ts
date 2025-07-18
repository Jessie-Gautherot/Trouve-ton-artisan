import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArtisanResultComponent } from './artisan-result/artisan-result.component';
import { CategoryComponent } from './category/category.component';
import { MentionsLegalesComponent } from './mentions-legales/mentions-legales.component';
import { DonneesPersonnellesComponent } from './donnees-personnelles/donnees-personnelles.component';
import { AccessibiliteComponent } from './accessibilite/accessibilite.component';
import { CookiesComponent } from './cookies/cookies.component';

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
    title: 'Résultats de votre recherche',
    data: {
      description: 'Liste des artisans trouvés, selon le nom, la spécialité et la ville recherché.'
    }
  },
  {
    path: 'artisans/:category',
    component: CategoryComponent,
    title: 'Nos artisans par catégorie',
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
      description: 'Informations et formulaire de contact de l’artisan sélectionné.'
    }
  },
  {
    path: 'mentions-legales',
    component: MentionsLegalesComponent,
    title: 'Mentions légales',
    data: {
      description: 'Informations légales du site.'
    }
  },
  {
    path: 'donnees-personnelles',
    component: DonneesPersonnellesComponent,
    title: 'Données personnelles',
    data: {
      description: 'Détails sur la gestion de vos données personnelles.'
    }
  },
  {
    path: 'accessibilite',
    component: AccessibiliteComponent,
    title: 'Accessibilité',
    data: {
      description: 'Déclaration d’accessibilité du site.'
    }
  },
  {
    path: 'cookies',
    component: CookiesComponent,
    title: 'Gestion des cookies',
    data: {
      description: 'Informations sur l’utilisation des cookies.'
    }
  },
  {
    path: '**',
    loadComponent: () =>
      import('./page-404/page-404.component').then(m => m.Page404Component),
    title: 'erreur 404 - Page non trouvée',
    data: {
      description: 'La page que vous recherchez n\'existe pas. Retournez à l\'accueil.'
    }
  }
];

