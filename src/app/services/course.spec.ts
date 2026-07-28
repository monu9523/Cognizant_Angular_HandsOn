import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { CourseService } from './course';
import { Course } from '../models/course';

const mockCourses = [
  { id: '1', name: 'Angular', code: 'ANG101', credits: 4, gradeStatus: 'passed' },
  { id: '2', name: 'Java',    code: 'JAVA102', credits: 3, gradeStatus: 'pending' }
];

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  // Step 106 — configure TestBed with HttpClientTestingModule equivalent (provideHttpClientTesting)
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CourseService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // httpMock.verify() after each test — asserts no outstanding HTTP requests remain
  afterEach(() => httpMock.verify());

  // Step 107 — getCourses returns mapped courses and hits the correct URL
  it('should fetch and map courses from the API', () => {
    let result: Course[] = [];

    service.getCourses().subscribe(courses => (result = courses));

    // retry(2) means up to 3 total requests — satisfy all of them
    const reqs = httpMock.match('http://localhost:3000/courses');
    reqs[0].flush(mockCourses);

    expect(result.length).toBe(2);
    // ids must be coerced to numbers
    expect(result[0].id).toBe(1);
    expect(result[0].name).toBe('Angular');
  });

  // Step 108 — error handling: 500 response emits the expected error message
  it('should emit an error message on HTTP 500', () => {
    let errorMsg = '';

    service.getCourses().subscribe({
      next: () => {},
      error: (err: Error) => (errorMsg = err.message)
    });

    // retry(2) = 1 original + 2 retries = 3 sequential requests.
    // Each retry only fires after the previous one errors, so flush one at a time.
    for (let i = 0; i < 3; i++) {
      httpMock
        .expectOne('http://localhost:3000/courses')
        .flush('Server error', { status: 500, statusText: 'Internal Server Error' });
    }

    expect(errorMsg).toBe('Failed to load courses. Please try again.');
  });
});
