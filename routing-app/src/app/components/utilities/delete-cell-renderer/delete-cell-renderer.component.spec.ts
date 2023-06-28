import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCellRendererComponent } from './delete-cell-renderer.component';

describe('DeleteCellRendererComponent', () => {
  let component: DeleteCellRendererComponent;
  let fixture: ComponentFixture<DeleteCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCellRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
