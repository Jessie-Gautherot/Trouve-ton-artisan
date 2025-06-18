import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchFilters } from './search.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private filtersSubject = new BehaviorSubject<SearchFilters>({
    name: '',
    specialty: '',
    location: ''
  });

  filters$ = this.filtersSubject.asObservable();

  updateFilters(filters: SearchFilters): void {
    this.filtersSubject.next(filters);
  }
}
