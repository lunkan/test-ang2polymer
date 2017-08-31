import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCanvasComponent } from './modal-canvas.component';

describe('ModalCanvasComponent', () => {
  let component: ModalCanvasComponent;
  let fixture: ComponentFixture<ModalCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
