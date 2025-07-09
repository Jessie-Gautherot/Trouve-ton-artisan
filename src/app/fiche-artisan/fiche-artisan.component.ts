import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtisanWithSlugAndNumberNote, ArtisanService } from '../artisan.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
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

  contactEmail = environment.contactEmail;

  constructor(
    private route: ActivatedRoute,
    private artisanService: ArtisanService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) {
      this.notFound = true;
      return;
    }

    this.artisanService.getArtisanBySlug(slug).subscribe((artisan) => {
      if (!artisan) {
        this.notFound = true;
      } else {
        this.artisan = artisan;
      }
    });

    this.contactForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/), // lettres, espaces, accents, apostrophes et tirets
        ],
      ],
      subject: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
        ],
      ],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
        ],
      ],
    });
  }

  get starIcons(): string[] {
    if (!this.artisan) return [];
    const icons: string[] = [];
    const full = Math.floor(this.artisan.note);
    const fraction = this.artisan.note - full;

    for (let i = 0; i < full; i++) icons.push('bi-star-fill');
    if (fraction >= 0.25 && fraction < 0.75) icons.push('bi-star-half');
    else if (fraction >= 0.75) icons.push('bi-star-fill');
    while (icons.length < 5) icons.push('bi-star');

    return icons;
  }

  isInvalid(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    // Validation au blur: erreur affichée si touched ou dirty ou après soumission
    return !!(
      control &&
      control.invalid &&
      (control.touched || control.dirty || this.submitted)
    );
  }

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

  onSubmit(): void {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }

    this.submitting = true;

    // Simulation d'envoi (sans backend)
    setTimeout(() => {
      this.success = true;
      this.submitting = false;
      this.submitted = false;
      this.contactForm.reset();
    }, 1500);
  }
}
