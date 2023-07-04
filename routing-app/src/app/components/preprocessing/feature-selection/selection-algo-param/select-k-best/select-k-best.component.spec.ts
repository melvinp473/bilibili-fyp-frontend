import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectKBestComponent } from './select-k-best.component';

describe('SelectKBestComponent', () => {
  let component: SelectKBestComponent;
  let fixture: ComponentFixture<SelectKBestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectKBestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectKBestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
