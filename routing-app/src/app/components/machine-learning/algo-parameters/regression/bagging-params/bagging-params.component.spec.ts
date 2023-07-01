import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaggingParamsComponent } from './bagging-params.component';

describe('BaggingParamsComponent', () => {
  let component: BaggingParamsComponent;
  let fixture: ComponentFixture<BaggingParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaggingParamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaggingParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
