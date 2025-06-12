import { Component } from '@angular/core';
import { TopArtisanComponent } from '../top-artisan/top-artisan.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TopArtisanComponent,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
