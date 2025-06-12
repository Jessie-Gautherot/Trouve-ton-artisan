import { Pipe, PipeTransform } from '@angular/core';
import { Artisan } from './artisan.model';
import { SearchFilters } from './search.model';

@Pipe({
  name: 'filterArtisans',
  standalone: true,
  pure: true,
})
export class FilterArtisansPipe implements PipeTransform {
  transform(
    artisans: Artisan[] | null,
    filters: SearchFilters | null
  ): Artisan[] {
    if (!artisans || !filters) return [];

    const nameFilter = filters.name.trim().toLowerCase();
    const specialtyFilter = filters.specialty.trim().toLowerCase();
    const locationFilter = filters.location.trim().toLowerCase(); 

    return artisans.filter(artisan => {
      const nameMatch = artisan.name.toLowerCase().includes(nameFilter);
      const specialtyMatch = artisan.specialty.toLowerCase().includes(specialtyFilter);
      const locationMatch = artisan.location.toLowerCase().includes(locationFilter);

      return nameMatch && specialtyMatch && locationMatch;
    });
  }
}


