import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { Artisan } from './artisan.model';

@Injectable({
  providedIn: 'root'
})
export class ArtisanService {
  private dataUrl = 'assets/datas.json';

  constructor(private http: HttpClient) {}

  /**
   * Normalise une chaîne de caractères :
   * - enlève les accents
   * - met en minuscules
   * - supprime espaces superflus
   */
  private normalize(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // enlève les accents
      .toLowerCase()
      .trim();
  }

  /**
   * Génère un slug SEO-friendly à partir d'un nom
   */
  private createSlug(name: string): string {
    return this.normalize(name)
      .replace(/\s+/g, '-')      // remplace les espaces par des tirets
      .replace(/[^\w-]+/g, '')   // supprime les caractères non alphanumériques sauf tiret
      .replace(/^-+|-+$/g, '');  // supprime tirets en début et fin
  }

  /**
   * Ajoute dynamiquement le slug à un artisan
   */
  private enrichWithSlug(artisan: Artisan): Artisan & { slug: string } {
    return {
      ...artisan,
      slug: this.createSlug(artisan.name)
    };
  }

  /**
   * Récupère tous les artisans, avec ajout du slug,
   * et gestion d'erreur (retourne tableau vide si erreur)
   */
  getArtisans(): Observable<(Artisan & { slug: string })[]> {
    return this.http.get<Artisan[]>(this.dataUrl).pipe(
      map(artisans => artisans.map(this.enrichWithSlug.bind(this))),
      catchError(error => {
        console.error('Erreur lors du chargement des artisans :', error);
        return of([]);
      })
    );
  }

  /**
   * Récupère un artisan selon son slug
   */
  getArtisanBySlug(slug: string): Observable<(Artisan & { slug: string }) | undefined> {
    return this.getArtisans().pipe(
      map(artisans => artisans.find(artisan => artisan.slug === slug))
    );
  }

  /**
   * Récupère les artisans correspondant à une catégorie normalisée,
   * avec ajout du slug déjà fait dans getArtisans()
   */
  getArtisansByCategory(category: string): Observable<(Artisan & { slug: string })[]> {
    const normalizedCategory = this.normalize(category);
    return this.getArtisans().pipe(
      map(artisans =>
        artisans.filter(artisan => this.normalize(artisan.category) === normalizedCategory)
      )
    );
  }

  /**
   * Recherche globale sur les artisans selon nom, spécialité, et localisation.
   * Tous les filtres sont normalisés et ignorent la casse et accents.
   */
  getFilteredArtisans(filters: {
    name: string;
    specialty: string;
    location: string;
  }): Observable<(Artisan & { slug: string })[]> {
    const normalizedName = this.normalize(filters.name);
    const normalizedSpecialty = this.normalize(filters.specialty);
    const normalizedLocation = this.normalize(filters.location);

    return this.getArtisans().pipe(
      map(artisans =>
        artisans.filter(artisan => {
          const matchesName = !normalizedName || this.normalize(artisan.name).includes(normalizedName);
          const matchesSpecialty = !normalizedSpecialty || this.normalize(artisan.specialty).includes(normalizedSpecialty);
          const matchesLocation = !normalizedLocation || this.normalize(artisan.location).includes(normalizedLocation);
          return matchesName && matchesSpecialty && matchesLocation;
        })
      )
    );
  }
}

