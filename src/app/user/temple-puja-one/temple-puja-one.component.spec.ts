import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplePujaOneComponent } from './temple-puja-one.component';

describe('TemplePujaOneComponent', () => {
  let component: TemplePujaOneComponent;
  let fixture: ComponentFixture<TemplePujaOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplePujaOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplePujaOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
