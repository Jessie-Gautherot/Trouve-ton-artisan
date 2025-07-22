// Pipe Angular permettant de filtrer une liste d’artisans
// selon les critères de recherche : nom, spécialité et localisation.
import { Pipe, PipeTransform } from '@angular/core';
import { SearchFilters } from './search.model';
import { ArtisanWithSlugAndNumberNote } from './artisan.model';

@Pipe({
  name: 'filterArtisans',
  standalone: true,
  pure: true, // Optimisation : recalcul uniquement si les entrées changent
})
export class FilterArtisansPipe implements PipeTransform {

  // Filtre les artisans selon les champs fournis.
  // Si un filtre est vide, il n'exclut aucun artisan.
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



