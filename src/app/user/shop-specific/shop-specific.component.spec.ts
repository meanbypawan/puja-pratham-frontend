import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSpecificComponent } from './shop-specific.component';

describe('ShopSpecificComponent', () => {
  let component: ShopSpecificComponent;
  let fixture: ComponentFixture<ShopSpecificComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopSpecificComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
