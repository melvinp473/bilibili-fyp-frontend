import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingParamsComponent } from './voting-params.component';

describe('VotingParamsComponent', () => {
  let component: VotingParamsComponent;
  let fixture: ComponentFixture<VotingParamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotingParamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotingParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
