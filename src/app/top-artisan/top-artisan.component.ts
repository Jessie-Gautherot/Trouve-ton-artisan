import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtisanService } from '../artisan.service';
import { Artisan } from '../artisan.model';
import {  NgFor } from '@angular/common';


@Component({
  selector: 'app-top-artisan',
  standalone: true, 
  imports: [CommonModule, NgFor], 
  templateUrl: './top-artisan.component.html', 
  styleUrls: ['./top-artisan.component.scss'] 
})
export class TopArtisanComponent implements OnInit {
  // Tableau qui contiendra les 3 meilleurs artisans du mois
  topArtisans: Artisan[] = [];

  // Injection du service pour récupérer les artisans
  constructor(private artisanService: ArtisanService) {}

  // Hook Angular appelé après l'initialisation du composant
  ngOnInit(): void {
    this.artisanService.getArtisans().subscribe({
      next: artisans => {
        // Filtre les artisans avec la propriété top = true
        // Trie par note décroissante (conversion en nombre)
        // Puis prend les 3 premiers
        this.topArtisans = artisans
          .filter(a => a.top)
          .sort((a, b) => parseFloat(b.note) - parseFloat(a.note))
          .slice(0, 3);
      },
      error: err => {
        // En cas d'erreur lors de la récupération, on log l'erreur et on vide la liste
        console.error('Erreur lors du chargement des artisans :', err);
        this.topArtisans = [];
      }
    });
  }

  /**
   * Convertit une note en string en tableau de booléens indiquant
   * si l'étoile est pleine (true) ou vide (false).
   * Cela permet d'afficher facilement les étoiles en template.
   * 
   * @param note Note sous forme de chaîne (ex: "4.5")
   * @returns Tableau de 5 booléens correspondant aux 5 étoiles
   */
  getStarArray(note: string): boolean[] {
    // Convertit la note en nombre et arrondit à l'entier le plus proche
    const rating = Math.round(parseFloat(note));

    // Crée un tableau de 5 éléments : true si l'index < rating, sinon false
    return Array.from({ length: 5 }, (_, i) => i < rating);
  }
}
