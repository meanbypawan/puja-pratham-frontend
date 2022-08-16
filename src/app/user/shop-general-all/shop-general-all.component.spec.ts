import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopGeneralAllComponent } from './shop-general-all.component';

describe('ShopGeneralAllComponent', () => {
  let component: ShopGeneralAllComponent;
  let fixture: ComponentFixture<ShopGeneralAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopGeneralAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopGeneralAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
