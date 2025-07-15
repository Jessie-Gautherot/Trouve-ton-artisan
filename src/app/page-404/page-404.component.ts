// src/app/page-404/page-404.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-404',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './page-404.component.html',
  styleUrls: ['./page-404.component.scss'],
})
export class Page404Component {}

