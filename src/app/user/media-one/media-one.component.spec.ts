import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaOneComponent } from './media-one.component';

describe('MediaOneComponent', () => {
  let component: MediaOneComponent;
  let fixture: ComponentFixture<MediaOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
