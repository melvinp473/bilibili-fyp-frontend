import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnnParamsComponent } from './knn-params.component';

describe('KnnParamsComponent', () => {
  let component: KnnParamsComponent;
  let fixture: ComponentFixture<KnnParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnnParamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KnnParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
