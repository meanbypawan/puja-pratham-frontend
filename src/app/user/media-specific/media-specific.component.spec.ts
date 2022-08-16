import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaSpecificComponent } from './media-specific.component';

describe('MediaSpecificComponent', () => {
  let component: MediaSpecificComponent;
  let fixture: ComponentFixture<MediaSpecificComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaSpecificComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
