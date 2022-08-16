import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaGeneralComponent } from './media-general.component';

describe('MediaGeneralComponent', () => {
  let component: MediaGeneralComponent;
  let fixture: ComponentFixture<MediaGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
