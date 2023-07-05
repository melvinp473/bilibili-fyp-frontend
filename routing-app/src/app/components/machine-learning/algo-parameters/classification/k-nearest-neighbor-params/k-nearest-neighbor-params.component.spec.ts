import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KNearestNeighborParamsComponent } from './k-nearest-neighbor-params.component';

describe('KNearestNeighborParamsComponent', () => {
  let component: KNearestNeighborParamsComponent;
  let fixture: ComponentFixture<KNearestNeighborParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KNearestNeighborParamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KNearestNeighborParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
