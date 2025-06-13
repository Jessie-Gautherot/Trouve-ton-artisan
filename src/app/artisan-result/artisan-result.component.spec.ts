import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanResultComponent } from './artisan-result.component';

describe('ArtisanResultComponent', () => {
  let component: ArtisanResultComponent;
  let fixture: ComponentFixture<ArtisanResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtisanResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtisanResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
