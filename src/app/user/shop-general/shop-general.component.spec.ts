import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopGeneralComponent } from './shop-general.component';

describe('ShopGeneralComponent', () => {
  let component: ShopGeneralComponent;
  let fixture: ComponentFixture<ShopGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
