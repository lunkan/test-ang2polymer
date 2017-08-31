import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogDayComponent } from './log-day.component';

describe('LogDayComponent', () => {
  let component: LogDayComponent;
  let fixture: ComponentFixture<LogDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
