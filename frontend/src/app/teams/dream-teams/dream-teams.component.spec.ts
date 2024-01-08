import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DreamTeamsComponent } from './dream-teams.component';

describe('DreamTeamsComponent', () => {
  let component: DreamTeamsComponent;
  let fixture: ComponentFixture<DreamTeamsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DreamTeamsComponent]
    });
    fixture = TestBed.createComponent(DreamTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
