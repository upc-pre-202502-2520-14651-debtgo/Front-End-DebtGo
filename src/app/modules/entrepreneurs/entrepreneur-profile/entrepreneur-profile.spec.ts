import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurProfile } from './entrepreneur-profile';

describe('EntrepreneurProfile', () => {
  let component: EntrepreneurProfile;
  let fixture: ComponentFixture<EntrepreneurProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrepreneurProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrepreneurProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
