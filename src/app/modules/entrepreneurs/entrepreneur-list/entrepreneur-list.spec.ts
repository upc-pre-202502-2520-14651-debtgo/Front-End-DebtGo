import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurList } from './entrepreneur-list';

describe('EntrepreneurList', () => {
  let component: EntrepreneurList;
  let fixture: ComponentFixture<EntrepreneurList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrepreneurList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrepreneurList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
