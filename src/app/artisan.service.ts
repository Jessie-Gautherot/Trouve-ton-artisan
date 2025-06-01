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

  // Génère un slug propre pour les URLs SEO-friendly
  private createSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-') // remplace espaces et caractères spéciaux par des "-"
      .replace(/^-+|-+$/g, '');  // supprime les tirets au début et à la fin
  }

  // Ajoute dynamiquement le slug à chaque artisan
  private enrichWithSlug(artisan: Artisan): Artisan & { slug: string } {
    return {
      ...artisan,
      slug: this.createSlug(artisan.name)
    };
  }

  // Récupère tous les artisans en ajoutant le slug, avec gestion d'erreur
  getArtisans(): Observable<(Artisan & { slug: string })[]> {
    return this.http.get<Artisan[]>(this.dataUrl).pipe(
      map(artisans => artisans.map(this.enrichWithSlug.bind(this))),
      catchError(error => {
        console.error('Erreur lors du chargement des artisans :', error);
        return of([]); // On retourne un tableau vide pour éviter les erreurs de composants
      })
    );
  }

  // Récupère un artisan par son slug
  getArtisanBySlug(slug: string): Observable<(Artisan & { slug: string }) | undefined> {
    return this.getArtisans().pipe(
      map(artisans => artisans.find(artisan => artisan.slug === slug))
    );
  }
}
