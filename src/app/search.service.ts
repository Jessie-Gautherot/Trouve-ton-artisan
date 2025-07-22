// Service pour gérer et partager l'état des filtres de recherche des artisans.
// Utilise un BehaviorSubject pour conserver la dernière valeur et permettre aux composants de s'abonner.
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchFilters } from './search.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // Stocke les filtres actuels, initialisés à des valeurs vides.
  private filtersSubject = new BehaviorSubject<SearchFilters>({
    name: '',
    specialty: '',
    location: ''
  });

  // Observable exposé pour que les composants puissent recevoir les mises à jour des filtres.
  filters$ = this.filtersSubject.asObservable();

  // Met à jour les filtres avec de nouvelles valeurs.
  updateFilters(filters: SearchFilters): void {
    this.filtersSubject.next(filters);
  }
}

