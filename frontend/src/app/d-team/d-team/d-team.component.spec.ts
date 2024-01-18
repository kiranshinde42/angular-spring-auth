import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DTeamComponent } from './d-team.component';

describe('DTeamComponent', () => {
  let component: DTeamComponent;
  let fixture: ComponentFixture<DTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DTeamComponent]
    });
    fixture = TestBed.createComponent(DTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
