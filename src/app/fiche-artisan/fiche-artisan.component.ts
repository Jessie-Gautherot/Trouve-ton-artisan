import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtisanWithSlugAndNumberNote, ArtisanService } from '../artisan.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environments.prod';

@Component({
  selector: 'app-fiche-artisan',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fiche-artisan.component.html',
  styleUrls: ['./fiche-artisan.component.scss'],
})
export class FicheArtisanComponent implements OnInit {
  artisan?: ArtisanWithSlugAndNumberNote;
  notFound = false;
  contactForm!: FormGroup;
  submitting = false; 
  submitted = false;  
  success = false;    

  // Adresse e-mail de contact (définie en variable d’environnement)
  contactEmail = environment.contactEmail;

  constructor(
    private route: ActivatedRoute,          
    private artisanService: ArtisanService, 
    private formBuilder: FormBuilder                 
  ) {}

  ngOnInit(): void {
    // On récupère le slug de l’URL pour identifier l’artisan
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) {
      this.notFound = true;
      return;
    }
    // On récupère les infos de l’artisan à partir de son slug
    this.artisanService.getArtisanBySlug(slug).subscribe((artisan) => {
      if (!artisan) {
        this.notFound = true;
      } else {
        this.artisan = artisan;
      }
    });

    // On crée le formulaire avec ses champs et règles de validation
    this.contactForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,         
          Validators.minLength(3),    
          Validators.pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/), 
        ],
      ],
      subject: [
        '',
        [
          Validators.required,         
          Validators.minLength(3), 
          Validators.pattern(/^[a-zA-ZÀ-ÿ\s'\-\.\(\)=!]+$/),     
        ],
      ],
      message: [
        '',
        [
          Validators.required,         
          Validators.minLength(10),  
          Validators.pattern(/^[a-zA-ZÀ-ÿ\s'\-\.\(\)=!]+$/),     
        ],
      ],
    });
  }

  // Méthode starIcons() Génère dynamiquement la liste des icônes d’étoiles selon la note
  get starIcons(): string[] {
    if (!this.artisan) return [];
    const icons: string[] = [];
    const full = Math.floor(this.artisan.note); 
    const fraction = this.artisan.note - full;  

    for (let i = 0; i < full; i++) icons.push('bi-star-fill');
    if (fraction >= 0.75) icons.push('bi-star-fill');
    else if (fraction >= 0.25) icons.push('bi-star-half');
    while (icons.length < 5) icons.push('bi-star');

    return icons;
  }

  // Vérifie si un champ du formulaire est invalide
  isInvalid(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
  
    return !!(
      control &&
      control.invalid &&
      (control.touched || control.dirty || this.submitted)
    );
  }

  // Retourne un message d’erreur spécifique en fonction des erreurs du champ
  getErrorMessage(controlName: string): string {
    const control = this.contactForm.get(controlName);
    if (!control || !control.errors) return '';
    if (control.errors['required']) return 'Ce champ est obligatoire.';
    if (control.errors['minlength'])
      return `Au moins ${control.errors['minlength'].requiredLength} caractères requis.`;
    if (control.errors['pattern'] && controlName === 'name')
      return 'Format invalide (lettres et espaces uniquement).';

    return '';
  }

  // Fonction de soumission du formulaire (simulation d’envoi)
  onSubmit(): void {
    this.submitted = true;
    if (this.contactForm.invalid) return;
    this.submitting = true;

    // Simulation d'un envoi avec delai
    setTimeout(() => {
      this.success = true;
      this.submitting = false;
      this.submitted = false;
      this.contactForm.reset(); 
    }, 1500);
  }
}


