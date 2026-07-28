import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError, retry } from 'rxjs/operators';
import { Course } from '../models/course';

const API = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<any[]>(`${API}/courses`).pipe(
      // retry attempts the HTTP call up to 2 times before propagating the error
      retry(2),
      // map transforms the stream — coerce id to number (JSON Server 1+ returns string ids)
      // and filter out any courses with 0 credits
      map(courses => courses
        .map(c => ({ ...c, id: Number(c.id) }))
        .filter(c => c.credits > 0)
      ),
      // tap is for side effects (logging) only — never modify data inside tap, use map for that
      tap(courses => console.log('Courses loaded:', courses.length)),
      catchError(err => {
        console.error('getCourses error:', err);
        return throwError(() => new Error('Failed to load courses. Please try again.'));
      })
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<any>(`${API}/courses/${id}`).pipe(
      map(c => ({ ...c, id: Number(c.id) })),
      tap(course => console.log('Course loaded:', course.name)),
      catchError(err => {
        console.error('getCourseById error:', err);
        return throwError(() => new Error(`Failed to load course ${id}.`));
      })
    );
  }

  createCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(`${API}/courses`, course).pipe(
      tap(created => console.log('Course created:', created)),
      catchError(err => throwError(() => new Error('Failed to create course.')))
    );
  }

  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${API}/courses/${id}`, course).pipe(
      tap(updated => console.log('Course updated:', updated)),
      catchError(err => throwError(() => new Error('Failed to update course.')))
    );
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${API}/courses/${id}`).pipe(
      tap(() => console.log('Course deleted:', id)),
      catchError(err => throwError(() => new Error('Failed to delete course.')))
    );
  }

}
