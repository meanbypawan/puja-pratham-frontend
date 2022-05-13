import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempleSpecificComponent } from './temple-specific.component';

describe('TempleSpecificComponent', () => {
  let component: TempleSpecificComponent;
  let fixture: ComponentFixture<TempleSpecificComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempleSpecificComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TempleSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
