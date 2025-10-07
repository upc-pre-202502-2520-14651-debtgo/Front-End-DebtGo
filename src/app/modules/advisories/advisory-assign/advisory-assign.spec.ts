import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisoryAssign } from './advisory-assign';

describe('AdvisoryAssign', () => {
  let component: AdvisoryAssign;
  let fixture: ComponentFixture<AdvisoryAssign>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvisoryAssign]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvisoryAssign);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
