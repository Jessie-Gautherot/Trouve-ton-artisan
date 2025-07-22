//Service pour gérer les artisans : 
// - charge les données depuis le fichier JSON local,
// - enrichit les artisans avec un slug SEO-friendly et convertit la note en nombre
// - fournit des méthodes pour récupérer les artisans par catégorie ou slug.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { Artisan } from './artisan.model';

// Déclaration du type dérivé de l'interface Artisan 
export interface ArtisanWithSlugAndNumberNote extends Omit<Artisan, 'note'> {
  note: number;
  slug: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArtisanService {
  private dataUrl = 'assets/datas.json';

  constructor(private http: HttpClient) {}

  // Nettoie une chaîne : enlève les accents, met en minuscules et supprime les espaces superflus
  private normalize(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') 
      .toLowerCase() 
      .trim(); 
  }

  // Crée un slug SEO-friendly à partir d’un nom (nettoyage + remplacements)
  private createSlug(name: string): string {
    return this.normalize(name)
      .replace(/\s+/g, '-')        
      .replace(/[^\w-]+/g, '')   
      .replace(/^-+|-+$/g, ''); 
  }

  // Ajoute le slug et convertit la note (string) des artisans en number
  private enrichArtisan(artisan: Artisan): ArtisanWithSlugAndNumberNote {
    return {
      ...artisan,
      note: parseFloat(artisan.note),
      slug: this.createSlug(artisan.name)
    };
  }

  // Charge tous les artisans depuis le fichier JSON, les enrichit, et gère les erreurs
  getArtisans(): Observable<ArtisanWithSlugAndNumberNote[]> {
    return this.http.get<Artisan[]>(this.dataUrl).pipe(
      map(artisans => artisans.map(this.enrichArtisan.bind(this))),
      catchError(error => {
        console.error('Erreur lors du chargement des artisans :', error);
        return of([]);
      })
    );
  }

  // Récupère un artisan à partir de son slug
  getArtisanBySlug(slug: string): Observable<ArtisanWithSlugAndNumberNote | undefined> {
    return this.getArtisans().pipe(
      map(artisans => artisans.find(artisan => artisan.slug === slug))
    );
  }

  // Récupère tous les artisans d'une catégorie donnée
  getArtisansByCategory(category: string): Observable<ArtisanWithSlugAndNumberNote[]> {
    const normalizedCategory = this.normalize(category);
    return this.getArtisans().pipe(
      map(artisans =>
        artisans.filter(artisan =>
          this.normalize(artisan.category) === normalizedCategory
        )
      )
    );
  }
}



