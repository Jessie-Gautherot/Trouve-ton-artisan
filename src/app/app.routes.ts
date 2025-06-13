import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArtisanResultComponent } from './artisan-result/artisan-result.component';

export const routes: Routes = [
  {path: '', component: HomeComponent, title: 'Accueil'},
  {path: 'resultats',component: ArtisanResultComponent},
];
