export interface Artisan {
  id: string;
  name: string;
  specialty: string;
  note: string;
  location: string;
  about: string;
  email: string;
  website: string;
  category: string;
  top: boolean;
  slug?: string; 
}

export interface ArtisanWithSlugAndNumberNote extends Omit<Artisan, 'note'> {
  note: number;
  slug: string;
}
