import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeEntryForm } from './time-entry-form';

describe('TimeEntryForm', () => {
  let component: TimeEntryForm;
  let fixture: ComponentFixture<TimeEntryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeEntryForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeEntryForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
