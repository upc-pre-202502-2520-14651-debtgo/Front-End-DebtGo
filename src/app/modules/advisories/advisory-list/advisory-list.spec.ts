import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisoryList } from './advisory-list';

describe('AdvisoryList', () => {
  let component: AdvisoryList;
  let fixture: ComponentFixture<AdvisoryList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvisoryList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvisoryList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
