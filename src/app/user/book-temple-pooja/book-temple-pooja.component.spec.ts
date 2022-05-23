import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTemplePoojaComponent } from './book-temple-pooja.component';

describe('BookTemplePoojaComponent', () => {
  let component: BookTemplePoojaComponent;
  let fixture: ComponentFixture<BookTemplePoojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookTemplePoojaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTemplePoojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
