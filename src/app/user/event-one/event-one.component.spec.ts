import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOneComponent } from './event-one.component';

describe('EventOneComponent', () => {
  let component: EventOneComponent;
  let fixture: ComponentFixture<EventOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
