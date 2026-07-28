import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveEnrollmentForm } from './reactive-enrollment-form';

describe('ReactiveEnrollmentForm', () => {
  let component: ReactiveEnrollmentForm;
  let fixture: ComponentFixture<ReactiveEnrollmentForm>;

  beforeEach(async () => {
    // resetTestingModule prevents "already instantiated" error caused by
    // Vitest module isolation sharing a TestBed instance across spec files
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [ReactiveEnrollmentForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveEnrollmentForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
