import { Pipe, PipeTransform } from '@angular/core';
import { SearchFilters } from './search.model';
import { ArtisanWithSlugAndNumberNote } from './artisan.model';  // <-- IMPORT correct

@Pipe({
  name: 'filterArtisans',
  standalone: true,
  pure: true,
})
export class FilterArtisansPipe implements PipeTransform {
  transform(
    artisans: ArtisanWithSlugAndNumberNote[] | null,
    filters: SearchFilters | null
  ): ArtisanWithSlugAndNumberNote[] {
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
