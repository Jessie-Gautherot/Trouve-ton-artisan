import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopArtisanComponent } from './top-artisan.component';

describe('TopArtisanComponent', () => {
  let component: TopArtisanComponent;
  let fixture: ComponentFixture<TopArtisanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopArtisanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopArtisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
