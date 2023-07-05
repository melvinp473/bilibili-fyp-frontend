import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionTreesParamsComponent } from './decision-trees-params.component';

describe('DecisionTreesParamsComponent', () => {
  let component: DecisionTreesParamsComponent;
  let fixture: ComponentFixture<DecisionTreesParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecisionTreesParamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecisionTreesParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
