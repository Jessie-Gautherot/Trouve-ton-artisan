import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchFilters } from './search.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private filtersSubject = new BehaviorSubject<SearchFilters>({
    name: '',
    specialty: '',
    location: ''   
  });

  filters$: Observable<SearchFilters> = this.filtersSubject.asObservable();

  updateFilters(newFilters: Partial<SearchFilters>): void {
    const currentFilters = this.filtersSubject.value;
    this.filtersSubject.next({ ...currentFilters, ...newFilters });
  }

  getCurrentFilters(): SearchFilters {
    return this.filtersSubject.value;
  }
}
