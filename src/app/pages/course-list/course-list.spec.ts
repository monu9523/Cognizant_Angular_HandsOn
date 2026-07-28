import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';

import { CourseList } from './course-list';

const mockCourses = [
  { id: 1, name: 'Angular', code: 'ANG101', credits: 4, gradeStatus: 'passed' as const },
  { id: 2, name: 'Java',    code: 'JAVA102', credits: 3, gradeStatus: 'pending' as const }
];

// Step 109 — initial state with courses loaded
const initialState = {
  course:      { courses: mockCourses, loading: false, error: null },
  enrollment:  { enrolledCourseIds: [] }
};

describe('CourseList', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseList],
      providers: [
        provideRouter([]),
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Step 109 — renders one course-card per course in the initial state
  it('should render a course card for each course in the store', () => {
    const cards = fixture.debugElement.queryAll(By.css('app-course-card'));
    expect(cards.length).toBe(mockCourses.length);
  });

  // Step 110 — loading state: spinner visible, course list hidden
  it('should show loading indicator when loading is true', async () => {
    store.setState({
      course:     { courses: [], loading: true, error: null },
      enrollment: { enrolledCourseIds: [] }
    });
    fixture.detectChanges();
    await fixture.whenStable();

    const loading = fixture.debugElement.query(By.css('p'));
    expect(loading.nativeElement.textContent).toContain('Loading courses...');

    const cards = fixture.debugElement.queryAll(By.css('app-course-card'));
    expect(cards.length).toBe(0);
  });
});
