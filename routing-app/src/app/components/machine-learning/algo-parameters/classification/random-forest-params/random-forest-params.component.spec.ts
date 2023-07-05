import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomForestParamsComponent } from './random-forest-params.component';

describe('RandomForestParamsComponent', () => {
  let component: RandomForestParamsComponent;
  let fixture: ComponentFixture<RandomForestParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomForestParamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomForestParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
