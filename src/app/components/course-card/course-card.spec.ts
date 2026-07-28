import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { vi } from 'vitest';

import { CourseCard } from './course-card';
import { Course } from '../../models/course';

const mockCourse: Course = {
  id: 1,
  name: 'Data Structures',
  code: 'CS101',
  credits: 4,
  gradeStatus: 'passed'
};

const initialState = {
  enrollment: { enrolledCourseIds: [] },
  course: { courses: [], loading: false, error: null }
};

describe('CourseCard', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;
  let store: MockStore;

  // Step 101 — configure TestBed with MockStore (replaces real NgRx store)
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
  });

  // Step 102 — component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Step 103 — @Input rendering: course name appears in h3
  it('should display the course name in h3', async () => {
    component.course = mockCourse;
    fixture.detectChanges();
    await fixture.whenStable();

    const h3 = fixture.debugElement.query(By.css('h3'));
    expect(h3.nativeElement.textContent).toContain('Data Structures');
  });

  // Step 104 — Enroll button dispatches enrollInCourse action
  it('should dispatch enrollInCourse when Enroll button is clicked', async () => {
    component.course = mockCourse;
    fixture.detectChanges();
    await fixture.whenStable();

    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const enrollBtn = fixture.debugElement.queryAll(By.css('button'))[0];
    enrollBtn.nativeElement.click();
    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: '[Enrollment] Enroll In Course', courseId: 1 })
    );
  });

  // Step 105 — ngOnChanges sets up isEnrolled$ when course input changes
  it('should set isEnrolled$ in ngOnChanges when course is provided', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    component.course = mockCourse;
    component.ngOnChanges({
      course: {
        currentValue: mockCourse,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true
      }
    });

    expect(component.isEnrolled$).toBeTruthy();
    consoleSpy.mockRestore();
  });
});
